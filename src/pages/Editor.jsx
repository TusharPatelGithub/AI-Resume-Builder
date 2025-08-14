import React, { useState } from "react";
import { useFormik } from "formik";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumeDocument from "../pdf/ResumeDocument";

export default function Editor() {
  const [loadingAI, setLoadingAI] = useState(false);
  const formik = useFormik({
    initialValues: {
      fullName: "Tushar Patel",
      email: "",
      phone: "",
      headline: "",
      skills: "JavaScript, React, HTML, CSS",
      achievements: "",
      education: { degree: "B.Tech", branch: "CSE/IT", college: "" },
      experienceText: "",
      summary:
        "Entry-level developer targeting Software/Frontend Developer with 0–1 years of hands-on practice and project work.",
      school10: { name: "francis", years: "2019 – 2020" },
      school12: { name: "francis", years: "2020 – 2021" },
      projects: [{ title: "AI Resume Builder" }],
    },
    onSubmit: () => {},
  });

  const v = formik.values;

  async function handleSuggestSummary() {
    try {
      setLoadingAI(true);
      const formData = {
        fullName: v.fullName,
        currentRole: v.headline || "CSE student",
        targetRole: "Frontend Developer",
        yearsOfExperience: "0-1",
        skills: v.skills.split(",").map(s => s.trim()).filter(Boolean),
        projects: v.projects,
        achievements: v.achievements,
        education: {
          degree: v.education.degree,
          branch: v.education.branch,
          college: v.education.college,
        },
        experienceText: v.experienceText,
        summary: v.summary,
      };

      const resp = await fetch("http://localhost:5050/api/suggest-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });

      const data = await resp.json();
      if (!resp.ok) {
        console.error("AI error:", data);
        alert(
          data?.detail?.error?.message ||
            data?.error ||
            "OpenAI request failed. Check server logs."
        );
        return;
      }

      formik.setFieldValue("summary", data.summary || "");
    } catch (e) {
      console.error(e);
      alert("Could not reach backend. Is the server on :5050?");
    } finally {
      setLoadingAI(false);
    }
  }

  // helper to update nested fields
  const set = (path) => (e) => formik.setFieldValue(path, e.target.value);

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-6">
      {/* LEFT: FORM */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            className="mt-1 w-full border rounded px-3 py-2"
            value={v.fullName}
            onChange={set("fullName")}
            placeholder="Your name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              className="mt-1 w-full border rounded px-3 py-2"
              value={v.email}
              onChange={set("email")}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              className="mt-1 w-full border rounded px-3 py-2"
              value={v.phone}
              onChange={set("phone")}
              placeholder="1234567890"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Headline / Current Role</label>
          <input
            className="mt-1 w-full border rounded px-3 py-2"
            value={v.headline}
            onChange={set("headline")}
            placeholder="CSE student • Web dev enthusiast"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Skills (comma separated)</label>
          <input
            className="mt-1 w-full border rounded px-3 py-2"
            value={v.skills}
            onChange={set("skills")}
            placeholder="JavaScript, React, HTML, CSS"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Achievements</label>
          <textarea
            className="mt-1 w-full border rounded px-3 py-2"
            rows={2}
            value={v.achievements}
            onChange={set("achievements")}
            placeholder="Solved 300+ DSA, hackathon finalist, etc."
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium">Degree</label>
            <input
              className="mt-1 w-full border rounded px-3 py-2"
              value={v.education.degree}
              onChange={(e) =>
                formik.setFieldValue("education.degree", e.target.value)
              }
              placeholder="B.Tech"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Branch</label>
            <input
              className="mt-1 w-full border rounded px-3 py-2"
              value={v.education.branch}
              onChange={(e) =>
                formik.setFieldValue("education.branch", e.target.value)
              }
              placeholder="CSE"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">College</label>
            <input
              className="mt-1 w-full border rounded px-3 py-2"
              value={v.education.college || ""}
              onChange={(e) =>
                formik.setFieldValue("education.college", e.target.value)
              }
              placeholder="GLA University"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Experience (free text)</label>
          <textarea
            className="mt-1 w-full border rounded px-3 py-2"
            rows={3}
            value={v.experienceText}
            onChange={set("experienceText")}
            placeholder="Internships, freelance, responsibilities, outcomes…"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSuggestSummary}
            disabled={loadingAI}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded disabled:opacity-60"
          >
            {loadingAI ? "Thinking…" : "Suggest Summary (AI)"}
          </button>

          {/* OPTIONAL: a submit if you later save to Firebase */}
          <button
            type="button"
            onClick={() => alert("No save target wired. Preview updates live.")}
            className="border px-4 py-2 rounded"
          >
            Save (optional)
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium">Professional Summary</label>
          <textarea
            className="mt-1 w-full border rounded px-3 py-2"
            rows={4}
            value={v.summary}
            onChange={set("summary")}
            placeholder="AI will fill this or edit manually…"
          />
        </div>
      </div>

      {/* RIGHT: LIVE PREVIEW + DOWNLOAD */}
      <div className="border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-2">Live Preview</h2>
        <div className="text-lg font-medium">{v.fullName || "Your Name"}</div>
        <div className="text-sm text-gray-600">
          {v.email || "you@example.com"} • {v.phone || "0000000000"}
        </div>

        <p className="mt-4">{v.headline || "Add your headline/current role…"}</p>

        <h3 className="mt-6 font-semibold">Skills</h3>
        <ul className="list-disc ml-5">
          {v.skills
            .split(",")
            .map(s => s.trim())
            .filter(Boolean)
            .map((s, i) => (
              <li key={i}>{s}</li>
            ))}
        </ul>

        <h3 className="mt-6 font-semibold">Education</h3>
        <ul className="ml-5">
          <li>
            10 — {v.school10.name || "School"}{" "}
            <span className="text-gray-600">({v.school10.years})</span>
          </li>
          <li>
            12 — {v.school12.name || "School"}{" "}
            <span className="text-gray-600">({v.school12.years})</span>
          </li>
          <li>
            {v.education.degree} — {v.education.branch}{" "}
            {v.education.college ? `@ ${v.education.college}` : ""}
          </li>
        </ul>

        <h3 className="mt-6 font-semibold">Projects</h3>
        <ul className="list-disc ml-5">
          {(v.projects || []).map((p, i) => (
            <li key={i}>{p.title}</li>
          ))}
        </ul>

        <h3 className="mt-6 font-semibold">Professional Summary</h3>
        <p className="whitespace-pre-wrap">{v.summary}</p>

        {/* DOWNLOAD AS PDF BUTTON */}
        <div className="mt-6">
          <PDFDownloadLink
            document={<ResumeDocument data={v} />}
            fileName="resume.pdf"
          >
            {({ loading }) => (
              <button
                type="button"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
                disabled={loading}
              >
                {loading ? "Preparing PDF…" : "Download as PDF"}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
}
