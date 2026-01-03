import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { PersonalityProvider } from "./context/PersonalityStore";

import CareerCounseling from "./pages/CareerCounseling";
import PersonalizedTherapy from "./pages/PersonalizedTherapy";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage.jsx";
import ResultPage from "./pages/ResultPage";
import ProfilePage from "./pages/ProfilePage";
import TherapySession from "./pages/TherapySession";
import ProtectedRoute from "./components/ProtectedRoute";
import CareerPlan from "./pages/CareerPlan";          // ✅ ADDED
import RoadmapResult from "./pages/RoadmapResult";    // ✅ ADDED
import SelfReflection from "./pages/SelfReflection";

export default function App() {
  const location = useLocation();

  const hideFooterRoutes = ["/therapy-session"];
  const hideNavbarRoutes = ["/therapy-session"];

  return (
    <PersonalityProvider>
      <div
        className={`min-h-screen flex flex-col ${
          hideFooterRoutes.includes(location.pathname)
            ? "bg-[#1F1518] text-white"
            : "bg-gray-50 text-gray-800"
        }`}
      >
        {/* ✅ Navbar ONLY when allowed */}
        {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/career/plan" element={<CareerPlan />} />
            <Route path="/roadmap-result" element={<RoadmapResult />} />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
              <Route path="/self-reflection" element={<SelfReflection />} />
            <Route path="/career-counseling" element={<CareerCounseling />} />
            <Route path="/personalized-therapy" element={<PersonalizedTherapy />} />
            <Route path="/therapy-session" element={<TherapySession />} />
          </Routes>
        </main>

        {/* ✅ Footer ONLY when allowed */}
        {!hideFooterRoutes.includes(location.pathname) && <Footer />}
      </div>
    </PersonalityProvider>
  );
}

