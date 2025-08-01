import { educationHelper } from "./educations";
import { experienceHelper } from "./experience";
import { PersonalInformationHelper } from "./personalInfoHelper";
import { ProfessionalInformationHelper } from "./ProfessionalInfoHelper";
import { skillHelper } from "./skill";

export interface userHelper {
  id: number;
  username: string;
  email: string;
  role: string;
  created_at?: string;
  updated_at?: string;

  skills: skillHelper[];
  educations: educationHelper[];
  experiences: experienceHelper[];
  professionalInformation:ProfessionalInformationHelper|null
  personalInformation:PersonalInformationHelper|null;
}