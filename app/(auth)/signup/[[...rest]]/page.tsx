import { SignUp } from "@clerk/nextjs";
import React from "react";

const Signup = () => {
  return (
    <div className="bg-black h-screen flex items-center justify-center">
      <SignUp />
    </div>
  );
};

export default Signup;
