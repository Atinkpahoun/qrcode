import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const EmailCheck = () => {
  const { state } = useLocation();
  const [resending, setResending] = useState(false);
  const email = state?.email;

  const resendVerificationEmail = async () => {
    if (!email) return;

    setResending(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/email/resend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success("Email de vérification renvoyé !");
      } else {
        toast.error("Échec de l'envoi du mail.");
      }
    } catch (error) {
      toast.error("Erreur lors de la requête.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col text-center px-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Vérification Email</h1>
      <p className="text-lg max-w-md mb-4">
        Veuillez consulter vos messages emails afin de confirmer votre adresse email.
        Une fois confirmé, vous pourrez vous connecter.
      </p>

      {email && (
        <button
          onClick={resendVerificationEmail}
          disabled={resending}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          {resending ? "Renvoi en cours..." : "Renvoyer l'email de vérification"}
        </button>
      )}
    </div>
  );
};

export default EmailCheck;
