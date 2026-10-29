import { useEffect, useState } from "react";
import { IndianRupee, Download, BookOpen, ClipboardCheck, Library, Shirt, Bus, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { publicApi, feeStructuresApi, galleryApi } from "../../api/endpoints";
import { resolveFileUrl } from "../../api/resolveFileUrl";
import { Shimmer } from "../ui/Skeleton";
import ParallaxDecor from "./ParallaxDecor";

const FEE_ICONS = {
  tuition: BookOpen,
  admission: ClipboardCheck,
  books: Library,
  uniform: Shirt,
  transport: Bus,
};
const iconFor = (feeType) => {
  const key = Object.keys(FEE_ICONS).find((k) => feeType.toLowerCase().includes(k));
  return FEE_ICONS[key] || Wallet;
};

export default function AdmissionsFees() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [structures, setStructures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [classPhotos, setClassPhotos] = useState([]);

  useEffect(() => {
    publicApi.classes().then(({ data }) => {
      setClasses(data.classes);
      if (data.classes.length > 0) setSelectedClass(data.classes[0]._id);
    });
    // Use active school gallery photos, rotating by class so each class gets
    // its own sample image when multiple photos are available.
    galleryApi.public("all").then(({ data }) => {
      setClassPhotos(data.photos);
    });
  }, []);

  useEffect(() => {
    if (!selectedClass) return;
    setLoading(true);
    feeStructuresApi
      .public(selectedClass)
      .then(({ data }) => setStructures(data.feeStructures))
      .finally(() => setLoading(false));
  }, [selectedClass]);

  const bySemester = structures.reduce((acc, f) => {
    const key = f.semester || "one_time";
    acc[key] = acc[key] || [];
    acc[key].push(f);
    return acc;
  }, {});
  const semesterKeys = Object.keys(bySemester).sort((a, b) => (a === "one_time" ? 1 : b === "one_time" ? -1 : a - b));
  const grandTotal = structures.reduce((sum, f) => sum + f.amount, 0);
  const selectedClassName = classes.find((c) => c._id === selectedClass)?.name || "";
  const selectedClassIndex = classes.findIndex((c) => c._id === selectedClass);
  const sidePhoto = classPhotos.length && selectedClassIndex >= 0
    ? classPhotos[selectedClassIndex % classPhotos.length]
    : null;

  return (
    <section id="admissions" className="admissions-page relative overflow-hidden bg-white">
      <ParallaxDecor tone="teal" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-7 flex flex-col items-start justify-between gap-5 border-b border-navy-100 pb-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-navy-700">Admissions 2026-27</p>
            <h2 className="font-serif text-3xl font-semibold text-navy-900 sm:text-4xl">Fee Structure</h2>
            <p className="mt-3 text-navy-500">Transparent, semester-wise fees - no hidden costs.</p>
          </div>
          <Link
            to="/apply"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-school-red px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-school-red-dark"
          >
            Apply for admission
          </Link>
        </div>

        {classes.length > 0 && (
          <div className="mb-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-navy-500">Select a class</p>
            <div className="flex flex-wrap gap-2">
              {classes.map((c) => (
                <button
                  key={c._id}
                  onClick={() => setSelectedClass(c._id)}
                  aria-pressed={selectedClass === c._id}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    selectedClass === c._id
                      ? "bg-navy-900 text-white shadow-sm"
                      : "border border-navy-100 bg-white text-navy-600 hover:border-navy-300 hover:bg-paper"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="mx-auto max-w-xl overflow-hidden rounded-2xl border-2 border-navy-900/10 bg-white">
            <Shimmer className="h-10 w-full !rounded-none" />
            <div className="space-y-4 p-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <Shimmer className="h-4 w-32" />
                  <Shimmer className="h-4 w-16" />
                </div>
              ))}
            </div>
          </div>
        )}
        {!loading && structures.length === 0 && (
          <p className="rounded-xl border border-navy-100 bg-paper/60 px-5 py-4 text-sm text-navy-500">Fee structure for this class hasn't been published yet - contact the office for details.</p>
        )}

        {!loading && structures.length > 0 && (
          <div className={`mx-auto ${sidePhoto ? "max-w-6xl" : "max-w-3xl"}`}>
            <div
              className={`grid items-stretch gap-6 lg:gap-8 ${
                sidePhoto ? "lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)]" : ""
              }`}
            >
              <div id="fee-structure-card" className="premium-card overflow-hidden rounded-xl border border-navy-100 bg-white shadow-sm">
                {structures.some((fee) => /sample/i.test(fee.feeType)) && (
                  <p role="note" className="border-b border-amber-200 bg-amber-50 px-6 py-3 text-xs font-semibold text-amber-900">
                    Sample amounts for demonstration only — these are not official school fees. Please confirm current fees with the school office.
                  </p>
                )}
                <p className="bg-paper px-6 py-3 text-xs font-bold uppercase tracking-wide text-navy-500">
                  {selectedClassName} — Annual Fee Details
                </p>
                {semesterKeys.map((key) => (
                  <div key={key} className="border-b border-navy-100 last:border-0">
                    {semesterKeys.length > 1 && (
                      <p className="bg-navy-50/60 px-6 py-2 text-xs font-bold uppercase tracking-wide text-navy-400">
                        {key === "one_time" ? "One-time / Annual" : `Semester ${key}`}
                      </p>
                    )}
                    {bySemester[key].map((f) => {
                      const Icon = iconFor(f.feeType);
                      return (
                        <div key={f._id} className="flex items-center justify-between px-6 py-3.5 text-sm">
                          <span className="flex items-center gap-2.5 text-navy-700">
                            <Icon size={15} className="text-amber-600" /> {f.feeType}
                          </span>
                          <span className="flex items-center font-semibold text-navy-900">
                            <IndianRupee size={13} />{f.amount.toLocaleString("en-IN")}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ))}
                <div className="flex items-center justify-between bg-navy-900 px-5 py-4 sm:px-6">
                  <span className="font-semibold text-white">Total (Annual)</span>
                  <span className="flex items-center font-serif text-lg font-semibold text-white">
                    <IndianRupee size={16} />{grandTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {sidePhoto && (
                <div className="relative min-h-64 overflow-hidden rounded-xl border border-navy-100 bg-paper shadow-sm lg:h-full">
                  <img
                    src={resolveFileUrl(sidePhoto.imageUrl)}
                    alt={`${selectedClassName} sample photo at Mayfield Global School`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {(sidePhoto.caption || selectedClassName) && (
                    <p className="absolute inset-x-0 bottom-0 bg-navy-900/80 px-4 py-3 text-sm text-white backdrop-blur-sm">
                      {sidePhoto.caption || `${selectedClassName} sample photo`}
                    </p>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                // temporary body class (see index.css) - without this,
                // "Download PDF" would print the entire homepage: navbar,
                // hero, gallery, footer, all of it.
                document.body.classList.add("printing-fee-structure");
                window.print();
                const cleanup = () => {
                  document.body.classList.remove("printing-fee-structure");
                  window.removeEventListener("afterprint", cleanup);
                };
                window.addEventListener("afterprint", cleanup);
              }}
              className="btn-glow mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-navy-200 px-5 py-3 text-sm font-semibold text-navy-800 hover:bg-paper sm:w-auto"
            >
              <Download size={15} /> Download Fee Structure PDF
            </button>
            <p className="mt-2 text-xs text-navy-400">*Fees are subject to change as per school policy.</p>
          </div>
        )}
      </div>
    </section>
  );
}