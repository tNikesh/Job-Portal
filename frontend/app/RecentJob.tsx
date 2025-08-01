'use client'
import  { useEffect, useState } from 'react'
import api from './lib/api';
import { toast } from 'react-toastify';
import ProgressLink from './components/ProgressLink';
import { BadgeCheck, BriefcaseBusiness, CodeSquare, MapPinCheck, Verified } from 'lucide-react';

const RecentJob = () => {

    const [jobs,setJobs]=useState<any>(null);
    const [loading,setLoading] = useState(false)
  
    useEffect(()=>{
      const fetchJobs = async () => {
          setLoading(true);
          try {
      const res = await api.get(`/recent-jobs`);
      setJobs(res.data.jobs || []);
    } catch (err) {
        setJobs([]);
      toast.error("Failed to fetech recent jobs!");
    } finally {
      setLoading(false);
    }
  };
  
  fetchJobs();
    },[]);
   
  

  return (
    <>
    {!loading?(

  
    <section className="w-full lg:px-14 sm:px-7 px-3 space-y-0 bg-slate-100 py-14">
    <div className="w-full flex justify-between items-center gap-5">
      <h2 className="font-medium text-lg text-blue-950">Recent Jobs</h2>
      <ProgressLink href="/jobs" className="font-medium text-gray-700" prefetch={true}>
        see more..
      </ProgressLink>
    </div>
    {!jobs?(
        <p className='text-gray-500 w-full text-center'>No recent jobs</p>
    ):(
    <div
      style={{
        overflowX: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      className="flex w-full overflow-x-auto whitespace-nowrap snap-x snap-mandatory gap-x-14 p-4"
    >
      {jobs.map((job:any) => (
         <div
         key={job.id}
         className="shrink-0 snap-start w-full max-w-[400px] text-blue-950 space-y-5 rounded-lg shadow-sm bg-white p-6"
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
    
  </section>

    ):(

  <section className="w-full lg:px-14 sm:px-7 px-3 space-y-0 bg-slate-100 py-14">
      <div className="w-full flex justify-between items-center gap-5">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
      </div>
      <div className="flex w-full gap-x-14 p-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="shrink-0 w-full max-w-[450px] space-y-5 rounded-lg bg-white p-6">
            <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </section>
    )}
    </>
  )
}

export default RecentJob