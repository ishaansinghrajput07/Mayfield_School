import React, { useCallback, useEffect, useState } from "react";
import {
  CalendarDays,
  KeyRound,
  Loader2,
  Pencil,
  Plus,
  RefreshCw,
  Shield,
  Trash2,
  UserRoundCheck,
  X,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { api, getMessage } from "../services/api";

const DESIGNATIONS = [
  { value: "principal", label: "Principal" },
  { value: "accountant", label: "Accountant" },
  { value: "receptionist", label: "Receptionist" },
  { value: "office_staff", label: "Office Staff" },
];

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  password: "",
  designation: "office_staff",
  dateOfJoining: "",
};

const formatDate = (date) => {
  if (!date) return "—";
  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime())
    ? "—"
    : parsedDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
};

export default function AdminUsers() {
  const { user } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [workingId, setWorkingId] = useState("");
  const [credentials, setCredentials] = useState(null);

  const loadAdmins = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/staff");
      const staff = response?.data?.staff;
      setAdmins(
        Array.isArray(staff)
          ? staff.filter((member) => member.role === "admin")
          : []
      );
    } catch (loadError) {
      setError(getMessage(loadError, "Unable to load administrator accounts"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAdmins();
  }, [loadAdmins]);

  const resetForm = () => {
    setFormOpen(false);
    setEditingUser(null);
    setForm(EMPTY_FORM);
  };

  const openCreateForm = () => {
    setError("");
    setNotice("");
    setEditingUser(null);
    setForm(EMPTY_FORM);
    setFormOpen(true);
  };

  const openEditForm = (admin) => {
    setError("");
    setNotice("");
    setEditingUser(admin);
    setForm({
      name: admin.name || "",
      email: admin.email || "",
      phone: admin.phone || "",
      password: "",
      designation: admin.designation || "office_staff",
      dateOfJoining: admin.dateOfJoining
        ? new Date(admin.dateOfJoining).toISOString().slice(0, 10)
        : "",
    });
    setFormOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");
    try {
      setSaving(true);
      if (editingUser) {
        await api.put(`/staff/${editingUser._id}`, {
          name: form.name,
          phone: form.phone,
          designation: form.designation,
          dateOfJoining: form.dateOfJoining || null,
          ...(form.password ? { password: form.password } : {}),
        });
        setNotice("Administrator account updated.");
      } else {
        const response = await api.post("/staff", form);
        setCredentials(response?.data?.credentials || null);
        setNotice("Administrator account created.");
      }
      resetForm();
      await loadAdmins();
    } catch (saveError) {
      setError(getMessage(saveError, "Unable to save administrator account"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (admin) => {
    const isSelf =
      String(admin._id) === String(user?._id || user?.id);
    if (isSelf) {
      setError("You cannot delete or deactivate your own administrator account.");
      return;
    }
    if (
      !window.confirm(
        `Delete this administrator login? The account will be deactivated and its audit history retained.`
      )
    ) {
      return;
    }

    try {
      setWorkingId(admin._id);
      setError("");
      setNotice("");
      await api.delete(`/staff/${admin._id}`);
      setNotice("Administrator account deleted (deactivated).");
      await loadAdmins();
    } catch (deleteError) {
      setError(getMessage(deleteError, "Unable to delete administrator account"));
    } finally {
      setWorkingId("");
    }
  };

  const handleReactivate = async (admin) => {
    try {
      setWorkingId(admin._id);
      setError("");
      setNotice("");
      await api.put(`/staff/${admin._id}`, { isActive: true });
      setNotice("Administrator account reactivated.");
      await loadAdmins();
    } catch (reactivateError) {
      setError(getMessage(reactivateError, "Unable to reactivate account"));
    } finally {
      setWorkingId("");
    }
  };

  return (
    <div className="mx-auto min-h-full w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <div className="rounded-xl bg-indigo-100 p-2 text-indigo-700">
              <Shield size={20} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Users</h1>
          </div>
          <p className="text-sm text-slate-500">
            Add and manage administrator login accounts.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={loadAdmins}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            <Plus size={17} />
            Add Admin User
          </button>
        </div>
      </div>

      <div className="mb-5 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
        Deleting an account deactivates its login and retains audit history.
        Accounts can be reactivated later.
      </div>

      {(error || notice) && (
        <div
          className={`mb-5 rounded-xl border px-4 py-3 text-sm ${
            error
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
          role={error ? "alert" : "status"}
        >
          {error || notice}
        </div>
      )}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
          <h2 className="font-semibold text-slate-900">
            Administrator accounts
          </h2>
        </div>
        {loading ? (
          <div className="flex min-h-[220px] items-center justify-center gap-3 text-sm text-slate-500">
            <Loader2 size={20} className="animate-spin" />
            Loading accounts...
          </div>
        ) : admins.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <Shield size={36} className="mx-auto text-slate-300" />
            <h3 className="mt-3 font-semibold text-slate-900">
              No administrator accounts found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Add an admin user to create another administrator login.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold sm:px-6">Name</th>
                  <th className="px-5 py-3 font-semibold">Email</th>
                  <th className="px-5 py-3 font-semibold">Designation</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Joined</th>
                  <th className="px-5 py-3 text-right font-semibold sm:px-6">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {admins.map((admin) => {
                  const isSelf =
                    String(admin._id) === String(user?._id || user?.id);
                  return (
                    <tr key={admin._id} className="text-slate-700">
                      <td className="px-5 py-4 font-semibold text-slate-900 sm:px-6">
                        {admin.name}
                        {isSelf && (
                          <span className="ml-2 text-xs font-normal text-slate-400">
                            You
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">{admin.email}</td>
                      <td className="px-5 py-4">
                        {DESIGNATIONS.find(
                          (item) => item.value === admin.designation
                        )?.label || "Office Staff"}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            admin.isActive
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {admin.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {formatDate(admin.dateOfJoining)}
                      </td>
                      <td className="px-5 py-4 sm:px-6">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEditForm(admin)}
                            aria-label={`Edit ${admin.name}`}
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                          >
                            <Pencil size={16} />
                          </button>
                          {admin.isActive ? (
                            <button
                              type="button"
                              onClick={() => handleDelete(admin)}
                              disabled={isSelf || workingId === admin._id}
                              aria-label={`Delete ${admin.name}`}
                              title={isSelf ? "You cannot delete your own account" : "Delete account"}
                              className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              {workingId === admin._id ? (
                                <Loader2 size={16} className="animate-spin" />
                              ) : (
                                <Trash2 size={16} />
                              )}
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleReactivate(admin)}
                              disabled={workingId === admin._id}
                              aria-label={`Reactivate ${admin.name}`}
                              title="Reactivate account"
                              className="rounded-lg border border-emerald-200 p-2 text-emerald-700 hover:bg-emerald-50 disabled:opacity-50"
                            >
                              {workingId === admin._id ? (
                                <Loader2 size={16} className="animate-spin" />
                              ) : (
                                <UserRoundCheck size={16} />
                              )}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {formOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/50 p-4">
          <section className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingUser ? "Update Admin User" : "Add Admin User"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Create an administrator account for school staff.
                </p>
              </div>
              <button
                type="button"
                onClick={resetForm}
                aria-label="Close admin user form"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 p-5 sm:p-6">
              <label className="block text-sm font-semibold text-slate-700">
                Full name
                <input
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 font-normal outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
                />
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Email
                <input
                  required
                  type="email"
                  readOnly={Boolean(editingUser)}
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 font-normal read-only:bg-slate-50 read-only:text-slate-500 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
                />
                {editingUser && (
                  <span className="mt-1 block text-xs font-normal text-slate-500">
                    Email addresses cannot be changed here.
                  </span>
                )}
              </label>
              {editingUser && (
                <label className="block text-sm font-semibold text-slate-700">
                  New password (optional)
                  <input
                    type="password"
                    autoComplete="new-password"
                    minLength={6}
                    value={form.password}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        password: event.target.value,
                      }))
                    }
                    placeholder="Leave blank to keep the current password"
                    className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 font-normal outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
                  />
                  <span className="mt-1 block text-xs font-normal text-slate-500">
                    Use at least 6 characters. The password is stored securely.
                  </span>
                </label>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Phone
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        phone: event.target.value,
                      }))
                    }
                    className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 font-normal outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-700">
                  Designation
                  <select
                    value={form.designation}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        designation: event.target.value,
                      }))
                    }
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 font-normal outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
                  >
                    {DESIGNATIONS.map((designation) => (
                      <option
                        key={designation.value}
                        value={designation.value}
                      >
                        {designation.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="block text-sm font-semibold text-slate-700">
                Date of joining
                <span className="relative mt-1.5 block">
                  <CalendarDays
                    size={16}
                    className="pointer-events-none absolute left-3 top-3 text-slate-400"
                  />
                  <input
                    type="date"
                    value={form.dateOfJoining}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        dateOfJoining: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 py-2.5 pl-9 pr-3.5 font-normal outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
                  />
                </span>
              </label>
              {!editingUser && (
                <p className="rounded-xl bg-amber-50 px-3.5 py-3 text-sm text-amber-800">
                  A temporary password will be generated and shown once after
                  creation. Share it securely with the new admin.
                </p>
              )}
              {error && (
                <p className="rounded-xl bg-red-50 px-3.5 py-3 text-sm text-red-700">
                  {error}
                </p>
              )}
              <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={saving}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
                >
                  {saving ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : editingUser ? (
                    <Pencil size={16} />
                  ) : (
                    <Plus size={16} />
                  )}
                  {editingUser ? "Save Changes" : "Create Admin User"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {credentials && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/50 p-4">
          <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <KeyRound size={22} />
            </div>
            <h2 className="mt-4 text-lg font-bold text-slate-900">
              Admin account created
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Save or securely share these login details. The temporary
              password will not be shown again.
            </p>
            <dl className="mt-4 space-y-3 rounded-xl bg-slate-50 p-4 text-sm">
              <div>
                <dt className="text-xs text-slate-500">Email</dt>
                <dd className="mt-1 font-semibold text-slate-900">
                  {credentials.email}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Temporary password</dt>
                <dd className="mt-1 break-all font-mono font-semibold text-slate-900">
                  {credentials.tempPassword}
                </dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={() => setCredentials(null)}
              className="mt-5 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Done
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
