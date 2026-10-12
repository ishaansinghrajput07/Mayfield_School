import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Loading Page
import LoadingPage from "./pages/LoadingPage";

// Authentication & Authorization
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

// CRM Layout
import CRMLayout from "./components/layout/CRMLayout";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";

// Contact Form Popup
import ContactFormPopup from "./pages/ContactFormPopup";

// Dashboard
import Dashboard from "./pages/dashboard/Dashboard";

// Students & Staff
import Students from "./pages/students/Students";
import Parents from "./pages/Parents/Parents";
import Teachers from "./pages/teachers/Teachers";

// Academic Management
import Classes from "./pages/Classes/Classes";
import Schedules from "./pages/Schedules/Schedules";
import Attendance from "./pages/Attendance/Attendance";
import Progress from "./pages/Progress/Progress";
import Program from "./pages/Programs/Programs";
import AcademicSessions from "./pages/AcademicSessions/AcademicSessions";
import Sections from "./pages/Sections/Sections";
import Subject from "./pages/Subject";

// Fees & Payments
import Memberships from "./pages/Memberships";
import Payments from "./pages/Payments/Payments";
import FeeStructures from "./pages/FeeStructures/FeeStructures";
import FeeAssignments from "./pages/FeeAssignments/FeeAssignments";
import Renewals from "./pages/Renewals/Renewals";

// Admissions & Enrollments
import Admissions from "./pages/Admissions";
import Enrollments from "./pages/Enrollments";
import TrialBookings from "./pages/TrialBookings";

// Communication & Reports
import Queries from "./pages/Queries/Queries";
import Notifications from "./pages/Notification";
import AuditLogs from "./pages/AuditLogs";
import Navbar from "./pages/Navbar";
import About from "./pages/About";
import Footer from "./pages/Footer";
import AdmissionProcess from "./pages/AdmissionProcess";
import ApplyAdmission from "./pages/ApplyAdmission";



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
      {/* ================= ROUTES ================= */}
      
       <Navbar />
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

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
        <Route path="/apply" element={<ApplyAdmission />} />

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

      {/* ================= CONTACT FORM POPUP ================= */}
      <ContactFormPopup />

      <Footer/>
    </BrowserRouter>
  );
}

export default App;