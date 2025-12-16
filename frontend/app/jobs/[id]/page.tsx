"use client";

import React, { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
import api from "@/app/lib/api";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import useAuthStore from "@/app/store/authUserStore";
import { BadgeCheck, Briefcase, Building, Calendar, Clock, DollarSign, Tag } from "lucide-react";
import ProgressLink from "@/app/components/ProgressLink";

// const DraftRenderer = dynamic(() => import("../../components/DraftRenderer"), {
//   ssr: false,
// });

interface Job {
  id: number;
  title: string;
  description: string;
  skills: string;
  company_name: string;
  salary_from: number;
  salary_to: number;
  job_type: string;
  deadline: string;
  status: string;
  created_at:string;
  employment_type: string;
  responsibilities?: string;
  qualifications?: string;
  employer:{
    id:number;
    user_id:number;
    company_name:string;
    contact_person:string;
  }
}

interface ApplicationForm {
  resume: FileList;
}

export default function page() {
    const params = useParams();
    const authUser=useAuthStore((state)=>state.authUser);
    const jobId = params?.id as string;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit, setError, reset, formState: { isSubmitting,errors } } =
    useForm<ApplicationForm>();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${jobId}`);
        setJob(res.data.job);
      } catch (err) {
        console.error("Failed to fetch job:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  // ✅ Stop body scrolling when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto"; // cleanup
    };
  }, [showModal]);

  const onSubmit = async (data: ApplicationForm) => {
    if (!job) {
        toast.error('No Job found!');
        return;
    }

    const formData = new FormData();
    formData.append("job_id", job.id.toString());
    if (data.resume && data.resume.length > 0) {
      formData.append("resume", data.resume[0]);
    }

    try {
      await api.post("/candidate-application", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Application submitted successfully!");
      reset();
      setShowModal(false);
    } catch (error: any) {
        if (error.response?.status === 422) {
          const serverErrors = error.response.data.errors;
          Object.entries(serverErrors).forEach(([field, messages]) => {
            setError(field as keyof ApplicationForm, {
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

  if (loading) return <p className="p-10 text-center">Loading job...</p>;
  if (!job) return <p className="p-10 text-center">Job not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
       <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-xl p-8 mt-5">
      {/* Job Title & Company */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
        <ProgressLink href={`/profile/${job.employer.user_id}`} className="text-lg text-gray-600 flex items-center gap-2 mt-2">
          {job?.employer.company_name??"Unknown Company"}
          <BadgeCheck className="w-5 h-5 text-blue-500" />
        </ProgressLink>
      </div>

      {/* Job Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
        <div className="flex items-center gap-3">
          <Tag className="text-blue-600 w-5 h-5" />
          <span>
            <strong>Skills Required:</strong> {job.skills}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Briefcase className="text-green-600 w-5 h-5" />
          <span>
            <strong>Employment Type:</strong> {job.employment_type}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="text-purple-600 w-5 h-5" />
          <span>
            <strong>Job Type:</strong> {job.job_type}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="text-red-600 w-5 h-5" />
          <span>
            <strong>Deadline:</strong>{" "}
            {new Date(job.deadline).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="text-gray-600 w-5 h-5" />
          <span>
            <strong>Posted On:</strong>{" "}
            {new Date(job.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span>
            <strong>Status:</strong>{" "}
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                job.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {job.status}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <DollarSign className="text-green-600 w-5 h-5" />
          <span>
            <strong>Salary (Rs.):</strong>{" "}
            {job.salary_from}  to  {job.salary_to}
          </span>
        </div>
      </div>
      
      {authUser?.role==="candidate" && (

      <button
      onClick={() => setShowModal(true)}
      className="px-5 py-1 mt-4 bg-red-600 cursor-pointer text-white rounded-md hover:bg-red-700"
      >
      Apply Now
      </button>
      )}

      {/* Job Description */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          Job Description
        </h2>
        <p className="text-gray-700 leading-relaxed">{job.description}</p>
      </div>
    </div>
       

      {/* ✅ Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500/40">
          <div className="bg-white p-10 rounded-lg w-[90%] max-w-[600px] shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Apply for {job.title}</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <label className="text-gray-900">Upload your resume (pdf)</label>
              <input
                type="file"
                accept=".pdf"
                {...register("resume", { required: "Resume is required" })}
                className="w-full border p-2 rounded mt-3"
              />
               {errors.resume && (
          <p className="text-red-600 text-sm mt-1">
            {errors.resume.message}
          </p>
            )}
           

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 cursor-pointer bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded hover:bg-blue-700"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
