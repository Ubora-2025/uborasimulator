// API Base URL : récupérée depuis la variable d'environnement ou localhost en dev
const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

// Exemple : envoi des données d'inscription
export async function register(payload) {
  const res = await fetch(`${API_BASE}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`);
  }

  return res.json();
}

// Exemple : récupérer les questions de compréhension orale
export async function getListeningQuestions() {
  const res = await fetch(`${API_BASE}/api/questions/orale`);
  return res.json();
}
