import React from "react";
import Login from "./login";
import ProgressLink from "@/app/components/ProgressLink";

const page = () => {
  return (
    <div className="w-full space-y-6 max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">Log In</h2>

      <Login />
      
      <p className="text-gray-600 text-sm text-center">
        Don’t have an account?{" "}
        <ProgressLink href="/signup" className="text-gray-700 hover:underline">
          Sign up
        </ProgressLink>
      </p>

    </div>
  );
};

export default page;
