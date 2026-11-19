import './../App.css';
import { Link } from 'react-router-dom';
import Header from '../Routes/Margins/Header';

function NotFound() {
  return (
    <>
      <Header Title='404' SubTitle='Page introuvable' />
      <main>
        <div className='Section'>
          <h2>Cette page n’existe pas</h2>
          <div className='Section_body'>
            <p><Link to='/'>Retour à l’accueil</Link></p>
          </div>
        </div>
      </main>
    </>
  );
}

export default NotFound;
