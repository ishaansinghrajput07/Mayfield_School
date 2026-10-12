import React, { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, X } from "lucide-react";

const TOAST_DURATION = 5000;

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToast = (event) => {
      const toast = event.detail;
      if (!toast?.message) return;

      const id = `${Date.now()}-${Math.random()}`;
      setToasts((current) => [...current.slice(-3), { ...toast, id }]);
      window.setTimeout(() => {
        setToasts((current) => current.filter((item) => item.id !== id));
      }, TOAST_DURATION);
    };

    window.addEventListener("app:toast", handleToast);
    return () => window.removeEventListener("app:toast", handleToast);
  }, []);

  const dismiss = (id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  };

  return (
    <>
      {children}
      <div
        aria-live="polite"
        aria-relevant="additions"
        className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-3"
      >
        {toasts.map((toast) => {
          const isSuccess = toast.type === "success";
          const Icon = isSuccess ? CheckCircle2 : AlertCircle;
          return (
            <div
              key={toast.id}
              role={isSuccess ? "status" : "alert"}
              className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg ${
                isSuccess
                  ? "border-emerald-200 bg-white text-emerald-900"
                  : "border-red-200 bg-white text-red-900"
              }`}
            >
              <Icon
                size={19}
                className={`mt-0.5 shrink-0 ${isSuccess ? "text-emerald-600" : "text-red-600"}`}
              />
              <p className="flex-1 text-sm font-medium leading-5">{toast.message}</p>
              <button
                type="button"
                aria-label="Dismiss notification"
                onClick={() => dismiss(toast.id)}
                className="rounded p-0.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ToastProvider;
