// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest';
import { isUploadedKey, projectMedia, removedKeys } from '@/lib/admin/upload';

describe('mediaUrl', () => {
  afterEach(() => { vi.unstubAllEnvs(); vi.resetModules(); });
  const load = async (base) => {
    vi.stubEnv('NEXT_PUBLIC_MEDIA_URL', base);
    return (await import('@/lib/media')).mediaUrl;
  };

  it('serves bare names from the folder for their type on R2', async () => {
    const mediaUrl = await load('https://media.test/');
    expect(mediaUrl('R-Type.png')).toBe('https://media.test/image/R-Type.png');
    expect(mediaUrl('R-Type.mp4')).toBe('https://media.test/video/R-Type.mp4');
    expect(mediaUrl('CV-PierrickSimon.pdf')).toBe('https://media.test/document/CV-PierrickSimon.pdf');
    expect(mediaUrl('image/R-Type/cover-1a2b.webp')).toBe('https://media.test/image/R-Type/cover-1a2b.webp');
    expect(mediaUrl('https://youtu.be/x')).toBe('https://youtu.be/x');
  });

  it('serves from public/ without NEXT_PUBLIC_MEDIA_URL', async () => {
    const mediaUrl = await load('');
    expect(mediaUrl('R-Type.png')).toBe('/R-Type.png');
  });
});

describe('which files get deleted from R2', () => {
  it('only uploaded keys that are no longer used', () => {
    const before = ['R-Type.png', 'image/R-Type/a-1.webp', 'image/R-Type/b-2.webp', 'https://x.test/c.png', 'video/R-Type/d-3.mp4'];
    const after = ['image/R-Type/b-2.webp'];
    expect(removedKeys(before, after)).toEqual(['image/R-Type/a-1.webp', 'video/R-Type/d-3.mp4']);
  });

  it('never deletes keys outside the media folders', () => {
    expect(isUploadedKey('image/R-Type/a.webp')).toBe(true);
    expect(isUploadedKey('R-Type.png')).toBe(false);
    expect(isUploadedKey('../image/a/b.png')).toBe(false);
    expect(isUploadedKey('secrets/a/b.png')).toBe(false);
  });

  it('lists the media of a project', () => {
    expect(projectMedia({ cover_url: 'a', video_url: null, gallery: ['b', 'c'] })).toEqual(['a', 'b', 'c']);
  });
});
