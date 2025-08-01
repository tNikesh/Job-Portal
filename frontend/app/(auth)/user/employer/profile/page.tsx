"use client";

import { Mail } from "lucide-react";
import React, { useEffect, useState } from "react";
import api from "@/app/lib/api";
import Image from "next/image";
import Create from "@/app/components/profile/employerDetail/Create";
import useEmployerStore from "@/app/store/employer/employerStore";
import { userHelper } from "@/app/types/employer/employerUser";
import useAuthStore from "@/app/store/authUserStore";
import { useProgressRouter } from "@/app/components/NavigationWrapper";
import View from "@/app/components/profile/employerDetail/View";

const Page = () => {
  const router = useProgressRouter();
  const userData = useAuthStore((state) => state.authUser);
  const setEmployerData = useEmployerStore((state) => state.setEmployerData);
  const employerData = useEmployerStore((state) => state.employerData);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await api.get("/employer/profile");
        const data = res.data.user;
        const cleanedUser: userHelper = {
          id: data.id,
          username: data.username,
          email: data.email,
          role: data.role,
          employer: data.employer ?? null,
        };

        setEmployerData(data.employer);
      } catch (error) {
        console.error("Failed to fetch employer profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router, setEmployerData, userData]);

  if (!userData) return null;

  return (
    <div className="flex w-full justify-start items-start flex-col gap-5 bg-gray-100">
      <div className="flex justify-start items-end gap-5 pb-10 bg-white w-full px-5 sm:px-20">
        <Image src="/images/avatar.png" width={300} height={300} alt="Avatar" />
        <div className="flex justify-start items-start gap-2 flex-col">
          <div className="flex justify-start items-center gap-3">
            <p>{userData.username}</p>
            <p className="bg-blue-500 text-sm text-white px-1 py-0 rounded-full">
              {userData.role}
            </p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <Mail />
            <span>{userData.email}</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl bg-white rounded-md mx-auto p-8 my-10">
        {loading ? (
          <div className="w-full text-center py-20 text-gray-500">Loading...</div>
        ) : employerData ? (
          <View />
        ) : (
          <Create />
        )}
      </div>
    </div>
  );
};

export default Page;