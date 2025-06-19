import { SignIn } from "@clerk/nextjs";
import React from "react";

const Signup = () => {
  return (
    <div className="bg-black h-screen flex items-center justify-center">
      <SignIn />
    </div>
  );
};

export default Signup;
