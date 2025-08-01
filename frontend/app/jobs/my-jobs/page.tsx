"use client"

import { useEffect, useState } from "react";
import api from "@/app/lib/api";
import { toast } from "react-toastify";
import ProgressLink from "@/app/components/ProgressLink";
import { Edit, Eye, EyeIcon } from "lucide-react";
import Pagination from "@/app/components/Pagination";

type Job = {
  id: number;
  title: string;
  applications_count: string;
  deadline: string;
  status: string;
  created_at: string;
};

export default function MyJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<any>(null);

  // ✅ Format date as "Jan 10, 2025"
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  // ✅ Fetch Jobs
  const fetchMyJobs = async (page:Number=1) => {
    setLoading(true);
    try {
      const res = await api.get(`/employer/jobs?page=${page}`);
      setJobs(res.data.jobs.data || []);
      setPagination({
        current_page: res.data.jobs.current_page,
        per_page: res.data.jobs.per_page,
        total: res.data.jobs.total,
        total_pages: res.data.jobs.last_page,
        next_page_url: res.data.jobs.next_page_url,
        prev_page_url: res.data.jobs.prev_page_url,
      });
    } catch (err) {
      toast.error("Failed to fetch your jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchMyJobs();
  }, []);

  // ✅ Handle Status Change
  const handleStatusChange = async (jobId: number, newStatus: string) => {
    try {
      const res=await api.patch(`/jobs/${jobId}/status`, { status: newStatus });
      toast.success("Job status updated!");

      setJobs((prev) =>
        prev.map((job) =>
          job.id === jobId ? { ...job, status: newStatus } : job
        )
      );
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">My Posted Jobs</h1>

      {loading ? (
        <p className="text-gray-600 text-center py-14">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-600 text-center py-14">No jobs found.</p>
      ) : (
        <div className="min-w-full overflow-x-auto rounded-lg">
          <table className="w-full text-md bg-slate-50 shadow-md rounded mb-4">
            <thead>
              <tr className="border-b border-gray-400">
                <th className="p-3">Job ID</th>
                <th className="p-3">Title</th>
                <th className="p-3">Applicants</th>
                <th className="p-3">Deadline</th>
                <th className="p-3">Status</th>
                <th className="p-3">Created Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {jobs.map((job) => {
                const isDeadlineOver = new Date(job.deadline) < new Date();

                return (
                  <tr
                    key={job.id}
                    className="hover:bg-gray-50 border-b border-gray-200"
                  >
                    <td className="p-3 text-center">{job.id}</td>
                    <td className="p-3 text-center">
                      <ProgressLink href={`/jobs/${job.id}`}
                      className="flex justify-center items-center gap-1 mx-auto">
                        <Eye/>
                        <span>{job.title}</span>
                      </ProgressLink>
                    </td>
                    <td className="p-3 text-center">
                      {job?.applications_count ?? "0"}
                    </td>

                    {/* ✅ Deadline turns RED if expired */}
                    <td
                      className={`p-3 text-center font-semibold ${
                        isDeadlineOver ? "text-red-600" : "text-gray-700"
                      }`}
                    >
                      {formatDate(job.deadline)}
                    </td>

                    {/* ✅ Status Dropdown */}
                    <td className="p-3 text-center">
                      <select
                        value={job.status}
                        onChange={(e) =>
                          handleStatusChange(job.id, e.target.value)
                        }
                        className={` border rounded py-0 px-4 h-9  text-white ${job.status=="active"?'bg-green-600':'bg-red-600'}`}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </td>

                    <td className="p-3 text-center">
                      {formatDate(job.created_at)}
                    </td>

                    <td className="p-3 flex gap-3 flex-col items-center justify-center">
                      <ProgressLink
                        href={`/jobs/my-jobs/${job.id}`}
                        className="px-3 py-1 mx-auto flex justify-center items-center gap-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        <EyeIcon/>
                        <span>
                          application list
                          </span>
                      </ProgressLink>

                      <ProgressLink
                        href={`/edit-job/${job.id}`}
                        className="px-3 py-1 mx-auto flex justify-center items-center gap-1 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                      >
                        <Edit/>
                        <span>
                          Edit application 
                          </span>
                      </ProgressLink>

                      {/* <button
                        onClick={async () => {
                          if (!confirm("Are you sure to delete this job?"))
                            return;
                          try {
                            await api.delete(`/jobs/${job.id}`);
                            toast.success("Job deleted!");
                            setJobs((prev) =>
                              prev.filter((j) => j.id !== job.id)
                            );
                          } catch (err) {
                            toast.error("Failed to delete job");
                          }
                        }}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Pagination pagination={pagination} onPageChange={(page: number) => fetchMyJobs(page)}  />

        </div>
      )}
    </div>
  );
}
