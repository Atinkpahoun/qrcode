import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProfilPrincipal = () => {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", lastname: "", email: "" });
  const [initialData, setInitialData] = useState({ name: "", lastname: "", email: "" });
  const [editMode, setEditMode] = useState({ name: false, lastname: false });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const userData = { name: user.name, lastname: user.lastname, email: user.email };
      setFormData(userData);
      setInitialData(userData);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleEdit = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const isFormChanged = () =>
    formData.name !== initialData.name || formData.lastname !== initialData.lastname;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(async () => {
      try {
        const payload = {
          name: formData.name,
          lastname: formData.lastname,
        };

        const response = await api.put("/api/update-profile", payload);
        login({ token: localStorage.getItem("token"), user: response.data.user });
        toast.success("Profil mis à jour !");
        setInitialData({ name: formData.name, lastname: formData.lastname, email: formData.email });
        setEditMode({ name: false, lastname: false });
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors de la mise à jour.");
      } finally {
        setIsLoading(false);
      }
    }, 2000); // délai de 2s pour effet loader
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Modifier mon profil</h2>

        {/* Nom */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Nom</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              disabled={!editMode.lastname}
              className={`w-full p-3 border rounded-xl transition-all duration-200 ${
                editMode.lastname
                  ? "bg-white border-blue-500 ring-2 ring-blue-200"
                  : "bg-gray-100 opacity-60 cursor-not-allowed"
              }`}
            />
            {/* Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={editMode.lastname}
                onChange={() => toggleEdit("lastname")}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition duration-300"></div>
              <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transform peer-checked:translate-x-5 transition duration-300"></div>
            </label>
          </div>
        </div>

        {/* Prénom */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Prénom</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!editMode.name}
              className={`w-full p-3 border rounded-xl transition-all duration-200 ${
                editMode.name
                  ? "bg-white border-blue-500 ring-2 ring-blue-200"
                  : "bg-gray-100 opacity-60 cursor-not-allowed"
              }`}
            />
            {/* Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={editMode.name}
                onChange={() => toggleEdit("name")}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition duration-300"></div>
              <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transform peer-checked:translate-x-5 transition duration-300"></div>
            </label>
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
              className="w-full p-3 border rounded-xl bg-gray-100 opacity-60 cursor-not-allowed"
            />
            <button
              type="button"
              onClick={() => navigate("/changer-email")}
              className="text-sm text-blue-600 hover:underline"
            >
              Modifier
            </button>
          </div>
        </div>

        {/* Mettre à jour */}
        <button
          type="submit"
          disabled={!isFormChanged() || isLoading}
          className={`w-full p-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition ${
            isFormChanged() && !isLoading
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isLoading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          )}
          {isLoading ? "Mise à jour..." : "Mettre à jour"}
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
