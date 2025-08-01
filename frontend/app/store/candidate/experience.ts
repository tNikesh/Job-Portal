import {create}  from 'zustand';
import { experienceHelper } from '@/app/types/candidate/experience';
 
interface ProfileState{
    experiences:experienceHelper[];
    setExperiences:(experiences:experienceHelper[])=>void;
    addExperience:(experience:experienceHelper)=>void;
    updateExperience:(experience:experienceHelper)=>void;
    deleteExperience:(id:Number)=>void;
}

const useExperienceStore = create<ProfileState>((set) => ({
    experiences: [],
    setExperiences: (experiences) => set({ experiences }),
    addExperience: (experience) =>
      set((state) => ({ experiences: [...state.experiences, experience] })),
    updateExperience: (experience) =>
      set((state) => ({
        experiences: state.experiences.map((e) =>
          e.id === experience.id ? experience : e
        ),
      })),
    deleteExperience: (id) =>
      set((state) => ({
        experiences: state.experiences.filter((e) => e.id !== id),
      })),
  }));

  export default useExperienceStore