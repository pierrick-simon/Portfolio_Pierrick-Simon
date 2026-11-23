import Link from 'next/link';
import Header from '@/components/Header';

export const metadata = { title: 'Page introuvable' };

export default function NotFound() {
  return (
    <>
      <Header title='404' subtitle='Page introuvable' />
      <main>
        <div className='Section'>
          <h2>Cette page n’existe pas</h2>
          <div className='Section_body'>
            <p><Link href='/'>Retour à l’accueil</Link></p>
          </div>
        </div>
      </main>
    </>
  );
}
