"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Nama wajib diisi."),

  email: z
    .string()
    .trim()
    .email("Format email tidak valid."),
});

type FormValues = z.infer<typeof formSchema>;

export function FormTest() {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  function onSubmit(data: FormValues) {
    console.log("Form data:", data);
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label htmlFor="name">
          Nama
        </Label>

        <Input
          id="name"
          placeholder="Masukkan nama"
          {...register("name")}
        />

        {errors.name && (
          <p className="text-sm text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          Email
        </Label>

        <Input
          id="email"
          type="email"
          placeholder="nama@contoh.com"
          {...register("email")}
        />

        {errors.email && (
          <p className="text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          Simpan
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={() => reset()}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}