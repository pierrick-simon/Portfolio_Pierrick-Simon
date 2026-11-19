import  './Component.css';

// `onClick` is optional: without it the card is a plain link to the image.
function PreviewCard({ image, onClick }) {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
      <a href={`/${image}`} onClick={handleClick}>
        <img src={`/${image}`} alt={`Img ${image}`} loading="lazy" decoding="async" />
      </a>
  );
}

export default PreviewCard;
