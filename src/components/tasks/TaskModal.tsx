"use client";

import { useState, useEffect } from "react";
import type { Task } from "@prisma/client";

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  task?: Task | null;
}

export function TaskModal({ open, onClose, onSaved, task }: TaskModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "PENDING",
    priority: "MEDIUM",
    dueDate: "",
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description ?? "",
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().split("T")[0]
          : "",
      });
    } else {
      setForm({ title: "", description: "", status: "PENDING", priority: "MEDIUM", dueDate: "" });
    }
    setError(null);
  }, [task, open]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload = {
        title: form.title,
        description: form.description || undefined,
        status: form.status,
        priority: form.priority,
        dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
      };

      const url = task ? `/api/tasks/${task.id}` : "/api/tasks";
      const method = task ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Something went wrong");
        return;
      }

      onSaved();
      onClose();
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md border border-zinc-100">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-zinc-100">
          <h2 className="font-semibold text-zinc-900">
            {task ? "Edit task" : "New task"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-100 transition-colors text-zinc-400"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 4L12 12M12 4L4 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="What needs to be done?"
              className="w-full px-3.5 py-2.5 text-sm border border-zinc-200 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent
                transition-all placeholder:text-zinc-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Add more details..."
              rows={3}
              className="w-full px-3.5 py-2.5 text-sm border border-zinc-200 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent
                transition-all placeholder:text-zinc-400 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                className="w-full px-3.5 py-2.5 text-sm border border-zinc-200 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent
                  transition-all bg-white"
              >
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                Priority
              </label>
              <select
                value={form.priority}
                onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))}
                className="w-full px-3.5 py-2.5 text-sm border border-zinc-200 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent
                  transition-all bg-white"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Due date
            </label>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
              className="w-full px-3.5 py-2.5 text-sm border border-zinc-200 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent
                transition-all"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3.5 py-2.5">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-zinc-600 border border-zinc-200
                rounded-lg hover:bg-zinc-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 text-sm font-medium bg-zinc-900 text-white
                rounded-lg hover:bg-zinc-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : task ? "Save changes" : "Create task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}