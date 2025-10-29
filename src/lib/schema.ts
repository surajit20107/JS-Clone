import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name cannot exceed 50 characters"),

  email: z
    .email("Invalid email address")
    .trim()
    .min(15, "Email is too short")
    .max(100, "Email is too long"),

  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password cannot exceed 100 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&#^()_\-+=]/,
      "Password must contain at least one special character",
    ),
});

export const loginSchema = z.object({
  email: z
    .email("Invalid email address")
    .trim()
    .min(15, "Email is too short")
    .max(100, "Email is too long"),

  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password cannot exceed 100 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&#^()_\-+=]/,
      "Password must contain at least one special character",
    ),
});
