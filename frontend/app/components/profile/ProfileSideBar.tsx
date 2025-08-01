"use client";
import { tabOptions } from "@/app/types/candidate/tabOptions";
interface ProfileSideBarProps {
  activeTab: tabOptions;
  setActiveTab: (tab: tabOptions) => void;
}
const ProfileSideBar = ({ activeTab, setActiveTab }: ProfileSideBarProps) => {
  return (
    <div className="w-full flex justify-evenly items-center">
      {["education", "experience"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab as tabOptions)}
          className={`capitalize font-medium cursor-pointer transition-colors delay-100 pb-1
                    ${
                      activeTab === tab
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-900 border-b-2 border-transparent"
                    }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ProfileSideBar;
