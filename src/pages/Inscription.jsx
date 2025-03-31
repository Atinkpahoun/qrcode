import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaQrcode } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const Inscription = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenoms: "",
    email: "",
    password: "",
    pass_valid: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.pass_valid) {
      toast.error("Les mots de passe ne correspondent pas !", { autoClose: 5000 });
      return;
    }
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: formData.nom,
          prenoms: formData.prenoms,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.pass_valid,
        }),
      });
  
      const data = await response.json();
      console.log("Réponse du backend :", data);
  
      if (response.ok) {
        toast.success("Inscription réussie !", { autoClose: 5000 });
        setFormData({
          nom: "",
          prenoms: "",
          email: "",
          password: "",
          pass_valid: "",
        });
        setTimeout(() => navigate("/connexion"), 2000);
      } else {
        if (response.status === 422 && data.errors) {
          if (data.errors.email) {
            toast.error("L'email existe déjà.", { autoClose: 5000 });
          } else {
            toast.error("Une ou plusieurs erreurs de validation sont survenues.", { autoClose: 5000 });
          }
        } else {
          toast.error(data.message || "Une erreur inconnue est survenue", { autoClose: 5000 });
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      toast.error("Impossible de se connecter au serveur.", { autoClose: 5000 });
    }
  };

  return (
    <section className="flex items-center justify-center mt-5 lg:mt-16 xl:mt-24">
      <div className="border-[#0000FF] border-2 flex w-full xl:w-1/2 rounded-lg doto">
        {/* Section gauche avec logo */}
        <div className="w-0 xl:w-1/2 bg-blue-50 hidden xl:flex items-center justify-center gap-x-1">
          <FaQrcode size={37} color="blue" />
          <h1 className="font-bold text-[#0000FF] text-5xl">QREasy</h1>
        </div>

        {/* Formulaire d'inscription */}
        <form
          className="flex flex-col items-center w-full xl:w-1/2 py-3 xl:py-6"
          onSubmit={handleSubmit}
        >
          <h1 className="text-[#0000FF] text-xl lg:text-3xl font-bold pb-6">
            Inscrivez-vous
          </h1>

          {/* Champs du formulaire */}
          <input
            className="border-[#0000FF] border p-2 rounded-md w-64 md:w-80 mb-2"
            type="text"
            name="nom"
            placeholder="Nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
          <input
            className="border-[#0000FF] border p-2 rounded-md w-64 md:w-80 mb-2"
            type="text"
            name="prenoms"
            placeholder="Prénoms"
            value={formData.prenoms}
            onChange={handleChange}
            required
          />
          <input
            className="border-[#0000FF] border p-2 rounded-md w-64 md:w-80 mb-2"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="border-[#0000FF] border p-2 rounded-md w-64 md:w-80 mb-2"
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            className="border-[#0000FF] border p-2 rounded-md w-64 md:w-80 mb-2"
            type="password"
            name="pass_valid"
            placeholder="Confirmez le mot de passe"
            value={formData.pass_valid}
            onChange={handleChange}
            required
          />

          {/* Bouton de soumission */}
          <button
            className="bg-[#0000FF] text-white font-bold px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Envoyer
          </button>
        </form>
      </div>
    </section>
  );
};

export default Inscription;