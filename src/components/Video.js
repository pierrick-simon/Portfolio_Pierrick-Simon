import { mediaUrl } from '@/lib/media';

function Video({ src }) {
  return (
    <video autoPlay muted loop controls playsInline>
      <source src={mediaUrl(src)} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

export default Video;
