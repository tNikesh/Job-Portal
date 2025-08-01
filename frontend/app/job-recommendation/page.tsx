"use client";
import {
  BadgeCheck,
  BriefcaseBusiness,
  CodeSquare,
  MapPinCheck,
  Verified,
} from "lucide-react";
import {useState, useEffect} from "react";
import api from "../lib/api";
import { toast } from "react-toastify";

import ProgressLink from "../components/ProgressLink";
import { SkeletonCard } from "../jobs/SkeletonCard";
import useAuthStore from "../store/authUserStore";
import Unauth from "./Unauth";


const page = () => {


  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const authUser=useAuthStore((state)=>state.authUser);
  if(!authUser){
    return <Unauth/>
  }

  // ✅ Fetch Jobs Function
  
  useEffect(() => {
  const fetchJobs = async () => {
      setLoading(true);
      try {
  const res = await api.get(`/job-recommendation`);
  setJobs(res.data.jobs || []);
} catch (err) {
  toast.error("Failed to recommend jobs!");
} finally {
  setLoading(false);
}
};

  fetchJobs();
}, []);



  return (
    <div className="w-full p-10 space-y-10">
        <div className="flex justify-start items-center gap-2">

        <h1 className="text-gray-900 text-lg capitalize font-medium">
          Recommended Jobs
        </h1>
        <span>-</span>
        <span>based on your profile skills</span>
        </div>
      {/* <div className="w-full flex justify-between items-center">

      </div> */}

      {loading ? (
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-16">
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <p className="text-gray-600 text-center py-14">No jobs found based on your skill.</p>
      ) : (
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-16">
          {jobs.map((job) => (
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
      )}
    </div>
  );
};

export default page;
