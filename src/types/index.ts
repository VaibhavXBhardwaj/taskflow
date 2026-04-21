export type { User, Task, TaskStatus, Priority } from "@prisma/client";

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}