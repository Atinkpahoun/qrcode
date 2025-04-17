import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { FaQrcode } from "react-icons/fa";

const Connexion = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false); // Ajouté
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const verified = params.get("verified");
    const emailChanged = params.get("success") === "email-change";

    if (verified === "1") {
      toast.success("Email confirmé, vous pouvez vous connecter à présent", { autoClose: 5000 });
    }

    if (emailChanged) {
      toast.success("Email modifié avec succès ! Veuillez vous reconnecter.");
    }

    if (verified || emailChanged) {
      window.history.replaceState(null, "", location.pathname);
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Lancer le loader

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const rawResponse = await response.text();
      console.log("Réponse brute :", rawResponse);

      let data;
      try {
        data = JSON.parse(rawResponse);
      } catch (error) {
        console.error("Réponse invalide (pas du JSON) :", rawResponse);
        toast.error("Réponse serveur invalide (HTML reçu ?)");
        return;
      }

      if (response.ok) {
        localStorage.setItem("token", data.access_token);
        toast.success("Connexion réussie", { autoClose: 5000 });
        navigate("/");
      } else if (response.status === 403 && data.unverified) {
        toast.warn("Veuillez vérifier votre adresse email.");
        navigate("/email-check", { state: { email: data.email } });
      } else {
        toast.error(data.message || "Erreur de connexion");
      }
    } catch (error) {
      console.error("Erreur : ", error);
      toast.error("Une erreur est survenue pendant la connexion.");
    } finally {
      setIsLoading(false); // Stopper le loader
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="border-[#0000FF] border-2 flex w-full xl:w-1/2 rounded-lg doto">
        <div className="w-0 xl:w-1/2 bg-blue-50 hidden xl:flex items-center justify-center gap-x-1">
          <FaQrcode size={37} color="blue" />
          <h1 className="font-bold text-[#0000FF] text-5xl">QREasy</h1>
        </div>

        <form className="flex flex-col items-center w-full xl:w-1/2 py-3 xl:py-6" onSubmit={handleSubmit}>
          <h1 className="text-[#0000FF] text-xl lg:text-3xl font-bold pb-6">
            Connectez-vous
          </h1>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border-[#0000FF] border p-2 rounded-md w-64 md:w-80 mb-2"
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
            className="border-[#0000FF] border p-2 rounded-md w-64 md:w-80 mb-2"
          />

          <button
            className="bg-[#0000FF] text-white font-bold px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 focus:outline-none focus:shadow-outline flex items-center justify-center w-64 md:w-80 h-11"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              "Se connecter"
            )}
          </button>

          <div style={{ marginTop: '10px' }}>
            <span>Mot de passe oublié ? </span>
            <button
              type="button"
              onClick={() => navigate('/mot-de-passe-oublie')}
              style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
            >
              Réinitialiser
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Connexion;
