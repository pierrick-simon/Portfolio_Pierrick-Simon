'use client';

import { useState } from 'react';
import Image from 'next/image';
import PreviewCard from './PreviewCard';
import { mediaUrl } from '@/lib/media';

// Thumbnails + a simple lightbox. Arrows loop infinitely through `images`.
function PreviewGallery({ images }) {
  const [current, setCurrent] = useState(null); // index of the open image, or null
  const total = images.length;

  const close = () => setCurrent(null);
  const prev = (e) => {
    e.stopPropagation();
    setCurrent((current - 1 + total) % total);
  };
  const next = (e) => {
    e.stopPropagation();
    setCurrent((current + 1) % total);
  };

  return (
    <>
      {images.map((image, index) => (
        <PreviewCard key={image} image={image} onClick={() => setCurrent(index)} />
      ))}

      {current !== null && (
        <div className="Lightbox" onClick={close}>
          <button className="Lightbox_close" onClick={close} aria-label="Fermer">×</button>
          <button className="Lightbox_arrow Lightbox_arrow_left" onClick={prev} aria-label="Image précédente">‹</button>
          <Image
            className="Lightbox_img"
            width={1920}
            height={1080}
            sizes="96vw"
            src={mediaUrl(images[current])}
            alt={`Img ${images[current]}`}
            onClick={(e) => e.stopPropagation()}
          />
          <button className="Lightbox_arrow Lightbox_arrow_right" onClick={next} aria-label="Image suivante">›</button>
          <div className="Lightbox_counter">{current + 1} / {total}</div>
        </div>
      )}
    </>
  );
}

export default PreviewGallery;