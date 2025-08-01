import { useEffect, useState } from "react";
import Modal from "../../Modal";
import api from "@/app/lib/api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useExperienceStore from "@/app/store/candidate/experience";
import { experienceHelper } from "@/app/types/candidate/experience";

interface Props {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  experience: experienceHelper;
}

const DeleteExperience = ({ showModal, setShowModal, experience }: Props) => {
  const deleteExperience = useExperienceStore((state) => state.deleteExperience);
  const { handleSubmit } = useForm();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    if (!experience.id) {
      toast.error("Record not found, try again!");
      setShowModal(false);
      return;
    }

    try {
      setSubmitting(true);
      await api.delete(`/candidate/profile/experience/${experience.id}`);
      toast.success("Experience deleted successfully.");
      deleteExperience(experience.id);
      setShowModal(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to delete experience. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <Modal
      showModal={showModal}
      onClose={() => setShowModal(false)}
      onSubmit={handleSubmit(onSubmit)}
      submitting={submitting}
      title="Are you sure?"
      submitText="Confirm"
    >
      <p>Are you sure you want to remove this experience from your profile?</p>
    </Modal>
  );
};

export default DeleteExperience;
