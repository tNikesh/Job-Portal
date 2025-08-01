export interface employerHelper {
    id: number;
    user_id: number;
    company_name: string;
    company_website?: string | null;
    company_description?: string | null;
  
    contact_person: string;
    designation?: string | null;
    phone: string;
    alternate_phone?: string | null;
  
    company_size?: string | null;   // e.g. '1-10', '11-50'
    company_type?: string | null;   // e.g. 'Private', 'Government'
  
    company_address: string;
    country: string;
    state: string;
    city: string;
  
    created_at?: string;  // ISO date string
    updated_at?: string;  // ISO date string
  }
  