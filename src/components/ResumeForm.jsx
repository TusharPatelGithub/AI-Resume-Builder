import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  basics: Yup.object({
    fullName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string().required("Required"),
    location: Yup.string(),
    summary: Yup.string(),
  }),
  skills: Yup.array().of(Yup.string().trim()).min(1, "Add at least one skill"),
  experience: Yup.array().of(
    Yup.object({
      company: Yup.string().required("Required"),
      role: Yup.string().required("Required"),
      start: Yup.string().required("Required"),
      end: Yup.string(),
      details: Yup.string(),
    })
  ),
  education: Yup.array().of(
    Yup.object({
      school: Yup.string().required("Required"),
      degree: Yup.string().required("Required"),
      start: Yup.string().required("Required"),
      end: Yup.string().required("Required"),
    })
  ),
  projects: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Required"),
      link: Yup.string().url("Invalid URL").nullable(),
      details: Yup.string(),
    })
  ),
});

export default function ResumeForm({ data, onChange }) {
  return (
    <Formik
      enableReinitialize
      initialValues={data}
      validationSchema={Schema}
      onSubmit={() => {}}
    >
      {({ values, errors, touched }) => (
        <Form className="space-y-6">
          <section className="rounded-2xl border bg-white p-4">
            <h2 className="text-lg font-semibold">Basics</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <L id="basics.fullName" label="Full name" />
              <L id="basics.email" label="Email" />
              <L id="basics.phone" label="Phone" />
              <L id="basics.location" label="Location" />
              <L id="basics.summary" label="Summary" as="textarea" className="sm:col-span-2" />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-4">
            <h2 className="text-lg font-semibold">Skills</h2>
            <FieldArray name="skills">
              {({ remove, push }) => (
                <div className="mt-3 space-y-2">
                  {values.skills.map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Field name={`skills.${i}`} className="input" placeholder="e.g., React" />
                      <button type="button" className="btn" onClick={() => remove(i)}>Remove</button>
                    </div>
                  ))}
                  <button type="button" className="btn" onClick={() => push("")}>+ Add skill</button>
                </div>
              )}
            </FieldArray>
          </section>

          <section className="rounded-2xl border bg-white p-4">
            <h2 className="text-lg font-semibold">Experience</h2>
            <FieldArray name="experience">
              {({ remove, push }) => (
                <div className="mt-3 space-y-4">
                  {values.experience.map((_, i) => (
                    <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-3 border rounded-xl p-3">
                      <L id={`experience.${i}.company`} label="Company" />
                      <L id={`experience.${i}.role`} label="Role" />
                      <L id={`experience.${i}.start`} label="Start" />
                      <L id={`experience.${i}.end`} label="End" />
                      <L id={`experience.${i}.details`} label="Details" as="textarea" className="sm:col-span-2" />
                      <div className="sm:col-span-2 flex justify-end">
                        <button type="button" className="btn" onClick={() => remove(i)}>Remove</button>
                      </div>
                    </div>
                  ))}
                  <button type="button" className="btn" onClick={() => push({ company: "", role: "", start: "", end: "", details: "" })}>
                    + Add role
                  </button>
                </div>
              )}
            </FieldArray>
          </section>

          <section className="rounded-2xl border bg-white p-4">
            <h2 className="text-lg font-semibold">Education</h2>
            <FieldArray name="education">
              {({ remove, push }) => (
                <div className="mt-3 space-y-4">
                  {values.education.map((_, i) => (
                    <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-3 border rounded-xl p-3">
                      <L id={`education.${i}.school`} label="School" />
                      <L id={`education.${i}.degree`} label="Degree" />
                      <L id={`education.${i}.start`} label="Start" />
                      <L id={`education.${i}.end`} label="End" />
                      <div className="sm:col-span-2 flex justify-end">
                        <button type="button" className="btn" onClick={() => remove(i)}>Remove</button>
                      </div>
                    </div>
                  ))}
                  <button type="button" className="btn" onClick={() => push({ school: "", degree: "", start: "", end: "" })}>
                    + Add education
                  </button>
                </div>
              )}
            </FieldArray>
          </section>

          <section className="rounded-2xl border bg-white p-4">
            <h2 className="text-lg font-semibold">Projects</h2>
            <FieldArray name="projects">
              {({ remove, push }) => (
                <div className="mt-3 space-y-4">
                  {values.projects.map((_, i) => (
                    <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-3 border rounded-xl p-3">
                      <L id={`projects.${i}.name`} label="Project name" />
                      <L id={`projects.${i}.link`} label="Link" />
                      <L id={`projects.${i}.details`} label="Details" as="textarea" className="sm:col-span-2" />
                      <div className="sm:col-span-2 flex justify-end">
                        <button type="button" className="btn" onClick={() => remove(i)}>Remove</button>
                      </div>
                    </div>
                  ))}
                  <button type="button" className="btn" onClick={() => push({ name: "", link: "", details: "" })}>
                    + Add project
                  </button>
                </div>
              )}
            </FieldArray>
          </section>

          <div className="flex justify-end">
            <button type="button" className="btn-primary" onClick={() => onChange(values)}>
              Save Changes
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

function L({ id, label, as = "input", className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm text-gray-700">{label}</span>
      <Field as={as} name={id} className="input mt-1" />
    </label>
  );
}

/* Tailwind component classes */
// You can move these to a CSS file if preferred
