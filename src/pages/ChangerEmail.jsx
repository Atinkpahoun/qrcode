import React, { useState } from "react";
import api from "../services/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChangerEmail = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/api/request-email-change", { new_email: email });

      toast.success("Un email de confirmation a été envoyé !");
      navigate("/email-envoi");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        toast.error("Cet email est déjà utilisé.");
      } else {
        toast.error("Une erreur est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Changer mon adresse email
        </h2>

        <input
          type="email"
          placeholder="Nouvel email"
          className="w-full p-3 border rounded-xl mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white p-3 rounded-xl transition ${
            loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Envoi en cours..." : "Envoyer la confirmation"}
        </button>
      </form>
    </div>
  );
};

export default ChangerEmail;
