import React from 'react';
import { Link } from 'react-router-dom';

const MailSent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md text-center">
        <div className="text-4xl mb-4">📩</div>
        <h2 className="text-2xl font-bold mb-2">Vérifiez votre boîte mail</h2>
        <p className="text-gray-600 mb-6">
          Nous avons envoyé un lien de réinitialisation de mot de passe à votre adresse email.
        </p>
        <Link
          to="/connexion"
          className="text-blue-600 hover:underline font-medium"
        >
          Retour à la connexion
        </Link>
      </div>
    </div>
  );
};

export default MailSent;
