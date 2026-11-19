import { Routes, Route } from 'react-router-dom';
import Home from './Routes/Home';
import ProjectPage from './pages/ProjectPage';
import NotFound from './pages/NotFound';
import Header from './Routes/Margins/Header';
import Footer from './Routes/Margins/Footer';
import Top from './Routes/Margins/Top';
import Nav from './Routes/Margins/HomeNav';
import ScrollToTop from './Routes/Margins/ScrollToTop';
import { profile } from './data/profile';

function Page({ children }) {
  return (
    <>
      <Top />
      {children}
      <Footer />
    </>
  );
}

function Main() {
  return (
    <>
      <Header Title={profile.header.title} SubTitle={profile.header.subtitle} />
      <Nav />
      <Top />
      <Home />
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:slug" element={<Page><ProjectPage /></Page>} />
        <Route path="*" element={<Page><NotFound /></Page>} />
      </Routes>
    </>
  );
}

export default App;
