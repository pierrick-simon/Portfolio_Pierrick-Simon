import Image from 'next/image';
import { mediaUrl } from '@/lib/media';

function ProjectPres({ cover, title, text }) {
  return (
    <div className='Section' id="about">
      <h2>Présentation du projet</h2>
      <div className='Section_body_Pres'>
        <Image
          src={mediaUrl(cover)}
          alt={`Aperçu du Projet ${title}`}
          width={600}
          height={338}
          sizes='(max-width: 600px) 92vw, 300px'
          priority
        />
        <p> &ensp; {text}</p>
      </div>
    </div>
  );
}

export default ProjectPres;
