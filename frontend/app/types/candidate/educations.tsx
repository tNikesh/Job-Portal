export interface educationHelper {
  id: number;
  user_id: number;
  institute_name: string;
  degree: string;
  field: string;
  start_year: number;
  end_year?: number | null;
  created_at?: string;
  updated_at?: string;
}
