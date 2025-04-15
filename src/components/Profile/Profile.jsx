// src/components/Profile/Profile.jsx
import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Gérer la déconnexion
  const handleLogout = () => {
    try {
      logout(); // Appel à la fonction de déconnexion du contexte
      toast.success("Déconnexion réussie !");
      navigate("/connexion");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
      toast.error("Erreur lors de la déconnexion.");
    }
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!user) {
    return <p>Vous n'êtes pas connecté.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mon Profil</h1>

      {/* Afficher les informations utilisateur */}
      <div>
        <p><strong>Nom :</strong> {user.lastname}</p>
        <p><strong>Prénom :</strong> {user.name}</p>
        <p><strong>Email :</strong> {user.email}</p>
      </div>

      {/* Bouton de déconnexion */}
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <button
          onClick={() => navigate("/profil-utilisateur")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Modifier mon profil
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Se déconnecter
        </button>
      </div>

    </div>
  );
};

export default Profile;