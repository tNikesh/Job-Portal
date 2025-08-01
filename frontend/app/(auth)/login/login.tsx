"use client";

import { useForm } from "react-hook-form";
import api from "@/app/lib/api";
import { toast } from "react-toastify";
import useAuthStore from "@/app/store/authUserStore";
import { useProgressRouter } from "@/app/components/NavigationWrapper";


type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useProgressRouter();
  const setAuthUser =useAuthStore((state)=>state.setAuthUser);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();


  const onSubmit = async (data: FormValues) => {
    try {
      const response = await api.post("/login", {
        email: data.email,
        password: data.password,
      },
    );



      if (response.status === 201 || response.status === 200) {
        const { token, user } = response.data;
          // Update state and storage simultaneously
        const authPromise = setAuthUser(user);
        const storagePromise = localStorage.setItem("token", token);
        
        Promise.resolve().then(() => {
          router.replace('/');
        });
        
        // Handle completion in background
        Promise.all([authPromise, storagePromise]).then(() => {
          reset();
          toast.success("Login successful!");
        });
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
        toast.error(error.response.data.message
        );
      } else {
        toast.error("Something went wrong. Please try again.");

      }
      localStorage.removeItem('token');
      setAuthUser(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-6 "
    >
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


      {/* Global Error */}
      {errors.root && (
        <p className="text-red-600 text-center mb-4">{errors.root.message}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Loading..." : "Log In"}
      </button>
    </form>
  );
}
