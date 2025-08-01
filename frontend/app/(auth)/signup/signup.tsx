"use client";

import { useForm } from "react-hook-form";
import api from "@/app/lib/api";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "candidate" | "employer";
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      role: "candidate",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await api.post("/register", {
        username: data.username,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
        role: data.role,
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("Registration successful!");
        reset();
      }
    } catch (error: any) {
      if (error.response?.status === 422) {
        const serverErrors = error.response.data.errors;
        Object.entries(serverErrors).forEach(([field, messages]) => {
          setError(field as keyof FormValues, {
            type: "server",
            message: (messages as string[])[0],
          });
        });
      } else if (error.response?.data?.message) {
        setError("root", {
          type: "server",
          message: error.response.data.message,
        });
      } else {
        setError("root", {
          type: "server",
          message: "Something went wrong. Please try again.",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      {/* Username */}
      <div className="mb-4">
        <label htmlFor="username" className="block font-medium mb-1">
          Username
        </label>
        <input
          id="username"
          {...register("username")}
          className={`w-full border rounded px-3 py-2 ${
            errors.username ? "border-red-500" : "border-gray-300"
          }`}
          disabled={isSubmitting}
        />
        {errors.username && (
          <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className={`w-full border rounded px-3 py-2 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="mb-4">
        <label htmlFor="password" className="block font-medium mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className={`w-full border rounded px-3 py-2 ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          disabled={isSubmitting}
        />
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block font-medium mb-1">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          className={`w-full border rounded px-3 py-2 ${
            errors.confirmPassword ? "border-red-500" : "border-gray-300"
          }`}
          disabled={isSubmitting}
        />
        {errors.confirmPassword && (
          <p className="text-red-600 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
        {watch("confirmPassword") && watch("confirmPassword") !== password && (
          <p className="text-red-600 text-sm mt-1">
            Confirm password does not match password.
          </p>
        )}
      </div>

      <div className="mb-4">
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" value="candidate" {...register("role")} />
            Candidate
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="employer" {...register("role")} />
            Employer
          </label>
        </div>
        {errors.role && (
          <p className="text-red-600 text-sm mt-1">{errors.role.message}</p>
        )}
      </div>

      {/* Global Error */}
      {errors.root && (
        <p className="text-red-600 text-center mb-4">{errors.root.message}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Loading..." : "Sign Up"}
      </button>
    </form>
  );
}
