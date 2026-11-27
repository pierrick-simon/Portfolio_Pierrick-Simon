// Images on R2 (NEXT_PUBLIC_MEDIA_URL) are resized by next/image.
const media = process.env.NEXT_PUBLIC_MEDIA_URL ? new URL(process.env.NEXT_PUBLIC_MEDIA_URL) : null;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: media ? [{ protocol: media.protocol.replace(':', ''), hostname: media.hostname, pathname: '/**' }] : [],
    formats: ['image/avif', 'image/webp'],
    // Covers and screenshots don't change once uploaded (new uploads get a new name).
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
