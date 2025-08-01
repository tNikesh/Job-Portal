"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/api";
import { toast } from "react-toastify";
import ProgressLink from "@/app/components/ProgressLink";
import { DownloadCloud } from "lucide-react";
import { useParams } from "next/navigation";
import Pagination from "@/app/components/Pagination";

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
  },
  user: {
    id: number;
    username: string;
  },
};

export default function page() {
    const params = useParams();
    const jobId = params?.id as string;
  const [applications, setApplications] = useState<JobApplication[]>([]);

  const [loading, setLoading] = useState(true);

  // ✅ Format date as "Jan 10, 2025"
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const fetchMyApplications = async ( ) => {
      setLoading(true);
      try {
        const res = await api.get(`/employer/job-applications/${jobId}`);
        setApplications(res.data.applications || []);
       
      } catch (err) {
        toast.error("Failed to fetch your jobs applications");
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {

    fetchMyApplications();
  }, []);

 
    const handleStatusChange = async (applicationId: number, newStatus: string) => {
      try {
        const res=await api.patch(`/candidate-application/${applicationId}/status`, { status: newStatus });
        toast.success("Job Application status updated!");

        setApplications((prev) =>
          prev.map((application) =>
            application.id === applicationId ? { ...application, status: newStatus } : application
          )
        );
      } catch (err) {
        toast.error("Failed to update status");
      }
    };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">All Job Applications</h1>

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
                <th className="p-3">user name</th>
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
                      <ProgressLink href={`/profile/${application.user_id}`}>
                      {application.user.username}
                      </ProgressLink>
                    </td>
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

                    <td className="p-3 text-center">
                      <select
                        value={application.status}
                        onChange={(e) =>
                          handleStatusChange(application.id, e.target.value)
                        }
                        className={` border rounded py-0 px-4 h-9  text-white ${application.status=="pending"?'bg-gray-400':(application.status=="review"?'bg-yellow-500':(application.status=="rejected"?'bg-red-500':'bg-green-600'))}`}
                      >
                        <option value="pending">pending</option>
                        <option value="review">review</option>
                        <option value="accepted">accept</option>
                        <option value="rejected">reject</option>
                      </select>
                    </td>

                    <td className="p-3 text-center">
                      {formatDate(application?.created_at ?? "-")}
                    </td>

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
