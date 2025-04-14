import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/Api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangerMotDePasse = () => {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleValidation = () => {
    const { new_password, new_password_confirmation } = formData;
    if (new_password !== new_password_confirmation) {
      toast.error("Les mots de passe ne correspondent pas !");
      return;
    }
    setShowConfirm(true);
  };

  const handleSubmit = async () => {
    try {
      await api.post("/api/change-password", formData);
      toast.success("Mot de passe modifié avec succès !");
      navigate("//profil-utilisateu");
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || "Erreur lors du changement.";
      toast.error(message);
    }
  };

  const renderPasswordField = (label, name, visibleKey) => (
    <div className="relative mb-4">
      <input
        type={showPassword[visibleKey] ? "text" : "password"}
        name={name}
        placeholder={label}
        value={formData[name]}
        onChange={handleChange}
        className="w-full p-3 pr-10 border rounded-xl"
      />
      <button
        type="button"
        onClick={() => toggleVisibility(visibleKey)}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
      >
        {showPassword[visibleKey] ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Changer le mot de passe</h2>

        {renderPasswordField("Mot de passe actuel", "current_password", "current")}
        {renderPasswordField("Nouveau mot de passe", "new_password", "new")}
        {renderPasswordField("Confirmer le mot de passe", "new_password_confirmation", "confirm")}

        {!showConfirm ? (
          <button
            onClick={handleValidation}
            className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700"
          >
            Modifier
          </button>
        ) : (
          <div className="text-center mt-4 space-y-4">
            <p>Êtes-vous sûr de vouloir modifier votre mot de passe ?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
              >
                Oui
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-xl hover:bg-gray-500"
              >
                Non
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangerMotDePasse;
