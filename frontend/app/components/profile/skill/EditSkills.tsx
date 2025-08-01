"use client";
import { useEffect, useState } from "react";
import Modal from "../../Modal";
import { toast } from "react-toastify";
import api from "@/app/lib/api";
import useEducationStore from "@/app/store/candidate/educationStore";
import useExperienceStore from "@/app/store/candidate/experience";
import useSkillStore from "@/app/store/candidate/skill";
import { useForm } from "react-hook-form";
import { skillHelper } from "@/app/types/candidate/skill";
interface props {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  skill: skillHelper;
}

interface SkillInput {
  name: string;
  education_id?: number | null;
  experience_id?: number | null;
}

const EditSkills = ({ showModal, setShowModal, skill }: props) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
    setValue,
    reset,
  } = useForm<SkillInput>({
    defaultValues: {
      name: skill.name,
      education_id: skill.education_id ?? null,
      experience_id: skill.experience_id ?? null,
    },
  });

  const selectedEduId = watch("education_id");
  const selectedExpId = watch("experience_id");

  const [submitting, setSubmitting] = useState(false);

  const education = useEducationStore((state) => state.educations);
  const experience = useExperienceStore((state) => state.experiences);
  const updateSkill = useSkillStore((state) => state.updateSkill);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const onSubmit = async (data: SkillInput) => {
    if (!skill.id) {
      toast.error("Record not found, try again!");
      setShowModal(false);
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.patch(`profile/skill/${skill.id}`, data);
      updateSkill(res.data.skill);
      toast.success("Skill added successfully!");
      reset();
      setShowModal(false);
    } catch (err: any) {
      const res = err.response;
      if (!res) {
        toast.error("Network error. Please try again.");
      } else if (res.data?.errors) {
        const data = res.data.errors;
        for (const key in data) {
          setError(key as keyof SkillInput, {
            type: "server",
            message: data[key][0],
          });
        }
      } else {
        toast.error(res.data?.message || "Something went wrong.");
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Modal
      showModal={showModal}
      onClose={() => setShowModal(false)}
      onSubmit={handleSubmit(onSubmit)}
      submitting={submitting}
      title="Edit Your Skills"
      submitText="Update"
    >
      <div className="flex flex-col gap-2 w-full">
        <label>
          Skill Name<span className="ml-1 text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Web Development"
          {...register("name", { required: "Skill name is required" })}
          className={`border rounded-md h-10 w-full px-3 ${
            errors.name ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-3 mt-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Where did you apply this skill?
        </h2>

        <div>
          <h3 className="font-medium text-gray-700">Experience</h3>
          {experience?.length > 0 ? (
            experience.map((exp) => (
              <label key={exp.id} className="flex items-center gap-2 mt-2">
                <input
                  type="radio"
                  name="experience_id"
                  value={exp.id}
                  checked={selectedExpId === exp.id}
                  onChange={() => setValue("experience_id", exp.id)}
                  className="size-4"
                />
                <span>
                  {exp.position} at {exp.institute_name}
                </span>
              </label>
            ))
          ) : (
            <p className="text-sm text-gray-500">No experiences found</p>
          )}
        </div>

        <div className="mt-4">
          <h3 className="font-medium text-gray-700">Education</h3>
          {education?.length > 0 ? (
            education.map((edu) => (
              <label key={edu.id} className="flex items-center gap-2 mt-2">
                <input
                  type="radio"
                  name="education_id"
                  value={edu.id}
                  checked={selectedEduId === edu.id}
                  onChange={() => setValue("education_id", edu.id)}
                  className="size-4"
                />
                <span>
                  {edu.degree} at {edu.institute_name}
                </span>
              </label>
            ))
          ) : (
            <p className="text-sm text-gray-500">No education records found</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EditSkills;
