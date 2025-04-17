import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import React from 'react'
import { ToastContainer } from "react-toastify"; 
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./composants/NavBar"; 
import Connexion from './pages/Connexion.jsx';
import Inscription from './pages/Inscription.jsx';
import Historique from './pages/Historique.jsx';
import CodeQR from './pages/CodeQR.jsx';
import Accueil from './pages/Accueil.jsx';
import EmailCheck from './pages/EmailCheck.jsx';
import ForgotPassword from './pages/auth/ForgotPassword.jsx';
import MailSent from './pages/auth/MailSent.jsx';
import ResetPassword from './pages/auth/ResetPassword.jsx';
import ProfilPrincipal from './pages/ProfilPrincipal';
import ChangerEmail from './pages/ChangerEmail.jsx'
import EmailEnvoi from "./pages/EmailEnvoi";
import ConfirmerNouvelEmail from "./pages/ConfirmerNouvelEmail";
import ChangerMotDePasse from "./pages/ChangerMotDePasse";
import axios from 'axios';




function App() {
  
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  
  return (
    <AuthProvider>
      <ToastContainer position="top-right" />
      <Routes>
        {/* Redirection vers /Accueil */}
        <Route path="/" element={<Navigate to="/Accueil" />} />

        {/* Routes principales */}
        <Route path="/Accueil" element={<><NavBar /><Accueil /></>} />
        <Route path="/codeqr" element={<><NavBar /><CodeQR /></>} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/historique" element={<><NavBar /><Historique /></>} />
        <Route path="/email-check" element={<EmailCheck />} />
        <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />
        <Route path="/mail-envoye" element={<MailSent />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profil-utilisateur" element={<ProfilPrincipal />} />
        <Route path="/changer-email" element={<ChangerEmail/>} />
        <Route path="/email-envoi" element={<EmailEnvoi />} />    
        <Route path="/confirmer-nouvel-email" element={<ConfirmerNouvelEmail />} /> 
        <Route path="/changer-mot-de-passe" element={<ChangerMotDePasse />} />
      </Routes>
    </AuthProvider>
  );
}

export default function Wrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
