export interface experienceHelper  {
    id: number;
    user_id: number;
    institute_name: string;
    institute_address: string;
    position: string;
    job_type:string;
    started_date: string;
    end_date: string | null;
    created_at?: string;
    updated_at?: string;
  }