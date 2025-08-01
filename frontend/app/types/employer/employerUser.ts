import { employerHelper } from "./employer";

export interface userHelper {
  id: number;
  username: string;
  email: string;
  role: string;
  created_at?: string;
  updated_at?: string;

  employer: employerHelper|null;
  // verification: verificationHelper|null;
}