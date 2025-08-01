import { useEffect, useState } from "react";
import Modal from "../../Modal";
import { useForm } from "react-hook-form";
import api from "@/app/lib/api";
import { toast } from "react-toastify";
import { experienceHelper } from "@/app/types/candidate/experience";
import useExperienceStore from "@/app/store/candidate/experience";

interface Props {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  experience: experienceHelper;
}

interface Input {
  institute_name: string;
  institute_address: string;
  position: string;
  job_type: string;
  started_date: string;
  end_date?: string | null;
}

const EditExperience = ({ showModal, setShowModal, experience }: Props) => {
  const updateExperience = useExperienceStore((state) => state.updateExperience);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<Input>();

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (showModal && experience) {
      reset({
        institute_name: experience.institute_name || "",
        institute_address: experience.institute_address || "",
        position: experience.position || "",
        job_type: experience.job_type || "",
        started_date: experience.started_date
        ? new Date(experience.started_date).toISOString().split("T")[0]
        : "",
        end_date: experience.end_date
        ? new Date(experience.end_date).toISOString().split("T")[0]
        : "",
      });

      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal, experience, reset]);

  const onSubmit = async (data: Input) => {
    if (!experience.id) {
      toast.error("Record not found, try again!");
      setShowModal(false);
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.patch(`/candidate/profile/experience/${experience.id}`, data);
      toast.success("Experience updated successfully!");

      const updated: experienceHelper = {
        id: res.data.experience.id,
        user_id: res.data.experience.user_id,
        institute_name: res.data.experience.institute_name,
        institute_address: res.data.experience.institute_address,
        position: res.data.experience.position,
        job_type: res.data.experience.job_type,
        started_date: res.data.experience.started_date,
        end_date: res.data.experience.end_date ?? null,
      };

      updateExperience(updated);
      reset();
      setShowModal(false);
    } catch (err: any) {
      const res = err.response;
      if (!res) {
        toast.error("Network Error, Try again!");
      } else if (res.data?.errors) {
        for (const key in res.data.errors) {
          setError(key as keyof Input, {
            type: "server",
            message: res.data.errors[key][0],
          });
        }
      } else {
        toast.error(res.data?.message || "Something went wrong. Please try again.");
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
      title="Edit Your Work Experience"
      submitText="Update"
    >
      <div className="flex flex-col gap-2 w-full">
        <label>
          Institute Name<span className="ml-1 text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("institute_name", { required: "Institute name is required." })}
          className={`border rounded-md h-10 w-full px-3 ${
            errors.institute_name ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.institute_name && (
          <p className="text-red-500 text-sm">{errors.institute_name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label>
          Institute Address<span className="ml-1 text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("institute_address", { required: "Institute address is required." })}
          className={`border rounded-md h-10 w-full px-3 ${
            errors.institute_address ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.institute_address && (
          <p className="text-red-500 text-sm">{errors.institute_address.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label>
          Position<span className="ml-1 text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("position", { required: "Position is required." })}
          className={`border rounded-md h-10 w-full px-3 ${
            errors.position ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.position && (
          <p className="text-red-500 text-sm">{errors.position.message}</p>
        )}
      </div>

      <div className="flex justify-center items-start flex-col gap-2 w-full">
        <label>
          Job type<span className="ml-1 text-red-500">*</span>
        </label>
        <select
          {...register("job_type", { required: "Job type is required" })}
          className={`border rounded-md h-10 w-full px-3 ${
            errors.job_type ? "border-red-500" : "border-gray-400"
          }`}
          defaultValue=""
        >
          <option value="" disabled>
            Select Job type
          </option>
          <option value="fulltime">fulltime</option>
          <option value="parttime">parttime</option>
          <option value="freelancer">freelancer</option>
          <option value="hybrid">hybrid</option>
        </select>
        {errors.job_type && (
          <p className="text-red-500 text-sm">{errors.job_type.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label>
          Started Date (A.D)<span className="ml-1 text-red-500">*</span>
        </label>
        <input
          type="date"
          {...register("started_date", { required: "Started Date is required." })}
          className={`border rounded-md h-10 w-full px-3 ${
            errors.started_date ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.started_date && (
          <p className="text-red-500 text-sm">{errors.started_date.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label>End Year</label>
        <input
          type="date"
          {...register("end_date")}
          className={`border rounded-md h-10 w-full px-3 ${
            errors.end_date ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.end_date && (
          <p className="text-red-500 text-sm">{errors.end_date.message}</p>
        )}
      </div>
    </Modal>
  );
};

export default EditExperience;
