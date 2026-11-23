import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import Top from '@/components/Top';
import Footer from '@/components/Footer';
import { SITE_URL } from '@/lib/site';
import '@/styles/App.css';
import '@/styles/Margin.css';
import '@/styles/Component.css';

const plexSans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-plex-sans' });
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-plex-mono' });

const description = 'Portfolio de Pierrick Simon, développeur fullstack et étudiant à Epitech Paris.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Portfolio - Pierrick Simon',
    template: '%s - Pierrick Simon',
  },
  description,
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Pierrick Simon',
    title: 'Portfolio - Pierrick Simon',
    description,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body id="top">
        <Top />
        {children}
        <Footer />
      </body>
    </html>
  );
}
