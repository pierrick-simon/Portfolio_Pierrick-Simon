import { Routes, Route } from 'react-router-dom';
import Home from './Routes/Home';
import Wolf3D from './Routes/Wolf3D';
import Shell from './Routes/Shell';
import Corewar from './Routes/Corewar';
import Amazed from './Routes/Amazed';
import Cuddle from './Routes/Cuddle';
import MyWorld from './Routes/MyWorld';
import MyRadar from './Routes/MyRadar';
import Watchlist from './Routes/Watchlist';
import Meme_Application from './Routes/Meme_Application';


import Header from './Routes/Margins/Header';
import Footer from './Routes/Margins/Footer';
import Top from './Routes/Margins/Top';
import Nav  from './Routes/Margins/HomeNav';
import React from 'react';

function Page( {name} ) {
  const Component = name;
  return (
    <React.StrictMode>
      <Top />
      <Component />
      <Footer />
    </React.StrictMode>
  );
}

function Main() {
    return (
        <React.StrictMode>
          <Header Title={"Pierrick Simon"} SubTitle={"Développeur Fullstack | Étudiant à Epitech Paris"}/>
          <Nav />
          <Top />
          <Home />
          <Footer />
        </React.StrictMode>
      );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/Wolf3D" element={<Page name={Wolf3D} />} />
      <Route path="/42sh" element={<Page name={Shell} />} />
      <Route path="/Corewar" element={<Page name={Corewar} />} />
      <Route path="/Amazed" element={<Page name={Amazed} />} />
      <Route path="/Cuddle" element={<Page name={Cuddle} />} />
      <Route path="/MyWorld" element={<Page name={MyWorld} />} />
      <Route path="/MyRadar" element={<Page name={MyRadar} />} />
      <Route path="/Watchlist" element={<Page name={Watchlist} />} />
      <Route path="/Meme_Application" element={<Page name={Meme_Application} />} />
    </Routes>
  );
}
  
export default App;