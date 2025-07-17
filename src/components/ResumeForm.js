// src/components/ResumeForm.js
import React, { useState } from "react";

const ResumeForm = ({ onChange }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    Location:"",
    Summary:"",
    skills: "",
    education: "",
    Projects:"",
    experience: "",
    certifications:"",
 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    onChange(updatedFormData); 
  };

  return (
    <div className="p-4 space-y-4 bg-white rounded shadow-md max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold">Resume Builder</h2>
      {Object.keys(formData).map((field) => (
        <div key={field} className="flex flex-col">
          <label className="capitalize font-medium mb-1">{field}</label>
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            placeholder={`Enter your ${field}`}
          />
        </div>
      ))}
    </div>
  );
};

export default ResumeForm;
