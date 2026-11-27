// Builds the URL of a media file (image, video, PDF).
//
// Values stored in the database are either:
// - a full URL ("https://…"): used as is;
// - an R2 key ("image/R-Type/cover.webp"), as written by the admin upload;
// - a bare file name ("R-Type.png") from before the upload existed: on R2 it
//   lives in the folder for its type (image/, video/ or document/).
//
// NEXT_PUBLIC_MEDIA_URL (e.g. https://media.pierricksimon.dev) points at the R2
// bucket. Without it, files are served from public/ (local tests).
const base = (process.env.NEXT_PUBLIC_MEDIA_URL || '').replace(/\/+$/, '');

const FOLDERS = { mp4: 'video', webm: 'video', pdf: 'document' };

// "R-Type.png" → "image/R-Type.png"; keys with a folder are unchanged.
export function mediaKey(file) {
  const name = file.replace(/^\/+/, '');
  if (name.includes('/')) return name;
  const ext = name.split('.').pop().toLowerCase();
  return `${FOLDERS[ext] ?? 'image'}/${name}`;
}

export function mediaUrl(file) {
  if (!file || /^https?:\/\//.test(file)) return file;
  return base ? `${base}/${mediaKey(file)}` : `/${file.replace(/^\/+/, '')}`;
}
