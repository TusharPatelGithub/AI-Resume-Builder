import React from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Editor from "./pages/Editor";

export default function App() {
  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
          <Link to="/" className="font-semibold text-xl">AI Resume Builder</Link>
          <nav className="ml-auto flex gap-4">
            <NavLink to="/" className={({isActive}) => isActive ? "text-blue-600" : "text-gray-600"}>Home</NavLink>
            <NavLink to="/editor" className={({isActive}) => isActive ? "text-blue-600" : "text-gray-600"}>Editor</NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </main>
      <footer className="py-8 text-center text-xs text-gray-500">
        Built with React 18, Tailwind, Formik, and @react-pdf/renderer
      </footer>
    </div>
  );
}
