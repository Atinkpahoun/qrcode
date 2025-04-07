import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify"; 
import { AuthProvider } from "./context/AuthContext";
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
    <AuthProvider>
    <Router>
      <NavBar />
      <ToastContainer position="top-right" />
      <Routes>
        {/* Redirection vers /Accueil */}
        <Route path="/" element={<Navigate to="/Accueil" />} />

        {/* Routes principales */}
        <Route path="/Accueil" element={<Accueil />} />
        <Route path="/codeqr" element={<CodeQR />} />
        <Route path="/Inscription" element={<Inscription />} />
        <Route path="/Connexion" element={<Connexion />} />
        <Route path="/Historique" element={<Historique />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;