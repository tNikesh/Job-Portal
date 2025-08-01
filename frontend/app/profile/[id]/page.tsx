"use client";

import {
  BookMarkedIcon,
  BriefcaseBusiness,
  BriefcaseIcon,
  Building2Icon,
  Calendar,
  CalendarArrowUp,
  Globe,
  GraduationCapIcon,
  Heart,
  HousePlusIcon,
  InfoIcon,
  Mail,
  MapPinCheckIcon,
  Navigation,
  PhoneCall,
  PhoneIcon,
  UserCircle,
  UserCircleIcon,
} from "lucide-react";
import ProfileSideBar from "@/app/components/profile/ProfileSideBar";
import React, { useState, useEffect } from "react";

import api from "@/app/lib/api";

import Image from "next/image";
import {  useParams } from "next/navigation";
import { useProgressRouter } from "@/app/components/NavigationWrapper";
import { tabOptions } from "@/app/types/candidate/tabOptions";
import { toast } from "react-toastify";

const page = () => {
  const params = useParams();
  const userId = params?.id as string;

  const router=useProgressRouter();
 
    const [activeTab, setActiveTab] = useState<tabOptions>("education");

  const [user,setUser]=useState<any>(null);

  

  useEffect(() => {
    // Run only on client
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/user/${userId}`);
        const user = res.data.user;
        // setUserData(cleanedUser);
        setUser(user);
      } catch (error) {

        toast.error("Not found");
      }
    };
    if (userId) fetchProfile();
  }, [userId]);

 if(!user){
  return <div className="w-full mx-auto">Loading...</div>
 }

  return (
    <div className="flex w-full justify-start items-start flex-col    gap-5 bg-gray-100">
      <div className="flex justify-start items-end gap-5 pb-10 bg-white w-full px-5 sm:px-20">
                <Image src="/images/avatar.png" width={300} height={300} alt="Avatar"/>
        
        <div className="flex justify-start items-start gap-2 flex-col">
          <div className="flex justify-start items-center gap-3">
            <p>{user.username}</p>
            <p className=" bg-blue-500 text-sm text-white px-1 py-0 rounded-full">
              {user.role}
            </p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <Mail />
            <span>{user.email}</span>
          </div>
        </div>
      </div>
      {user?.role=="employer"?(

      
      <div className="w-full max-w-7xl bg-white rounded-md mx-auto p-8 my-10">
      {!user.employer?(
        <p className="text-gray-500">No data found</p>
      ):(
        <div className="container mx-auto p-6">
        {/* Employer Profile Header */}
        <div className="mb-6">
          <h2 className="text-4xl font-thin text-gray-700">Employer Profile</h2>
        </div>
  
        {/* Company Information */}
        <section className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 flex items-center">
            <Building2Icon className="mr-3 text-blue-600" />
            Company Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div className="flex items-center space-x-3">
              <Building2Icon className="text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Company Name</h4>
                <p className="text-gray-800">{user.employer.company_name}</p>
              </div>
            </div>
  
            <div className="flex items-center space-x-3">
              <Globe className="text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Company Website</h4>
                <p className="text-gray-800">{user.employer.company_website || "N/A"}</p>
              </div>
            </div>
  
            <div className="col-span-2 flex items-start space-x-3">
              <InfoIcon className="text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Company Description</h4>
                <p className="text-gray-800">{user.employer.company_description || "N/A"}</p>
              </div>
            </div>
  
            <div className="flex items-center space-x-3">
              <CalendarArrowUp className="text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Company Type</h4>
                <p className="text-gray-800">{user.employer.company_type || "N/A"}</p>
              </div>
            </div>
          </div>
        </section>
  
        {/* Contact Information */}
        <section className="space-y-6 mt-5">
          <h3 className="text-xl font-medium text-gray-900 flex items-center">
            <UserCircleIcon className="mr-3 text-blue-600" />
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <UserCircleIcon className="text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Contact Person</h4>
                <p className="text-gray-800">{user.employer.contact_person}</p>
              </div>
            </div>
  
            <div className="flex items-center space-x-3">
              <BriefcaseIcon className="text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Designation</h4>
                <p className="text-gray-800">{user.employer.designation || "N/A"}</p>
              </div>
            </div>
  
            <div className="flex items-center space-x-3">
              <PhoneIcon className="text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Phone</h4>
                <p className="text-gray-800">{user.employer.phone}</p>
              </div>
            </div>
  
            <div className="flex items-center space-x-3">
              <PhoneIcon className="text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Alternate Phone</h4>
                <p className="text-gray-800">{user.employer.alternate_phone || "N/A"}</p>
              </div>
            </div>
          </div>
        </section>
  
        {/* Company Details */}
        <section className="space-y-6 mt-5">
          <h3 className="text-xl font-medium text-gray-900 flex items-center">
            <BookMarkedIcon className="mr-3 text-blue-600" />
            Company Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <BookMarkedIcon className="text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Company Size</h4>
                <p className="text-gray-800">{user.employer.company_size || "N/A"}</p>
              </div>
            </div>
  
            <div className="flex items-center space-x-3">
              <MapPinCheckIcon className="text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Address</h4>
                <p className="text-gray-800">
                  {user.employer.company_address}, {user.employer?.city}, {user.employer?.state}, {user.employer.country}
                </p>
              </div>
            </div>
  
            <div className="flex items-center space-x-3">
              <Navigation className="text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Country</h4>
                <p className="text-gray-800">{user.employer.country}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      )}
      </div>

):(

      <div className="w-full flex justify-between items-start  px-5 sm:px-20 gap-10 ">
        <div className="w-full max-w-[350px] space-y-8">
          <div className=" flex justify-center items-start gap-3 flex-col w-full bg-white p-5 rounded-md">
            <h2 className="font-medium text-center">Personal Info</h2>
            {!user.personal_information ? (
              <p className="text-gray-500">No data found</p>
            ) : (
              <>
            
                <div className="flex justify-start items-center gap-2">
                  <UserCircle />
                  <span>{user.personal_information?.full_name}</span>
                </div>

                <div className="flex justify-start items-center gap-2">
                  <HousePlusIcon />
                  <span>
                    Lives in {user.personal_information?.city}, {user.personal_information?.state},{" "}
                    {user.personal_information?.country}
                  </span>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <PhoneCall />
                  <span>{user.personal_information?.phone}</span>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <Calendar />
                  <span>
                    {user.personal_information?.dob
                      ? new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }).format(new Date(user.personal_information.dob))
                      : ""}
                  </span>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <Heart />
                  <span>Male</span>
                </div>

               
          
                </>
          )}

          </div>
          <div className="mb-10 flex justify-center items-start gap-3 flex-col w-full  bg-white p-5 rounded-md">
            <h2 className="font-medium text-center">Pofessional Info</h2>

            {!user.professional_information ? (
              <p className="text-gray-500">No data found</p>
            ) : (
              <>
                <div className="flex justify-center items-start gap-2">
                  <span className="text-gray-950 w-fit whitespace-nowrap">
                    Preferred Jobs:
                  </span>
                  <span className="text-gray-700 whitespace-break-spaces">
                    {user.professional_information?.preferred_jobs?.join(", ") || "N/A"}
                  </span>
                </div>
                <div className="flex justify-center items-start gap-2">
                  <span className="text-gray-950 w-fit whitespace-nowrap">
                    Interested Industry:
                  </span>
                  <span className="text-gray-700 whitespace-break-spaces">
                    {user.professional_information?.interested_industries??'-' }
                  </span>
                </div>
                <div className="flex justify-center items-start gap-2">
                  <span className="text-gray-950 w-fit whitespace-nowrap">
                    Skills:
                  </span>
                  <span className="text-gray-700 whitespace-break-spaces">
                    {user.professional_information?.skills??'-' }
                  </span>
                </div>
                <div className="flex justify-center items-start gap-2">
                  <span className="text-gray-950 w-fit whitespace-nowrap">
                    Employment Status:
                  </span>
                  <span className="text-gray-700 whitespace-break-spaces">
                    {user.professional_information?.employment_status}
                  </span>
                </div>
             
              </>
            )}
          </div>
        </div>
        <div className="flex justify-center flex-col w-full bg-white p-5 rounded-md">
          <ProfileSideBar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="w-full h-fit p-10">
            {activeTab==="education" ?(
               <div className="relative flex felx-col justify-start flex-col gap-10">
              
         
               {user.educations.length===0 ?
                (
                <p className="text-gray-500 text-lg text-center ">No data availabe</p>
               ) : (
                 user.educations.map((data:any) => (
                 <div key={data.id} className="flex justify-between items-center w-full">
                   <button className="flex justify-start items-start gap-4">
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
                   </button>
                  
                 </div>
               )))}
         
              
             
             
             </div>
            ):(
              <div className="relative flex felx-col justify-start flex-col gap-10">
    
      {user.experiences.length===0 ?
       (
       <p className="text-gray-500 text-lg text-center ">No data availabe</p>
      ) : (
      
      user.experiences.map((data:any)=>(
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
       
      </div>
      ))
      )}
     
    
      
    </div>
            )}
          </div>
          {/* <ProfileSection
            educations={education}
            activeTab={activeTab}
          /> */}
        </div>
      </div>
      )}
    </div>
  );
};

export default page;
