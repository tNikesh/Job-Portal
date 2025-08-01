import { Briefcase, BriefcaseBusiness, BusIcon, EditIcon, GraduationCapIcon, LucideTrash2, PlusCircle, } from "lucide-react"
import { useState } from "react"
import AddExperience from "./AddExperience";
import EditExperience from "./EditExperience";
import DeleteExperience from "./DeleteExperience";
import { experienceHelper } from "@/app/types/candidate/experience";
import useExperienceStore from "@/app/store/candidate/experience";

const Experience = () => {

  const experiences=useExperienceStore((state)=>state.experiences)
  const [selectedExperience, setSelectedExperience] =
    useState<experienceHelper | null>(null);

    const [addModal,setAddModal]=useState(false);
    const [editModal,setEditModal]=useState(false);
    const [deleteModal,setDeleteModal]=useState(false);

  return (
    <div className="relative flex felx-col justify-start flex-col gap-10">
      <button onClick={()=>setAddModal(true)}  className="flex  text-blue-600 hover:text-blue-700 hover: focus:text-blue-800 cursor-pointer font-medium text-lg justify-start items-center gap-3">
        <PlusCircle className="text-blue-600 size-8"/>
        <span>Add Work Experience</span>
      </button>
      {experiences.length===0 ?
       (
       <p className="text-gray-500 text-lg text-center ">No data availabe</p>
      ) : (
      
      experiences.map((data)=>(
        <div key={data.id} className="flex justify-between items-center w-full">
        <div className="flex justify-start items-start gap-4">
          <BriefcaseBusiness className="text-gray-500 size-10"/>
          <div className="flex flex-col justify-start items-start gap-0">
            <strong>{data.position}</strong>
          <p>{data.institute_name} ({data.job_type})</p>
          <p className="text-gray-500 text-sm flex justify-start items-center gap-2">
        <span>

          { new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }).format(new Date(data.started_date))
        }
        </span>
        <span>

             - 
        </span>
        <span>


             { data.end_date ? new Intl.DateTimeFormat("en-US", {
               year: "numeric",
               month: "short",
               day: "numeric",
              }).format(new Date(data.end_date))
              :'Ongoing' }
              </span>
             </p>
          <p className="text-gray-500 text-sm">{data.institute_address}</p>
          </div>
        </div>
        <div className="flex justify-end items-center gap-3">
          <button onClick={()=>{
                setSelectedExperience(data);
                setDeleteModal(true);
              }} className="cursor-pointer">
            <LucideTrash2 className="size-6 text-gray-600"/>
          </button>
          <button onClick={()=>{
                setSelectedExperience(data);
                setEditModal(true);}} className="cursor-pointer">
            <EditIcon className="size-6 text-gray-600"/>
          </button>
        </div>
      </div>
      ))
      )}
     
    
      {addModal &&
      <AddExperience showModal={addModal} setShowModal={setAddModal}/>
      }
      {(editModal && selectedExperience) &&
      <EditExperience  experience={selectedExperience} showModal={editModal} setShowModal={setEditModal}/>
      }
      {(deleteModal && selectedExperience) &&
      <DeleteExperience  experience={selectedExperience}  showModal={deleteModal} setShowModal={setDeleteModal}/>
      }
    </div>
  )
}

export default Experience