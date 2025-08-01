import { Cross, Crosshair, LucideCross, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Modal from "../../Modal";
import usePersonalInfoStore from "@/app/store/candidate/personalInfoStore";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "@/app/lib/api";
interface props {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}
interface Input {
  full_name: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  dob: string;
  gender: "male" | "female" | "other";
}
const EditPersonal = ({ showModal, setShowModal }: props) => {
  const [submitting, setSubmitting] = useState(false);

  const personalInfo = usePersonalInfoStore((state) => state.personalInfo);

  const setPersonalInfo = usePersonalInfoStore(
    (state) => state.setPersonalInfo
  );
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<Input>();

  useEffect(() => {
    // Disable background scroll
    if (personalInfo && showModal) {
      reset({
        full_name: personalInfo.full_name || "",
        phone: personalInfo.phone || "",
        country: personalInfo.country || "",
        state: personalInfo.state || "",
        city: personalInfo.city || "",
        dob: personalInfo.dob
          ? new Date(personalInfo.dob).toISOString().split("T")[0]
          : "",
        gender: personalInfo.gender || "",
      });
    }

    if (showModal) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      // Re-enable scroll when modal unmounts
      document.body.style.overflow = "";
    };
  }, [showModal, personalInfo, reset]);

  const onSubmit = async (data: Input) => {
    try {
      setSubmitting(true);
      const res = await api.post("/candidate/profile/personal", data);
      toast.success("Personal Information updated successfully!");
      reset();
      setShowModal(false);
      setPersonalInfo(res.data.personal);
    } catch (err: any) {
      const res = err.response;
      if (!res) {
        toast.error("Network Error, Try again!");
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
      title="Edit Your Personal Info"
      submitText="Update"
    >
      <div className="flex justify-center items-start flex-col  gap-2 w-full">
        <label>
          Full Name<span className="ml-1 text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("full_name", { required: "Full Name is required" })}
          className={`border rounded-md h-10 w-full px-3 ${
            errors.full_name ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.full_name && (
          <p className="text-red-500 text-sm">{errors.full_name.message}</p>
        )}
      </div>
      <div className="flex justify-center items-start flex-col  gap-2 w-full">
        <label>
          Phone Number<span className="ml-1 text-red-500">*</span>
        </label>
        <input
          type="Number"
          {...register("phone", { required: "Phone Number is required" })}
          className={`border rounded-md h-10 w-full px-3 ${
            errors.phone ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
      </div>
      <div className="flex justify-center items-start flex-col  gap-2 w-full">
        <label>
          Country<span className="ml-1 text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("country", { required: "Country is required" })}
          className={`border rounded-md h-10 w-full px-3 ${
            errors.country ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.country && (
          <p className="text-red-500 text-sm">{errors.country.message}</p>
        )}
      </div>
      <div className="flex justify-center items-start flex-col  gap-2 w-full">
        <label>
          State<span className="ml-1 text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("state", { required: "State is required" })}
          className={`border rounded-md h-10 w-full px-3 ${
            errors.state ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.state && (
          <p className="text-red-500 text-sm">{errors.state.message}</p>
        )}
      </div>
      <div className="flex justify-center items-start flex-col  gap-2 w-full">
        <label>
          City<span className="ml-1 text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("city", { required: "City is required" })}
          className={`border rounded-md h-10 w-full px-3 ${
            errors.city ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.city && (
          <p className="text-red-500 text-sm">{errors.city.message}</p>
        )}
      </div>
      <div className="flex justify-center items-start flex-col  gap-2 w-full">
        <label>
          DOB (A.D)<span className="ml-1 text-red-500">*</span>
        </label>
        <input
          {...register("dob", { required: "Date of Birth is required" })}
          type="date"
          className={`border rounded-md h-10 w-full px-3 ${
            errors.dob ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.dob && (
          <p className="text-red-500 text-sm">{errors.dob.message}</p>
        )}
      </div>

      <div className="flex justify-center items-start flex-col gap-2 w-full">
        <label>
          Gender<span className="ml-1 text-red-500">*</span>
        </label>
        <select
          {...register("gender", { required: "Gender is required" })}
          className={`border rounded-md h-10 w-full px-3 ${
            errors.gender ? "border-red-500" : "border-gray-400"
          }`}
          defaultValue=""
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender.message}</p>
        )}
      </div>
    </Modal>
  );
};

export default EditPersonal;
