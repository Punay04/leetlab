"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import { PulsatingButton } from "./magicui/pulsating-button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { div } from "motion/react-client";

const NavbarContent = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Problems",
    href: "/problems",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
];

const Navbar = () => {
  const user = useUser();
  const email = user.user?.emailAddresses[0]?.emailAddress;
  const router = useRouter();
  return (
    <div>
      <nav className="flex items-center justify-between px-6 py-4 bg-black shadow-md border-b border-gray-800">
        <div className="flex items-center space-x-6">
          <Image
            src={"logo.svg"}
            alt="logo"
            width={50}
            height={50}
            className="cursor-pointer"
          />

          {NavbarContent.map((item) => (
            <span
              key={item.name}
              className="text-white font-medium text-lg cursor-pointer hover:text-yellow-400 hover:underline transition-colors duration-200"
              onClick={() => router.push(item.href)}
            >
              {item.name}
            </span>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {email === "9thbpunaykukreja@gmail.com" && user.isSignedIn && (
            <PulsatingButton className="bg-yellow-500 font-semibold px-4 py-2 rounded-md text-black hover:bg-yellow-400 transition-all"
            onClick={() => router.push("/addProblem")}>
              Add Problem
            </PulsatingButton>
          )}
          {user.isSignedIn && <UserButton />}
          {!user.isSignedIn && (
            <div className="flex items-center space-x-4">
              <PulsatingButton
                className="border border-yellow-500 font-semibold px-4 py-2 rounded-md text-white hover:bg-yellow-500 transition-all bg-black"
                pulseColor="yellow"
                onClick={() => router.push("/signup")}
                duration="1"
              >
                Sign Up
              </PulsatingButton>
              <PulsatingButton
                className="bg-yellow-500 font-semibold px-4 py-2 rounded-md text-black hover:bg-yellow-400 transition-all"
                pulseColor="yellow"
                onClick={() => router.push("/signin")}
                duration="1"
              >
                Sign In
              </PulsatingButton>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
