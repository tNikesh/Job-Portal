"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Image from "next/image";

type VerificationFormData = {
  employer_id: string;
  document_type: string;
  document_number: string;
  document_file: FileList;
  verified_at?: string; // optional, maybe admin only
};

export default function EmployerVerificationForm() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<VerificationFormData>();

  const [filePreview, setFilePreview] = useState<string | null>(null);
  const watchFile = watch("document_file");

  useEffect(() => {
    if (watchFile && watchFile.length > 0) {
      const file = watchFile[0];
      setFilePreview(URL.createObjectURL(file));
    } else {
      setFilePreview(null);
    }
  }, [watchFile]);

  const onSubmit = async (data: VerificationFormData) => {
    clearErrors();

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "document_file" && value.length > 0) {
          formData.append(key, value[0]);
        } else if (value !== undefined && value !== null) {
          formData.append(key, value as string);
        }
      });

      await axios.post("/api/employer-verification", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Verification data saved successfully");
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        const validationErrors = error.response.data.errors;
        Object.entries(validationErrors).forEach(([field, messages]) => {
          setError(field as keyof VerificationFormData, {
            type: "server",
            message: Array.isArray(messages) ? messages[0] : messages,
          });
        });
      } else {
        alert("Failed to save verification data");
        console.error(error);
      }
    }
  };

  // Reusable input component
  const InputField = ({
    label,
    id,
    type = "text",
    registerProps,
    error,
    className = "",
  }: {
    label: string;
    id: keyof VerificationFormData;
    type?: string;
    registerProps: any;
    error?: string;
    className?: string;
  }) => (
    <div className={`flex flex-col ${className}`}>
      <label
        htmlFor={id as string}
        className="mb-1 font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        type={type}
        id={id as string}
        {...registerProps}
        className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
     className="w-full mx-auto   space-y-10"
      noValidate
    >
      <input type="hidden" {...register("employer_id")} value="1" />

      <section className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2 text-gray-800">
          Verification Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Document Type"
            id="document_type"
            registerProps={register("document_type", {
              required: "Document type is required",
            })}
            error={errors.document_type?.message}
          />

          <InputField
            label="Document Number"
            id="document_number"
            registerProps={register("document_number", {
              required: "Document number is required",
            })}
            error={errors.document_number?.message}
          />
        </div>

        <div className="w-full flex justify-start items-center space-x-6 mt-4">
          <div className="flex-1">
            <label className="mb-1 font-medium text-gray-700 block">
              Document File
            </label>
            <input
              type="file"
              accept="image/*,application/pdf"
              {...register("document_file", {
                required: "Document file is required",
              })}
              className={`w-full border p-2 rounded-md ${
                errors.document_file ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.document_file && (
              <p className="text-red-600 text-sm mt-1">
                {errors.document_file.message}
              </p>
            )}
          </div>
          {filePreview && (
            <Image
              src={filePreview}
              width={150}
              height={150}
              alt="Document Preview"
              className="rounded-lg border object-contain"
            />
          )}
        </div>
      </section>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 rounded-lg  hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Saving..." : "Save Verification"}
      </button>
    </form>
  );
}
