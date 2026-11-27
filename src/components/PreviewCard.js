import Image from 'next/image';
import { mediaUrl } from '@/lib/media';

// `onClick` is optional: without it the card is a plain link to the image.
function PreviewCard({ image, onClick }) {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <a href={mediaUrl(image)} onClick={handleClick}>
      <Image src={mediaUrl(image)} alt={`Img ${image}`} width={800} height={450} sizes='(max-width: 600px) 92vw, 280px' />
    </a>
  );
}

export default PreviewCard;
