import  './Component.css';

function Video ( {name} ) {
  return (
    <video autoPlay muted loop controls>
      <source src={`/${name}.mp4`} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

export default Video;