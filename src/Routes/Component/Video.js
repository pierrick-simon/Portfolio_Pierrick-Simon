import  './Component.css';

function Video({ src }) {
  return (
    <video autoPlay muted loop controls>
      <source src={`/${src}`} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

export default Video;
