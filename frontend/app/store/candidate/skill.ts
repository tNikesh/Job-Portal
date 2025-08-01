import {create}  from 'zustand';
import { skillHelper } from '@/app/types/candidate/skill';
 
interface ProfileState{
    skills:skillHelper[];
    setSkills:(skills:skillHelper[])=>void;
    addSkill:(skill:skillHelper)=>void;
    updateSkill:(skill:skillHelper)=>void;
    deleteSkill:(id:Number)=>void;
}

const useSkillStore = create<ProfileState>((set) => ({
    skills: [],
    setSkills: (skills) => set({ skills }),
    addSkill: (skill) =>
      set((state) => ({ skills: [...state.skills, skill] })),
    updateSkill: (skill) =>
      set((state) => ({
        skills: state.skills.map((e) =>
          e.id === skill.id ? skill : e
        ),
      })),
    deleteSkill: (id) =>
      set((state) => ({
        skills: state.skills.filter((e) => e.id !== id),
      })),
  }));

  export default useSkillStore