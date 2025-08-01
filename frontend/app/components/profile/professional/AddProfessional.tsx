import React, { useEffect, useState } from "react";
import Modal from "../../Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useProfessionalInfoStore from "@/app/store/candidate/professionalInfoStore";
import api from "@/app/lib/api";

interface Props {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

interface Input {
  skills: string;
  preferred_jobs: string[];
  interested_industries: string; // Fixed typo: was "intrested_industries"
  employment_status: string;
}

const jobOptions = ["remote", "fulltime", "parttime", "hybrid"];

const AddProfessional = ({ showModal, setShowModal }: Props) => {
  const [submitting, setSubmitting] = useState(false);

  const setProfessionalInfo = useProfessionalInfoStore(
    (state) => state.setProfessionalInfo
  );

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<Input>();

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showModal]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const onSubmit = async (data: Input) => {
    try {
      setSubmitting(true);
      const res = await api.post("/candidate/profile/professional", data);
      toast.success("Professional Information added successfully!");
      reset();
      setShowModal(false);
      setProfessionalInfo(res.data.professional);
    }catch(err:any){
          const res=err.response;
          if(!res){
            toast.error("Network Error, Try again!");
          }
          const data=res.data;
          if(data.errors){
            for(const key in data.errors){
              if(Object.prototype.hasOwnProperty.call(data.errors,key)){
                  setError(key as keyof Input,{
                    type:"server",
                    message:data.errors[key][0]
                  })
              }
              
            }
          }
          else if (data.message) {
            // Show generic error toast for non-validation error
            toast.error(data.message);
          }
          else {
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
      title="Add Your Professional Info"
      submitText="Submit"
    >
      {/* Preferred Job Types */}
      <div className="flex flex-col gap-2 w-full">
        <label>
          Preferred Job Types<span className="ml-1 text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-4">
          {jobOptions.map((job) => (
            <label key={job} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={job}
                {...register("preferred_jobs", {
                  required: "At least one job type is required",
                })}
              />
              <span className="capitalize">{job}</span>
            </label>
          ))}
        </div>
        {errors.preferred_jobs && (
          <p className="text-red-500 text-sm">
            {errors.preferred_jobs.message}
          </p>
        )}
      </div>

    
      <div className="flex flex-col gap-2 w-full mt-4">
        <label>
          Add skills<span className="ml-1 text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Comma separated e.g. Web dev, python, C++"
          {...register("skills", {
            required: "Skills are required",
          })}
          className={`border rounded-md h-10 w-full px-3 ${
            errors.skills ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.interested_industries && (
          <p className="text-red-500 text-sm">
            {errors.interested_industries.message}
          </p>
        )}
      </div>
      {/* Interested Industries */}
      <div className="flex flex-col gap-2 w-full mt-4">
        <label>
          Interested Industries<span className="ml-1 text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Comma separated e.g. Tech, Health, Finance"
          {...register("interested_industries", {
            required: "Interested industries are required",
          })}
          className={`border rounded-md h-10 w-full px-3 ${
            errors.interested_industries ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.interested_industries && (
          <p className="text-red-500 text-sm">
            {errors.interested_industries.message}
          </p>
        )}
      </div>

      {/* Employment Status */}
      <div className="flex flex-col gap-2 w-full mt-4">
        <label>
          Employment Status<span className="ml-1 text-red-500">*</span>
        </label>
        <select
          {...register("employment_status", {
            required: "Employment status is required",
          })}
          className={`border rounded-md h-10 w-full px-3 ${
            errors.employment_status ? "border-red-500" : "border-gray-400"
          }`}
          defaultValue=""
        >
          <option value="" disabled>
            Select Employment Status
          </option>
          <option value="employed">Employed</option>
          <option value="unemployed">Unemployed</option>
          <option value="freelancer">Freelancer</option>
          <option value="student">Student</option>
          <option value="other">Other</option>
        </select>
        {errors.employment_status && (
          <p className="text-red-500 text-sm">
            {errors.employment_status.message}
          </p>
        )}
      </div>
    </Modal>
  );
};

export default AddProfessional;