import { useEffect, useState } from "react";
import Modal from "../../Modal";
import api from "@/app/lib/api";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useExperienceStore from "@/app/store/candidate/experience";

interface Props {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

interface Input {
  institute_name: string;
  institute_address: string;
  position: string;
  job_type: string;
  started_date: string;
  end_date?: string | null;
}

const AddExperience = ({ showModal, setShowModal }: Props) => {
  const addExperience = useExperienceStore((state) => state.addExperience);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<Input>();

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const onSubmit = async (data: Input) => {
    try {
      setSubmitting(true);
      const res = await api.post("/candidate/profile/experience", data);
      toast.success("Experience added successfully!");
      reset();
      setShowModal(false);
      addExperience(res.data.experience);
    } catch (err: any) {
      const res = err.response;
      if (!res) {
        toast.error("Network Error, Try again!");
        return;
      }
      const data = res.data;
      if (data.errors) {
        for (const key in data.errors) {
          if (Object.prototype.hasOwnProperty.call(data.errors, key)) {
            setError(key as keyof Input, {
              type: "server",
              message: data.errors[key][0],
            });
          }
        }
      } else if (data.message) {
        toast.error(data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
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
      title="Add Your Work Experience"
      submitText="Submit"
    >
      <div className="flex flex-col gap-2 w-full">
        <label>
          Institute Name<span className="ml-1 text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("institute_name", {
            required: "Institute name is required.",
          })}
          className={`border rounded-md h-10 w-full px-3 ${
            errors.institute_name ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.institute_name && (
          <p className="text-red-500 text-sm">
            {errors.institute_name.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label>
          Institute Address<span className="ml-1 text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("institute_address", {
            required: "Institute address is required.",
          })}
          className={`border rounded-md h-10 w-full px-3 ${
            errors.institute_address ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.institute_address && (
          <p className="text-red-500 text-sm">
            {errors.institute_address.message}
          </p>
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
          {...register("started_date", {
            required: "Started Date is required.",
          })}
          className={`border rounded-md h-10 w-full px-3 ${
            errors.started_date ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.started_date && (
          <p className="text-red-500 text-sm">{errors.started_date.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label>End Date</label>
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

export default AddExperience;
