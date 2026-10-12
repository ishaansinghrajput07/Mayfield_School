
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  Filter,
  Loader2,
  Mail,
  Phone,
  RefreshCw,
  Search,
  UserCheck,
  X,
  XCircle,
} from "lucide-react";
import { api, getMessage } from "../services/api";

const DEFAULT_LIMIT = 20;

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "contacted", label: "Contacted" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "converted", label: "Converted" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const STATUS_STYLES = {
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  contacted: "border-blue-200 bg-blue-50 text-blue-700",
  approved: "border-emerald-200 bg-emerald-50 text-emerald-700",
  rejected: "border-red-200 bg-red-50 text-red-700",
  converted: "border-violet-200 bg-violet-50 text-violet-700",
  completed: "border-green-200 bg-green-50 text-green-700",
  cancelled: "border-gray-200 bg-gray-100 text-gray-600",
};

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/10";

const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50";

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50";

const getFullName = (user) => {
  if (!user) return "—";

  const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();

  return name || user.userId || user.email || "Unknown User";
};

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusLabel = (status) => {
  if (!status) return "Unknown";

  return String(status).charAt(0).toUpperCase() + String(status).slice(1);
};

const getStatusClass = (status) => {
  return STATUS_STYLES[status] || "border-gray-200 bg-gray-50 text-gray-600";
};

const getClassName = (trial) => {
  const classData = trial?.preferredClass;

  if (!classData) return "—";

  if (classData.code) {
    return `${classData.name || "Class"} (${classData.code})`;
  }

  return classData.name || "—";
};

const TrialBookings = () => {
  const [trials, setTrials] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: DEFAULT_LIMIT,
    total: 0,
    totalPages: 0,
  });

  const [filters, setFilters] = useState({
    status: "all",
    preferredClass: "",
    assignedTo: "",
    phone: "",
    email: "",
    startDate: "",
    endDate: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({
    status: "all",
    preferredClass: "",
    assignedTo: "",
    phone: "",
    email: "",
    startDate: "",
    endDate: "",
  });

  const [showFilters, setShowFilters] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedTrial, setSelectedTrial] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");

  const [actionLoading, setActionLoading] = useState("");
  const [actionError, setActionError] = useState("");
  const [actionModal, setActionModal] = useState(null);

  const [actionForm, setActionForm] = useState({
    assignedTo: "",
    parentId: "",
    studentId: "",
    notes: "",
    cancellationReason: "",
  });

  const fetchTrials = useCallback(
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
          limit: DEFAULT_LIMIT,
        };

        if (targetFilters.status && targetFilters.status !== "all") {
          params.status = targetFilters.status;
        }

        if (targetFilters.preferredClass.trim()) {
          params.preferredClass = targetFilters.preferredClass.trim();
        }

        if (targetFilters.assignedTo.trim()) {
          params.assignedTo = targetFilters.assignedTo.trim();
        }

        if (targetFilters.phone.trim()) {
          params.phone = targetFilters.phone.trim();
        }

        if (targetFilters.email.trim()) {
          params.email = targetFilters.email.trim().toLowerCase();
        }

        if (targetFilters.startDate) {
          params.startDate = targetFilters.startDate;
        }

        if (targetFilters.endDate) {
          params.endDate = targetFilters.endDate;
        }

        const response = await api.get("/trials", { params });

        const responseData = response?.data;

        if (!responseData?.success) {
          throw new Error(
            responseData?.message || "Failed to fetch trial bookings",
          );
        }

        const data = responseData?.data;

        setTrials(Array.isArray(data?.trials) ? data.trials : []);

        setPagination({
          page: data?.page || targetPage,
          limit: data?.limit || DEFAULT_LIMIT,
          total: data?.total || 0,
          totalPages: data?.totalPages || 0,
        });

        setPage(data?.page || targetPage);
      } catch (fetchError) {
        console.error("Fetch trial bookings error:", fetchError);

        setTrials([]);

        setPagination({
          page: targetPage,
          limit: DEFAULT_LIMIT,
          total: 0,
          totalPages: 0,
        });

        setError(getMessage(fetchError, "Failed to fetch trial bookings"));
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [appliedFilters],
  );

  useEffect(() => {
    fetchTrials({
      targetPage: page,
      targetFilters: appliedFilters,
    });
  }, [page, appliedFilters, fetchTrials]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleApplyFilters = (event) => {
    event.preventDefault();

    if (
      filters.startDate &&
      filters.endDate &&
      filters.startDate > filters.endDate
    ) {
      setError("Start date cannot be greater than end date.");
      return;
    }

    setError("");
    setPage(1);

    setAppliedFilters({
      ...filters,
    });
  };

  const handleClearFilters = () => {
    const cleared = {
      status: "all",
      preferredClass: "",
      assignedTo: "",
      phone: "",
      email: "",
      startDate: "",
      endDate: "",
    };

    setFilters(cleared);
    setAppliedFilters(cleared);
    setPage(1);
    setError("");
  };

  const handleRefresh = () => {
    fetchTrials({
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
    if (pagination.totalPages > 0 && pagination.page < pagination.totalPages) {
      setPage((current) => current + 1);
    }
  };

  const handleOpenDetails = async (trial) => {
    if (!trial?._id) return;

    setSelectedTrial(trial);
    setDetailsError("");

    try {
      setDetailsLoading(true);

      const response = await api.get(`/trials/${trial._id}`);

      if (!response?.data?.success) {
        throw new Error(
          response?.data?.message || "Failed to fetch trial details",
        );
      }

      setSelectedTrial(response.data.data || trial);
    } catch (detailsFetchError) {
      console.error("Trial details error:", detailsFetchError);

      setDetailsError(
        getMessage(detailsFetchError, "Failed to fetch trial details"),
      );
    } finally {
      setDetailsLoading(false);
    }
  };

  const closeDetails = () => {
    setSelectedTrial(null);
    setDetailsError("");
  };

  const openActionModal = (type, trial) => {
    setActionError("");

    setActionForm({
      assignedTo: "",
      parentId: "",
      studentId: "",
      notes: "",
      cancellationReason: "",
    });

    setActionModal({
      type,
      trial,
    });
  };

  const closeActionModal = () => {
    if (actionLoading) return;

    setActionModal(null);
    setActionError("");
  };

  const handleActionFormChange = (event) => {
    const { name, value } = event.target;

    setActionForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const refreshAfterAction = async (updatedTrial = null) => {
    if (updatedTrial && selectedTrial?._id === updatedTrial._id) {
      setSelectedTrial(updatedTrial);
    }

    await fetchTrials({
      targetPage: page,
      targetFilters: appliedFilters,
      isRefresh: true,
    });
  };

  const executeSimpleAction = async (type, trial) => {
    if (!trial?._id) return;

    const endpointMap = {
      contact: `/trials/${trial._id}/contact`,
      approve: `/trials/${trial._id}/approve`,
      complete: `/trials/${trial._id}/complete`,
    };

    const endpoint = endpointMap[type];

    if (!endpoint) return;

    try {
      setActionLoading(type);
      setActionError("");

      const response = await api.put(endpoint);

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Action failed");
      }

      const updatedTrial = response?.data?.data || null;

      if (selectedTrial?._id === trial._id) {
        setSelectedTrial(updatedTrial);
      }

      await refreshAfterAction(updatedTrial);
    } catch (actionFetchError) {
      console.error(`${type} trial error:`, actionFetchError);

      setActionError(getMessage(actionFetchError, "Action failed"));
    } finally {
      setActionLoading("");
    }
  };

  const executeAssign = async () => {
    if (!actionModal?.trial?._id) return;

    const assignedTo = actionForm.assignedTo.trim();

    if (!assignedTo) {
      setActionError("Assigned staff ObjectId is required.");
      return;
    }

    try {
      setActionLoading("assign");
      setActionError("");

      const response = await api.put(
        `/trials/${actionModal.trial._id}/assign`,
        {
          assignedTo,
        },
      );

      if (!response?.data?.success) {
        throw new Error(
          response?.data?.message || "Failed to assign trial booking",
        );
      }

      const updatedTrial = response?.data?.data || null;

      setActionModal(null);

      if (selectedTrial?._id === actionModal.trial._id) {
        setSelectedTrial(updatedTrial);
      }

      await refreshAfterAction(updatedTrial);
    } catch (actionFetchError) {
      console.error("Assign trial error:", actionFetchError);

      setActionError(
        getMessage(actionFetchError, "Failed to assign trial booking"),
      );
    } finally {
      setActionLoading("");
    }
  };

  const executeReject = async () => {
    if (!actionModal?.trial?._id) return;

    try {
      setActionLoading("reject");
      setActionError("");

      const response = await api.put(
        `/trials/${actionModal.trial._id}/reject`,
        {
          notes: actionForm.notes.trim(),
        },
      );

      if (!response?.data?.success) {
        throw new Error(
          response?.data?.message || "Failed to reject trial booking",
        );
      }

      const updatedTrial = response?.data?.data || null;

      setActionModal(null);

      if (selectedTrial?._id === actionModal.trial._id) {
        setSelectedTrial(updatedTrial);
      }

      await refreshAfterAction(updatedTrial);
    } catch (actionFetchError) {
      console.error("Reject trial error:", actionFetchError);

      setActionError(
        getMessage(actionFetchError, "Failed to reject trial booking"),
      );
    } finally {
      setActionLoading("");
    }
  };

  const executeConvert = async () => {
    if (!actionModal?.trial?._id) return;

    const parentId = actionForm.parentId.trim();
    const studentId = actionForm.studentId.trim();

    if (!parentId || !studentId) {
      setActionError("Parent ID and Student ID are required.");
      return;
    }

    try {
      setActionLoading("convert");
      setActionError("");

      const response = await api.put(
        `/trials/${actionModal.trial._id}/convert`,
        {
          parentId,
          studentId,
        },
      );

      if (!response?.data?.success) {
        throw new Error(
          response?.data?.message || "Failed to convert trial booking",
        );
      }

      const updatedTrial = response?.data?.data || null;

      setActionModal(null);

      if (selectedTrial?._id === actionModal.trial._id) {
        setSelectedTrial(updatedTrial);
      }

      await refreshAfterAction(updatedTrial);
    } catch (actionFetchError) {
      console.error("Convert trial error:", actionFetchError);

      setActionError(
        getMessage(actionFetchError, "Failed to convert trial booking"),
      );
    } finally {
      setActionLoading("");
    }
  };

  const executeCancel = async () => {
    if (!actionModal?.trial?._id) return;

    const reason = actionForm.cancellationReason.trim();

    if (!reason) {
      setActionError("Cancellation reason is required.");
      return;
    }

    try {
      setActionLoading("cancel");
      setActionError("");

      const response = await api.put(
        `/trials/${actionModal.trial._id}/cancel`,
        {
          cancellationReason: reason,
        },
      );

      if (!response?.data?.success) {
        throw new Error(
          response?.data?.message || "Failed to cancel trial booking",
        );
      }

      const updatedTrial = response?.data?.data || null;

      setActionModal(null);

      if (selectedTrial?._id === actionModal.trial._id) {
        setSelectedTrial(updatedTrial);
      }

      await refreshAfterAction(updatedTrial);
    } catch (actionFetchError) {
      console.error("Cancel trial error:", actionFetchError);

      setActionError(
        getMessage(actionFetchError, "Failed to cancel trial booking"),
      );
    } finally {
      setActionLoading("");
    }
  };

  const filteredTrials = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return trials;
    }

    return trials.filter((trial) => {
      const searchableText = [
        trial?.trialNumber,
        trial?.name,
        trial?.phone,
        trial?.email,
        trial?.status,
        trial?.preferredClass?.name,
        trial?.preferredClass?.code,
        getFullName(trial?.assignedTo),
        trial?.assignedTo?.email,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [trials, search]);

  const hasActiveFilters =
    appliedFilters.status !== "all" ||
    Boolean(appliedFilters.preferredClass) ||
    Boolean(appliedFilters.assignedTo) ||
    Boolean(appliedFilters.phone) ||
    Boolean(appliedFilters.email) ||
    Boolean(appliedFilters.startDate) ||
    Boolean(appliedFilters.endDate);

  const stats = useMemo(() => {
    return {
      pending: trials.filter((item) => item.status === "pending").length,
      contacted: trials.filter((item) => item.status === "contacted").length,
      approved: trials.filter((item) => item.status === "approved").length,
      converted: trials.filter((item) => item.status === "converted").length,
    };
  }, [trials]);

  const pageStart =
    pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1;

  const pageEnd =
    pagination.total === 0
      ? 0
      : Math.min(pagination.page * pagination.limit, pagination.total);

  const canContact = (trial) => {
    return !["cancelled", "completed", "converted"].includes(trial?.status);
  };

  const canApprove = (trial) => {
    return ![
      "cancelled",
      "completed",
      "converted",
      "rejected",
      "approved",
    ].includes(trial?.status);
  };

  const canComplete = (trial) => {
    return !["cancelled", "rejected", "completed"].includes(trial?.status);
  };

  const canAssign = (trial) => {
    return !["cancelled", "completed", "converted"].includes(trial?.status);
  };

  const canReject = (trial) => {
    return !["cancelled", "completed", "converted", "rejected"].includes(
      trial?.status,
    );
  };

  const canConvert = (trial) => {
    return !["cancelled", "rejected", "completed", "converted"].includes(
      trial?.status,
    );
  };

  const canCancel = (trial) => {
    return !["cancelled", "completed", "converted"].includes(trial?.status);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] px-5 py-6 md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
              <CalendarDays size={15} />
              Admissions & Leads
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-950 md:text-3xl">
              Trial Bookings
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Manage visitor trial requests, follow-ups, approvals and
              conversions.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading || refreshing}
            className={secondaryButton}
          >
            {refreshing ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <RefreshCw size={17} />
            )}
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock3 size={20} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Pending
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-950">
              {stats.pending}
            </p>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Phone size={20} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Contacted
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-950">
              {stats.contacted}
            </p>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={20} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Approved
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-950">
              {stats.approved}
            </p>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <UserCheck size={20} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Converted
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-950">
              {stats.converted}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
          <button
            type="button"
            onClick={() => setShowFilters((current) => !current)}
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
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div>
                  <label
                    htmlFor="status"
                    className="mb-1.5 block text-xs font-semibold text-gray-600"
                  >
                    Status
                  </label>

                  <select
                    id="status"
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className={inputClass}
                  >
                    {STATUS_OPTIONS.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="preferredClass"
                    className="mb-1.5 block text-xs font-semibold text-gray-600"
                  >
                    Class ID
                  </label>

                  <input
                    id="preferredClass"
                    name="preferredClass"
                    value={filters.preferredClass}
                    onChange={handleFilterChange}
                    placeholder="Class ObjectId"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="assignedTo"
                    className="mb-1.5 block text-xs font-semibold text-gray-600"
                  >
                    Assigned Staff ID
                  </label>

                  <input
                    id="assignedTo"
                    name="assignedTo"
                    value={filters.assignedTo}
                    onChange={handleFilterChange}
                    placeholder="Staff ObjectId"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-xs font-semibold text-gray-600"
                  >
                    Phone
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    value={filters.phone}
                    onChange={handleFilterChange}
                    placeholder="Phone number"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-semibold text-gray-600"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={filters.email}
                    onChange={handleFilterChange}
                    placeholder="Email address"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="startDate"
                    className="mb-1.5 block text-xs font-semibold text-gray-600"
                  >
                    Trial Date From
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

                <div>
                  <label
                    htmlFor="endDate"
                    className="mb-1.5 block text-xs font-semibold text-gray-600"
                  >
                    Trial Date To
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
                  Class and staff filters require MongoDB ObjectIds.
                </p>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className={secondaryButton}
                  >
                    Clear
                  </button>

                  <button type="submit" className={primaryButton}>
                    <Search size={17} />
                    Apply Filters
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="relative max-w-lg">
            <Search
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search current page by name, phone, email, trial number..."
              className="w-full rounded-xl border border-black/10 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 flex items-start justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <div>
              <p className="font-semibold">Unable to load trial bookings</p>
              <p className="mt-0.5">{error}</p>
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              className="shrink-0 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100"
            >
              Retry
            </button>
          </div>
        )}

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
          {loading ? (
            <div className="flex min-h-[430px] items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-gray-500">
                <Loader2 size={30} className="animate-spin text-red-600" />
                <p className="text-sm">Loading trial bookings...</p>
              </div>
            </div>
          ) : filteredTrials.length === 0 ? (
            <div className="flex min-h-[430px] flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
                <CalendarDays size={25} />
              </div>

              <h3 className="text-base font-semibold text-gray-900">
                No trial bookings found
              </h3>

              <p className="mt-1 max-w-md text-sm text-gray-500">
                {search
                  ? "No trial booking on the current page matches your search."
                  : hasActiveFilters
                    ? "No trial bookings match the selected filters."
                    : "There are no trial bookings available yet."}
              </p>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="mt-4 rounded-xl bg-gray-950 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1250px] border-collapse">
                  <thead>
                    <tr className="border-b border-black/5 bg-gray-50/80">
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Trial
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Visitor
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Class
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Preferred Date
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Assigned To
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Status
                      </th>

                      <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredTrials.map((trial) => (
                      <tr
                        key={trial._id}
                        className="border-b border-black/5 last:border-b-0 hover:bg-gray-50/70"
                      >
                        <td className="px-5 py-4">
                          <p className="font-mono text-xs font-bold text-gray-900">
                            {trial.trialNumber || "—"}
                          </p>

                          <p className="mt-1 text-[11px] text-gray-400">
                            Created {formatDate(trial.createdAt)}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-950 text-xs font-bold text-white">
                              {trial.name?.slice(0, 2).toUpperCase() || "TR"}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-gray-900">
                                {trial.name || "—"}
                              </p>

                              <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                                <Phone size={12} />
                                {trial.phone || "—"}
                              </p>

                              {trial.email && (
                                <p className="mt-0.5 flex max-w-[230px] items-center gap-1 truncate text-xs text-gray-400">
                                  <Mail size={12} />
                                  {trial.email}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-gray-900">
                            {getClassName(trial)}
                          </p>

                          {trial?.preferredClass?.program && (
                            <p className="mt-1 text-xs text-gray-400">
                              Program ID: {trial.preferredClass.program}
                            </p>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <CalendarDays
                              size={16}
                              className="text-gray-400"
                            />

                            <div>
                              <p className="whitespace-nowrap text-sm font-medium text-gray-900">
                                {formatDate(trial.preferredDate)}
                              </p>

                              <p className="mt-0.5 text-xs text-gray-400">
                                Trial date
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          {trial.assignedTo ? (
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {getFullName(trial.assignedTo)}
                              </p>

                              <p className="mt-0.5 text-xs text-gray-400">
                                {trial.assignedTo.role || "Staff"}
                              </p>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">
                              Unassigned
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${getStatusClass(
                              trial.status,
                            )}`}
                          >
                            {getStatusLabel(trial.status)}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleOpenDetails(trial)}
                              title="View details"
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 bg-white text-gray-600 hover:bg-gray-50"
                            >
                              <Eye size={16} />
                            </button>

                            {canContact(trial) && (
                              <button
                                type="button"
                                onClick={() =>
                                  executeSimpleAction("contact", trial)
                                }
                                disabled={Boolean(actionLoading)}
                                title="Mark contacted"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 disabled:opacity-50"
                              >
                                {actionLoading === "contact" ? (
                                  <Loader2
                                    size={16}
                                    className="animate-spin"
                                  />
                                ) : (
                                  <Phone size={16} />
                                )}
                              </button>
                            )}

                            {canApprove(trial) && (
                              <button
                                type="button"
                                onClick={() =>
                                  executeSimpleAction("approve", trial)
                                }
                                disabled={Boolean(actionLoading)}
                                title="Approve"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 disabled:opacity-50"
                              >
                                {actionLoading === "approve" ? (
                                  <Loader2
                                    size={16}
                                    className="animate-spin"
                                  />
                                ) : (
                                  <Check size={16} />
                                )}
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => openActionModal("manage", trial)}
                              className="rounded-lg border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                            >
                              Manage
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

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
                  trial bookings
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePreviousPage}
                    disabled={pagination.page <= 1}
                    className={secondaryButton}
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </button>

                  <div className="rounded-xl bg-gray-950 px-3.5 py-2.5 text-xs font-semibold text-white">
                    {pagination.page} / {pagination.totalPages || 1}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextPage}
                    disabled={pagination.page >= pagination.totalPages}
                    className={secondaryButton}
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
      {selectedTrial && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeDetails();
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-black/5 px-5 py-4">
              <div>
                <h2 className="text-lg font-bold text-gray-950">
                  Trial Booking Details
                </h2>

                <p className="mt-1 font-mono text-xs text-gray-400">
                  {selectedTrial.trialNumber || selectedTrial._id}
                </p>
              </div>

              <button
                type="button"
                onClick={closeDetails}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100"
              >
                <X size={19} />
              </button>
            </div>

            <div className="max-h-[calc(90vh-75px)] overflow-y-auto p-5">
              {detailsLoading ? (
                <div className="flex min-h-[350px] items-center justify-center">
                  <div className="flex flex-col items-center gap-3 text-gray-500">
                    <Loader2 size={30} className="animate-spin text-red-600" />
                    <p className="text-sm">Loading details...</p>
                  </div>
                </div>
              ) : (
                <>
                  {detailsError && (
                    <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {detailsError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-black/5 bg-gray-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Visitor
                      </p>

                      <p className="mt-2 text-lg font-bold text-gray-900">
                        {selectedTrial.name || "—"}
                      </p>

                      <div className="mt-2 space-y-1">
                        <p className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone size={15} />
                          {selectedTrial.phone || "—"}
                        </p>

                        {selectedTrial.email && (
                          <p className="flex items-center gap-2 break-all text-sm text-gray-600">
                            <Mail size={15} />
                            {selectedTrial.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="rounded-xl border border-black/5 bg-gray-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Status
                      </p>

                      <div className="mt-2">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusClass(
                            selectedTrial.status,
                          )}`}
                        >
                          {getStatusLabel(selectedTrial.status)}
                        </span>
                      </div>

                      <p className="mt-3 text-xs text-gray-500">
                        Created {formatDateTime(selectedTrial.createdAt)}
                      </p>
                    </div>

                    <div className="rounded-xl border border-black/5 bg-gray-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Preferred Class
                      </p>

                      <p className="mt-2 text-sm font-semibold text-gray-900">
                        {getClassName(selectedTrial)}
                      </p>
                    </div>

                    <div className="rounded-xl border border-black/5 bg-gray-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Preferred Date
                      </p>

                      <p className="mt-2 text-sm font-semibold text-gray-900">
                        {formatDate(selectedTrial.preferredDate)}
                      </p>
                    </div>
                  </div>

                  {selectedTrial.message && (
                    <div className="mt-5 rounded-xl border border-black/5 bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Visitor Message
                      </p>

                      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-700">
                        {selectedTrial.message}
                      </p>
                    </div>
                  )}

                  <div className="mt-5 rounded-xl border border-black/5 bg-white p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <UserCheck size={17} className="text-gray-500" />

                      <h3 className="text-sm font-bold text-gray-900">
                        Assignment
                      </h3>
                    </div>

                    {selectedTrial.assignedTo ? (
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {getFullName(selectedTrial.assignedTo)}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {selectedTrial.assignedTo.email}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">
                        No staff member assigned.
                      </p>
                    )}
                  </div>

                  <div className="mt-5 rounded-xl border border-black/5 bg-white p-4">
                    <h3 className="mb-4 text-sm font-bold text-gray-900">
                      Activity
                    </h3>

                    <div className="space-y-4">
                      {selectedTrial.contactedAt && (
                        <div className="flex gap-3">
                          <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500" />

                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              Contacted
                            </p>

                            <p className="text-xs text-gray-500">
                              {formatDateTime(selectedTrial.contactedAt)}
                            </p>

                            {selectedTrial.contactedBy && (
                              <p className="mt-1 text-xs text-gray-400">
                                By {getFullName(selectedTrial.contactedBy)}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {selectedTrial.completedAt && (
                        <div className="flex gap-3">
                          <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />

                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              Completed
                            </p>

                            <p className="text-xs text-gray-500">
                              {formatDateTime(selectedTrial.completedAt)}
                            </p>

                            {selectedTrial.completedBy && (
                              <p className="mt-1 text-xs text-gray-400">
                                By {getFullName(selectedTrial.completedBy)}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {selectedTrial.cancelledAt && (
                        <div className="flex gap-3">
                          <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-red-500" />

                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              Cancelled
                            </p>

                            <p className="text-xs text-gray-500">
                              {formatDateTime(selectedTrial.cancelledAt)}
                            </p>

                            {selectedTrial.cancellationReason && (
                              <p className="mt-1 text-xs text-gray-500">
                                Reason: {selectedTrial.cancellationReason}
                              </p>
                            )}

                            {selectedTrial.cancelledBy && (
                              <p className="mt-1 text-xs text-gray-400">
                                By {getFullName(selectedTrial.cancelledBy)}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {selectedTrial.convertedParent && (
                        <div className="flex gap-3">
                          <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-violet-500" />

                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              Converted
                            </p>

                            <p className="text-xs text-gray-500">
                              Parent:{" "}
                              {getFullName(selectedTrial.convertedParent)}
                            </p>

                            {selectedTrial.convertedStudent && (
                              <p className="mt-1 text-xs text-gray-500">
                                Student:{" "}
                                {getFullName(selectedTrial.convertedStudent)}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {!selectedTrial.contactedAt &&
                        !selectedTrial.completedAt &&
                        !selectedTrial.cancelledAt &&
                        !selectedTrial.convertedParent && (
                          <p className="text-sm text-gray-400">
                            No additional activity recorded.
                          </p>
                        )}
                    </div>
                  </div>

                  {selectedTrial.notes && (
                    <div className="mt-5 rounded-xl border border-black/5 bg-gray-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Notes
                      </p>

                      <p className="mt-2 whitespace-pre-wrap text-sm text-gray-700">
                        {selectedTrial.notes}
                      </p>
                    </div>
                  )}

                  <div className="mt-5 flex flex-wrap gap-2 border-t border-black/5 pt-5">
                    {canContact(selectedTrial) && (
                      <button
                        type="button"
                        disabled={Boolean(actionLoading)}
                        onClick={() =>
                          executeSimpleAction("contact", selectedTrial)
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100 disabled:opacity-50"
                      >
                        <Phone size={15} />
                        Mark Contacted
                      </button>
                    )}

                    {canApprove(selectedTrial) && (
                      <button
                        type="button"
                        disabled={Boolean(actionLoading)}
                        onClick={() =>
                          executeSimpleAction("approve", selectedTrial)
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 disabled:opacity-50"
                      >
                        <Check size={15} />
                        Approve
                      </button>
                    )}

                    {canAssign(selectedTrial) && (
                      <button
                        type="button"
                        onClick={() => openActionModal("assign", selectedTrial)}
                        className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                      >
                        <UserCheck size={15} />
                        Assign
                      </button>
                    )}

                    {canReject(selectedTrial) && (
                      <button
                        type="button"
                        onClick={() =>
                          openActionModal("reject", selectedTrial)
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
                      >
                        <XCircle size={15} />
                        Reject
                      </button>
                    )}

                    {canConvert(selectedTrial) && (
                      <button
                        type="button"
                        onClick={() =>
                          openActionModal("convert", selectedTrial)
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-700 hover:bg-violet-100"
                      >
                        <UserCheck size={15} />
                        Convert
                      </button>
                    )}

                    {canComplete(selectedTrial) && (
                      <button
                        type="button"
                        disabled={Boolean(actionLoading)}
                        onClick={() =>
                          executeSimpleAction("complete", selectedTrial)
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 hover:bg-green-100 disabled:opacity-50"
                      >
                        <CheckCircle2 size={15} />
                        Complete
                      </button>
                    )}

                    {canCancel(selectedTrial) && (
                      <button
                        type="button"
                        onClick={() =>
                          openActionModal("cancel", selectedTrial)
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100"
                      >
                        <XCircle size={15} />
                        Cancel
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action Modal */}
      {actionModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-black/5 px-5 py-4">
              <div>
                <h2 className="text-lg font-bold text-gray-950">
                  {actionModal.type === "assign" && "Assign Trial Booking"}
                  {actionModal.type === "reject" && "Reject Trial Booking"}
                  {actionModal.type === "convert" && "Convert Trial Booking"}
                  {actionModal.type === "cancel" && "Cancel Trial Booking"}
                  {actionModal.type === "manage" && "Manage Trial Booking"}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {actionModal.trial?.trialNumber || actionModal.trial?._id}
                </p>
              </div>

              <button
                type="button"
                onClick={closeActionModal}
                disabled={Boolean(actionLoading)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 disabled:opacity-50"
              >
                <X size={19} />
              </button>
            </div>

            <div className="p-5">
              {actionError && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {actionError}
                </div>
              )}

              {actionModal.type === "manage" && (
                <div className="grid grid-cols-1 gap-2">
                  {canAssign(actionModal.trial) && (
                    <button
                      type="button"
                      onClick={() =>
                        openActionModal("assign", actionModal.trial)
                      }
                      className="flex items-center gap-3 rounded-xl border border-black/10 p-3 text-left hover:bg-gray-50"
                    >
                      <UserCheck size={18} className="text-gray-500" />

                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          Assign Staff
                        </p>

                        <p className="text-xs text-gray-500">
                          Assign this booking to an admin or teacher.
                        </p>
                      </div>
                    </button>
                  )}

                  {canReject(actionModal.trial) && (
                    <button
                      type="button"
                      onClick={() =>
                        openActionModal("reject", actionModal.trial)
                      }
                      className="flex items-center gap-3 rounded-xl border border-black/10 p-3 text-left hover:bg-red-50"
                    >
                      <XCircle size={18} className="text-red-500" />

                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          Reject
                        </p>

                        <p className="text-xs text-gray-500">
                          Reject this trial booking.
                        </p>
                      </div>
                    </button>
                  )}

                  {canConvert(actionModal.trial) && (
                    <button
                      type="button"
                      onClick={() =>
                        openActionModal("convert", actionModal.trial)
                      }
                      className="flex items-center gap-3 rounded-xl border border-black/10 p-3 text-left hover:bg-violet-50"
                    >
                      <UserCheck size={18} className="text-violet-500" />

                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          Convert
                        </p>

                        <p className="text-xs text-gray-500">
                          Link this trial to parent and student.
                        </p>
                      </div>
                    </button>
                  )}

                  {canComplete(actionModal.trial) && (
                    <button
                      type="button"
                      onClick={async () => {
                        setActionModal(null);

                        await executeSimpleAction(
                          "complete",
                          actionModal.trial,
                        );
                      }}
                      className="flex items-center gap-3 rounded-xl border border-black/10 p-3 text-left hover:bg-green-50"
                    >
                      <CheckCircle2 size={18} className="text-green-500" />

                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          Complete
                        </p>

                        <p className="text-xs text-gray-500">
                          Mark the trial as completed.
                        </p>
                      </div>
                    </button>
                  )}

                  {canCancel(actionModal.trial) && (
                    <button
                      type="button"
                      onClick={() =>
                        openActionModal("cancel", actionModal.trial)
                      }
                      className="flex items-center gap-3 rounded-xl border border-black/10 p-3 text-left hover:bg-gray-50"
                    >
                      <XCircle size={18} className="text-gray-500" />

                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          Cancel
                        </p>

                        <p className="text-xs text-gray-500">
                          Cancel this trial booking.
                        </p>
                      </div>
                    </button>
                  )}
                </div>
              )}

              {actionModal.type === "assign" && (
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                    Staff User ObjectId
                  </label>

                  <input
                    name="assignedTo"
                    value={actionForm.assignedTo}
                    onChange={handleActionFormChange}
                    placeholder="Enter active admin/teacher ObjectId"
                    className={inputClass}
                  />

                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    Backend accepts only a valid MongoDB User ObjectId for an
                    active admin or teacher.
                  </p>

                  <div className="mt-5 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={closeActionModal}
                      className={secondaryButton}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={executeAssign}
                      disabled={actionLoading === "assign"}
                      className={primaryButton}
                    >
                      {actionLoading === "assign" ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <UserCheck size={16} />
                      )}
                      Assign
                    </button>
                  </div>
                </div>
              )}

              {actionModal.type === "reject" && (
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                    Notes
                  </label>

                  <textarea
                    name="notes"
                    value={actionForm.notes}
                    onChange={handleActionFormChange}
                    rows={5}
                    placeholder="Optional rejection notes..."
                    className={`${inputClass} resize-none`}
                  />

                  <div className="mt-5 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={closeActionModal}
                      className={secondaryButton}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={executeReject}
                      disabled={actionLoading === "reject"}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                    >
                      {actionLoading === "reject" ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <XCircle size={16} />
                      )}
                      Reject
                    </button>
                  </div>
                </div>
              )}

              {actionModal.type === "convert" && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                      Parent User ObjectId
                    </label>

                    <input
                      name="parentId"
                      value={actionForm.parentId}
                      onChange={handleActionFormChange}
                      placeholder="Enter parent ObjectId"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                      Student User ObjectId
                    </label>

                    <input
                      name="studentId"
                      value={actionForm.studentId}
                      onChange={handleActionFormChange}
                      placeholder="Enter student ObjectId"
                      className={inputClass}
                    />
                  </div>

                  <div className="rounded-xl border border-violet-100 bg-violet-50 p-3 text-xs leading-5 text-violet-700">
                    Both IDs must belong to active users with roles{" "}
                    <strong>parent</strong> and <strong>student</strong>.
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={closeActionModal}
                      className={secondaryButton}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={executeConvert}
                      disabled={actionLoading === "convert"}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-50"
                    >
                      {actionLoading === "convert" ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <UserCheck size={16} />
                      )}
                      Convert
                    </button>
                  </div>
                </div>
              )}

              {actionModal.type === "cancel" && (
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                    Cancellation Reason
                  </label>

                  <textarea
                    name="cancellationReason"
                    value={actionForm.cancellationReason}
                    onChange={handleActionFormChange}
                    rows={5}
                    placeholder="Enter cancellation reason..."
                    className={`${inputClass} resize-none`}
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    Cancellation reason is required by the backend.
                  </p>

                  <div className="mt-5 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={closeActionModal}
                      className={secondaryButton}
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={executeCancel}
                      disabled={actionLoading === "cancel"}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
                    >
                      {actionLoading === "cancel" ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <XCircle size={16} />
                      )}
                      Cancel Trial
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrialBookings;
