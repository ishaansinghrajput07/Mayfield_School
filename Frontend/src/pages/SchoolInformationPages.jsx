import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Download,
  GraduationCap,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { jsPDF } from "jspdf";
import { Link } from "react-router-dom";
import { api, getMessage } from "../services/api";

const schoolDetails = {
  name: "Mayfield Global School",
  address: "Neora Ganjipar, Sarai Neoraganj Road, Patna, Bihar — 801113",
  phones: ["+91 9472597721", "+91 9835218820", "+91 8409975011"],
  emails: ["mayfieldglobalschoolpatna@gmail.com", "mgschoolpatna17@gmail.com"],
};

const pages = {
  life: {
    eyebrow: "Life at Mayfield",
    title: "A school day full of discovery.",
    description:
      "Learning at Mayfield extends beyond lessons. Students are encouraged to take part, explore their interests and grow as confident members of a supportive school community.",
    image: "/images/trophy-or-campus.jpg",
    imageAlt: "Mayfield Global School campus",
    highlights: [
      {
        icon: BookOpen,
        title: "Learning with purpose",
        description:
          "Build understanding, curiosity and confidence through a supportive learning journey from Nursery to Senior Secondary.",
      },
      {
        icon: Trophy,
        title: "Stay active and involved",
        description:
          "Sports, school events and shared activities give students opportunities to participate, collaborate and challenge themselves.",
      },
      {
        icon: HeartHandshake,
        title: "Grow together",
        description:
          "A welcoming school community helps students develop respect, responsibility and strong relationships.",
      },
    ],
  },
  facilities: {
    eyebrow: "Our Campus",
    title: "Spaces that support learning and growth.",
    description:
      "Explore the Mayfield campus and the school environment where students learn, connect and take part in daily school life.",
    image: "/images/hero-building.jpg",
    imageAlt: "Mayfield Global School campus building",
    highlights: [
      {
        icon: BookOpen,
        title: "Learning spaces",
        description:
          "An environment designed to support focused classroom learning and the academic journey across school stages.",
      },
      {
        icon: Users,
        title: "Spaces to connect",
        description:
          "Shared school spaces bring students together for everyday interaction, collaboration and community activities.",
      },
      {
        icon: Sparkles,
        title: "Room to participate",
        description:
          "The school environment supports participation in activities and experiences that complement classroom learning.",
      },
    ],
  },
  events: {
    eyebrow: "Events & Activities",
    title: "Celebrating the moments that bring us together.",
    description:
      "School events and activities create opportunities for students to participate, share their talents and make lasting memories at Mayfield.",
    image: "/images/school-calendar.jpg",
    imageAlt: "School calendar and important dates",
    highlights: [
      {
        icon: CalendarDays,
        title: "School calendar",
        description:
          "Keep track of important dates and school updates. Contact the school for the latest calendar and event information.",
      },
      {
        icon: Users,
        title: "Activities for students",
        description:
          "Shared activities encourage teamwork, participation and a strong sense of belonging across the school community.",
      },
      {
        icon: Trophy,
        title: "Moments worth celebrating",
        description:
          "School occasions offer students a chance to contribute, perform and celebrate achievements together.",
      },
    ],
  },
  classes: {
    eyebrow: "Classes & Fees",
    title: "Find the right next step for your child.",
    description:
      "Mayfield Global School offers education from Nursery to Senior Secondary. Contact the admissions team for current class availability and the applicable fee details.",
    image: "/images/about-confidence.jpg",
    imageAlt: "Student learning at Mayfield Global School",
    highlights: [
      {
        icon: GraduationCap,
        title: "Nursery to Senior Secondary",
        description:
          "A continuous school journey, with admissions enquiries welcomed for classes from Nursery through Senior Secondary.",
      },
      {
        icon: BookOpen,
        title: "Class placement",
        description:
          "The admissions team can advise on the appropriate class, current vacancies and the documents required for an application.",
      },
      {
        icon: CheckCircle2,
        title: "Request current fee details",
        description:
          "Fee schedules can change. Please contact the school directly for the latest fee structure and payment information.",
      },
    ],
  },
  gallery: {
    eyebrow: "School Gallery",
    title: "A glimpse into life at Mayfield.",
    description:
      "Explore campus scenes, school highlights and memories from the Mayfield Global School community.",
    image: "/images/photo-gallery.jpg",
    imageAlt: "Mayfield Global School gallery",
    gallery: [
      { src: "/images/hero-building.jpg", alt: "Mayfield school campus" },
      { src: "/images/school-news.jpg", alt: "School news and activities" },
      { src: "/images/photo-gallery.jpg", alt: "School gallery highlights" },
      { src: "/images/trophy-or-campus.jpg", alt: "Campus and school life" },
      { src: "/images/news-clippings.jpg", alt: "Mayfield in the news" },
      { src: "/images/school-calendar.jpg", alt: "School calendar and events" },
    ],
  },
};

function PageIntro({ eyebrow, title, description, image, imageAlt }) {
  const isFeesPage = eyebrow === pages.classes.eyebrow;

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      <img
        src={image}
        alt={imageAlt}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/30" />
      <div
        className={`mx-auto grid max-w-7xl items-center gap-5 px-5 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:px-10 ${
          isFeesPage ? "min-h-[210px] py-8" : "min-h-[420px] py-20"
        }`}
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">
            {eyebrow}
          </p>
          <h1
            className={`max-w-3xl font-serif font-bold leading-tight ${
              isFeesPage
                ? "mt-2 text-3xl sm:text-4xl"
                : "mt-4 text-4xl sm:text-5xl lg:text-6xl"
            }`}
          >
            {title}
          </h1>
          <p
            className={`max-w-2xl text-base leading-7 text-white/75 ${
              isFeesPage ? "mt-3" : "mt-6 sm:text-lg"
            }`}
          >
            {description}
          </p>
        </div>
        <div className="hidden lg:block" aria-hidden="true" />
      </div>
    </section>
  );
}

function PageCallToAction({
  title = "Want to know more about Mayfield?",
  compact = false,
}) {
  return (
    <section
      className={`bg-[#17396F] px-5 text-white sm:px-8 ${
        compact ? "py-7" : "py-12"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl flex-col items-start justify-between sm:flex-row sm:items-center ${
          compact ? "gap-4" : "gap-6"
        }`}
      >
        <div>
          <h2 className={compact ? "text-xl font-bold" : "text-2xl font-bold"}>
            {title}
          </h2>
          <p
            className={`mt-2 max-w-2xl text-sm text-white/75 ${
              compact ? "leading-5" : "leading-6"
            }`}
          >
            Our team can help with school information, admissions and your
            questions.
          </p>
        </div>
        <Link
          to="/contact"
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-amber-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-amber-300"
        >
          Contact the School <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}

function SchoolInfoPage({ page }) {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <PageIntro {...page} />
      {page.gallery ? (
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
              Moments & memories
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
              Around our school
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
            {page.gallery.map((image) => (
              <figure
                key={image.src}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </figure>
            ))}
          </div>
        </section>
      ) : (
        <section
          className={`mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 ${
            page === pages.classes ? "py-6 lg:py-8" : "py-16"
          }`}
        >
          {page === pages.classes && <PublishedClassFees />}
          {page !== pages.classes && <div className="mb-9 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
              Discover Mayfield
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
              {page.eyebrow}
            </h2>
          </div>}
          {page !== pages.classes && <div className="grid gap-5 md:grid-cols-3">
            {page.highlights.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                  <Icon size={23} />
                </span>
                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </article>
            ))}
          </div>}
        </section>
      )}
      <PageCallToAction
        title={
          page === pages.classes
            ? "Ask us about classes and fees"
            : undefined
        }
        compact={page === pages.classes}
      />
    </main>
  );
}

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

const formatLabel = (value) =>
  String(value || "Fee")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

async function loadSchoolLogo() {
  const response = await fetch("/images/school-logo.png");
  if (!response.ok) {
    throw new Error("Unable to load the school logo for the fee slip.");
  }

  const logo = await createImageBitmap(await response.blob());
  const canvas = document.createElement("canvas");
  canvas.width = logo.width;
  canvas.height = logo.height;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Unable to prepare the school logo for the fee slip.");
  }
  context.drawImage(logo, 0, 0);
  return canvas.toDataURL("image/png");
}

async function downloadClassFeePdf(group) {
  const document = new jsPDF();
  const pageWidth = document.internal.pageSize.getWidth();
  const pageHeight = document.internal.pageSize.getHeight();
  const margin = 11;
  const lineWidth = pageWidth - margin * 2;
  const logoData = await loadSchoolLogo();
  let y = 15;

  const ensureSpace = (height) => {
    if (y + height > pageHeight - margin) {
      document.addPage();
      y = 15;
      addHeader();
    }
  };

  function addHeader() {
    document.setFillColor(23, 57, 111);
    document.rect(0, 0, pageWidth, 17, "F");
    document.addImage(logoData, "PNG", margin, 2.5, 12, 12);
    const textX = margin + 16;
    const textWidth = pageWidth - textX - margin;

    document.setFont("helvetica", "bold");
    document.setFontSize(11);
    document.setTextColor(255, 255, 255);
    document.text(schoolDetails.name, textX, 10, { maxWidth: textWidth });

    document.setFont("helvetica", "normal");
    document.setFontSize(7);
    document.setTextColor(71, 85, 105);
    let contactY = 22;
    for (const contact of [
      schoolDetails.address,
      `Phone: ${schoolDetails.phones.join(" | ")}`,
      `Email: ${schoolDetails.emails.join(" | ")}`,
    ]) {
      const lines = document.splitTextToSize(contact, textWidth);
      document.text(lines, textX, contactY);
      contactY += lines.length * 3;
    }

    y = contactY + 2;
    document.setFont("helvetica", "bold");
    document.setFontSize(12);
    document.setTextColor(23, 57, 111);
    document.text("CLASS FEE SLIP", margin, y);
    y += 7;

    document.setFont("helvetica", "normal");
    document.setFontSize(9);
    document.setTextColor(30, 41, 59);
    const classTitle = `${group.className}${
      group.programName ? ` · ${group.programName}` : ""
    }`;
    document.text(
      document.splitTextToSize(classTitle, lineWidth),
      margin,
      y,
    );
    y += document.splitTextToSize(classTitle, lineWidth).length * 4.5;
    document.text(
      `Academic session: ${group.sessionName}`,
      margin,
      y + 1,
    );
    y += 8;
    document.setDrawColor(203, 213, 225);
    document.line(margin, y, pageWidth - margin, y);
    y += 5;
  }

  addHeader();

  for (const fee of group.fees) {
    const feeName = `${formatLabel(fee.feeType)}${
      fee.semester ? ` - Semester ${fee.semester}` : ""
    }`;
    const amount = `INR ${Number(fee.amount).toLocaleString("en-IN")}`;
    const details = [
      formatLabel(fee.frequency),
      fee.dueDay ? `Due day ${fee.dueDay}` : "",
      fee.description || "",
    ]
      .filter(Boolean)
      .join(" | ");
    const detailLines = document.splitTextToSize(details, lineWidth - 8);
    document.setFont("helvetica", "bold");
    document.setFontSize(9);
    const amountWidth = document.getTextWidth(amount);
    const feeNameLines = document.splitTextToSize(
      feeName,
      lineWidth - amountWidth - 14,
    );
    const nameHeight = Math.max(feeNameLines.length * 4, 4);
    const detailHeight = detailLines.length * 3.5;
    const itemHeight = 7 + nameHeight + detailHeight;
    ensureSpace(itemHeight);

    document.setFillColor(248, 250, 252);
    document.roundedRect(margin, y, lineWidth, itemHeight, 1.5, 1.5, "F");
    y += 3.5;
    document.setFont("helvetica", "bold");
    document.setFontSize(9);
    document.setTextColor(30, 41, 59);
    document.text(feeNameLines, margin + 3, y);
    document.text(amount, pageWidth - margin - 3, y, { align: "right" });
    y += nameHeight;
    if (detailLines.length) {
      document.setFont("helvetica", "normal");
      document.setFontSize(7);
      document.setTextColor(71, 85, 105);
      document.text(detailLines, margin + 3, y);
      y += detailHeight;
    }
  }

  ensureSpace(12);
  document.setFont("helvetica", "italic");
  document.setFontSize(7.5);
  document.setTextColor(100, 116, 139);
  document.text(
    "Please contact the school to confirm the applicable fees.",
    margin,
    y + 3,
  );

  const safeFilePart = (value) =>
    String(value)
      .normalize("NFKD")
      .replace(/[^\w-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  const fileName = [
    "Mayfield",
    safeFilePart(group.className),
    safeFilePart(group.sessionName),
    "Fee-Slip.pdf",
  ]
    .filter(Boolean)
    .join("-");

  document.save(fileName);
}

function PublishedClassFees() {
  const [feeStructures, setFeeStructures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedClassKeys, setExpandedClassKeys] = useState(() => new Set());
  const [pdfError, setPdfError] = useState("");

  useEffect(() => {
    let isCurrentRequest = true;

    api
      .get("/fee-structures/public")
      .then((response) => {
        const publishedFees = response?.data?.feeStructures;

        if (!Array.isArray(publishedFees)) {
          throw new Error(
            "The published fee data is not in the expected format.",
          );
        }

        if (isCurrentRequest) {
          setFeeStructures(publishedFees);
          setError("");
        }
      })
      .catch((requestError) => {
        if (isCurrentRequest) {
          setError(
            getMessage(
              requestError,
              "Unable to load the published class fees.",
            ),
          );
        }
      })
      .finally(() => {
        if (isCurrentRequest) {
          setLoading(false);
        }
      });

    return () => {
      isCurrentRequest = false;
    };
  }, [retryCount]);

  const classGroups = React.useMemo(() => {
    const groups = new Map();

    for (const fee of feeStructures) {
      const classId = fee?.class?._id || fee?.class?.name || "all-classes";
      const sessionId =
        fee?.academicSession?._id ||
        fee?.academicSession?.name ||
        fee?.academicYear ||
        "unspecified-session";
      const key = `${sessionId}:${classId}`;

      if (!groups.has(key)) {
        groups.set(key, {
          key,
          className: fee?.class?.name || "All classes",
          classOrder: Number(fee?.class?.order) || 0,
          programName: fee?.program?.name || "",
          sessionName:
            fee?.academicSession?.name ||
            fee?.academicSession?.code ||
            fee?.academicYear ||
            "Academic session not specified",
          fees: [],
        });
      }

      groups.get(key).fees.push(fee);
    }

    return [...groups.values()]
      .map((group) => ({
        ...group,
        fees: group.fees.sort(
          (first, second) =>
            (Number(first?.semester) || 0) - (Number(second?.semester) || 0) ||
            String(first?.feeType || "").localeCompare(
              String(second?.feeType || ""),
            ),
        ),
      }))
      .sort(
        (first, second) =>
          first.sessionName.localeCompare(second.sessionName) ||
          first.classOrder - second.classOrder ||
          first.className.localeCompare(second.className),
      );
  }, [feeStructures]);

  return (
    <section
      aria-labelledby="published-class-fees"
      className="mb-8 scroll-mt-24"
    >
      <div className="mb-3">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
          Published fee structure
        </p>
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls="published-class-fees-content"
          onClick={() => setIsExpanded((expanded) => !expanded)}
          className="mt-2 flex w-full items-center justify-between gap-4 text-left"
        >
          <span
            id="published-class-fees"
            className="font-serif text-2xl font-bold text-slate-900 sm:text-3xl"
          >
            Fees by class
          </span>
          <ChevronRight
            aria-hidden="true"
            className={`shrink-0 transition-transform ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
        </button>
      </div>

      {isExpanded && (
        <div id="published-class-fees-content">
          <p className="mb-3 max-w-3xl text-sm leading-5 text-slate-600">
            Fee amounts shown here come from the school&apos;s published Fee
            Structures. Check the academic session listed with each class and
            contact the school to confirm the applicable fees.
          </p>
          {loading ? (
        <p
          role="status"
          className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600"
        >
          Loading published class fees…
        </p>
          ) : error ? (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-6"
        >
          <p className="text-sm text-red-800">{error}</p>
          <button
            type="button"
            onClick={() => {
              setLoading(true);
              setRetryCount((count) => count + 1);
            }}
            className="mt-4 rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800"
          >
            Try again
          </button>
        </div>
          ) : classGroups.length === 0 ? (
        <p className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
          No published class fee structures are available right now. Please
          contact the school for current fee information.
        </p>
          ) : (
        <>
          {pdfError && (
            <p role="alert" className="mb-4 text-sm text-red-700">
              {pdfError}
            </p>
          )}
          <div className="space-y-3">
          {classGroups.map((group) => {
                const isClassExpanded = expandedClassKeys.has(group.key);
                const classPanelId = `class-fees-${group.key.replace(
                  /[^a-zA-Z0-9_-]/g,
                  "-",
                )}`;

                return (
                  <article
                    key={group.key}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  >
                    <header className="flex flex-col justify-between gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2.5 sm:flex-row sm:items-center">
                      <button
                        type="button"
                        aria-expanded={isClassExpanded}
                        aria-controls={classPanelId}
                        onClick={() => {
                          setExpandedClassKeys((expandedKeys) => {
                            const nextKeys = new Set(expandedKeys);
                            if (nextKeys.has(group.key)) {
                              nextKeys.delete(group.key);
                            } else {
                              nextKeys.add(group.key);
                            }
                            return nextKeys;
                          });
                        }}
                        className="flex min-w-0 flex-1 items-center justify-between gap-3 text-left"
                      >
                        <span>
                          <span className="block text-lg font-bold text-slate-900">
                            {group.className}
                            {group.programName ? ` · ${group.programName}` : ""}
                          </span>
                          <span className="mt-1 block text-sm text-slate-600">
                            Academic session: {group.sessionName}
                          </span>
                        </span>
                        <ChevronRight
                          aria-hidden="true"
                          className={`shrink-0 transition-transform ${
                            isClassExpanded ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          setPdfError("");
                          try {
                            await downloadClassFeePdf(group);
                          } catch (downloadError) {
                            setPdfError(
                              getMessage(
                                downloadError,
                                "Unable to create the class fee PDF.",
                              ),
                            );
                          }
                        }}
                        aria-label={`Download ${group.className} fee structure as PDF`}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-blue-900/20 bg-white px-3 py-2 text-sm font-semibold text-blue-900 transition hover:bg-blue-50"
                      >
                        <Download size={16} aria-hidden="true" />
                        Download PDF
                      </button>
                    </header>
                    <div
                      id={classPanelId}
                      hidden={!isClassExpanded}
                      className="divide-y divide-slate-100"
                    >
                      {group.fees.map((fee) => (
                        <div
                          key={
                            fee._id ||
                            `${fee.feeType}-${fee.semester || "all"}`
                          }
                          className="flex flex-col gap-1 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div>
                            <p className="font-semibold text-slate-800">
                              {formatLabel(fee.feeType)}
                              {fee.semester
                                ? ` · Semester ${fee.semester}`
                                : ""}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                              {formatLabel(fee.frequency)}
                              {fee.dueDay ? ` · Due day ${fee.dueDay}` : ""}
                            </p>
                            {fee.description && (
                              <p className="mt-1 text-sm leading-5 text-slate-500">
                                {fee.description}
                              </p>
                            )}
                          </div>
                          <p className="text-lg font-bold text-slate-900">
                            {currencyFormatter.format(Number(fee.amount))}
                          </p>
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })}
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}

export function SchoolLifePage() {
  return <SchoolInfoPage page={pages.life} />;
}

export function FacilitiesPage() {
  return <SchoolInfoPage page={pages.facilities} />;
}

export function EventsPage() {
  return <SchoolInfoPage page={pages.events} />;
}

export function ClassesFeesPage() {
  return <SchoolInfoPage page={pages.classes} />;
}

export function GalleryPage() {
  return <SchoolInfoPage page={pages.gallery} />;
}

export function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <PageIntro
        eyebrow="Contact Mayfield"
        title="We’re here to help."
        description="Get in touch with Mayfield Global School for admissions enquiries, school information or help planning a visit."
        image="/images/hero-building.jpg"
        imageAlt="Mayfield Global School campus"
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-16 sm:px-8 md:grid-cols-2 lg:px-10">
        <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <MapPin className="text-blue-900" size={25} />
          <h2 className="mt-4 text-xl font-bold text-slate-900">Visit us</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {schoolDetails.address}
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Mayfield+Global+School+Neora+Patna+Bihar"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-900 hover:text-amber-700"
          >
            Open directions <ChevronRight size={17} />
          </a>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <Phone className="text-blue-900" size={25} />
          <h2 className="mt-4 text-xl font-bold text-slate-900">Call us</h2>
          <div className="mt-3 space-y-2">
            {schoolDetails.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="block text-sm text-slate-600 hover:text-blue-900"
              >
                {phone}
              </a>
            ))}
          </div>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm md:col-span-2">
          <Mail className="text-blue-900" size={25} />
          <h2 className="mt-4 text-xl font-bold text-slate-900">Email us</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Send your enquiry to the school team. For admissions, include the
            student’s current class and the class you are enquiring about.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-6">
            {schoolDetails.emails.map((email) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className="break-all text-sm font-semibold text-blue-900 hover:text-amber-700"
              >
                {email}
              </a>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
