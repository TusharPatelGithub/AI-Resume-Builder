import React from "react";

const ResumePreview = ({ formValues }) => {
  if (!formValues) return null;

  const {
    header = {},
    summary = "",
    branch = "",
    skills = [],
    education = [],
    experience = "" // ✅ New field added
  } = formValues;

  return (
    <div className="p-6 border rounded-lg bg-white shadow-md w-full">
      {/* Header Info */}
      {(header.name || header.email || header.phone || header.location) && (
        <div className="mb-4">
          {header.name && <h1 className="text-2xl font-bold">{header.name}</h1>}
          <p className="text-gray-600">
            {[header.email, header.phone, header.location].filter(Boolean).join(" | ")}
          </p>
          <p className="text-gray-600">
            {header.linkedin && (
              <a
                href={header.linkedin}
                target="_blank"
                rel="noreferrer"
                className="mr-2 text-blue-600 underline"
              >
                LinkedIn
              </a>
            )}
            {header.github && (
              <a
                href={header.github}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                GitHub
              </a>
            )}
          </p>
        </div>
      )}

      {/* Branch Section */}
      {branch && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Branch</h2>
          <p>{branch}</p>
        </div>
      )}

      {/* Summary Section */}
      {summary && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Summary</h2>
          <p>{summary}</p>
        </div>
      )}

      {/* Skills Section */}
      {Array.isArray(skills) && skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Skills</h2>
          <ul className="list-disc list-inside">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ✅ Professional Experience Section */}
      {experience && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Professional Experience</h2>
          <p>{experience}</p>
        </div>
      )}

      {/* Education Section */}
      {Array.isArray(education) && education.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-2">
              <p className="font-medium">{edu.degree}</p>
              <p className="text-sm text-gray-600">{edu.institution}</p>
              <p className="text-sm text-gray-600">{edu.year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumePreview;