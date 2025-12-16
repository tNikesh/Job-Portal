"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import api from "@/app/lib/api";
import { useProgressRouter } from "../../NavigationWrapper";

type EmployerFormData = {
  company_name: string;
  company_website: string;
  company_description: string;
  contact_person: string;
  designation: string;
  phone: string;
  alternate_phone?: string;
  company_size: string;
  company_type: string;
  company_address: string;
  country: string;
  state: string;
  city: string;
};

export default function EmployerProfileForm() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<EmployerFormData>();

  const router=useProgressRouter();

  const onSubmit = async (data: EmployerFormData) => {
    clearErrors(); // clear previous errors

    try {
      const res = await api.post("/employer/profile/detail", data);
      toast.success("Profile saved successfully");
      router.push('/user/employer/profile');
    } catch (err: any) {
      const res = err.response;
      if (!res) {
        toast.error("Network Error, Try again!");
      }
      const data = res.data;
      if (data.errors) {
        for (const key in data.errors) {
          if (Object.prototype.hasOwnProperty.call(data.errors, key)) {
            setError(key as keyof EmployerFormData, {
              type: "server",
              message: data.errors[key][0],
            });
          }
        }
      } else if (data.message) {
        toast.error(data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const InputField = ({
    label,
    id,
    type = "text",
    registerProps,
    error,
    className = "",
    placeholder = "",
    options = [],
  }: {
    label: string;
    id: keyof EmployerFormData;
    type?: string;
    registerProps: any;
    error?: string;
    className?: string;
    placeholder?: string;
    options?: { value: string; label: string }[];
  }) => {
    if (type === "select") {
      return (
        <div className={`flex flex-col ${className}`}>
          <label htmlFor={id as string} className="mb-1 font-medium text-gray-700">
            {label}
          </label>
          <select
            id={id as string}
            {...registerProps}
            className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>
      );
    }

    return (
      <div className={`flex flex-col ${className}`}>
        <label htmlFor={id as string} className="mb-1 font-medium text-gray-700">
          {label}
        </label>
        <input
          type={type}
          id={id as string}
          {...registerProps}
          className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={placeholder}
        />
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto space-y-10"
      noValidate
    >
      <section className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2 text-gray-800">
          Company Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Company Name"
            id="company_name"
            placeholder="Enter company name"
            registerProps={register("company_name", {
              required: "Company name is required",
            })}
            error={errors.company_name?.message}
          />

          <InputField
            label="Company Website"
            id="company_website"
            type="url"
            placeholder="https://example.com"
            registerProps={register("company_website")}
            error={errors.company_website?.message}
          />

          <div className="flex flex-col">
            <label
              htmlFor="company_description"
              className="mb-1 font-medium text-gray-700"
            >
              Company Description
            </label>
            <textarea
              id="company_description"
              {...register("company_description")}
              className={`border rounded px-3 py-2 w-full h-24 focus:outline-none focus:ring-2 focus:ring-blue-600 transition ${
                errors.company_description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Describe your company"
            />
            {errors.company_description && (
              <p className="text-red-600 text-sm mt-1">
                {errors.company_description.message}
              </p>
            )}
          </div>

          <InputField
            label="Company Type"
            id="company_type"
            type="select"
            registerProps={register("company_type", {
              required: "Company type is required",
            })}
            error={errors.company_type?.message}
            options={[
              { value: "startup", label: "Startup" },
              { value: "corporation", label: "Corporation" },
              { value: "non_profit", label: "Non-Profit" },
              { value: "enterprise", label: "Enterprise" },
              { value: "other", label: "Other" },
            ]}
          />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2 text-gray-800">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Contact Person"
            id="contact_person"
            placeholder="Enter contact person's name"
            registerProps={register("contact_person")}
            error={errors.contact_person?.message}
          />
          <InputField
            label="Designation"
            id="designation"
            placeholder="Enter designation"
            registerProps={register("designation")}
            error={errors.designation?.message}
          />
          <InputField
            label="Phone"
            id="phone"
            placeholder="Enter phone number"
            registerProps={register("phone")}
            error={errors.phone?.message}
          />
          <InputField
            label="Alternate Phone"
            id="alternate_phone"
            placeholder="Enter alternate phone number"
            registerProps={register("alternate_phone")}
            error={errors.alternate_phone?.message}
          />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2 text-gray-800">
          Company Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Company Size"
            id="company_size"
            placeholder="e,g: 15-20"
            registerProps={register("company_size")}
            error={errors.company_size?.message}
          />
          <InputField
            label="Company Address"
            id="company_address"
            placeholder="Enter company address"
            registerProps={register("company_address")}
            error={errors.company_address?.message}
          />
          <InputField
            label="Country"
            id="country"
            placeholder="Enter country"
            registerProps={register("country")}
            error={errors.country?.message}
          />
          <InputField
            label="State"
            id="state"
            placeholder="Enter state"
            registerProps={register("state")}
            error={errors.state?.message}
          />
          <InputField
            label="City"
            id="city"
            placeholder="Enter city"
            registerProps={register("city")}
            error={errors.city?.message}
          />
        </div>
      </section>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}
