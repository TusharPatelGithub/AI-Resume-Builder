import React, { useState } from "react";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";

function App() {
  const [resumeData, setResumeData] = useState({});

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <ResumeForm onChange={setResumeData} />
      <ResumePreview data={resumeData} />
    </div>
  );
}

export default App;
