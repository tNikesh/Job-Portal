import React from "react";
import useEmployerStore from "@/app/store/employer/employerStore";
import { BookMarkedIcon, BriefcaseIcon, Building2Icon, CalendarArrowUp, Edit, Globe, InfoIcon, LocateIcon, MapPinCheckIcon, Navigation, Phone, PhoneIcon, UserCircleIcon } from "lucide-react";
import ProgressLink from "../../ProgressLink";

const View = () => {
  const employerData = useEmployerStore((state) => state.employerData); // Access employer data

  if (!employerData) {
    return <div>Loading...</div>; // If no data is available
  }

  return (
    <div className="container mx-auto p-6">
      {/* Employer Profile Header */}
      <div className="mb-6 flex justify-start items-center gap-3">
        <h2 className="text-4xl font-thin text-gray-700">Employer Profile</h2>
        <ProgressLink href="/user/employer/profile/edit" className="text-white  flex justify-center items-center gap-1 rounded-md bg-yellow-500 gover:bg-yellow-600 py-1 px-3">
        <Edit className="size-5"/>
        <span >edit</span>
        </ProgressLink>
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
              <p className="text-gray-800">{employerData.company_name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Globe className="text-gray-600" />
            <div>
              <h4 className="font-medium text-gray-900">Company Website</h4>
              <p className="text-gray-800">{employerData.company_website || "N/A"}</p>
            </div>
          </div>

          <div className="col-span-2 flex items-start space-x-3">
            <InfoIcon className="text-gray-600" />
            <div>
              <h4 className="font-medium text-gray-900">Company Description</h4>
              <p className="text-gray-800">{employerData.company_description || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <CalendarArrowUp className="text-gray-600" />
            <div>
              <h4 className="font-medium text-gray-900">Company Type</h4>
              <p className="text-gray-800">{employerData.company_type || "N/A"}</p>
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
              <p className="text-gray-800">{employerData.contact_person}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <BriefcaseIcon className="text-gray-600" />
            <div>
              <h4 className="font-medium text-gray-900">Designation</h4>
              <p className="text-gray-800">{employerData.designation || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <PhoneIcon className="text-gray-600" />
            <div>
              <h4 className="font-medium text-gray-900">Phone</h4>
              <p className="text-gray-800">{employerData.phone}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <PhoneIcon className="text-gray-600" />
            <div>
              <h4 className="font-medium text-gray-900">Alternate Phone</h4>
              <p className="text-gray-800">{employerData.alternate_phone || "N/A"}</p>
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
              <p className="text-gray-800">{employerData.company_size || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <MapPinCheckIcon className="text-gray-600" />
            <div>
              <h4 className="font-medium text-gray-900">Address</h4>
              <p className="text-gray-800">
                {employerData.company_address}, {employerData?.city}, {employerData?.state}, {employerData.country}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Navigation className="text-gray-600" />
            <div>
              <h4 className="font-medium text-gray-900">Country</h4>
              <p className="text-gray-800">{employerData.country}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default View;
