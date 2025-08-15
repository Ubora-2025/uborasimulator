// src/hooks/useCandidatSujets.js
import { useState, useEffect } from "react";
import axios from "axios";

export default function useCandidatSujets() {
  const [sujets, setSujets] = useState({
    expression: null,
    orale: null,
    ecrite: null,
  });

  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const fetchSujets = async () => {
      const token = localStorage.getItem("candidateToken");

      try {
        const res = await axios.get("/api/sujets/candidat", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSujets({
          expression: res.data.expression,
          orale: res.data.orale,
          ecrite: res.data.ecrite,
        });

        setLoading(false);
      } catch (err) {
        setErreur("Erreur lors du chargement des sujets.");
        setLoading(false);
      }
    };

    fetchSujets();
  }, []);

  return { sujets, loading, erreur };
}
