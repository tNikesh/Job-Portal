import Image from "next/image";
import {
  BriefcaseBusiness,
  CodeSquare,
  File,
  MapPinCheck,
  Search,
  SearchCheck,
  UserPlus2Icon,
  Verified,
} from "lucide-react";
import ProgressLink from './components/ProgressLink';
import { Suspense } from "react";
import RecentJob from "./RecentJob";



// Separate components for better code splitting
const HeroSection = () => (

 
  <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
    {/* Left side text */}
    <div className="flex-1 space-y-6">
      <h1 className="text-4xl font-bold">Empowering Your Career Journey</h1>
      <h2 className="text-2xl text-blue-600 font-semibold">
        Connecting Talent with Opportunity
      </h2>
      <p className="text-gray-600 text-lg leading-relaxed">
        Our mission is to simplify job searching and hiring by creating an
        intuitive platform that bridges candidates and employers
        effectively.
      </p>
      <ProgressLink 
        href="/jobs" 
        className="w-fit bg-blue-600 focus:bg-blue-800 hover:bg-blue-700 text-white flex justify-center items-center gap-2 px-6 h-10 rounded-md transition"
        prefetch={true}
      >
        <Search className="text-white" />
        <span>Find your Jobs</span>
      </ProgressLink>
    </div>

    {/* Right side image - Optimized */}
    <div className="relative mx-auto flex-1">
      {/* Top center */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <Image
          style={{
            clipPath: `polygon(50% 1.25%, 9.9% 20.56%, 0% 63.95%, 27.75% 98.75%, 72.25% 98.75%, 100% 63.95%, 90.1% 20.56%)`,
          }}
          src="/images/hero1.jpg"
          alt="Career growth"
          width={300}
          height={300}
          className="object-contain"
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Kcp2zDRw=="
        />
      </div>
      <div className="absolute bottom-0 -left-5 -z-20">
        <Image
          style={{
            clipPath: `polygon(50% 1.25%, 9.9% 20.56%, 0% 63.95%, 27.75% 98.75%, 72.25% 98.75%, 100% 63.95%, 90.1% 20.56%)`,
          }}
          src="/images/hero3.jpg"
          alt="Career growth"
          width={300}
          height={300}
          className="object-contain"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Kcp2zDRw=="
        />
      </div>
      <div className="absolute bottom-0 -right-5 -z-10">
        <Image
          style={{
            clipPath: `polygon(50% 1.25%, 9.9% 20.56%, 0% 63.95%, 27.75% 98.75%, 72.25% 98.75%, 100% 63.95%, 90.1% 20.56%)`,
          }}
          src="/images/hero2.jpg"
          alt="Career growth"
          width={300}
          height={300}
          className="object-contain"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Kcp2zDRw=="
        />
      </div>
    </div>
  </section>
);






const STEPS = [
  {
    icon: UserPlus2Icon,
    title: "Create Your Account",
    description: "Sign up quickly to get started. It's fast, free, and unlocks thousands of job opportunities tailored to you.",
    color: "orange",
    className: "mt-20"
  },
  {
    icon: SearchCheck,
    title: "Search for Jobs",
    description: "Browse jobs that match your skills and interests. Use filters to find full-time, part-time, or remote roles.",
    color: "violet",
    className: ""
  },
  {
    icon: File,
    title: "Upload Your Resume",
    description: "Upload a polished resume for applying for job and make a great first impression. Stand out and get noticed by recruiters.",
    color: "lime",
    className: "mt-20"
  },
  {
    icon: BriefcaseBusiness,
    title: "Get Hired",
    description: "Apply to jobs with a click and get updates. Accept the offer, sign your contract, and kickstart your career!",
    color: "yellow",
    className: ""
  }
];

const StepCard = ({ step }: { step: typeof STEPS[0] }) => {
  const Icon = step.icon;
  return (
    <div className={`w-full ${step.className} h-fit text-gray-950 space-y-4 rounded-lg shadow-xl bg-white border border-gray-50 p-6`}>
      <Icon className={`text-${step.color}-700 size-10 bg-${step.color}-100 p-2 rounded-full`} />
      <h3 className="font-semibold text-lg">{step.title}</h3>
      <p className="text-sm text-gray-800">{step.description}</p>
    </div>
  );
};

const StepsSection = () => (
  <section className="w-full lg:px-14 sm:px-7 px-3 py-4">
    <div className="w-full flex justify-center flex-col items-center gap-2 text-center mb-6">
      <h2 className="font-bold font-montserrat text-3xl text-gray-950">
        Get Hired in <span className="text-blue-900">4 Quick Easy Steps</span>
      </h2>
      <p className="font-medium text-gray-800 max-w-2xl">
        The easiest way to land your dream job — from creating your account
        to starting your career, it only takes four simple steps.
      </p>
    </div>

    <div className="grid w-full gap-6 p-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
      {STEPS.map((step, index) => (
        <StepCard key={index} step={step} />
      ))}
    </div>
  </section>
);

// Loading components
const HeroSkeleton = () => (
  <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
    <div className="flex-1 space-y-6">
      <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4"></div>
      <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-10 bg-gray-200 rounded animate-pulse w-32"></div>
    </div>
    <div className="flex-1 h-80 bg-gray-200 rounded animate-pulse"></div>
  </section>
);

const JobsSkeleton = () => (
  <section className="w-full lg:px-14 sm:px-7 px-3 space-y-0 bg-slate-100 py-14">
    <div className="w-full flex justify-between items-center gap-5">
      <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
    </div>
    <div className="flex w-full gap-x-14 p-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="shrink-0 w-full max-w-[450px] space-y-5 rounded-lg bg-white p-6">
          <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="w-full h-full space-y-14">
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      <RecentJob/>

      {/* <Suspense fallback={<JobsSkeleton />}>
        <JobsSection />
      </Suspense> */}

      <StepsSection />
    </div>
  );
}