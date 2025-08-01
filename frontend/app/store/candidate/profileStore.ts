import {create}  from 'zustand';
import { educationHelper } from '@/app/types/candidate/educations';
 
interface ProfileState{
    educations:educationHelper[];
    setEducations:(educations:educationHelper[])=>void;
    addEducation:(education:educationHelper)=>void;
    updateEducation:(education:educationHelper)=>void;
    deleteEducation:(id:Number)=>void;
}

const useProfileStore = create<ProfileState>((set) => ({
    educations: [],
    setEducations: (educations) => set({ educations }),
    addEducation: (education) =>
      set((state) => ({ educations: [...state.educations, education] })),
    updateEducation: (education) =>
      set((state) => ({
        educations: state.educations.map((e) =>
          e.id === education.id ? education : e
        ),
      })),
    deleteEducation: (id) =>
      set((state) => ({
        educations: state.educations.filter((e) => e.id !== id),
      })),
  }));

  export default useProfileStore