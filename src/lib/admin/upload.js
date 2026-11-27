// Upload rules shared by the browser (MediaInput) and the server (getUploadUrl).
import { slugify } from './form';

const MB = 1024 * 1024;

export const KINDS = {
  image: { folder: 'image', max: 10 * MB, types: ['image/webp', 'image/png', 'image/jpeg', 'image/gif', 'image/avif'] },
  video: { folder: 'video', max: 100 * MB, types: ['video/mp4', 'video/webm'] },
  document: { folder: 'document', max: 10 * MB, types: ['application/pdf'] },
};

const EXT = {
  'image/webp': 'webp', 'image/png': 'png', 'image/jpeg': 'jpg', 'image/gif': 'gif', 'image/avif': 'avif',
  'video/mp4': 'mp4', 'video/webm': 'webm', 'application/pdf': 'pdf',
};

export const formatSize = (bytes) => `${(bytes / MB).toFixed(bytes < MB ? 2 : 1)} Mo`;

// Error message for a file that can't be uploaded, or null.
export function checkFile(kind, type, size) {
  const rules = KINDS[kind];
  if (!rules) return 'Type de média inconnu.';
  if (!rules.types.includes(type)) return `Format refusé (${type || 'inconnu'}).`;
  if (!Number.isInteger(size) || size <= 0) return 'Fichier vide.';
  if (size > rules.max) return `Fichier trop lourd : ${formatSize(size)} (max ${formatSize(rules.max)}).`;
  return null;
}

// "image/R-Type/cover-k3x9p2.webp": folder by type, then the project, then
// the file name with a random suffix so a new upload never overwrites a cached one.
export function uploadKey(kind, scope, fileName, type, random) {
  const base = slugify(String(fileName).replace(/\.[^.]*$/, '')).slice(0, 60) || 'fichier';
  return `${KINDS[kind].folder}/${slugify(scope) || 'divers'}/${base}-${random}.${EXT[type]}`;
}

// Media values that were uploaded through the admin (R2 keys with a folder).
// Bare names ("R-Type.png") and full URLs are never deleted automatically.
export const isUploadedKey = (value) => typeof value === 'string' && /^(image|video|document)\/[^/]+\/[^/]+$/.test(value);

// Uploaded keys present in `before` but no longer in `after`.
export function removedKeys(before, after) {
  const kept = new Set(after);
  return [...new Set(before)].filter((key) => isUploadedKey(key) && !kept.has(key));
}

// Media values of a project row.
export const projectMedia = (p) => [p?.cover_url, p?.video_url, ...(p?.gallery ?? [])].filter(Boolean);
