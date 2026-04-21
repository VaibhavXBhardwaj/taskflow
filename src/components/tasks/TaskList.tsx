"use client";

import { useState, useEffect, useCallback } from "react";
import type { Task } from "@prisma/client";
import { TaskCard } from "./TaskCard";
import { TaskModal } from "./TaskModal";

const FILTERS = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Completed", value: "COMPLETED" },
];

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const url =
        filter === "ALL" ? "/api/tasks" : `/api/tasks?status=${filter}`;
      const res = await fetch(url);
      const json = await res.json();
      setTasks(json.data ?? []);
    } catch {
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this task?")) return;
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  async function handleStatusChange(id: string, status: string) {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const json = await res.json();
    if (res.ok) {
      setTasks((prev) => prev.map((t) => (t.id === id ? json.data : t)));
    }
  }

  function handleEdit(task: Task) {
    setEditingTask(task);
    setModalOpen(true);
  }

  function handleNew() {
    setEditingTask(null);
    setModalOpen(true);
  }

  // Stats
  const total = tasks.length;
  const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const completed = tasks.filter((t) => t.status === "COMPLETED").length;

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Tasks", value: total },
          { label: "In Progress", value: inProgress },
          { label: "Completed", value: completed },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-zinc-100 p-5">
            <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
              {stat.label}
            </p>
            <p className="text-3xl font-semibold text-zinc-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-lg">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === f.value
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleNew}
          className="flex items-center gap-1.5 bg-zinc-900 text-white text-sm font-medium
            px-4 py-2 rounded-lg hover:bg-zinc-700 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
          New task
        </button>
      </div>

      {/* Task list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-zinc-100 rounded-xl p-4 animate-pulse">
              <div className="h-4 bg-zinc-100 rounded w-2/3 mb-2" />
              <div className="h-3 bg-zinc-100 rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <div className="bg-white rounded-xl border border-zinc-100 p-16 text-center">
          <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-zinc-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <h3 className="font-medium text-zinc-700 mb-1">No tasks found</h3>
          <p className="text-sm text-zinc-400 mb-4">
            {filter === "ALL" ? "Create your first task to get started." : `No ${filter.toLowerCase().replace("_", " ")} tasks.`}
          </p>
          {filter === "ALL" && (
            <button
              onClick={handleNew}
              className="text-sm font-medium text-zinc-900 underline underline-offset-4 hover:no-underline"
            >
              Create a task
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}

      <TaskModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
        onSaved={fetchTasks}
        task={editingTask}
      />
    </>
  );
}