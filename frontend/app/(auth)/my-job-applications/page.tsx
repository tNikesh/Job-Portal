"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/api";
import { toast } from "react-toastify";
import ProgressLink from "@/app/components/ProgressLink";
import { DownloadCloud } from "lucide-react";

type JobApplication = {
  id: number;
  user_id: number;
  job_id: number;
  status: string;
  resume_path: string;
  resume_url: string;
  created_at?: string;
  updated_at?: string;
  job: {
    id: number;
    title: string;
  };
};

export default function MyJobsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Format date as "Jan 10, 2025"
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  // ✅ Fetch Jobs
  useEffect(() => {
    const fetchMyApplications = async () => {
      setLoading(true);
      try {
        const res = await api.get("/my-job-applications");
        setApplications(res.data.applications || []);
      } catch (err) {
        toast.error("Failed to fetch your jobs applications");
      } finally {
        setLoading(false);
      }
    };

    fetchMyApplications();
  }, []);

  // ✅ Handle Status Change
  //   const handleStatusChange = async (jobId: number, newStatus: string) => {
  //     try {
  //       const res=await api.patch(`/jobs/${jobId}/status`, { status: newStatus });
  //       toast.success("Job status updated!");

  //       setApplications((prev) =>
  //         prev.map((job) =>
  //           job.id === jobId ? { ...job, status: newStatus } : job
  //         )
  //       );
  //     } catch (err) {
  //       toast.error("Failed to update status");
  //     }
  //   };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">My Job Applications</h1>

      {loading ? (
        <p className="text-gray-600 text-center py-14">
          Loading job applications...
        </p>
      ) : applications.length === 0 ? (
        <p className="text-gray-600 text-center py-14">
          No job application found.
        </p>
      ) : (
        <div className="min-w-full overflow-x-auto rounded-lg">
          <table className="w-full text-md bg-slate-50 shadow-md rounded mb-4">
            <thead>
              <tr className="border-b border-gray-400">
                <th className="p-3"> ID</th>
                <th className="p-3">job Title</th>
                <th className="p-3">resume</th>
                <th className="p-3">Status</th>
                <th className="p-3">Added Date</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {applications.map((application) => {
                return (
                  <tr
                    key={application.id}
                    className="hover:bg-gray-50 border-b border-gray-200"
                  >
                    <td className="p-3 text-center">{application.id}</td>
                    <td className="p-3 text-center">
                      <ProgressLink href={`/jobs/${application.job_id}`}>
                        {application.job.title}
                      </ProgressLink>
                    </td>
                    <td className="p-3 text-center">
                      {application.resume_url ? (
                        <a
                          href={application.resume_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 w-fit flex justify-center items-center mx-auto gap-2 underline hover:text-blue-800"
                        >
                          <DownloadCloud/>
                          <span>download</span>
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    {/* ✅ Deadline turns RED if expired */}
                    <td                         className={` text-center p-3 ${application.status=="pending"?'text-gray-400':(application.status=="review"?'text-yellow-500':(application.status=="rejected"?'text-red-500':'text-green-600'))}`}
                    >{application.status}</td>

                    <td className="p-3 text-center">
                      {formatDate(application?.created_at ?? "-")}
                    </td>

                    {/* <td className="p-3 flex gap-3 justify-center">
                      <ProgressLink
                        href={`/jobs/${job.id}`}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        View
                      </ProgressLink>

                      <button
                        onClick={async () => {
                          if (!confirm("Are you sure to delete this job?"))
                            return;
                          try {
                            await api.delete(`/jobs/${job.id}`);
                            toast.success("Job deleted!");
                            setApplications((prev) =>
                              prev.filter((j) => j.id !== job.id)
                            );
                          } catch (err) {
                            toast.error("Failed to delete job");
                          }
                        }}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
