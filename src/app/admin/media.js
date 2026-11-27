'use server';

import { randomBytes } from 'node:crypto';
import { requireAdmin } from '@/lib/admin/auth';
import { checkFile, uploadKey } from '@/lib/admin/upload';
import { presignPut } from '@/lib/r2';

// Step 1 of an upload: the admin's browser asks for a presigned URL, then
// PUTs the file straight to R2 (no 4.5 MB Vercel limit). The admin check
// comes first: without it anyone could get a URL to write in the bucket.
export async function getUploadUrl({ kind, scope, name, type, size }) {
  await requireAdmin();
  const error = checkFile(kind, type, size);
  if (error) return { error };

  const key = uploadKey(kind, String(scope ?? ''), String(name ?? ''), type, randomBytes(4).toString('hex'));
  try {
    return { key, url: await presignPut(key, type, size) };
  } catch (e) {
    return { error: e.message };
  }
}
