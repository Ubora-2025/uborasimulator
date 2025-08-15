import React from "react";
import { Routes, Route } from "react-router-dom";

// Côté candidat
import Home from "./pages/home";
import Login from "./pages/Login";
import ExpressionEcrite from './pages/ExpressionEcrite'; // Assurez-vous que le chemin d'import est correct;
import WelcomePage from "./pages/WelcomePage"; // Page de bienvenue
import VideoIntro from "./pages/VideoIntro"; // Page vidéo d'introduction
import CompréhensionOraleIntro from "./pages/CompréhensionOraleIntro"; // Page de présentation de l'épreuve orale
import Dashboard from "./pages/Dashboard";
import OralQuizzComponent from "./pages/OralQuizzComponent";
import EcritQuizzComponent from "./pages/EcritQuizzComponent";
import EpreuveManagement from "./pages/admin/EpreuveManagement";

// Admin
import AdminLogin from "./pages/admin/AdminLogin";
import AdminPanel from "./pages/admin/AdminPanel";
import UserManagement from "./pages/admin/UserManagement";
import RequireAdminAuth from "./components/RequireAdminAuth";
import RequireCandidateAuth from "./components/RequireCandidateAuth";

// Page 404
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      {/* ==== CANDIDAT ==== */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/WelcomePage" element={<WelcomePage />} />
       {/* Route pour la vidéo d'introduction après avoir cliqué sur "Passer" */}
      <Route path="/video-intro" element={<VideoIntro />} />
      <Route path="/comprehension-orale-intro" element={<CompréhensionOraleIntro />} />
      <Route
        path="/dashboard"
        element={
          <RequireCandidateAuth>
            <Dashboard />
          </RequireCandidateAuth>
        }
      />
      <Route
        path="/expression-ecrite"
        element={
          <RequireCandidateAuth>
            <ExpressionEcrite />
          </RequireCandidateAuth>
        }
      />
      <Route
        path="/comprehension-orale"
        element={
          <RequireCandidateAuth>
            <OralQuizzComponent />
          </RequireCandidateAuth>
        }
      />
      <Route
        path="/comprehension-écrite"
        element={
          <RequireCandidateAuth>
            <EcritQuizzComponent />
          </RequireCandidateAuth>
        }
      />

      {/* ==== ADMIN ==== */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <RequireAdminAuth>
            <AdminPanel />
          </RequireAdminAuth>
        }
      />
      <Route
        path="/admin/user-management"
        element={
          <RequireAdminAuth>
            <UserManagement />
          </RequireAdminAuth>
        }
      />

      {/* ==== 404 ==== */}
      <Route path="*" element={<NotFound />} />
      <Route
        path="/admin/epreuve-management"
        element={
          <RequireAdminAuth>
            <EpreuveManagement />
          </RequireAdminAuth>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
