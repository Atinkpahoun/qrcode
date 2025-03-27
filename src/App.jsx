import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify"; 
import QRGenerator from "./components/image";
import Url from "./components/url";
import NavBar from "./composants/NavBar";
import Connexion from './pages/Connexion.jsx';
import Inscription from './pages/Inscription.jsx';
import Historique from './pages/Historique.jsx';
import CodeQR from './pages/CodeQR.jsx';
import Accueil from './pages/Accueil.jsx';

function App() {

  return (
    <Router>
      <NavBar />
      {/* <Url /> */}
      <ToastContainer position="top-right" />
      <Routes>
      <Route path="/Accueil" element={<Accueil />} />
        <Route path="/codeqr" element={<CodeQR />} />
        <Route path="/Inscription" element={<Inscription />} />
        <Route path="/Connexion" element={<Connexion />} />
        <Route path="/Historique" element={<Historique />} />

      </Routes>
    </Router>
  )

}

export default App;
