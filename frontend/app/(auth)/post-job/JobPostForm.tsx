"use client";
// components/JobPostForm.tsx
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Editor, EditorState, convertToRaw } from "draft-js";
import dynamic from "next/dynamic";
// import { DraftHandleValue } from "draft-js";
import { toast } from "react-toastify";
import api from "@/app/lib/api";

// Dynamically import RichTextEditor (to handle the SSR issue)
// const RichTextEditor = dynamic(() => import("./RichTextEditor"), {
//   ssr: false,
// });

interface JobPostFormProps {}

interface JobPostData {
  title: string;
  description: string;
  skills: string;
  // responsibilities: string|null;
  // qualifications: string|null;
  experience_required: string;
  salary_from: string;
  salary_to: string;
  job_type: "full-time" | "part-time" | "contract" | "internship";
  employment_type: "remote" | "on-site" | "hybrid";
  deadline: string;
  status: "active" | "inactive";
}

const JobPostForm: React.FC<JobPostFormProps> = () => {
  // const [editorStateResponsibilities, setEditorStateResponsibilities] =
  //   useState<EditorState>(EditorState.createEmpty());
  // const [editorStateQualifications, setEditorStateQualifications] =
  //   useState<EditorState>(EditorState.createEmpty());

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors,isSubmitting },
  } = useForm<JobPostData>();


  const onSubmitForm = async (data: JobPostData) => {
    // alert(data);

    // Convert raw content from editor states
    // const responsibilitiesRaw = convertToRaw(
    //   editorStateResponsibilities.getCurrentContent()
    // );
    // const qualificationsRaw = convertToRaw(
    //   editorStateQualifications.getCurrentContent()
    // );

    // const formData = {
    //   ...data,
    //   responsibilities: JSON.stringify(responsibilitiesRaw),
    //   qualifications: JSON.stringify(qualificationsRaw),
    // };
    // alert(formData);

    // console.log(formData);
    

    try {
      const response = await api.post("/post-job", data); // Adjust the API endpoint
      toast.success(response?.data?.message??'Job Posted successfully !');
        reset();
    } catch (error: any) {
        if (error.response?.status === 422) {
          const serverErrors = error.response.data.errors;
          Object.entries(serverErrors).forEach(([field, messages]) => {
            setError(field as keyof JobPostData, {
              type: "server",
              message: (messages as string[])[0],
            });
          });
        } else if (error.response?.data?.message) {
          toast.error(error.response.data.message);
         
        } else {
          toast.error("Something went wrong. Please try again.");

        }
      }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Post a New Job
      </h2>

      <form onSubmit={handleSubmit(onSubmitForm)} className="w-full space-y-7">
        {/* Job Title */}
        <div className="w-full flex gap-8 justify-between items-center">
          <div className=" w-full">
            <label className="block text-lg font-medium text-gray-700">
              Job Title
            </label>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: "Job title is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  className="w-full p-1 h-12  rounded-md border border-gray-300 "
                  placeholder="Enter job title"
                />
              )}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          {/* Experience Required */}
          <div className="w-full">
            <label className="block text-lg font-medium text-gray-700">
              Experience Required
            </label>
            <Controller
              name="experience_required"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  className="w-full p-1 h-12  rounded-md border border-gray-300 "
                  placeholder="e.g; 2+ years"
                />
              )}
            />
          </div>
        </div>

        <div className="w-full flex gap-8 justify-between items-center">
        <div className=" w-full">
              <label className="block text-lg font-medium text-gray-700">
                Job Type
              </label>
              <Controller
                name="job_type"
                control={control}
                defaultValue="full-time"
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
              defaultValue="on-site"
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
        <div className="w-full flex gap-8 justify-between items-center">
          {/* Application Deadline */}
          <div className="w-full">
            <label className="block text-lg font-medium text-gray-700">
              Application Deadline
            </label>
            <Controller
              name="deadline"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="date"
                  {...field}
                  className="w-full p-3 border border-gray-300 rounded"
                />
              )}
            />
          </div>

          {/* Status */}
          <div className="w-full">
            <label className="block text-lg font-medium text-gray-700">
              Status
            </label>
            <Controller
              name="status"
              control={control}
              defaultValue="active"
              render={({ field }) => (
                <select {...field} className="w-full p-3 border border-gray-300 rounded">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              )}
            />
          </div>
        </div>

        <div className="w-full">
          <label className="block text-lg font-medium text-gray-700">
            Salary Range (Rs.)
          </label>
          <div className="flex space-x-4 items-center">
            <Controller
              name="salary_from"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className="w-full p-1 h-12  rounded-md border border-gray-300 "
                  placeholder="e.g; 12000"
                />
              )}
            />
            <span> to </span>
            <Controller
              name="salary_to"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className="w-full p-1 h-12  rounded-md border border-gray-300 "
                  placeholder="e.g; 200000"
                />
              )}
            />
          </div>
        </div>
        <div className="w-full flex gap-8 justify-between items-center">
          {/* Job Description */}
          <div className="w-full">
            <label className="block text-lg font-medium text-gray-700">
              Job Description
            </label>
            <Controller
              name="description"
              control={control}
              defaultValue=""
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
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Skills Required */}
          <div className="w-full">
            <label className="block text-lg font-medium text-gray-700">
              Skills Required
            </label>
            <Controller
              name="skills"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <textarea
                  {...field}
                  className="w-full p-1 h-24 border border-gray-300 rounded"
                  placeholder="e.g; web dev, python,"
                />
              )}
            />
          </div>
        </div>

        {/* Responsibilities Editor */}
        {/* <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">
            Responsibilities
          </label>
          <RichTextEditor
            editorState={editorStateResponsibilities}
            onEditorStateChange={setEditorStateResponsibilities}
          />
        </div> */}

        {/* Qualifications Editor */}
        {/* <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">
            Qualifications
          </label>
          <RichTextEditor
            editorState={editorStateQualifications}
            onEditorStateChange={setEditorStateQualifications}
          />
        </div> */}

        {/* Submit Button */}
        <div className="mb-6">
          <button
          disabled={isSubmitting}
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md"
          >
            {isSubmitting?'Posting..':'Post Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobPostForm;
