import React from "react";
import {
  Bell,
  Check,
  CheckCheck,
  RefreshCw,
  Mail,
  AlertCircle,
  CreditCard,
  CalendarDays,
  MessageSquare,
  Info,
} from "lucide-react";

import { useNotifications } from "../context/NotificationContext";

const getNotificationIcon = (type) => {
  switch (type) {
    case "attendance_absent":
      return <CalendarDays size={18} />;

    case "renewal_reminder":
    case "renewal_overdue":
      return <RefreshCw size={18} />;

    case "payment_success":
      return <CreditCard size={18} />;

    case "query_response":
      return <MessageSquare size={18} />;

    case "class_reminder":
      return <CalendarDays size={18} />;

    default:
      return <Info size={18} />;
  }
};

const getNotificationLabel = (type) => {
  switch (type) {
    case "attendance_absent":
      return "Attendance";

    case "renewal_reminder":
      return "Renewal Reminder";

    case "renewal_overdue":
      return "Renewal Overdue";

    case "payment_success":
      return "Payment";

    case "query_response":
      return "Query";

    case "class_reminder":
      return "Class Reminder";

    default:
      return "General";
  }
};

const formatNotificationDate = (date) => {
  if (!date) return "";

  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "";
  }

  return value.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Notifications = () => {
  const {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    refreshNotifications,
  } = useNotifications();

  const totalCount = notifications.length;
  const readCount = Math.max(
    0,
    totalCount - unreadCount
  );

  return (
    <div className="min-h-full bg-slate-50 px-5 py-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
                <Bell size={21} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-950">
                  Notifications
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  View and manage your CRM notifications.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={refreshNotifications}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={16}
                className={
                  loading ? "animate-spin" : ""
                }
              />

              Refresh
            </button>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <CheckCheck size={16} />

                Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">
              Total
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-950">
              {totalCount}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">
              Unread
            </p>

            <p className="mt-2 text-3xl font-bold text-red-600">
              {unreadCount}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">
              Read
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-600">
              {readCount}
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
            <AlertCircle
              size={19}
              className="mt-0.5 shrink-0"
            />

            <div>
              <p className="font-semibold">
                Unable to load notifications
              </p>

              <p className="mt-1 text-sm">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="h-5 w-48 rounded bg-slate-200" />

                <div className="mt-3 h-4 w-full rounded bg-slate-100" />

                <div className="mt-2 h-4 w-2/3 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && notifications.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <Bell size={24} />
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-950">
              No notifications
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              You don't have any notifications yet.
            </p>
          </div>
        )}

        {/* Notifications */}
        {!loading && notifications.length > 0 && (
          <div className="space-y-3">
            {notifications.map((notification) => {
              const isUnread =
                notification?.isRead === false;

              return (
                <div
                  key={notification._id}
                  className={`rounded-2xl border bg-white p-5 transition ${
                    isUnread
                      ? "border-red-200 shadow-sm"
                      : "border-slate-200"
                  }`}
                >
                  <div className="flex gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        isUnread
                          ? "bg-red-50 text-red-600"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {getNotificationIcon(
                        notification.type
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold text-slate-950">
                              {notification.title}
                            </h3>

                            {isUnread && (
                              <span className="rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-bold text-red-700">
                                New
                              </span>
                            )}
                          </div>

                          <p className="mt-1 text-xs font-medium text-slate-400">
                            {getNotificationLabel(
                              notification.type
                            )}{" "}
                            •{" "}
                            {formatNotificationDate(
                              notification.createdAt
                            )}
                          </p>
                        </div>

                        {isUnread && (
                          <button
                            type="button"
                            onClick={() =>
                              markAsRead(
                                notification._id
                              )
                            }
                            className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                          >
                            <Check size={14} />

                            Mark as read
                          </button>
                        )}
                      </div>

                      <p className="mt-4 text-sm leading-6 text-slate-600">
                        {notification.message}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        {notification.channels?.includes(
                          "in_app"
                        ) && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                            <Bell size={13} />

                            In-app
                          </span>
                        )}

                        {notification.channels?.includes(
                          "email"
                        ) && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                            <Mail size={13} />

                            Email
                          </span>
                        )}

                        {notification.deliveryStatus?.email ===
                          "sent" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                            <Check size={13} />

                            Email sent
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;