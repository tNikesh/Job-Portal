import {
  EditIcon,
  GraduationCapIcon,
  LucideTrash2,
  PlusCircle,
} from "lucide-react";
import AddEducation from "./AddEducation";
import { useState } from "react";
import EditEducation from "./EditEducation";
import DeleteEducation from "./DeleteEducation";
import {  educationHelper } from "@/app/types/candidate/educations";
import useEducationStore from "@/app/store/candidate/educationStore";

const Education = () => {
  const educations=useEducationStore((state)=>state.educations)
  const [selectedEducation, setSelectedEducation] =
  useState<educationHelper | null>(null);

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <div className="relative flex felx-col justify-start flex-col gap-10">
      <button
        onClick={() => setAddModal(true)}
        className="flex  text-blue-600 hover:text-blue-700 hover: focus:text-blue-800 cursor-pointer font-medium text-lg justify-start items-center gap-3"
      >
        <PlusCircle className="text-blue-600 size-8" />
        <span>Add Education</span>
      </button>

      {educations.length===0 ?
       (
       <p className="text-gray-500 text-lg text-center ">No data availabe</p>
      ) : (
        educations.map((data) => (
        <div key={data.id} className="flex justify-between items-center w-full">
          <div className="flex justify-start items-start gap-4">
            <GraduationCapIcon className="text-gray-500 size-10" />
            <div className="flex flex-col justify-start items-start gap-0">
              <p className="">
                Studies <strong>{data.degree}</strong> at{" "}
                <strong>{data.institute_name}</strong> ({data.field})
              </p>
              <p className="text-gray-500 text-sm">
                started in {data.start_year}
              </p>
              {data.end_year ? (
                <p className="text-gray-500 text-sm">
                  completed in {data.end_year}
                </p>
              ) : (
                <p className="text-gray-500 text-sm">ongoing</p>
              )}
            </div>
          </div>
          <div className="flex justify-end items-center gap-3">
            <button
              onClick={() => {
                setSelectedEducation(data);
                setDeleteModal(true);
              }}
              className="cursor-pointer"
            >
              <LucideTrash2 className="size-6 text-gray-600" />
            </button>
            <button
              onClick={() => {
                setSelectedEducation(data);
                setEditModal(true);
              }}
              className="cursor-pointer"
            >
              <EditIcon className="size-6 text-gray-600" />
            </button>
          </div>
        </div>
      )))}

      {addModal && (
        <AddEducation
          showModal={addModal}
          setShowModal={setAddModal}
        />
      )}
      {editModal && selectedEducation && (
        <EditEducation
          education={selectedEducation}
          showModal={editModal}
          setShowModal={setEditModal}
        />
      )}
      {deleteModal && selectedEducation && (
        <DeleteEducation
         education={selectedEducation}
          showModal={deleteModal}
          setShowModal={setDeleteModal}
        />
      )}
    </div>
  );
};

export default Education;
