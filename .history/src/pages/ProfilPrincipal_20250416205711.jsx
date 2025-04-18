import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Retour from "../composants/Retour.jsx";

const ProfilPrincipal = () => {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
  });

  const [editMode, setEditMode] = useState({
    name: false,
    lastname: false,
    email: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (field) => {
    if (field === "email") {
      // Redirection spéciale pour la modification de l'email
      navigate("/changer-email");
    } else {
      setEditMode({ ...editMode, [field]: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put("/api/update-profile", formData);
      login({ token: localStorage.getItem("token"), user: response.data.user });
      toast.success("Profil mis à jour !");
      setEditMode({ name: false, lastname: false, email: false });
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <Retour/>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Modifier mon profil</h2>

        {/* Nom */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Nom</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              disabled={!editMode.lastname}
              className="w-full p-3 border rounded-xl bg-gray-100 focus:bg-white"
            />
            <button
              type="button"
              onClick={() => handleEdit("lastname")}
              className="text-sm text-blue-600 hover:underline"
            >
              Modifier
            </button>
          </div>
        </div>

        {/* Prénom */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Prénom</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!editMode.name}
              className="w-full p-3 border rounded-xl bg-gray-100 focus:bg-white"
            />
            <button
              type="button"
              onClick={() => handleEdit("name")}
              className="text-sm text-blue-600 hover:underline"
            >
              Modifier
            </button>
          </div>
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold">Email</label>
          <div className="flex gap-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full p-3 border rounded-xl bg-gray-100"
            />
            <button
              type="button"
              onClick={() => handleEdit("email")}
              className="text-sm text-blue-600 hover:underline"
            >
              Modifier
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition"
        >
          Mettre à jour
        </button>

        <button
          type="button"
          onClick={() => navigate("/changer-mot-de-passe")}
          className="w-full mt-4 bg-red-600 text-white p-3 rounded-xl hover:bg-red-700 transition"
        >
          Modifier le mot de passe
        </button>
      </form>
    </div>
  );
};

export default ProfilPrincipal;
