// src/pages/Connexion.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

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
    <section className="items-center pt-10">
      <h1 className="text-[#0000FF] text-xl font-bold pb-4">Connexion</h1>
      <form className="rounded border-2 p-4 bg-blue-50 gap-y-2" onSubmit={handleSubmit}>
        {/* Champ Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border-[#0000FF] border p-2 rounded-md w-full mb-2"
        />

        {/* Champ Mot de passe */}
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
          className="border-[#0000FF] border p-2 rounded-md w-full mb-2"
        />

        {/* Bouton de soumission */}
        <button
          className="bg-[#0000FF] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="submit"
        >
          Se connecter
        </button>
      </form>
    </section>
  );
};

export default Connexion;