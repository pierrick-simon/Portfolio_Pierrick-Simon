import  './Component.css';

// `onClick` is optional: without it the card behaves exactly as before
// (plain link to the image), so other pages using PreviewCard are unaffected.
function PreviewCard({ name, onClick }) {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
      <a href={`/${name}.png`} onClick={handleClick}>
        <img src={`/${name}.png`} alt={`Img ${name}`} loading="lazy" decoding="async" />
      </a>
  );
}

export default PreviewCard;