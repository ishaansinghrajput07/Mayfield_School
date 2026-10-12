
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  Filter,
  Globe,
  Loader2,
  RefreshCw,
  Search,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { api, getMessage } from "../services/api";

const DEFAULT_LIMIT = 20;

const ACTION_OPTIONS = [
  "ALL",
  "CREATE",
  "UPDATE",
  "DELETE",
  "LOGIN",
  "LOGOUT",
];

const ENTITY_OPTIONS = [
  "ALL",
  "User",
  "Student",
  "Parent",
  "Teacher",
  "Attendance",
  "Progress",
  "Payment",
  "Admission",
  "Class",
  "Section",
  "Program",
  "Subject",
  "Notification",
];

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/10";

const buttonClass =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50";

const getUserName = (user) => {
  if (!user) return "System";

  const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();

  return name || user.userId || user.email || "Unknown User";
};

const getUserInitials = (user) => {
  const name = getUserName(user);

  if (!name || name === "System") {
    return "S";
  }

  const parts = name.split(" ").filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const formatDateTime = (dateValue) => {
  if (!dateValue) return "—";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const formatDate = (dateValue) => {
  if (!dateValue) return "—";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatValue = (value) => {
  if (value === null || value === undefined) {
    return "null";
  }

  if (typeof value === "object") {
    return JSON.stringify(value, null, 2);
  }

  return String(value);
};

const getActionClass = (action) => {
  const normalized = String(action || "").toUpperCase();

  if (normalized === "CREATE") {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }

  if (normalized === "UPDATE") {
    return "bg-blue-50 text-blue-700 border-blue-200";
  }

  if (normalized === "DELETE") {
    return "bg-red-50 text-red-700 border-red-200";
  }

  if (normalized === "LOGIN") {
    return "bg-violet-50 text-violet-700 border-violet-200";
  }

  if (normalized === "LOGOUT") {
    return "bg-orange-50 text-orange-700 border-orange-200";
  }

  return "bg-gray-50 text-gray-700 border-gray-200";
};

const formatEntityName = (entity) => {
  if (!entity) return "—";

  const value = String(entity).trim();

  if (!value) return "—";

  return value
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(DEFAULT_LIMIT);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: DEFAULT_LIMIT,
    total: 0,
    totalPages: 0,
  });

  const [filters, setFilters] = useState({
    action: "ALL",
    entity: "ALL",
    userId: "",
    startDate: "",
    endDate: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({
    action: "ALL",
    entity: "ALL",
    userId: "",
    startDate: "",
    endDate: "",
  });

  const [searchUser, setSearchUser] = useState("");

  const [selectedLog, setSelectedLog] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");

  const [showFilters, setShowFilters] = useState(true);

  const fetchAuditLogs = useCallback(
    async ({
      targetPage = 1,
      targetFilters = appliedFilters,
      isRefresh = false,
    } = {}) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const params = {
          page: targetPage,
          limit,
        };

        if (
          targetFilters.action &&
          targetFilters.action !== "ALL"
        ) {
          params.action = targetFilters.action;
        }

        if (
          targetFilters.entity &&
          targetFilters.entity !== "ALL"
        ) {
          params.entity = targetFilters.entity;
        }

        if (targetFilters.userId?.trim()) {
          params.userId = targetFilters.userId.trim();
        }

        if (targetFilters.startDate) {
          params.startDate = targetFilters.startDate;
        }

        if (targetFilters.endDate) {
          params.endDate = targetFilters.endDate;
        }

        const response = await api.get("/audit-logs", {
          params,
        });

        const responseData = response?.data;

        if (!responseData?.success) {
          throw new Error(
            responseData?.message ||
              "Failed to fetch audit logs"
          );
        }

        const data = responseData?.data;

        setLogs(Array.isArray(data?.items) ? data.items : []);

        setPagination({
          page: data?.pagination?.page || targetPage,
          limit: data?.pagination?.limit || limit,
          total: data?.pagination?.total || 0,
          totalPages:
            data?.pagination?.totalPages || 0,
        });

        setPage(data?.pagination?.page || targetPage);
      } catch (fetchError) {
        console.error(
          "Fetch audit logs error:",
          fetchError
        );

        setLogs([]);

        setPagination({
          page: targetPage,
          limit,
          total: 0,
          totalPages: 0,
        });

        setError(
          getMessage(
            fetchError,
            "Failed to fetch audit logs"
          )
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [appliedFilters, limit]
  );

  useEffect(() => {
    fetchAuditLogs({
      targetPage: page,
      targetFilters: appliedFilters,
    });
  }, [page, appliedFilters, fetchAuditLogs]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleApplyFilters = (event) => {
    event?.preventDefault();

    if (
      filters.startDate &&
      filters.endDate &&
      filters.startDate > filters.endDate
    ) {
      setError(
        "Start date cannot be greater than end date."
      );
      return;
    }

    setError("");

    setPage(1);

    setAppliedFilters({
      action: filters.action,
      entity: filters.entity,
      userId: filters.userId.trim(),
      startDate: filters.startDate,
      endDate: filters.endDate,
    });
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      action: "ALL",
      entity: "ALL",
      userId: "",
      startDate: "",
      endDate: "",
    };

    setFilters(clearedFilters);
    setAppliedFilters(clearedFilters);
    setPage(1);
    setError("");
  };

  const handleRefresh = () => {
    fetchAuditLogs({
      targetPage: page,
      targetFilters: appliedFilters,
      isRefresh: true,
    });
  };

  const handlePreviousPage = () => {
    if (pagination.page > 1) {
      setPage((current) => current - 1);
    }
  };

  const handleNextPage = () => {
    if (
      pagination.totalPages > 0 &&
      pagination.page < pagination.totalPages
    ) {
      setPage((current) => current + 1);
    }
  };

  const handleOpenDetails = async (log) => {
    if (!log?._id) {
      return;
    }

    setSelectedLog(log);
    setDetailsError("");

    try {
      setDetailsLoading(true);

      const response = await api.get(
        `/audit-logs/${log._id}`
      );

      const responseData = response?.data;

      if (!responseData?.success) {
        throw new Error(
          responseData?.message ||
            "Failed to fetch audit log details"
        );
      }

      setSelectedLog(
        responseData?.data || log
      );
    } catch (detailsFetchError) {
      console.error(
        "Fetch audit log details error:",
        detailsFetchError
      );

      setDetailsError(
        getMessage(
          detailsFetchError,
          "Failed to fetch audit log details"
        )
      );
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleCloseDetails = () => {
    setSelectedLog(null);
    setDetailsError("");
    setDetailsLoading(false);
  };

  const filteredLogs = useMemo(() => {
    const search = searchUser.trim().toLowerCase();

    if (!search) {
      return logs;
    }

    return logs.filter((log) => {
      const user = log?.userId;

      const searchableText = [
        getUserName(user),
        user?.email,
        user?.userId,
        user?.role,
        log?.action,
        log?.entity,
        log?.entityId,
        log?.ipAddress,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(search);
    });
  }, [logs, searchUser]);

  const pageStart =
    pagination.total === 0
      ? 0
      : (pagination.page - 1) * pagination.limit + 1;

  const pageEnd =
    pagination.total === 0
      ? 0
      : Math.min(
          pagination.page * pagination.limit,
          pagination.total
        );

  const hasActiveFilters =
    appliedFilters.action !== "ALL" ||
    appliedFilters.entity !== "ALL" ||
    Boolean(appliedFilters.userId) ||
    Boolean(appliedFilters.startDate) ||
    Boolean(appliedFilters.endDate);

  return (
    <div className="min-h-screen bg-[#f7f7f5] px-5 py-6 md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
              <ShieldCheck size={15} />
              Security & Activity
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-950 md:text-3xl">
              Audit Logs
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Track important actions performed inside
              the CRM.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading || refreshing}
            className={buttonClass}
          >
            {refreshing ? (
              <Loader2
                size={17}
                className="animate-spin"
              />
            ) : (
              <RefreshCw size={17} />
            )}
            Refresh
          </button>
        </div>

        {/* Summary */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Activity size={20} />
            </div>

            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Total Logs
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-950">
              {pagination.total}
            </p>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Clock3 size={20} />
            </div>

            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Current Page
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-950">
              {pagination.page}
              <span className="ml-1 text-sm font-medium text-gray-400">
                / {pagination.totalPages || 1}
              </span>
            </p>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:col-span-2 xl:col-span-1">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <User size={20} />
            </div>

            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Showing
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-950">
              {pageStart}-{pageEnd}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
          <button
            type="button"
            onClick={() =>
              setShowFilters((current) => !current)
            }
            className="flex w-full items-center justify-between px-5 py-4 text-left"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <Filter size={18} />
              Filters
              {hasActiveFilters && (
                <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600">
                  Active
                </span>
              )}
            </span>

            <ChevronRight
              size={18}
              className={`transition-transform ${
                showFilters ? "rotate-90" : ""
              }`}
            />
          </button>

          {showFilters && (
            <form
              onSubmit={handleApplyFilters}
              className="border-t border-black/5 p-5"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
                {/* Action */}
                <div>
                  <label
                    htmlFor="action"
                    className="mb-1.5 block text-xs font-semibold text-gray-600"
                  >
                    Action
                  </label>

                  <select
                    id="action"
                    name="action"
                    value={filters.action}
                    onChange={handleFilterChange}
                    className={inputClass}
                  >
                    {ACTION_OPTIONS.map(
                      (action) => (
                        <option
                          key={action}
                          value={action}
                        >
                          {action === "ALL"
                            ? "All actions"
                            : action}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* Entity */}
                <div>
                  <label
                    htmlFor="entity"
                    className="mb-1.5 block text-xs font-semibold text-gray-600"
                  >
                    Entity
                  </label>

                  <select
                    id="entity"
                    name="entity"
                    value={filters.entity}
                    onChange={handleFilterChange}
                    className={inputClass}
                  >
                    {ENTITY_OPTIONS.map(
                      (entity) => (
                        <option
                          key={entity}
                          value={entity}
                        >
                          {entity === "ALL"
                            ? "All entities"
                            : entity}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* User ID */}
                <div>
                  <label
                    htmlFor="userId"
                    className="mb-1.5 block text-xs font-semibold text-gray-600"
                  >
                    User ID
                  </label>

                  <input
                    id="userId"
                    name="userId"
                    type="text"
                    value={filters.userId}
                    onChange={handleFilterChange}
                    placeholder="MongoDB user ID"
                    className={inputClass}
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label
                    htmlFor="startDate"
                    className="mb-1.5 block text-xs font-semibold text-gray-600"
                  >
                    Start Date
                  </label>

                  <input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                    className={inputClass}
                  />
                </div>

                {/* End Date */}
                <div>
                  <label
                    htmlFor="endDate"
                    className="mb-1.5 block text-xs font-semibold text-gray-600"
                  >
                    End Date
                  </label>

                  <input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={filters.endDate}
                    onChange={handleFilterChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-gray-500">
                  Date filters use the audit log creation
                  date.
                </p>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className={buttonClass}
                  >
                    Clear
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
                  >
                    <Search size={17} />
                    Apply Filters
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Search current page */}
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchUser}
              onChange={(event) =>
                setSearchUser(event.target.value)
              }
              placeholder="Search current page..."
              className="w-full rounded-xl border border-black/10 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
            />
          </div>

          {searchUser && (
            <button
              type="button"
              onClick={() => setSearchUser("")}
              className="inline-flex items-center gap-2 self-start rounded-lg px-3 py-2 text-xs font-medium text-gray-500 hover:bg-gray-100"
            >
              <X size={14} />
              Clear search
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 flex items-start justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <div>
              <p className="font-semibold">
                Unable to load audit logs
              </p>
              <p className="mt-0.5 text-red-600">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                fetchAuditLogs({
                  targetPage: page,
                  targetFilters: appliedFilters,
                })
              }
              className="shrink-0 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100"
            >
              Retry
            </button>
          </div>
        )}

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
          {loading ? (
            <div className="flex min-h-[420px] items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-gray-500">
                <Loader2
                  size={30}
                  className="animate-spin text-red-600"
                />
                <p className="text-sm">
                  Loading audit logs...
                </p>
              </div>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
                <Activity size={25} />
              </div>

              <h3 className="text-base font-semibold text-gray-900">
                No audit logs found
              </h3>

              <p className="mt-1 max-w-md text-sm text-gray-500">
                {searchUser
                  ? "No logs on the current page match your search."
                  : hasActiveFilters
                  ? "No audit logs match the selected filters."
                  : "There are no audit logs available yet."}
              </p>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="mt-4 rounded-xl bg-gray-950 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] border-collapse">
                  <thead>
                    <tr className="border-b border-black/5 bg-gray-50/80">
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Date & Time
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        User
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Action
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Entity
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Entity ID
                      </th>

                      <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Details
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredLogs.map((log) => {
                      const user = log?.userId;

                      return (
                        <tr
                          key={log._id}
                          className="border-b border-black/5 last:border-b-0 hover:bg-gray-50/70"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                                <CalendarDays
                                  size={16}
                                />
                              </div>

                              <div>
                                <p className="whitespace-nowrap text-sm font-medium text-gray-900">
                                  {formatDateTime(
                                    log.createdAt
                                  )}
                                </p>

                                <p className="mt-0.5 text-xs text-gray-400">
                                  {formatDate(
                                    log.createdAt
                                  )}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-950 text-xs font-bold text-white">
                                {getUserInitials(
                                  user
                                )}
                              </div>

                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-gray-900">
                                  {getUserName(user)}
                                </p>

                                <p className="truncate text-xs text-gray-500">
                                  {user?.email ||
                                    "System action"}
                                </p>

                                {user?.role && (
                                  <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                    {user.role}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${getActionClass(
                                log.action
                              )}`}
                            >
                              {log.action ||
                                "UNKNOWN"}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <span className="text-sm font-medium text-gray-800">
                              {formatEntityName(
                                log.entity
                              )}
                            </span>
                          </td>

                          <td className="max-w-[220px] px-5 py-4">
                            <span
                              title={
                                log.entityId ||
                                ""
                              }
                              className="block truncate font-mono text-xs text-gray-500"
                            >
                              {log.entityId ||
                                "—"}
                            </span>
                          </td>

                          <td className="px-5 py-4 text-right">
                            <button
                              type="button"
                              onClick={() =>
                                handleOpenDetails(
                                  log
                                )
                              }
                              className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                            >
                              <Eye size={15} />
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex flex-col gap-3 border-t border-black/5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-gray-500">
                  Showing{" "}
                  <span className="font-semibold text-gray-800">
                    {pageStart}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-gray-800">
                    {pageEnd}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-800">
                    {pagination.total}
                  </span>{" "}
                  logs
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePreviousPage}
                    disabled={
                      pagination.page <= 1
                    }
                    className={buttonClass}
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </button>

                  <div className="rounded-xl bg-gray-950 px-3.5 py-2.5 text-xs font-semibold text-white">
                    {pagination.page} /{" "}
                    {pagination.totalPages || 1}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextPage}
                    disabled={
                      pagination.page >=
                      pagination.totalPages
                    }
                    className={buttonClass}
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {selectedLog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              handleCloseDetails();
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-black/5 px-5 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    size={18}
                    className="text-red-600"
                  />

                  <h2 className="text-lg font-bold text-gray-950">
                    Audit Log Details
                  </h2>
                </div>

                <p className="mt-1 text-xs text-gray-500">
                  {selectedLog._id}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseDetails}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                <X size={19} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="max-h-[calc(90vh-75px)] overflow-y-auto p-5">
              {detailsLoading ? (
                <div className="flex min-h-[300px] items-center justify-center">
                  <div className="flex flex-col items-center gap-3 text-gray-500">
                    <Loader2
                      size={28}
                      className="animate-spin text-red-600"
                    />
                    <p className="text-sm">
                      Loading details...
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {detailsError && (
                    <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {detailsError}
                    </div>
                  )}

                  {/* Basic information */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-black/5 bg-gray-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Action
                      </p>

                      <div className="mt-2">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${getActionClass(
                            selectedLog.action
                          )}`}
                        >
                          {selectedLog.action ||
                            "UNKNOWN"}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-black/5 bg-gray-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Entity
                      </p>

                      <p className="mt-2 text-sm font-semibold text-gray-900">
                        {formatEntityName(
                          selectedLog.entity
                        )}
                      </p>
                    </div>

                    <div className="rounded-xl border border-black/5 bg-gray-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Entity ID
                      </p>

                      <p className="mt-2 break-all font-mono text-xs text-gray-700">
                        {selectedLog.entityId ||
                          "—"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-black/5 bg-gray-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Created At
                      </p>

                      <p className="mt-2 text-sm font-medium text-gray-900">
                        {formatDateTime(
                          selectedLog.createdAt
                        )}
                      </p>
                    </div>
                  </div>

                  {/* User */}
                  <div className="mt-5 rounded-xl border border-black/5 bg-white p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <User
                        size={17}
                        className="text-gray-500"
                      />

                      <h3 className="text-sm font-bold text-gray-900">
                        User
                      </h3>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-950 text-sm font-bold text-white">
                        {getUserInitials(
                          selectedLog.userId
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {getUserName(
                            selectedLog.userId
                          )}
                        </p>

                        <p className="mt-0.5 text-xs text-gray-500">
                          {selectedLog.userId
                            ?.email || "—"}
                        </p>

                        <div className="mt-1 flex flex-wrap gap-2">
                          {selectedLog.userId
                            ?.role && (
                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold uppercase text-gray-600">
                              {
                                selectedLog
                                  .userId
                                  .role
                              }
                            </span>
                          )}

                          {selectedLog.userId
                            ?.userId && (
                            <span className="rounded-full bg-gray-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-gray-600">
                              {
                                selectedLog
                                  .userId
                                  .userId
                              }
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Request information */}
                  <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-black/5 bg-white p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <Globe
                          size={17}
                          className="text-gray-500"
                        />

                        <h3 className="text-sm font-bold text-gray-900">
                          IP Address
                        </h3>
                      </div>

                      <p className="break-all font-mono text-xs text-gray-600">
                        {selectedLog.ipAddress ||
                          "Not available"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-black/5 bg-white p-4">
                      <h3 className="mb-3 text-sm font-bold text-gray-900">
                        User Agent
                      </h3>

                      <p className="break-all text-xs leading-5 text-gray-600">
                        {selectedLog.userAgent ||
                          "Not available"}
                      </p>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="mt-5 rounded-xl border border-black/5 bg-gray-950 p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h3 className="text-sm font-bold text-white">
                        Metadata
                      </h3>

                      <span className="text-[11px] font-medium text-gray-400">
                        Raw audit data
                      </span>
                    </div>

                    <pre className="max-h-[350px] overflow-auto whitespace-pre-wrap break-words rounded-xl bg-black/30 p-4 font-mono text-xs leading-5 text-gray-200">
                      {formatValue(
                        selectedLog.metadata
                      )}
                    </pre>
                  </div>

                  {/* Updated */}
                  <div className="mt-5 flex items-center justify-between gap-4 border-t border-black/5 pt-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-400">
                        Created
                      </p>

                      <p className="mt-1 text-xs text-gray-600">
                        {formatDateTime(
                          selectedLog.createdAt
                        )}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-semibold text-gray-400">
                        Last Updated
                      </p>

                      <p className="mt-1 text-xs text-gray-600">
                        {formatDateTime(
                          selectedLog.updatedAt
                        )}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditLogs;
