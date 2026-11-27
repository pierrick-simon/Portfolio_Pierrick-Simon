// Copies the media in public/ to the R2 bucket, in the folder for their type
// (same rule as mediaUrl: image/, video/, document/). Files already in the
// bucket with the same size are skipped, so it can be run again safely.
//
//   npm run media:upload -- --dry-run   # show what would be sent
//   npm run media:upload
import { readdir, readFile, stat } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { mediaKey } from '../src/lib/media.js';

const TYPES = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.mp4': 'video/mp4', '.pdf': 'application/pdf' };
const dryRun = process.argv.includes('--dry-run');

const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET } = process.env;
if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET) {
  console.error('Missing R2_* variables (run with node --env-file=.env.local).');
  process.exit(1);
}
const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
});

async function remoteSize(Key) {
  try {
    return (await s3.send(new HeadObjectCommand({ Bucket: R2_BUCKET, Key }))).ContentLength;
  } catch (e) {
    if (e.$metadata?.httpStatusCode === 404) return null;
    throw e;
  }
}

const files = (await readdir('public')).filter((f) => TYPES[extname(f).toLowerCase()]);
let sent = 0, skipped = 0, bytes = 0;
for (const file of files) {
  const path = join('public', file);
  const { size } = await stat(path);
  const key = mediaKey(file);
  if ((await remoteSize(key)) === size) { skipped++; continue; }
  console.log(`${dryRun ? 'would send' : 'send'} ${key} (${(size / 1024 / 1024).toFixed(1)} MB)`);
  if (!dryRun) {
    await s3.send(new PutObjectCommand({
      Bucket: R2_BUCKET, Key: key, Body: await readFile(path), ContentType: TYPES[extname(file).toLowerCase()],
      CacheControl: 'public, max-age=86400',
    }));
  }
  sent++; bytes += size;
}
console.log(`${dryRun ? 'Would send' : 'Sent'} ${sent} file(s), ${(bytes / 1024 / 1024).toFixed(0)} MB; ${skipped} already in the bucket.`);
