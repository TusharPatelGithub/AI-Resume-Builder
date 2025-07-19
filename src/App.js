import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ResumeForm from "./components/ResumeForm";

// 🔐 ProtectedRoute Component
const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// 🔐 Simple Login Page
const LoginPage = ({ onLogin }) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login to Access Resume Builder</h1>
      <button
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={onLogin}
      >
        Login
      </button>
    </div>
  );
};

// 🔗 Resume Page with Logout Button
const ResumePage = ({ resumeData, handleFormChange }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Form */}
        <div className="md:w-1/2 w-full">
          <ResumeForm onChange={handleFormChange} />
        </div>

        {/* Right: Preview */}
        <div className="md:w-1/2 w-full p-4 bg-white rounded shadow-md break-words overflow-auto max-h-screen">
          <h2 className="text-2xl font-bold mb-2">{resumeData?.header?.name}</h2>
          <p className="text-sm text-gray-600 mb-1">
            {resumeData?.header?.phone} | {resumeData?.header?.email}
          </p>
          <p className="text-sm text-gray-600 mb-2">{resumeData?.header?.location}</p>
          <p className="text-sm text-blue-600 mb-4">
            <a href={resumeData?.header?.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> |{" "}
            <a href={resumeData?.header?.github} target="_blank" rel="noreferrer">GitHub</a>
          </p>

          {resumeData.summary && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Summary</h3>
              <p>{resumeData.summary}</p>
            </div>
          )}

          {resumeData.experienceSummary && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Professional Experience</h3>
              <p className="text-sm">{resumeData.experienceSummary}</p>
            </div>
          )}

          {resumeData.branch === "technical" && resumeData.technicalSkills ? (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Technical Skills</h3>
              <ul className="text-sm list-disc pl-5 space-y-1">
                {resumeData.technicalSkills.programmingLanguages && (
                  <li><strong>Programming Languages:</strong> {resumeData.technicalSkills.programmingLanguages}</li>
                )}
                {resumeData.technicalSkills.webTechnologies && (
                  <li><strong>Web Technologies:</strong> {resumeData.technicalSkills.webTechnologies}</li>
                )}
                {resumeData.technicalSkills.tools && (
                  <li><strong>Tools:</strong> {resumeData.technicalSkills.tools}</li>
                )}
                {resumeData.technicalSkills.databases && (
                  <li><strong>Databases:</strong> {resumeData.technicalSkills.databases}</li>
                )}
              </ul>
            </div>
          ) : resumeData.branch === "non-technical" && resumeData.generalSkills ? (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Skills</h3>
              <p className="text-sm">{resumeData.generalSkills}</p>
            </div>
          ) : null}

          {resumeData.education && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-1">Education</h3>
              <div className="text-sm space-y-2">
                <div>
                  <strong>Class 10:</strong><br />
                  School: {resumeData.education.class10.school}<br />
                  Percentage: {resumeData.education.class10.percentage}
                </div>
                <div>
                  <strong>Class 12:</strong><br />
                  School: {resumeData.education.class12.school}<br />
                  Percentage: {resumeData.education.class12.percentage}
                </div>
                <div>
                  <strong>College (B.Tech):</strong><br />
                  College Name: {resumeData.education.college.name}<br />
                  CPI: {resumeData.education.college.cpi}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 🔧 Main App
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const [resumeData, setResumeData] = useState({
    header: {
      name: '',
      phone: '',
      email: '',
      location: '',
      linkedin: '',
      github: '',
    },
    summary: '',
    branch: '',
    technicalSkills: {
      programmingLanguages: '',
      webTechnologies: '',
      tools: '',
      databases: '',
    },
    generalSkills: '',
    education: {
      class10: { school: '', percentage: '' },
      class12: { school: '', percentage: '' },
      college: { name: '', cpi: '' },
    },
    experienceSummary: '',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        console.log("✅ User logged in:", user.email);
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
        console.log("🔴 User logged out");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleFormChange = (newData) => {
    setResumeData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/resume" : "/login"} />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/resume"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ResumePage resumeData={resumeData} handleFormChange={handleFormChange} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<p className="p-6">404 - Page Not Found</p>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
