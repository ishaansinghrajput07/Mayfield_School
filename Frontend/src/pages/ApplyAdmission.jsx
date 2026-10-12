import React, { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { api, getMessage } from "../services/api";

const initialForm = {
  applicantName: "",
  dob: "",
  gender: "",
  applyingForClass: "",
  previousSchool: "",
  address: "",
  parentName: "",
  parentMobile: "",
  parentEmail: "",
  notes: "",
};

const inputClass =
  "mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100";

const ApplyAdmission = () => {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const response = await api.get("/classes/public");
        setClasses(Array.isArray(response?.data?.classes) ? response.data.classes : []);
      } catch (loadError) {
        setError(getMessage(loadError, "Unable to load available classes."));
      } finally {
        setLoadingClasses(false);
      }
    };
    loadClasses();
  }, []);

  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await api.post("/admissions", {
        ...form,
        applicantName: form.applicantName.trim(),
        parentName: form.parentName.trim(),
        parentMobile: form.parentMobile.trim(),
        parentEmail: form.parentEmail.trim(),
        address: form.address.trim(),
        previousSchool: form.previousSchool.trim(),
        notes: form.notes.trim(),
      });
      setSubmitted(true);
      setForm(initialForm);
    } catch (submitError) {
      setError(getMessage(submitError, "Unable to submit your application."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6">
      <section className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
        <div className="bg-slate-900 px-6 py-8 text-white sm:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">Admissions open</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Apply for Admission</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
            Submit your child&apos;s details and our admissions team will review the application and contact you.
          </p>
        </div>

        <div className="p-6 sm:p-10">
          {submitted ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900" role="status">
              <CheckCircle2 className="mb-3" size={30} />
              <h2 className="text-xl font-bold">Application submitted</h2>
              <p className="mt-2 text-sm leading-6">
                Thank you. The admissions team will review your application and contact you using the details provided.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-5 rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900"
              >
                Submit another application
              </button>
            </div>
          ) : (
            <form
              onSubmit={submit}
              onInvalidCapture={() => setError("Please complete all required fields before submitting the application.")}
              className="space-y-7"
            >
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                  {error}
                </div>
              )}

              <fieldset className="grid gap-5 sm:grid-cols-2">
                <legend className="mb-1 text-lg font-bold text-slate-900">Student details</legend>
                <label className="text-sm font-medium text-slate-700 sm:col-span-2">
                  Student full name *
                  <input className={inputClass} name="applicantName" value={form.applicantName} onChange={update} required maxLength={100} />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  Date of birth *
                  <input className={inputClass} type="date" name="dob" value={form.dob} onChange={update} required />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  Gender *
                  <select className={inputClass} name="gender" value={form.gender} onChange={update} required>
                    <option value="">Select gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                </label>
                <label className="text-sm font-medium text-slate-700">
                  Applying for class *
                  <select className={inputClass} name="applyingForClass" value={form.applyingForClass} onChange={update} required disabled={loadingClasses || !classes.length}>
                    <option value="">{loadingClasses ? "Loading classes..." : "Select class"}</option>
                    {classes.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
                  </select>
                  {!loadingClasses && !classes.length && <span className="mt-1 block text-xs text-red-600">No classes are available. Please contact the school.</span>}
                </label>
                <label className="text-sm font-medium text-slate-700">
                  Previous school
                  <input className={inputClass} name="previousSchool" value={form.previousSchool} onChange={update} maxLength={150} />
                </label>
                <label className="text-sm font-medium text-slate-700 sm:col-span-2">
                  Residential address *
                  <textarea className={inputClass} name="address" value={form.address} onChange={update} required rows={3} maxLength={300} />
                </label>
              </fieldset>

              <fieldset className="grid gap-5 sm:grid-cols-2">
                <legend className="mb-1 text-lg font-bold text-slate-900">Parent / guardian details</legend>
                <label className="text-sm font-medium text-slate-700">
                  Parent / guardian name *
                  <input className={inputClass} name="parentName" value={form.parentName} onChange={update} required maxLength={100} />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  Mobile number *
                  <input className={inputClass} type="tel" name="parentMobile" value={form.parentMobile} onChange={update} required />
                </label>
                <label className="text-sm font-medium text-slate-700 sm:col-span-2">
                  Email
                  <input className={inputClass} type="email" name="parentEmail" value={form.parentEmail} onChange={update} />
                </label>
                <label className="text-sm font-medium text-slate-700 sm:col-span-2">
                  Additional information
                  <textarea className={inputClass} name="notes" value={form.notes} onChange={update} rows={3} maxLength={1000} />
                </label>
              </fieldset>

              <button
                type="submit"
                disabled={submitting || loadingClasses || !classes.length}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-900 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {submitting && <Loader2 size={17} className="animate-spin" />}
                {submitting ? "Submitting..." : "Submit application"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default ApplyAdmission;
