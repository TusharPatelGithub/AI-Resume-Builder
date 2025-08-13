import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="grid place-items-center py-16">
      <div className="max-w-2xl text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Craft a job‑ready resume in minutes
        </h1>
        <p className="mt-3 text-gray-600">
          Enter your info, preview live, and export a polished PDF. All in your browser.
        </p>
        <div className="mt-6 flex justify-center">
          <Link to="/editor" className="rounded-2xl border px-5 py-2.5 font-medium hover:bg-gray-50">
            Open the Editor
          </Link>
        </div>
      </div>
    </section>
  );
}
