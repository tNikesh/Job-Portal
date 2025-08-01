"use client";

import ProgressLink from "../components/ProgressLink";



export default function page() {

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
      <p className="mt-2 text-gray-600">
        You do not have permission to access this page.
      </p>
      <ProgressLink
      href="/"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Go to Home
      </ProgressLink>
    </div>
  );
}
