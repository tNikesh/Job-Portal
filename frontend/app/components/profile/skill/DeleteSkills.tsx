"use client";

import { useEffect, useState } from "react";
import Modal from "../../Modal";
import api from "@/app/lib/api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useSkillStore from "@/app/store/candidate/skill";
import { skillHelper } from "@/app/types/candidate/skill";

interface Props {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  skill: skillHelper;
}

const DeleteSkills = ({ showModal, setShowModal, skill }: Props) => {
  const deleteSkill = useSkillStore((state) => state.deleteSkill);
  const { handleSubmit } = useForm();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    if (!skill.id) {
      toast.error("Skill not found, try again!");
      setShowModal(false);
      return;
    }

    try {
      setSubmitting(true);
      await api.delete(`/profile/skill/${skill.id}`);
      toast.success("Skill deleted successfully.");
      deleteSkill(skill.id);
      setShowModal(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to delete skill. Please try again."
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
      <p>Are you sure you want to remove this skill from your profile?</p>
    </Modal>
  );
};

export default DeleteSkills;
