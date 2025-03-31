// src/components/Profile/UserInfo.jsx
import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const UserInfo = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!user) {
    return <p>Vous n'êtes pas connecté.</p>;
  }

  return (
    <div>
      <p><strong>Nom :</strong> {user.lastname}</p>
      <p><strong>Prénom :</strong> {user.name}</p>
      <p><strong>Email :</strong> {user.email}</p>
    </div>
  );
};

export default UserInfo;