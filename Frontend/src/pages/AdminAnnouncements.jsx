import React, { useCallback, useEffect, useState } from "react";
import {
  BellRing,
  Eye,
  Loader2,
  Megaphone,
  Pencil,
  Plus,
  RefreshCw,
  Send,
  Trash2,
  X,
} from "lucide-react";

import { useNotifications } from "../context/NotificationContext";
import { api, getMessage } from "../services/api";

const AUDIENCE_ROLES = [
  { value: "admin", label: "Admins" },
  { value: "teacher", label: "Teachers" },
  { value: "student", label: "Students" },
  { value: "parent", label: "Parents" },
];

const EMPTY_ANNOUNCEMENT = {
  title: "",
  message: "",
  link: "",
  roles: [],
};

const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
};

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_ANNOUNCEMENT);
  const [editingId, setEditingId] = useState("");
  const [viewing, setViewing] = useState(null);
  const { refreshNotifications } = useNotifications();

  const loadAnnouncements = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get(
        "/notifications/admin/announcements"
      );
      const list =
        response?.data?.announcements ||
        response?.data?.data?.announcements;
      setAnnouncements(Array.isArray(list) ? list : []);
    } catch (loadError) {
      setError(getMessage(loadError, "Unable to load announcements"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnnouncements();
  }, [loadAnnouncements]);

  const closeForm = () => {
    setFormOpen(false);
    setEditingId("");
    setForm(EMPTY_ANNOUNCEMENT);
  };

  const openCreateForm = () => {
    setError("");
    setSuccess("");
    setEditingId("");
    setForm(EMPTY_ANNOUNCEMENT);
    setFormOpen(true);
  };

  const openEditForm = (announcement) => {
    setError("");
    setSuccess("");
    setEditingId(announcement._id);
    setForm({
      title: announcement.title || "",
      message: announcement.message || "",
      link: announcement.link || "",
      roles: announcement.roles || [],
    });
    setFormOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    if (form.roles.length === 0) {
      setError("Select at least one recipient role.");
      return;
    }

    try {
      setSaving(true);
      if (editingId) {
        await api.put(
          `/notifications/admin/announcements/${editingId}`,
          form
        );
      } else {
        await api.post("/notifications/admin/announcements", form);
      }
      setSuccess(
        editingId ? "Announcement updated." : "Announcement sent."
      );
      closeForm();
      await Promise.all([loadAnnouncements(), refreshNotifications()]);
    } catch (saveError) {
      setError(getMessage(saveError, "Unable to save announcement"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (announcement) => {
    if (
      !window.confirm(
        `Delete "${announcement.title}" and remove it from recipients' inboxes?`
      )
    ) {
      return;
    }

    try {
      setDeletingId(announcement._id);
      setError("");
      setSuccess("");
      await api.delete(
        `/notifications/admin/announcements/${announcement._id}`
      );
      setSuccess("Announcement and its notifications were deleted.");
      if (viewing?._id === announcement._id) setViewing(null);
      await Promise.all([loadAnnouncements(), refreshNotifications()]);
    } catch (deleteError) {
      setError(getMessage(deleteError, "Unable to delete announcement"));
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="mx-auto min-h-full w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2">
            <div className="rounded-xl bg-amber-100 p-2 text-amber-700">
              <Megaphone size={20} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              Manage Announcements
            </h1>
          </div>
          <p className="text-sm text-slate-500">
            Create and manage in-app notifications for selected user roles.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={loadAnnouncements}
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60 sm:w-auto"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 sm:w-auto"
          >
            <Plus size={17} />
            Create Announcement
          </button>
        </div>
      </div>

      {(error || success) && (
        <div
          className={`mb-5 rounded-xl border px-4 py-3 text-sm ${
            error
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
          role={error ? "alert" : "status"}
        >
          {error || success}
        </div>
      )}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
          <h2 className="font-semibold text-slate-900">
            Existing announcements
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            View announcement details, edit the message or audience, or delete it.
          </p>
        </div>
        {loading ? (
          <div className="flex min-h-[240px] items-center justify-center gap-3 text-sm text-slate-500">
            <Loader2 size={20} className="animate-spin" />
            Loading announcements...
          </div>
        ) : announcements.length === 0 ? (
          <div className="flex min-h-[260px] flex-col items-center justify-center px-6 text-center">
            <BellRing size={38} className="text-slate-300" />
            <h3 className="mt-4 font-semibold text-slate-900">
              No announcements yet
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Create an announcement to notify users by role.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {announcements.map((announcement) => (
              <article
                key={announcement._id}
                className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-start sm:px-6"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-900">
                      {announcement.title}
                    </h3>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {announcement.recipientCount || 0} recipients
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 whitespace-pre-wrap text-sm text-slate-600">
                    {announcement.message}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    To:{" "}
                    {(announcement.roles || [])
                      .map(
                        (value) =>
                          AUDIENCE_ROLES.find(
                            (role) => role.value === value
                          )?.label || value
                      )
                      .join(", ")}
                    {" · "}
                    {announcement.unreadCount || 0} unread
                    {" · "}
                    {formatDate(announcement.createdAt)}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => setViewing(announcement)}
                    aria-label={`View ${announcement.title}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <Eye size={16} />
                    <span className="sm:hidden lg:inline">View</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditForm(announcement)}
                    aria-label={`Edit ${announcement.title}`}
                    className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(announcement)}
                    disabled={deletingId === announcement._id}
                    aria-label={`Delete ${announcement.title}`}
                    className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50 disabled:opacity-60"
                  >
                    {deletingId === announcement._id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {formOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/50 p-4">
          <section className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingId ? "Update Announcement" : "Create Announcement"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Announcements are delivered to selected roles in-app.
                </p>
              </div>
              <button
                type="button"
                onClick={closeForm}
                aria-label="Close announcement form"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
              <label className="block text-sm font-semibold text-slate-700">
                Title
                <input
                  required
                  maxLength={120}
                  value={form.title}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 font-normal outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
                />
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Message
                <textarea
                  required
                  maxLength={2000}
                  rows={4}
                  value={form.message}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      message: event.target.value,
                    }))
                  }
                  className="mt-1.5 w-full resize-y rounded-xl border border-slate-300 px-3.5 py-2.5 font-normal outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
                />
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Optional in-app link
                <input
                  value={form.link}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      link: event.target.value,
                    }))
                  }
                  placeholder="/admissions"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 font-normal outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
                />
              </label>
              <fieldset>
                <legend className="text-sm font-semibold text-slate-700">
                  Send to
                </legend>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                  {AUDIENCE_ROLES.map((role) => (
                    <label
                      key={role.value}
                      className="inline-flex items-center gap-2 text-sm text-slate-600"
                    >
                      <input
                        type="checkbox"
                        checked={form.roles.includes(role.value)}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            roles: event.target.checked
                              ? [...current.roles, role.value]
                              : current.roles.filter(
                                  (value) => value !== role.value
                                ),
                          }))
                        }
                        className="h-4 w-4 rounded border-slate-300 accent-slate-900"
                      />
                      {role.label}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeForm}
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
                  ) : editingId ? (
                    <Pencil size={16} />
                  ) : (
                    <Send size={16} />
                  )}
                  {editingId ? "Save Changes" : "Send Announcement"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {viewing && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/50 p-4">
          <section className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Announcement details
                </p>
                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  {viewing.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setViewing(null)}
                aria-label="Close announcement details"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4 p-5 sm:p-6">
              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                {viewing.message}
              </p>
              <dl className="grid gap-3 rounded-xl bg-slate-50 p-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-slate-500">Audience</dt>
                  <dd className="mt-1 font-medium text-slate-800">
                    {(viewing.roles || [])
                      .map(
                        (value) =>
                          AUDIENCE_ROLES.find(
                            (role) => role.value === value
                          )?.label || value
                      )
                      .join(", ")}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Recipients</dt>
                  <dd className="mt-1 font-medium text-slate-800">
                    {viewing.recipientCount || 0}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Unread</dt>
                  <dd className="mt-1 font-medium text-slate-800">
                    {viewing.unreadCount || 0}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Created</dt>
                  <dd className="mt-1 font-medium text-slate-800">
                    {formatDate(viewing.createdAt)}
                  </dd>
                </div>
                {viewing.link && (
                  <div className="sm:col-span-2">
                    <dt className="text-xs text-slate-500">In-app link</dt>
                    <dd className="mt-1 break-all font-medium text-slate-800">
                      {viewing.link}
                    </dd>
                  </div>
                )}
              </dl>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    const announcement = viewing;
                    setViewing(null);
                    openEditForm(announcement);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  <Pencil size={16} />
                  Edit Announcement
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
