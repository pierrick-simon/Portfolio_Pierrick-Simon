// Builds the URL of a media file (image, video, PDF).
// Files are served from public/ by default. Set NEXT_PUBLIC_MEDIA_URL
// (e.g. https://media.pierricksimon.dev) to serve them from R2 instead.
const base = (process.env.NEXT_PUBLIC_MEDIA_URL || '').replace(/\/+$/, '');

export function mediaUrl(file) {
  if (!file || /^https?:\/\//.test(file)) return file;
  return `${base}/${file.replace(/^\/+/, '')}`;
}
