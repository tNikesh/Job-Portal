import { create } from 'zustand';
import { employerHelper } from '@/app/types/employer/employer';

interface EmployerState {
  employerData: employerHelper | null;
  setEmployerData: (info: employerHelper) => void;
  updateemployerData: (info: employerHelper) => void;
}

const useEmployerStore = create<EmployerState>((set) => ({
    employerData: null,
  setEmployerData: (data) => set({ employerData: data }),
  updateemployerData: (data) => set({ employerData: data }),
}));

export default useEmployerStore;
