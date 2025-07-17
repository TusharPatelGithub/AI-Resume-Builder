// src/components/ResumePreview.js
import React from "react";

const ResumePreview = ({ data }) => {
  return (
    <div className="p-4 max-w-xl mx-auto mt-10 bg-gray-100 rounded shadow">
      <h2 className="text-xl font-bold border-b pb-2 mb-4">Live Preview</h2>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Phone:</strong> {data.phone}</p>
      <p><strong>Education:</strong> {data.education}</p>
      <p><strong>Experience:</strong> {data.experience}</p>
      <p><strong>Skills:</strong> {data.skills}</p>
    </div>
  );
};

export default ResumePreview;
