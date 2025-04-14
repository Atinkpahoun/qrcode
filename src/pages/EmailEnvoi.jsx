import React from "react";

const EmailEnvoi = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Vérification requise</h2>
        <p className="text-gray-700">
          Un email de confirmation a été envoyé à votre nouvelle adresse. <br />
          Veuillez cliquer sur le lien dans l’email pour finaliser le changement.
        </p>
      </div>
    </div>
  );
};

export default EmailEnvoi;
