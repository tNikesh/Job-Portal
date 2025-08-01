import Image from "next/image";
import React from "react";
import TeamSection from "./TeamSection";

const page = () => {
  return (
    <div className="w-full mx-auto">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-10  w-full px-14 py-16">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-3">
            Empowering Businesses Through Digital Innovation
          </h1>
          <h2 className="text-xl text-blue-600 font-medium mb-4">
            Transforming ideas into impactful solutions
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our mission is to bridge the gap between technology and people by
            delivering powerful, intuitive, and future-ready digital products.
            With a team of passionate innovators, we work closely with
            businesses to craft scalable solutions that drive growth and create
            meaningful experiences.
          </p>
        </div>

        <div className="flex-1">
          <Image
            src="/images/hero2.jpg"
            alt="Our Team Working Together"
            width={500}
            height={400}
            className="rounded-xl shadow-lg object-cover w-full"
          />
        </div>
      </section>

      <section className=" w-full px-14 py-16 mx-auto  bg-slate-50">
        {/* Main Heading */}
        <h2 className="text-4xl font-extrabold text-center mb-2">Our Values</h2>
        {/* Subheading */}
        <p className="text-center text-gray-500 text-sm max-w-xl mx-auto mb-10">
          The principles that guide our work and culture.
        </p>

        {/* Cards Grid */}
        <div className="flex justify-center items-center gap-20">
          {/* Innovation Card */}
          <div className="bg-white size-[260px] p-6 rounded-full flex flex-col items-center text-center">
            {/* Icon */}
            <div className="mb-4 text-blue-600">
              {/* Example icon: lightbulb (you can replace with your own SVG or image) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 3a7 7 0 017 7c0 3-2.5 5-5 5s-5-2-5-5a7 7 0 015-7z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 14v7m-4 0h8"
                />
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            {/* Description */}
            <p className="text-gray-600">
              We embrace creativity and innovation to bring fresh solutions to
              complex problems.
            </p>
          </div>

          {/* Integrity Card */}
          <div className="bg-white size-[260px] p-6 rounded-full flex flex-col items-center text-center">
            <div className="mb-4 text-green-600">
              {/* Shield Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 12l9-4.5-9-4.5-9 4.5 9 4.5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 12v9"
                />
              </svg>
            </div>

            <h3 className="text-xl font-semibold mb-2">Integrity</h3>
            <p className="text-gray-600">
              We believe in transparency, honesty, and ethical practices in
              everything we do.
            </p>
          </div>

          {/* Excellence Card */}
          <div className="bg-white size-[260px] p-6 rounded-full flex flex-col items-center text-center">
            <div className="mb-4 text-yellow-600">
              {/* Star Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.1 6.47a1 1 0 00.95.69h6.8c.969 0 1.371 1.24.588 1.81l-5.504 3.993a1 1 0 00-.364 1.118l2.1 6.47c.3.92-.755 1.688-1.538 1.118l-5.503-3.993a1 1 0 00-1.176 0l-5.504 3.993c-.783.57-1.838-.197-1.538-1.118l2.1-6.47a1 1 0 00-.364-1.118L2.4 11.9c-.783-.57-.38-1.81.588-1.81h6.799a1 1 0 00.95-.69l2.1-6.472z"
                />
              </svg>
            </div>

            <h3 className="text-xl font-semibold mb-2">Excellence</h3>
            <p className="text-gray-600">
              We strive for excellence by focusing on quality, user experience,
              and reliability.
            </p>
          </div>
        </div>
      </section>

      <TeamSection />
    </div>
  );
};

export default page;
