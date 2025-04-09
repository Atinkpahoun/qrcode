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
import Footer from "./composants/Footer.jsx";

function App() {
  

  return (
    <Footer 
  );
}

export default function Wrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
