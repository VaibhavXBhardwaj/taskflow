"use client";

import type { Task } from "@prisma/client";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
}

const priorityConfig = {
  LOW: { label: "Low", className: "bg-zinc-100 text-zinc-500" },
  MEDIUM: { label: "Medium", className: "bg-amber-50 text-amber-600" },
  HIGH: { label: "High", className: "bg-red-50 text-red-600" },
};

const statusConfig = {
  PENDING: { label: "Pending", className: "bg-zinc-100 text-zinc-500" },
  IN_PROGRESS: { label: "In Progress", className: "bg-blue-50 text-blue-600" },
  COMPLETED: { label: "Completed", className: "bg-emerald-50 text-emerald-600" },
};

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const priority = priorityConfig[task.priority];
  const status = statusConfig[task.status];

  function handleStatusCycle() {
    const next =
      task.status === "PENDING"
        ? "IN_PROGRESS"
        : task.status === "IN_PROGRESS"
        ? "COMPLETED"
        : "PENDING";
    onStatusChange(task.id, next);
  }

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "COMPLETED";

  return (
    <div className="bg-white border border-zinc-100 rounded-xl p-4 hover:border-zinc-200 transition-colors group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          {/* Checkbox */}
          <button
            onClick={handleStatusCycle}
            aria-label="Cycle status"
            className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
              task.status === "COMPLETED"
                ? "bg-zinc-900 border-zinc-900"
                : "border-zinc-300 hover:border-zinc-500"
            }`}
          >
            {task.status === "COMPLETED" && (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 5L4 7L8 3"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          <div className="min-w-0">
            <p
              className={`text-sm font-medium leading-snug ${
                task.status === "COMPLETED"
                  ? "line-through text-zinc-400"
                  : "text-zinc-900"
              }`}
            >
              {task.title}
            </p>
            {task.description && (
              <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed line-clamp-2">
                {task.description}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status.className}`}>
                {status.label}
              </span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priority.className}`}>
                {priority.label}
              </span>
              {task.dueDate && (
                <span className={`text-xs ${isOverdue ? "text-red-500" : "text-zinc-400"}`}>
                  {isOverdue ? "Overdue · " : "Due "}
                  {new Date(task.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-zinc-100 transition-colors text-zinc-400 hover:text-zinc-600"
            aria-label="Edit task"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path
                d="M11.5 2.5L13.5 4.5L6 12H4V10L11.5 2.5Z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors text-zinc-400 hover:text-red-500"
            aria-label="Delete task"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 4H13M6 4V2H10V4M5 4L5.5 13H10.5L11 4"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}