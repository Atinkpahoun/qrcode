// src/pages/Connexion.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { FaQrcode } from "react-icons/fa";

const Connexion = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Email ou mot de passe incorrect.");
      }

      // Connecter l'utilisateur via le contexte
      login(data);

      // Afficher une notification de succès
      toast.success("Connexion réussie !", { autoClose: 3000 });

      // Redirection vers la page d'accueil
      navigate("/Accueil");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      toast.error(error.message || "Une erreur s'est produite.", { autoClose: 5000 });
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="border-[#0000FF] border-2 flex w-full xl:w-1/2 rounded-lg doto">
        <div className="w-0 xl:w-1/2 bg-blue-50 hidden xl:flex items-center justify-center gap-x-1">
          <FaQrcode size={37} color="blue" />
          <h1 className="font-bold text-[#0000FF] text-5xl">QR Easy</h1>
        </div>
        <form className="flex flex-col items-center w-full xl:w-1/2 py-3 xl:py-6" onSubmit={handleSubmit}>
          <h1 className="text-[#0000FF] text-xl lg:text-3xl font-bold pb-4">
            Connectez-vous
          </h1>
        {/* Champ Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border-[#0000FF] border p-2 rounded-md w-64 md:w-80 mb-2"
        />

        {/* Champ Mot de passe */}
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
          className="border-[#0000FF] border p-2 rounded-md w-64 md:w-80 mb-2"
        />

        {/* Bouton de soumission */}
        <button
          className="bg-[#0000FF] text-white font-bold px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Se connecter
        </button>
        </form>
      </div>
      
      
    </section>
  );
};

export default Connexion;