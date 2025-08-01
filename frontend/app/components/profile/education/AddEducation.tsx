import { useEffect, useState } from "react";
import Modal from "../../Modal";
import api from "@/app/lib/api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useEducationStore from "@/app/store/candidate/educationStore";
interface props {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}
interface Input{
  institute_name:string;
  degree:string;
  field:string;
  start_year:number;
  end_year?:number|null;
}
const AddEducation = ({ showModal, setShowModal }: props) => {
const addEducation=useEducationStore((state)=>state.addEducation);
 const {register,handleSubmit,setError, formState:{errors},reset}=useForm<Input>();

 const[submitting,setSubmitting]=useState(false);

  useEffect(() => {
    // Disable background scroll
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scroll when modal unmounts
      document.body.style.overflow = "";
    };
  }, []);

  

  const onSubmit = async(data:Input) => {
    
    try{
      setSubmitting(true);
      const res=await api.post('/candidate/profile/education',data);
      toast.success("Education added successfully!");
      reset();
      setShowModal(false);
      // const formatedData:educationHelper={
      //   id:res.data.education.id,
      //   user_id:res.data.education.user_id,
      //   institute_name:res.data.education.institute_name,
      //   degree:res.data.education.degree,
      //   field:res.data.education.field,
      //   start_year:res.data.education.start_year,
      //   end_year:res.data.education.end_year??null,
      // };
      addEducation(res.data.education);
    }
    catch(err:any){
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
    }
    finally{
      setSubmitting(false);
    }
  
  };
  return (
    <Modal
      showModal={showModal}
      onClose={() => setShowModal(false)}
      onSubmit={handleSubmit(onSubmit)}
      submitting={submitting}
      title="Add Your Educational Qualification"
      submitText="Submit"
    >
      <div className="flex justify-center items-start flex-col  gap-2 w-full">
        <label>
          Institute Name<span className="ml-1 text-red-500">*</span>
        </label>
        <input
          type="text"
         {...register("institute_name",{required:"Institute name is required."})}
          
         className={`border rounded-md h-10 w-full px-3 ${
          errors.institute_name ? "border-red-500" : "border-gray-400"
        }`}
        />
        {errors.institute_name && (
          <p className="text-red-500 text-sm">{errors.institute_name.message}</p>
        )}
      </div>
      <div className="flex justify-center items-start flex-col  gap-2 w-full">
        <label>
          Degree<span className="ml-1 text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("degree",{required:"Degree is required."})}
          className={`border rounded-md h-10 w-full px-3 ${
            errors.degree ? "border-red-500" : "border-gray-400"
          }`}
        />
         {errors.degree && (
          <p className="text-red-500 text-sm">{errors.degree.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label>
          Field<span className="ml-1 text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("field", { required: "Field of study is required" })}
          className={`border rounded-md h-10 w-full px-3 ${
            errors.field ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.field && (
          <p className="text-red-500 text-sm">{errors.field.message}</p>
        )}
      </div>
      <div className="flex justify-center items-start flex-col  gap-2 w-full">
        <label>
          Started year<span className="ml-1 text-red-500">*</span>
        </label>
        <input
          type="number"
          {...register("start_year",{required:"Start Year is required."})}

          className={`border rounded-md h-10 w-full px-3 ${
            errors.start_year ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.start_year && (
          <p className="text-red-500 text-sm">{errors.start_year.message}</p>
        )}
      </div>
      <div className="flex justify-center items-start flex-col  gap-2 w-full">
        <label>End Year</label>
        <input
          type="number"
          {...register("end_year")}

          className={`border rounded-md h-10 w-full px-3 ${
            errors.end_year ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.end_year && (
          <p className="text-red-500 text-sm">{errors.end_year.message}</p>
        )}
      </div>
    </Modal>
  );
};

export default AddEducation;
