import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";

const ResumeForm = ({ onChange }) => {
  const [summary, setSummary] = useState("");
  const [branch, setBranch] = useState("");
  const [generalSkills, setGeneralSkills] = useState("");
  const [experienceSummary, setExperienceSummary] = useState("");

  const [technicalSkills, setTechnicalSkills] = useState({
    programmingLanguages: "",
    webTechnologies: "",
    tools: "",
    databases: "",
  });

  const [education, setEducation] = useState({
    class10: { school: "", percentage: "" },
    class12: { school: "", percentage: "" },
    college: { name: "", cpi: "" },
  });

  const formik = useFormik({
    initialValues: {
      header: {
        name: "",
        location: "",
        phone: "",
        email: "",
        linkedin: "",
        github: "",
      },
      branch: "",
    },
    validationSchema: Yup.object({
      header: Yup.object({
        name: Yup.string().required("Name is required"),
        location: Yup.string().required("Location is required"),
        phone: Yup.string().required("Phone is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        linkedin: Yup.string().url("Invalid URL").required("LinkedIn is required"),
        github: Yup.string().url("Invalid URL").required("GitHub is required"),
      }),
      branch: Yup.string().required("Please select your branch"),
    }),
    onSubmit: (values) => {
      const fullData = {
        ...values,
        summary,
        branch,
        generalSkills,
        technicalSkills,
        education,
        experienceSummary,
      };
      console.log("Form submitted:", fullData);
      onChange(fullData);
    },
  });

  useEffect(() => {
    const fullData = {
      ...formik.values,
      summary,
      branch,
      generalSkills,
      technicalSkills,
      education,
      experienceSummary,
    };
    onChange(fullData);
  }, [formik.values, summary, branch, generalSkills, technicalSkills, education, experienceSummary, onChange]);

  const handleEducationChange = (e, section, field) => {
    const updated = { ...education };
    updated[section][field] = e.target.value;
    setEducation(updated);
  };

  const handleTechnicalSkillsChange = (e, field) => {
    const updated = { ...technicalSkills };
    updated[field] = e.target.value;
    setTechnicalSkills(updated);
  };

  const handleGeneralSkillsChange = (e) => {
    setGeneralSkills(e.target.value);
  };

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
    formik.setFieldValue("branch", e.target.value);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="p-4 space-y-6 bg-white rounded shadow-md max-w-xl mx-auto mt-10"
    >
      <h2 className="text-lg font-semibold">Header Section</h2>
      <div className="grid grid-cols-2 gap-4">
        {["name", "location", "phone", "email", "linkedin", "github"].map((field) => (
          <input
            key={field}
            name={`header.${field}`}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formik.values.header[field]}
            onChange={formik.handleChange}
            className="border p-2 rounded"
          />
        ))}
      </div>

      <h2 className="text-lg font-semibold">Select Branch</h2>
      <select
        name="branch"
        value={branch}
        onChange={handleBranchChange}
        className="border p-2 rounded w-full"
      >
        <option value="">Select your branch</option>
        <option value="technical">Technical</option>
        <option value="non-technical">Non-Technical</option>
      </select>

      <h2 className="text-lg font-semibold">Summary</h2>
      <textarea
        placeholder="Professional Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <h2 className="text-lg font-semibold">Professional Experience</h2>
      <textarea
        placeholder="Professional Experience (Optional)"
        value={experienceSummary}
        onChange={(e) => setExperienceSummary(e.target.value)}
        className="border p-2 rounded w-full"
      />

      {branch === "technical" ? (
        <>
          <h2 className="text-lg font-semibold">Technical Skills</h2>
          {Object.keys(technicalSkills).map((field) => (
            <input
              key={field}
              placeholder={field}
              value={technicalSkills[field]}
              onChange={(e) => handleTechnicalSkillsChange(e, field)}
              className="border p-2 rounded w-full mb-2"
            />
          ))}
        </>
      ) : branch === "non-technical" ? (
        <>
          <h2 className="text-lg font-semibold">General Skills</h2>
          <textarea
            placeholder="General Skills"
            value={generalSkills}
            onChange={handleGeneralSkillsChange}
            className="border p-2 rounded w-full"
          />
        </>
      ) : null}

      <h2 className="text-lg font-semibold">Education</h2>
      <input
        placeholder="Class 10 School"
        value={education.class10.school}
        onChange={(e) => handleEducationChange(e, "class10", "school")}
        className="border p-2 rounded w-full"
      />
      <input
        placeholder="Class 10 Percentage"
        value={education.class10.percentage}
        onChange={(e) => handleEducationChange(e, "class10", "percentage")}
        className="border p-2 rounded w-full"
      />
      <input
        placeholder="Class 12 School"
        value={education.class12.school}
        onChange={(e) => handleEducationChange(e, "class12", "school")}
        className="border p-2 rounded w-full"
      />
      <input
        placeholder="Class 12 Percentage"
        value={education.class12.percentage}
        onChange={(e) => handleEducationChange(e, "class12", "percentage")}
        className="border p-2 rounded w-full"
      />
      <input
        placeholder="College Name"
        value={education.college.name}
        onChange={(e) => handleEducationChange(e, "college", "name")}
        className="border p-2 rounded w-full"
      />
      <input
        placeholder="College CPI"
        value={education.college.cpi}
        onChange={(e) => handleEducationChange(e, "college", "cpi")}
        className="border p-2 rounded w-full"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default ResumeForm;
