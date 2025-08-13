import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumeDocument from "../pdf/ResumeDocument";

export default function ResumePreview({ data }) {
  return (
    <div className="sticky top-20">
      <div className="rounded-2xl border bg-white p-4">
        <h2 className="text-lg font-semibold mb-3">Live Preview</h2>
        <div className="prose max-w-none">
          <h1 className="m-0">{data.basics.fullName || "Your Name"}</h1>
          <p className="m-0 text-sm text-gray-600">
            {data.basics.email} {data.basics.phone ? "• " + data.basics.phone : ""} {data.basics.location ? "• " + data.basics.location : ""}
          </p>
          {data.basics.summary && <p className="mt-3">{data.basics.summary}</p>}

          {data.skills?.length > 0 && (
            <section>
              <h3>Skills</h3>
              <ul className="columns-2 list-disc pl-6">
                {data.skills.filter(Boolean).map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </section>
          )}

          {Array.isArray(data.experience) && data.experience.filter(e => e.company || e.role).length > 0 && (
            <section>
              <h3>Experience</h3>
              {data.experience.map((e, i) => (
                <div key={i} className="mb-3">
                  <div className="font-medium">{e.role} {e.company && <span className="text-gray-600">— {e.company}</span>}</div>
                  <div className="text-sm text-gray-600">{[e.start, e.end].filter(Boolean).join(" – ")}</div>
                  {e.details && <p className="m-0">{e.details}</p>}
                </div>
              ))}
            </section>
          )}

          {Array.isArray(data.education) && data.education.filter(ed => ed.school || ed.degree).length > 0 && (
            <section>
              <h3>Education</h3>
              {data.education.map((ed, i) => (
                <div key={i} className="mb-2">
                  <div className="font-medium">{ed.degree} {ed.school && <span className="text-gray-600">— {ed.school}</span>}</div>
                  <div className="text-sm text-gray-600">{[ed.start, ed.end].filter(Boolean).join(" – ")}</div>
                </div>
              ))}
            </section>
          )}

          {Array.isArray(data.projects) && data.projects.filter(p => p.name).length > 0 && (
            <section>
              <h3>Projects</h3>
              {data.projects.map((p, i) => (
                <div key={i} className="mb-2">
                  <div className="font-medium">{p.name} {p.link && <a href={p.link} className="text-blue-600 underline">({p.link})</a>}</div>
                  {p.details && <p className="m-0">{p.details}</p>}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>

      <PDFDownloadLink
        document={<ResumeDocument data={data} />}
        fileName={(data.basics.fullName || "resume").replace(/\s+/g, "_") + ".pdf"}
      >
        {({ loading }) => (
          <button className="btn-primary mt-4 w-full">
            {loading ? "Generating PDF..." : "Download PDF"}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
}
