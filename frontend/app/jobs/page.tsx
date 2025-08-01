"use client";
import {
  BadgeCheck,
  BriefcaseBusiness,
  CodeSquare,
  MapPinCheck,
  Verified,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../lib/api";
import { toast } from "react-toastify";
import { SkeletonCard } from "./SkeletonCard";
import ProgressLink from "../components/ProgressLink";
import Pagination from "../components/Pagination";

type FilterFormValues = {
  filter: string;
};

const Page = () => {
  const { register } = useForm<FilterFormValues>({
    defaultValues: { filter: "latest" },
  });

  const [selectedFilter, setSelectedFilter] = useState("latest");
  const [jobs, setJobs] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Jobs Function
  const fetchJobs = async (filter: string, page: number = 1) => {
    setLoading(true);
    try {
      const res = await api.get(`/jobs?filter=${filter}&page=${page}`);
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
      toast.error("Failed to fetch jobs!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch only once when page loads
  useEffect(() => {
    fetchJobs(selectedFilter);
  }, [selectedFilter]);

  return (
    <div className="w-full p-10 space-y-10">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-gray-900 text-lg capitalize font-medium">
          View {selectedFilter} jobs
        </h1>

        <select
          {...register("filter")}
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="border border-gray-400 h-9 rounded-sm"
        >
          <option value="latest">📅 Latest Jobs</option>
          <option value="part-time">🕒 Part-Time</option>
          <option value="full-time">📌 Full-Time</option>
          <option value="high-salary">💰 Highest Salary</option>
          <option value="low-salary">💵 Lowest Salary</option>
        </select>
      </div>

      {loading ? (
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-16">
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      ) : jobs?.length === 0 ? (
        <p className="text-gray-600 text-center py-14">No jobs found.</p>
      ) : (
        <>
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-16">
          {jobs?.map((job:any) => (
            <div
              key={job.id}
              className="shrink-0 snap-start w-full text-blue-950 space-y-5 rounded-lg shadow-sm bg-white p-6"
            >
              <div className="flex justify-between items-center gap-2">
                <div>
                  <div>
                  <h2 className="text-lg text-gray-900 font-semibold">{job.title}</h2>
                  <div className="flex justify-start itmes-center gap-2">
                  <h2 className="font-medium text-gray-800">
                    {job.employer?.company_name??'-'}
                  </h2>
                  <BadgeCheck className="size-5 text-blue-600"/>
                  </div>

                  </div>
                  <p className="text-sm font-medium flex items-center gap-1">
                    <span>{job.company_name}</span>
                    {job.is_verified && (
                      <Verified className="size-5 text-blue-600" />
                    )}
                  </p>
                </div>
                <CodeSquare className="text-blue-950 size-8" />
              </div>

              <p className="text-sm text-gray-800 line-clamp-3 whitespace-pre-wrap">
                {job.description}
              </p>

              <div className="font-medium flex items-center gap-5">
                {job?.employment_type && (
                  <p className="flex items-center gap-1">
                    <MapPinCheck className="w-5 h-5 text-blue-950" />
                    <span>{job?.employment_type}</span>
                  </p>
                )}
                {job?.job_type && (
                  <p className="flex items-center gap-1">
                    <BriefcaseBusiness className="w-5 h-5 text-blue-950" />
                    <span>{job.job_type}</span>
                  </p>
                )}
              </div>

              <div className="flex justify-center gap-2 items-start flex-col">
                <div className="text-center">
                  <p className="text-base font-medium flex gap-2 items-center">
                    <span>Rs.</span>
                    <span>{job.salary_from}</span>
                    <span>-</span>
                    <span>{job.salary_to}</span>
                    <span className="text-sm text-gray-800">Mthly</span>
                  </p>
                </div>
                <ProgressLink
                 href={`/jobs/${job.id}`}

                  className="drop-shadow-sm cursor-pointer px-5 py-1 rounded-full border-2 border-blue-900 
                hover:bg-blue-900 hover:text-white transition-colors duration-200 text-blue-900 font-medium"
                >
                  view more
                </ProgressLink>
              </div>
            </div>
          ))}

        </div>
        <Pagination pagination={pagination} onPageChange={(page: number) => fetchJobs(selectedFilter, page)}  />

        </>
      )}
    </div>
  );
};

export default Page;
