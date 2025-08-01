import {
  BriefcaseBusiness,
  EditIcon,
  GraduationCap,
  GraduationCapIcon,
  LucideTrash2,
  PlusCircle,
} from "lucide-react";
import { useState } from "react";
import AddSkills from "./AddSkills";
import EditSkills from "./EditSkills";
import DeleteSkills from "./DeleteSkills";
import useSkillStore from "@/app/store/candidate/skill";
import { skillHelper } from "@/app/types/candidate/skill";

const Skills = () => {
  const skills = useSkillStore((state) => state.skills);
  const [selectedSkill,setSelectedSkill]=useState<skillHelper | null>(null);
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
        <span>Add Skill</span>
      </button>
      {skills.length === 0 ? (
        <p className="text-gray-500 text-lg text-center ">No data availabe</p>
      ) : (
        skills.map((data) => (
          <div
            key={data.id}
            className="flex justify-between items-center fel w-full"
          >
            <div className="flex justify-center items-start flex-col gap-1">
              <strong>{data.name}</strong>
              {data.experience && (
                <div className="flex justify-start items-center gap-2">
                  <GraduationCap />
                  <p>
                    {data.experience?.position} at{" "}
                    {data.experience?.institute_name}
                  </p>
                </div>
              )}
              {data.education && (
                <div className="flex justify-start items-center gap-2">
                  <BriefcaseBusiness />
                  <p>
                    {data.education?.degree} at {data.education?.institute_name}
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-end items-center gap-3">
              <button
                onClick={() => {
                  setSelectedSkill(data);
                  setDeleteModal(true);
                }}
                className="cursor-pointer"
              >
                <LucideTrash2 className="size-6 text-gray-600" />
              </button>
              <button
                onClick={() => {
                  setSelectedSkill(data);
                  setEditModal(true);
                }}
                className="cursor-pointer"
              >
                <EditIcon className="size-6 text-gray-600" />
              </button>
            </div>
          </div>
        ))
      )}

      {addModal && (
        <AddSkills showModal={addModal} setShowModal={setAddModal} />
      )}
      {(editModal && selectedSkill) && (
        <EditSkills skill={selectedSkill} showModal={editModal} setShowModal={setEditModal} />
      )}
      {(deleteModal && selectedSkill) && (
        <DeleteSkills skill={selectedSkill} showModal={deleteModal} setShowModal={setDeleteModal} />
      )}
    </div>
  );
};

export default Skills;
