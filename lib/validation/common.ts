import { z } from "zod";

export const requiredTextSchema = z
  .string()
  .trim()
  .min(1, "Field wajib diisi.");

export const emailSchema = z
  .string()
  .trim()
  .email("Format email tidak valid.");

export const optionalTextSchema = z
  .string()
  .trim()
  .optional();

export const positiveNumberSchema = z
  .number()
  .min(0, "Nilai tidak boleh kurang dari 0.");