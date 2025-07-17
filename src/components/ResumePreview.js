// src/components/ResumePreview.js
import React from "react";

const ResumePreview = ({ data }) => {
  return (
    <div className="p-4 max-w-xl mx-auto mt-10 bg-gray-100 rounded shadow">
      <h2 className="text-xl font-bold border-b pb-2 mb-4">Live Preview</h2>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Phone:</strong> {data.phone}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Location:</strong>{data.Location}</p>
      <p><strong>Summary:</strong>{data.Summary}</p>
      <p><strong>Skills:</strong> {data.skills}</p>
      <p><strong>Education:</strong> {data.education}</p>
      <p><strong>Projects:</strong> {data.Projects}</p>
      <p><strong>Experience:</strong> {data.experience}</p>
      <p><strong>Certifications:</strong>{data.certifications}</p>
    </div>
  );
};

export default ResumePreview;
