"use client";

import {
  Calendar,
  Heart,
  HousePlusIcon,
  Mail,
  PhoneCall,
  UserCircle,
} from "lucide-react";
import ProfileSideBar from "@/app/components/profile/ProfileSideBar";
import ProfileSection from "@/app/components/profile/ProfileSection";
import React, { useState, useEffect } from "react";
import EditButton from "@/app/components/profile/personal/EditButton";
import { tabOptions } from "@/app/types/candidate/tabOptions";
import EditPersonal from "@/app/components/profile/personal/EditPersonal";
import AddButton from "@/app/components/profile/personal/AddButton";
import AddPersonal from "@/app/components/profile/personal/AddPersonal";
import api from "@/app/lib/api";
import useEducationStore from "@/app/store/candidate/educationStore";
import { userHelper } from "@/app/types/candidate/candidateUser";
import usePersonalInfoStore from "@/app/store/candidate/personalInfoStore";
import useProfessionalInfoStore from "@/app/store/candidate/professionalInfoStore";
import useSkillStore from "@/app/store/candidate/skill";
import useExperienceStore from "@/app/store/candidate/experience";
import AddProfessional from "@/app/components/profile/professional/AddProfessional";
import EditProfessional from "@/app/components/profile/professional/EditProfessional";
import Image from "next/image";
import useAuthStore from "@/app/store/authUserStore";

const page = () => {
  // const router = useRouter();

  const setPersonalInfo = usePersonalInfoStore(
    (state) => state.setPersonalInfo
  );
  const education = useEducationStore((state) => state.educations);
  const personalInfo = usePersonalInfoStore((state) => state.personalInfo);
  const professionalInfo = useProfessionalInfoStore(
    (state) => state.professionalInfo
  );
  const setProfessionalInfo = useProfessionalInfoStore(
    (state) => state.setProfessionalInfo
  );
  const setEducations = useEducationStore((state) => state.setEducations);
  const setSkills = useSkillStore((state) => state.setSkills);
  const setExperiences = useExperienceStore((state) => state.setExperiences);

  // const [userData, setUserData] = useState<userHelper | null>(null);
  const userData=useAuthStore((state)=>state.authUser);
  const [activeTab, setActiveTab] = useState<tabOptions>("education");
  const [isCreatingPersonalInfo, setIsCreatingPersonalInfo] = useState(false);
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [isEditingProfessionalInfo, setIsEditingProfessionalInfo] =
    useState(false);
  const [isCreatingProfessionalInfo, setIsCreatingProfessionalInfo] =
    useState(false);

  useEffect(() => {
    // Run only on client
    const fetechProfile = async () => {
      try {
        const res = await api.get("/candidate/profile");
        const data = res.data.user;
        const cleanedUser: userHelper = {
          id: data.id,
          username: data.username,
          email: data.email,
          role: data.role,
          skills: data.skills ?? [],
          educations: data.educations ?? [],
          experiences: data.experiences ?? [],
          professionalInformation: data.professionalInformation,
          personalInformation: data.personalInformation ?? null,
        };
        // setUserData(cleanedUser);
        setEducations(res.data.user.educations ?? []);
        setPersonalInfo(res.data.user.personal_information ?? null);
        setProfessionalInfo(res.data.user.professional_information ?? null);
        setExperiences(res.data.user.experiences ?? []);
        setSkills(res.data.user.skills ?? []);
      } catch (error) {}
    };
    fetechProfile();
  }, []);

  if (!userData) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex w-full justify-start items-start flex-col    gap-5 bg-gray-100">
      <div className="flex justify-start items-end gap-5 pb-10 bg-white w-full px-5 sm:px-20">
                <Image src="/images/avatar.png" width={300} height={300} alt="Avatar"/>
        
        <div className="flex justify-start items-start gap-2 flex-col">
          <div className="flex justify-start items-center gap-3">
            <p>{userData.username}</p>
            <p className=" bg-blue-500 text-sm text-white px-1 py-0 rounded-full">
              {userData.role}
            </p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <Mail />
            <span>{userData.email}</span>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between items-start  px-5 sm:px-20 gap-10 ">
        <div className="w-full max-w-[350px] space-y-8">
          <div className=" flex justify-center items-start gap-3 flex-col w-full bg-white p-5 rounded-md">
            <h2 className="font-medium text-center">Personal Info</h2>
            {!personalInfo ? (
              <>
                <AddButton
                  setShowModal={() => setIsCreatingPersonalInfo(true)}
                />
                <AddPersonal
                  showModal={isCreatingPersonalInfo}
                  setShowModal={setIsCreatingPersonalInfo}
                />
              </>
            ) : (
              <>
                <div className="flex justify-start items-center gap-2">
                  <UserCircle />
                  <span>{personalInfo?.full_name}</span>
                </div>

                <div className="flex justify-start items-center gap-2">
                  <HousePlusIcon />
                  <span>
                    Lives in {personalInfo?.city}, {personalInfo?.state},{" "}
                    {personalInfo?.country}
                  </span>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <PhoneCall />
                  <span>{personalInfo?.phone}</span>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <Calendar />
                  <span>
                    {personalInfo?.dob
                      ? new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }).format(new Date(personalInfo.dob))
                      : ""}
                  </span>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <Heart />
                  <span>Male</span>
                </div>

                <EditButton
                  setShowModal={() => setIsEditingPersonalInfo(true)}
                />
                <EditPersonal
                  showModal={isEditingPersonalInfo}
                  setShowModal={setIsEditingPersonalInfo}
                />
              </>
            )}
          </div>
          <div className="mb-10 flex justify-center items-start gap-3 flex-col w-full  bg-white p-5 rounded-md">
            <h2 className="font-medium text-center">Pofessional Info</h2>

            {!professionalInfo ? (
              <>
                <AddButton
                  setShowModal={() => setIsCreatingProfessionalInfo(true)}
                />
                <AddProfessional
                  showModal={isCreatingProfessionalInfo}
                  setShowModal={setIsCreatingProfessionalInfo}
                />
              </>
            ) : (
              <>
                <div className="flex justify-center items-start gap-2">
                  <span className="text-gray-950 w-fit whitespace-nowrap">
                    Preferred Jobs:
                  </span>
                  <span className="text-gray-700 whitespace-break-spaces">
                    {professionalInfo?.preferred_jobs?.join(", ") || "N/A"}
                  </span>
                </div>
                <div className="flex justify-center items-start gap-2">
                  <span className="text-gray-950 w-fit whitespace-nowrap">
                    Interested Industry:
                  </span>
                  <span className="text-gray-700 whitespace-break-spaces">
                    {professionalInfo?.interested_industries??'-' }
                  </span>
                </div>
                <div className="flex justify-center items-start gap-2">
                  <span className="text-gray-950 w-fit whitespace-nowrap">
                    Skills:
                  </span>
                  <span className="text-gray-700 whitespace-break-spaces">
                    {professionalInfo?.skills??'-' }
                  </span>
                </div>
                <div className="flex justify-center items-start gap-2">
                  <span className="text-gray-950 w-fit whitespace-nowrap">
                    Employment Status:
                  </span>
                  <span className="text-gray-700 whitespace-break-spaces">
                    {professionalInfo?.employment_status}
                  </span>
                </div>
                <EditButton
                  setShowModal={() => setIsEditingProfessionalInfo(true)}
                />
                <EditProfessional
                  showModal={isEditingProfessionalInfo}
                  setShowModal={setIsEditingProfessionalInfo}
                />
              </>
            )}
          </div>
        </div>
        <div className="flex justify-center flex-col w-full bg-white p-5 rounded-md">
          <ProfileSideBar activeTab={activeTab} setActiveTab={setActiveTab} />
          <ProfileSection
            educations={education}
            activeTab={activeTab}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
