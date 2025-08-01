import { create } from 'zustand';
import { ProfessionalInformationHelper } from '@/app/types/candidate/ProfessionalInfoHelper';

interface ProfessionalInfoState {
  professionalInfo: ProfessionalInformationHelper | null;
  setProfessionalInfo: (info: ProfessionalInformationHelper) => void;
  updateProfessionalInfo: (info: ProfessionalInformationHelper) => void;
}

const useProfessionalInfoStore = create<ProfessionalInfoState>((set) => ({
  professionalInfo: null,
  setProfessionalInfo: (info) => set({ professionalInfo: info }),
  updateProfessionalInfo: (info) => set({ professionalInfo: info }),
}));

export default useProfessionalInfoStore;
