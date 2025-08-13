import React from "react";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import useStorage from "../utils/storage";

export default function Editor() {
  const [data, setData] = useStorage("resume-data", {
    basics: { fullName: "", email: "", phone: "", location: "", summary: "" },
    skills: [""],
    experience: [{ company: "", role: "", start: "", end: "", details: "" }],
    education: [{ school: "", degree: "", start: "", end: "" }],
    projects: [{ name: "", link: "", details: "" }],
  });

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <ResumeForm data={data} onChange={setData} />
      </div>
      <div className="">
        <ResumePreview data={data} />
      </div>
    </div>
  );
}
