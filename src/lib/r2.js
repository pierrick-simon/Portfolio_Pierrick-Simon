import 'server-only';
import { DeleteObjectsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Cloudflare R2 speaks the S3 API. The keys stay on the server: callers must
// check the admin session before using anything here (see app/admin/media.js).
let client;
function r2() {
  const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY } = process.env;
  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !process.env.R2_BUCKET) {
    throw new Error('R2 is not configured (R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET).');
  }
  client ??= new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
  });
  return client;
}

// URL the browser can PUT this exact file to for 5 minutes. Type and size are
// part of the signature, so R2 refuses any other file.
export function presignPut(key, contentType, size) {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: key,
    ContentType: contentType,
    ContentLength: size,
    CacheControl: 'public, max-age=31536000, immutable',
  });
  return getSignedUrl(r2(), command, { expiresIn: 300, signableHeaders: new Set(['content-type', 'content-length']) });
}

export async function deleteKeys(keys) {
  if (!keys.length) return;
  const { Errors } = await r2().send(new DeleteObjectsCommand({
    Bucket: process.env.R2_BUCKET,
    Delete: { Objects: keys.map((Key) => ({ Key })), Quiet: true },
  }));
  if (Errors?.length) throw new Error(`R2: ${Errors[0].Message}`);
}
