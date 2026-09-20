import { useState } from 'react';
import PreviewCard from './PreviewCard';

// Thumbnails + a simple lightbox. Arrows loop infinitely through `names`.
function PreviewGallery({ names }) {
  const [current, setCurrent] = useState(null); // index of the open image, or null
  const total = names.length;

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
      {names.map((name, index) => (
        <PreviewCard key={name} name={name} onClick={() => setCurrent(index)} />
      ))}

      {current !== null && (
        <div className="Lightbox" onClick={close}>
          <button className="Lightbox_close" onClick={close} aria-label="Fermer">×</button>
          <button className="Lightbox_arrow Lightbox_arrow_left" onClick={prev} aria-label="Image précédente">‹</button>
          <img
            className="Lightbox_img"
            src={`/${names[current]}.png`}
            alt={`Img ${names[current]}`}
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