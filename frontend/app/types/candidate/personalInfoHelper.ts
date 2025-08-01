export interface PersonalInformationHelper {
    id: number;
    user_id: number;
    full_name: string;
    phone: string;
    dob: string;
    gender:"male" | "female" | "other";
    country: string;
    state: string;
    city: string;
    created_at?: string;
    updated_at?: string;
  }