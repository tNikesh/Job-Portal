import {create}  from 'zustand';
import { PersonalInformationHelper } from '@/app/types/candidate/personalInfoHelper';
 
interface ProfileState{
    personalInfo:PersonalInformationHelper|null;
    setPersonalInfo:(personalInfo:PersonalInformationHelper)=>void;
    updatePersonalInfo:(personalInfo:PersonalInformationHelper)=>void;
}

const usePersonalInfoStore = create<ProfileState>((set) => ({
    personalInfo: null,
    setPersonalInfo: (info) => set({ personalInfo:info }),
    updatePersonalInfo: (personalInfo) => set({ personalInfo }),
  }));

  export default usePersonalInfoStore