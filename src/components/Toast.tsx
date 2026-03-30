"use client";

import { useState, useEffect, useCallback } from "react";

export interface Toast {
  id: string;
  type: "achievement" | "level-up" | "streak" | "xp" | "info";
  title: string;
  message: string;
  emoji: string;
  duration?: number;
}

let addToastFn: ((toast: Omit<Toast, "id">) => void) | null = null;

export function showToast(toast: Omit<Toast, "id">) {
  if (addToastFn) {
    addToastFn(toast);
  }
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const newToast: Toast = { ...toast, id };
    setToasts((prev) => [...prev.slice(-2), newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, toast.duration ?? 4000);
  }, []);

  useEffect(() => {
    addToastFn = addToast;
    return () => {
      addToastFn = null;
    };
  }, [addToast]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-slide-in-right bg-neutral-800 border border-white/10 rounded-xl p-4 shadow-2xl flex items-start gap-3"
        >
          <span className="text-2xl flex-shrink-0 mt-0.5">{toast.emoji}</span>
          <div className="min-w-0">
            <p
              className={`font-bold text-sm ${
                toast.type === "achievement"
                  ? "text-yellow-400"
                  : toast.type === "level-up"
                  ? "text-purple-400"
                  : toast.type === "streak"
                  ? "text-amber-400"
                  : toast.type === "xp"
                  ? "text-indigo-400"
                  : "text-white"
              }`}
            >
              {toast.title}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{toast.message}</p>
          </div>
          <button
            onClick={() =>
              setToasts((prev) => prev.filter((t) => t.id !== toast.id))
            }
            className="text-gray-500 hover:text-white text-xs flex-shrink-0"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
