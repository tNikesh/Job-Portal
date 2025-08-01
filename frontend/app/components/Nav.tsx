import Image from "next/image";
import React from "react";
import NavProfile from "./NavProfile";
import ProgressLink from "./ProgressLink";
import RecommendedJobLink from "./RecommendedJobLink";

const Nav = () => {
  return (
    <div className="w-full flex justify-between items-center gap-x-10 px-5">
      <ProgressLink href="/" className="block">
        <Image
          src="/images/logo.png"
          width={200}
          height={100}
          alt="Careerlift"
          className="w-full h-auto object-contain"
        />
      </ProgressLink>
      <div className="flex justify-center items-center gap-x-10">
        <ProgressLink href="/">Home</ProgressLink>
        <ProgressLink href="/jobs">Find Jobs</ProgressLink>
        <RecommendedJobLink/>
        {/* <ProgressLink href="#">Find Candidates</ProgressLink> */}
        <ProgressLink href="/about-us">About Us</ProgressLink>
      </div>
      <NavProfile />
      {/* {authUser!=null ?
            (
              <ProgressLink href="/user/candidate/profile" className='px-5 py-2 rounded-full text-center bg-blue-700 uppercase font-light text-white text-sm drop-shadow-sm'>{authUser.username}</ProgressLink>

            )
            :(
              <ProgressLink href="/login" className='px-5 py-2 rounded-full text-center bg-blue-700 uppercase font-light text-white text-sm drop-shadow-sm'>Register Now</ProgressLink>

            )} */}
    </div>
  );
};

export default Nav;
