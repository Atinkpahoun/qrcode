import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/Api";
import { toast } from "react-toastify";

const ConfirmerNouvelEmail = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmailChange = async () => {
      try {
        await api.post("/api/confirm-email-change", { token });
        toast.success("Email modifié avec succès. Veuillez vous reconnecter.");
        localStorage.removeItem("token");
        navigate("/connexion");
      } catch (error) {
        console.error(error);
        toast.error("Lien invalide ou expiré.");
        navigate("/connexion");
      }
    };

    if (token) {
      confirmEmailChange();
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
        <h2 className="text-xl font-semibold">Confirmation en cours...</h2>
      </div>
    </div>
  );
};

export default ConfirmerNouvelEmail;
