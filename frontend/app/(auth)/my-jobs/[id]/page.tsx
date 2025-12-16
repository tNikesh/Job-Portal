'use client'
import api from '@/app/lib/api';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import EditForm from './EditForm';

  
  interface Job {
    id: number;
    title: string;
    description: string;
    skills: string;
    company_name: string;
    salary_from: string;
    salary_to: string;
    employment_type: "remote" | "on-site" | "hybrid";
    job_type: "full-time" | "part-time" | "contract" | "internship";
    deadline: string;
    status: "active" | "inactive";
    created_at:string;
    experience_required:string;
    responsibilities?: string;
    qualifications?: string;
    employer:{
      id:number;
      user_id:number;
      company_name:string;
      contact_person:string;
    }
  }

const page = () => {
    const params = useParams();
    const jobId = params?.id as string;
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchJob = async () => {
          try {
            setLoading(true);
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

      

     
  return (
    <>
    {loading ? (
      <p>Loading...</p>
    ) : job ? (
      <EditForm job={job} />
    ) : (
      <p className="text-red-500">Job not found</p>
    )}
  </>
      
  )
}

export default page