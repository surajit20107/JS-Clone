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
    .min(8, "Password must be at least 8 characters long")
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
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password cannot exceed 100 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&#^()_\-+=]/,
      "Password must contain at least one special character",
    ),
});

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  price: z
    .number()
    .min(1, { message: "Price must be at least 1" }),
  description: z
    .string()
    .trim()
    .min(10, { message: "Description must be at least 10 characters long" }),
  image: z
    .string()
    .trim()
    .url({ message: "Invalid image URL" }),
  category: z
    .string()
    .trim()
    .min(3, { message: "Category must be at least 3 characters long" }),
  stock: z
    .number()
    .int()
    .optional(),
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating cannot exceed 5" })
    .optional(),
});
