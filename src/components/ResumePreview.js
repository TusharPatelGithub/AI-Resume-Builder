import React, { useState } from "react";
import ResumeForm from "./components/ResumeForm";

const App = () => {
  const [resumeData, setResumeData] = useState({});

  const handleFormChange = (newData) => {
    setResumeData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Form */}
        <div className="md:w-1/2 w-full">
          <ResumeForm onChange={handleFormChange} />
        </div>

        {/* Right: Preview */}
        <div className="md:w-1/2 w-full p-4 bg-white rounded shadow-md">
          {/* Header */}
          <h2 className="text-2xl font-bold mb-2">{resumeData?.header?.name}</h2>
          <p className="text-sm text-gray-600 mb-1">
            {resumeData?.header?.phone} | {resumeData?.header?.email}
          </p>
          <p className="text-sm text-gray-600 mb-2">{resumeData?.header?.location}</p>
          <p className="text-sm text-blue-600 mb-4">
            <a href={resumeData?.header?.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>{" "}|
            <a href={resumeData?.header?.github} target="_blank" rel="noreferrer" className="ml-1">GitHub</a>
          </p>

          {/* Summary */}
          {resumeData.summary && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Summary</h3>
              <p>{resumeData.summary}</p>
            </div>
          )}

          {/* Education */}
          {resumeData.education && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Education</h3>
              <ul className="text-sm list-disc pl-5 space-y-1">
                <li><strong>Class 10:</strong> {resumeData.education.class10.school} ({resumeData.education.class10.percentage}%)</li>
                <li><strong>Class 12:</strong> {resumeData.education.class12.school} ({resumeData.education.class12.percentage}%)</li>
                <li><strong>College:</strong> {resumeData.education.college.name} (CPI: {resumeData.education.college.cpi})</li>
              </ul>
            </div>
          )}

          {/* Skills */}
          {resumeData.branch === "it" || resumeData.branch === "core" ? (
            resumeData.technicalSkills && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Technical Skills</h3>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li><strong>Programming Languages:</strong> {resumeData.technicalSkills.programmingLanguages}</li>
                  <li><strong>Web Technologies:</strong> {resumeData.technicalSkills.webTechnologies}</li>
                  <li><strong>Tools:</strong> {resumeData.technicalSkills.tools}</li>
                  <li><strong>Databases:</strong> {resumeData.technicalSkills.databases}</li>
                </ul>
              </div>
            )
          ) : resumeData.branch === "non-tech" ? (
            resumeData.generalSkills && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">General Skills</h3>
                <p className="text-sm">{resumeData.generalSkills}</p>
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default App;
