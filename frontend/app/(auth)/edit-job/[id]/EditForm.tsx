"use client"

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import api from "@/app/lib/api";
import { useProgressRouter } from "@/app/components/NavigationWrapper";

interface JobEditFormProps {
  job: JobPostData; // Pass job data from parent page
}

interface JobPostData {
  id?: number;
  title: string;
  description: string;
  skills: string;
  experience_required: string;
  salary_from: string;
  salary_to: string;
  job_type: "full-time" | "part-time" | "contract" | "internship";
  employment_type: "remote" | "on-site" | "hybrid";
  deadline: string;
  status: "active" | "inactive";
}

 const EditForm: React.FC<JobEditFormProps> = ({ job }) => {
  const router =useProgressRouter();
  
  function formatDate(dateInput:any) {
    if (!dateInput) return '';
  
    // Split by space and return only the date part
    const [date] = dateInput.split(' ');
    return date; // returns 'YYYY-MM-DD'
  }
  
  const formattedJob = {
    ...job,
    deadline: formatDate(job.deadline)
  };
  
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors,isSubmitting },
    reset
  } = useForm({
    defaultValues: formattedJob
  });
  
  useEffect(() => {
    if (job) {
      reset({
        ...job,
        deadline: formatDate(job.deadline)
      });
    }
  }, [job, reset]);

  const onSubmit = async (data: JobPostData) => {
    try {
      const response = await api.patch(`/jobs/${job.id}`, data);
      router.push(`/jobs/${job.id}`);
      toast.success(response?.data?.message ?? "Job updated successfully!");
    } catch (error: any) {
      if (error.response?.status === 422) {
        const serverErrors = error.response.data.errors;
        Object.entries(serverErrors).forEach(([field, messages]) => {
          setError(field as keyof JobPostData, {
            type: "server",
            message: (messages as string[])[0],
          });
        });
      } else {
        toast.error(error.response?.data?.message || "Something went wrong.");
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Edit Job Post
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-7">
        {/* Job Title & Experience */}
        <div className="w-full flex gap-8 justify-between items-center">
          <div className="w-full">
            <label className="block text-lg font-medium text-gray-700">
              Job Title
            </label>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Job title is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  className="w-full p-1 h-12 rounded-md border border-gray-300"
                  placeholder="Enter job title"
                />
              )}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="w-full">
            <label className="block text-lg font-medium text-gray-700">
              Experience Required
            </label>
            <Controller
              name="experience_required"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="w-full p-1 h-12 rounded-md border border-gray-300"
                  placeholder="e.g; 2+ years"
                />
              )}
            />
          </div>
        </div>

        {/* Job Type & Employment Type */}
        <div className="w-full flex gap-8 justify-between items-center">
          <div className="w-full">
            <label className="block text-lg font-medium text-gray-700">
              Job Type
            </label>
            <Controller
              name="job_type"
              control={control}
              render={({ field }) => (
                <select {...field} className="w-full p-3 border border-gray-300 rounded">
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              )}
            />
          </div>

          <div className="w-full">
            <label className="block text-lg font-medium text-gray-700">
              Employment Type
            </label>
            <Controller
              name="employment_type"
              control={control}
              render={({ field }) => (
                <select {...field} className="w-full p-3 border border-gray-300 rounded">
                  <option value="remote">Remote</option>
                  <option value="on-site">On-site</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              )}
            />
          </div>
        </div>

        {/* Deadline & Status */}
        <div className="w-full flex gap-8 justify-between items-center">
          <div className="w-full">
            <label className="block text-lg font-medium text-gray-700">
              Application Deadline
            </label>
            <Controller
              name="deadline"
              control={control}
              render={({ field }) => (
                <input
                  type="date"
                  {...field}
                  className="w-full p-3 border border-gray-300 rounded"
                />
              )}
            />
          </div>

          <div className="w-full">
            <label className="block text-lg font-medium text-gray-700">
              Status
            </label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <select {...field} className="w-full p-3 border border-gray-300 rounded">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              )}
            />
          </div>
        </div>

        {/* Salary Range */}
        <div className="w-full">
          <label className="block text-lg font-medium text-gray-700">
            Salary Range (Rs.)
          </label>
          <div className="flex space-x-4 items-center">
            <Controller
              name="salary_from"
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className="w-full p-1 h-12 rounded-md border border-gray-300"
                  placeholder="e.g; 12000"
                />
              )}
            />
            <span>to</span>
            <Controller
              name="salary_to"
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className="w-full p-1 h-12 rounded-md border border-gray-300"
                  placeholder="e.g; 50000"
                />
              )}
            />
          </div>
        </div>

        {/* Description & Skills */}
        <div className="w-full flex gap-8 justify-between items-center">
          <div className="w-full">
            <label className="block text-lg font-medium text-gray-700">
              Job Description
            </label>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Job description is required" }}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="w-full h-36 p-1 border border-gray-300 rounded"
                  placeholder="Enter job description"
                />
              )}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>

          <div className="w-full">
            <label className="block text-lg font-medium text-gray-700">
              Skills Required
            </label>
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="w-full h-24 p-1 border border-gray-300 rounded"
                  placeholder="e.g; React, Laravel, Python"
                />
              )}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="mb-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white p-3 rounded-md"
          >
            {isSubmitting?
              'Updating...'
               
              :  'Update Job'
              }
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
