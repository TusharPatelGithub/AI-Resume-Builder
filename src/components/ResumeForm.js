import React, { useState } from "react";

const ResumeForm = ({ onChange }) => {
  const [header, setHeader] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
    linkedin: "",
    github: "",
  });
  const [education, setEducation] = useState({
  class10: { school: "", percentage: "" },
  class12: { school: "", percentage: "" },
  college: { name: "", cpi: "" },
});
const [summary, setSummary] = useState("");
const [technicalSkills, setTechnicalSkills] = useState({
    programmingLanguages: "",
    webTechnologies: "",
    tools: "",
    databases: "",
  });
  const [generalSkills, setGeneralSkills] = useState("");
  
  const [branch, setBranch] = useState("");

const handleBranchChange = (e) => {
  const value = e.target.value;
  setBranch(value);
  onChange({
    header,
    summary,
    technicalSkills,
    education,
    branch: value,
    generalSkills,
  });
};

const handleGeneralSkillsChange = (e) => {
  const value = e.target.value;
  setGeneralSkills(value);
  onChange({
    header,
    summary,
    technicalSkills,
    education,
    branch,
    generalSkills: value,
  });
};

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...header, [name]: value };
    setHeader(updated);
    onChange({ header: updated, summary, technicalSkills });
  };
  const handleEducationChange = (e, section, field) => {
  const value = e.target.value;
  const updated = {
    ...education,
    [section]: {
      ...education[section],
      [field]: value,
    },
  };
  setEducation(updated);
  onChange({
    header,
    summary,
    technicalSkills,
    education: updated,
  });
};


  const handleSummaryChange = (e) => {
    const value = e.target.value;
    setSummary(value);
    onChange({ header, summary: value, technicalSkills });
  };

  const handleSkillsChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...technicalSkills, [name]: value };
    setTechnicalSkills(updated);
    onChange({ header, summary, technicalSkills: updated });
  };

  return (
    <div className="p-4 space-y-6 bg-white rounded shadow-md max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold">Resume Builder</h2>

      {/* Header Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Header Information</h3>

        {["name", "location", "phone", "email", "linkedin", "github"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={`Enter your ${field}`}
            value={header[field]}
            onChange={handleHeaderChange}
            className="border p-2 rounded w-full"
          />
        ))}
      </div>

      {/* Summary Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mt-6">Summary</h3>
        <textarea
          name="summary"
          placeholder="Write your professional summary..."
          value={summary}
          onChange={handleSummaryChange}
          rows={5}
          className="border p-2 rounded w-full resize-none"
        />
      </div>
      {/* Branch Selector */}
<div className="space-y-4">
  <h3 className="text-xl font-semibold mt-6">Select Branch</h3>
  <select
    name="branch"
    value={branch}
    onChange={handleBranchChange}
    className="border p-2 rounded w-full"
  >
    <option value="">-- Select Branch --</option>
    <option value="it">IT</option>
    <option value="core">Core</option>
    <option value="non-tech">Non-Tech</option>
  </select>
</div>
    {/* Skills Section */}
{(branch === "it" || branch === "core") ? (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold mt-6">Technical Skills</h3>

    <input
      type="text"
      name="programmingLanguages"
      placeholder="e.g. Java, JavaScript, C"
      value={technicalSkills.programmingLanguages}
      onChange={handleSkillsChange}
      className="border p-2 rounded w-full"
    />

    <input
      type="text"
      name="webTechnologies"
      placeholder="e.g. HTML, CSS"
      value={technicalSkills.webTechnologies}
      onChange={handleSkillsChange}
      className="border p-2 rounded w-full"
    />

    <input
      type="text"
      name="tools"
      placeholder="e.g. Git, Postman, VS Code"
      value={technicalSkills.tools}
      onChange={handleSkillsChange}
      className="border p-2 rounded w-full"
    />

    <input
      type="text"
      name="databases"
      placeholder="e.g. MongoDB, MySQL"
      value={technicalSkills.databases}
      onChange={handleSkillsChange}
      className="border p-2 rounded w-full"
    />
  </div>
) : branch === "non-tech" ? (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold mt-6">General Skills</h3>
    <input
      type="text"
      name="generalSkills"
      placeholder="e.g. Teamwork, Communication"
      value={generalSkills}
      onChange={handleGeneralSkillsChange}
      className="border p-2 rounded w-full"
    />
  </div>
) : null}


      {/* Education Section */}
<div className="space-y-4">
  <h3 className="text-xl font-semibold mt-6">Education</h3>

  {/* Class 10 */}
  <div>
    <h4 className="font-semibold">Class 10</h4>
    <input
      type="text"
      placeholder="School Name"
      value={education.class10.school}
      onChange={(e) => handleEducationChange(e, "class10", "school")}
      className="border p-2 rounded w-full mt-2"
    />
    <input
      type="text"
      placeholder="Percentage"
      value={education.class10.percentage}
      onChange={(e) => handleEducationChange(e, "class10", "percentage")}
      className="border p-2 rounded w-full mt-2"
    />
  </div>

  {/* Class 12 */}
  <div>
    <h4 className="font-semibold mt-4">Class 12</h4>
    <input
      type="text"
      placeholder="School Name"
      value={education.class12.school}
      onChange={(e) => handleEducationChange(e, "class12", "school")}
      className="border p-2 rounded w-full mt-2"
    />
    <input
      type="text"
      placeholder="Percentage"
      value={education.class12.percentage}
      onChange={(e) => handleEducationChange(e, "class12", "percentage")}
      className="border p-2 rounded w-full mt-2"
    />
  </div>

  {/* College */}
  <div>
    <h4 className="font-semibold mt-4">College (B.Tech)</h4>
    <input
      type="text"
      placeholder="College Name"
      value={education.college.name}
      onChange={(e) => handleEducationChange(e, "college", "name")}
      className="border p-2 rounded w-full mt-2"
    />
    <input
      type="text"
      placeholder="CPI"
      value={education.college.cpi}
      onChange={(e) => handleEducationChange(e, "college", "cpi")}
      className="border p-2 rounded w-full mt-2"
    />
  </div>
</div>
    </div>
  );
};

export default ResumeForm;
