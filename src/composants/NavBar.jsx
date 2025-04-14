// src/composants/NavBar.jsx
import React, { useState, useContext,memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FaQrcode } from "react-icons/fa";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false); // Menu fermé par défaut
  const navigate = useNavigate();

  // Gestion de la déconnexion
  const handleLogout = () => {
    try {
      logout(); // Appel à la fonction de déconnexion depuis le contexte
      toast.success("Déconnexion réussie !");
      navigate("/connexion");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
      toast.error("Erreur lors de la déconnexion.");
    }
  };

  return (
    <nav className="bg-blue-50 py-4 px-4 md:px-10 xl:px-16 text-[#0000FF] doto flex justify-between items-center">
      {/* Logo */}
      <div className="flex gap-x-1 items-center text-xl lg:text-3xl">
        <FaQrcode  color="blue" />
        <Link to="/" className=" font-bold ">
          QREasy
        </Link>
      </div>

      {/* Liens de navigation */}
      <ul className="flex text-lg gap-x-6 items-center">
        <li>
          <Link to="/Accueil" className="hover:underline font-semibold">
            Accueil
          </Link>
        </li>
        <li>
          <Link to="/CodeQR" className="hover:underline font-semibold">
            CodeQR
          </Link>
        </li>

        {/* Historique visible uniquement pour les utilisateurs connectés */}
        {user && (
          <li>
            <Link to="/Historique" className="hover:underline font-semibold">
              Historique
            </Link>
          </li>
        )}

        {/* Affichage conditionnel */}
        {!user ? (
          <>
            <li>
              <Link to="/Inscription" className="hover:underline">
                Inscription
              </Link>
            </li>
            <li>
              <Link to="/Connexion" className="hover:underline">
                Connexion
              </Link>
            </li>
          </>
        ) : (
          <li className="relative">
            {/* Icône utilisateur */}
            <button
              onClick={() => setIsOpen(!isOpen)} // Ouvrir/fermer le menu
              className="focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>

            {/* Menu déroulant */}
            {isOpen && (
                <div className="absolute -right-10 mt-2 w-auto bg-blue-50 rounded-lg shadow-lg top-14">
                  <div className="p-4">
                    <p><strong>Nom :</strong> {user.lastname}</p>
                    <p><strong>Prénom :</strong> {user.name}</p>
                    <p><strong>Email :</strong> {user.email}</p>

                    {/* 🔹 Bouton pour accéder au profil principal */}
                    <button
                      onClick={() => navigate("/profil-utilisateur")}
                      className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
                    >
                      Modifier mon profil
                    </button>

                    {/* 🔻 Bouton de déconnexion */}
                    <button
                      onClick={handleLogout}
                      className="mt-2 w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600"
                    >
                      Se déconnecter
                    </button>
                  </div>
                </div>
              )}

          </li>
        )}
      </ul>
  
    </nav>
  );
};

export default memo(NavBar);