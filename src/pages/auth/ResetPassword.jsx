import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifie la longueur
    if (password.length < 8 || passwordConfirmation.length < 8) {
      toast.error("Les mots de passe doivent contenir au moins 8 caractères.");
      return;
    }

    // Vérifie la correspondance
    if (password !== passwordConfirmation) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsLoading(true); // Active le loader

    try {
      await axios.post('http://192.168.1.228:8000/api/reset-password', {
        email,
        token,
        password,
        password_confirmation: passwordConfirmation,
      });

      toast.success("Mot de passe modifié avec succès !");
      navigate('/connexion');
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue.");
    } finally {
      setIsLoading(false); // Désactive le loader
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Nouveau mot de passe</h2>

        <input
          type="password"
          placeholder="Nouveau mot de passe"
          className="w-full p-3 border rounded-xl mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          className="w-full p-3 border rounded-xl mb-6"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-3 rounded-xl hover:bg-blue-700 transition flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          ) : (
            'Réinitialiser'
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
