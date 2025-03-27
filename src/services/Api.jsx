import API_URL from "../config";

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des utilisateurs");
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur API :", error);
    return null;
  }
};