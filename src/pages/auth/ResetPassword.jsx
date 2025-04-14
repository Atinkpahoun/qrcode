import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  // const { token } = useParams();
  // const location = useLocation();
  const navigate = useNavigate();

  // const query = new URLSearchParams(location.search);
  // const email = query.get('email');

  console.log("Token :", token);
  console.log("Email :", email);

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.228:8000/api/reset-password', {
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
          className="bg-blue-600 text-white w-full py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Réinitialiser
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
