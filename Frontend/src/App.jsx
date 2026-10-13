import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Loading Page
import LoadingPage from "./pages/LoadingPage";

// Authentication & Authorization
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

// CRM Layout
import CRMLayout from "./components/layout/CRMLayout";
import PublicLayout from "./components/layout/PublicLayout";

// Public Pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/auth/Login"));

// Dashboard
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));

// Students & Staff
const Students = lazy(() => import("./pages/students/Students"));
const Parents = lazy(() => import("./pages/Parents/Parents"));
const Teachers = lazy(() => import("./pages/teachers/Teachers"));

// Academic Management
const Classes = lazy(() => import("./pages/Classes/Classes"));
const Schedules = lazy(() => import("./pages/Schedules/Schedules"));
const Attendance = lazy(() => import("./pages/Attendance/Attendance"));
const Progress = lazy(() => import("./pages/Progress/Progress"));
const Program = lazy(() => import("./pages/Programs/Programs"));
const AcademicSessions = lazy(() => import("./pages/AcademicSessions/AcademicSessions"));
const Sections = lazy(() => import("./pages/Sections/Sections"));
const Subject = lazy(() => import("./pages/Subject"));

// Fees & Payments
const Memberships = lazy(() => import("./pages/Memberships"));
const Payments = lazy(() => import("./pages/Payments/Payments"));
const FeeStructures = lazy(() => import("./pages/FeeStructures/FeeStructures"));
const FeeAssignments = lazy(() => import("./pages/FeeAssignments/FeeAssignments"));
const Renewals = lazy(() => import("./pages/Renewals/Renewals"));

// Admissions & Enrollments
const Admissions = lazy(() => import("./pages/Admissions"));
const Enrollments = lazy(() => import("./pages/Enrollments"));
const TrialBookings = lazy(() => import("./pages/TrialBookings"));

// Communication & Reports
const Queries = lazy(() => import("./pages/Queries/Queries"));
const Notifications = lazy(() => import("./pages/Notification"));
const AdminAnnouncements = lazy(() => import("./pages/AdminAnnouncements"));
const AdminUsers = lazy(() => import("./pages/AdminUsers"));
const AuditLogs = lazy(() => import("./pages/AuditLogs"));
const About = lazy(() => import("./pages/About"));
const AdmissionProcess = lazy(() => import("./pages/AdmissionProcess"));
const ApplyAdmission = lazy(() => import("./pages/ApplyAdmission"));
const SchoolLife = lazy(() =>
  import("./pages/SchoolInformationPages").then((module) => ({
    default: module.SchoolLifePage,
  })),
);
const Facilities = lazy(() =>
  import("./pages/SchoolInformationPages").then((module) => ({
    default: module.FacilitiesPage,
  })),
);
const Events = lazy(() =>
  import("./pages/SchoolInformationPages").then((module) => ({
    default: module.EventsPage,
  })),
);
const ClassesFees = lazy(() =>
  import("./pages/SchoolInformationPages").then((module) => ({
    default: module.ClassesFeesPage,
  })),
);
const Gallery = lazy(() =>
  import("./pages/SchoolInformationPages").then((module) => ({
    default: module.GalleryPage,
  })),
);
const Contact = lazy(() =>
  import("./pages/SchoolInformationPages").then((module) => ({
    default: module.ContactPage,
  })),
);



function App() {
  // ================= LOADING STATE =================
  const [loading, setLoading] = useState(true);

  // ================= SHOW LOADING PAGE =================
  if (loading) {
    return <LoadingPage onComplete={() => setLoading(false)} />;
  }

  // ================= MAIN APPLICATION =================
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center text-sm font-medium text-slate-500">
            Loading page...
          </div>
        }
      >
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route element={<PublicLayout />}>
          {/* Website Homepage */}
          <Route path="/" element={<Home />} />

          {/* Login */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<Login portalRole="admin" />} />
          <Route path="/parent-login" element={<Login portalRole="parent" />} />
          <Route path="/teacher-login" element={<Login portalRole="teacher" />} />

          {/* About */}
          <Route path="/about" element={<About />} />

          <Route path="/admission-process" element={<AdmissionProcess />} />
          <Route path="/school-life" element={<SchoolLife />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/events-activities" element={<Events />} />
          <Route path="/classes-fees" element={<ClassesFees />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/apply" element={<ApplyAdmission />} />
        </Route>

        {/* ================= PROTECTED CRM ROUTES ================= */}

        <Route element={<ProtectedRoute />}>
          <Route element={<CRMLayout />}>

            {/* ================= DASHBOARD ================= */}

            <Route path="/dashboard" element={<Dashboard />} />

            {/* ================= ADMIN ROUTES ================= */}

            <Route
              element={<RoleRoute allowedRoles={["admin"]} />}
            >
              {/* Students */}
              <Route path="/students" element={<Students />} />

              {/* Parents */}
              <Route path="/parents" element={<Parents />} />

              {/* Teachers */}
              <Route path="/teachers" element={<Teachers />} />

              {/* Classes */}
              <Route path="/classes" element={<Classes />} />

              {/* Programs */}
              <Route path="/programs" element={<Program />} />

              {/* Sections */}
              <Route path="/sections" element={<Sections />} />

              {/* Academic Sessions */}
              <Route
                path="/academic-sessions"
                element={<AcademicSessions />}
              />

              {/* Subjects */}
              <Route path="/subjects" element={<Subject />} />

              {/* Schedules */}
              <Route path="/schedules" element={<Schedules />} />

              {/* Attendance */}
              <Route path="/attendance" element={<Attendance />} />

              {/* Fee Structures */}
              <Route
                path="/fee-structures"
                element={<FeeStructures />}
              />

              {/* Fee Assignments */}
              <Route
                path="/fee-assignments"
                element={<FeeAssignments />}
              />

              {/* Payments */}
              <Route path="/payments" element={<Payments />} />

              {/* Memberships */}
              <Route path="/memberships" element={<Memberships />} />

              {/* Renewals */}
              <Route path="/renewals" element={<Renewals />} />

              {/* Queries */}
              <Route path="/queries" element={<Queries />} />

              {/* Admissions */}
              <Route path="/admissions" element={<Admissions />} />

              {/* Enrollments */}
              <Route path="/enrollments" element={<Enrollments />} />

              {/* Trial Bookings */}
              <Route path="/trials" element={<TrialBookings />} />

              {/* Notifications */}
              <Route
                path="/notifications"
                element={<Notifications />}
              />

              {/* Announcement Management */}
              <Route
                path="/announcement-management"
                element={<AdminAnnouncements />}
              />

              {/* Administrator Accounts */}
              <Route path="/admin-users" element={<AdminUsers />} />

              {/* Audit Logs */}
              <Route path="/audit-logs" element={<AuditLogs />} />
            </Route>

            {/* ================= ADMIN + TEACHER ROUTES ================= */}

            <Route
              element={
                <RoleRoute allowedRoles={["admin", "teacher"]} />
              }
            >
              {/* Student Progress */}
              <Route path="/progress" element={<Progress />} />
            </Route>
          </Route>
        </Route>

        {/* ================= FALLBACK ROUTE ================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
      </Suspense>

    </BrowserRouter>
  );
}

export default App;