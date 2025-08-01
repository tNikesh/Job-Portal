export interface skillHelper {
    id: number;
    user_id: number;
    education_id?:number|null,
    experience_id?:number|null,
    name: string;
    created_at?: string;
    updated_at?: string;
    education?: {
      id: number;
      institute_name: string;
      degree?: string;
    };
    experience?: {
      id: number;
      institute_name: string;
      position?: string;
    };
  }