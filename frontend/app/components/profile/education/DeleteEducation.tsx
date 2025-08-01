import { useEffect, useState } from "react";
import Modal from "../../Modal";
import { educationHelper } from "@/app/types/candidate/educations";
import { useForm } from "react-hook-form";
import api from "@/app/lib/api";
import { toast } from "react-toastify";
import useEducationStore from "@/app/store/candidate/educationStore";

interface props {
  education: educationHelper;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const DeleteEducation = ({ showModal, setShowModal, education }: props) => {
  const deleteEducation = useEducationStore((state) => state.deleteEducation);
  const { handleSubmit } = useForm();

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    if (!education.id) {
      toast.error("Record not found, try again !");
      setShowModal(false);
    }
    try {
      setSubmitting(true);
      await api.delete(`/candidate/profile/education/${education.id}`);
      toast.success("Education deleted successfully.");
      deleteEducation(education.id);
      // onSuccess(education.id);
      setShowModal(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete education. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(() => {
    // Disable background scroll
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scroll when modal unmounts
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <Modal
      showModal={showModal}
      onClose={() => setShowModal(false)}
      onSubmit={handleSubmit(onSubmit)}
      submitting={submitting}
      title="Are you sure ?"
      submitText="Confirm"
    >
      <p>
        Are you sure you want to remove this educational qualification from your
        profile?
      </p>
    </Modal>
  );
};

export default DeleteEducation;
