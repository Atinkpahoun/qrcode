import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import { ToastContainer } from "react-toastify"; 
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./composants/NavBar"; 
import Connexion from './pages/Connexion.jsx';
import Inscription from './pages/Inscription.jsx';
import Historique from './pages/Historique.jsx';
import CodeQR from './pages/CodeQR.jsx';
import Accueil from './pages/Accueil.jsx';

function App() {
  

  return (
    {/*<AuthProvider>
      <ToastContainer position="top-right" />
      <Routes>
        {/* Redirection vers /Accueil 
        <Route path="/" element={<Navigate to="/Accueil" />} />

        {/* Routes principales 
        <Route path="/Accueil" element={<><NavBar /><Accueil /></>} />
        <Route path="/codeqr" element={<><NavBar /><CodeQR /></>} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/historique" element={<><NavBar /><Historique /></>} />
      </Routes>
    </AuthProvider>*/}

    
  );
}

export default function Wrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
