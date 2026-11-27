'use client';

import { getUploadUrl } from '@/app/admin/media';
import { checkFile, KINDS } from '@/lib/admin/upload';

// Images are resized (max 1920 px) and converted to WebP before uploading.
// GIFs are kept as is (the conversion would drop the animation).
async function compress(file) {
  if (!file.type.startsWith('image/') || file.type === 'image/gif') return file;
  const { default: imageCompression } = await import('browser-image-compression');
  const out = await imageCompression(file, { maxWidthOrHeight: 1920, maxSizeMB: 1.5, fileType: 'image/webp', useWebWorker: true });
  return new File([out], file.name.replace(/\.[^.]*$/, '') + '.webp', { type: 'image/webp' });
}

// PUT with progress (fetch can't report upload progress).
function put(url, file, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress(e.loaded / e.total);
    xhr.onload = () => (xhr.status < 300 ? resolve() : reject(new Error(`R2 a refusé l’envoi (${xhr.status}).`)));
    xhr.onerror = () => reject(new Error('Envoi impossible : vérifie la règle CORS du bucket R2.'));
    xhr.send(file);
  });
}

// Compress, ask the server for a presigned URL, send the file to R2.
// Returns the R2 key to store in the database. Throws with a readable message.
export async function uploadFile(file, kind, scope, onProgress = () => {}) {
  const ready = await compress(file);
  const error = checkFile(kind, ready.type, ready.size);
  if (error) throw new Error(error);
  const res = await getUploadUrl({ kind, scope, name: ready.name, type: ready.type, size: ready.size });
  if (res.error) throw new Error(res.error);
  await put(res.url, ready, onProgress);
  return res.key;
}

export const acceptFor = (kind) => KINDS[kind].types.join(',');
