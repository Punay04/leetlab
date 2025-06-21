"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { PulsatingButton } from "./magicui/pulsating-button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Home", href: "/" },
  { name: "Practice", href: "/problems" },
  { name: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const [open, setOpen] = useState(false);

  const go = (href: string) => {
    router.push(href);
    setOpen(false);
  };

  return (
    <header className="bg-black border-b border-gray-800">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Image
            src="/logo.svg"
            alt="logo"
            width={42}
            height={42}
            onClick={() => go("/")}
            className="cursor-pointer select-none"
          />

          <div className="flex items-center space-x-4">
            {links.map((l) => (
              <span
                key={l.name}
                onClick={() => go(l.href)}
                className="text-white font-medium cursor-pointer hover:text-yellow-400 hover:underline transition-colors"
              >
                {l.name}
              </span>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {email === "9thbpunaykukreja@gmail.com" && isSignedIn && (
            <PulsatingButton
              className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md hover:bg-yellow-400 transition-all"
              onClick={() => go("/addProblem")}
            >
              Add Problem
            </PulsatingButton>
          )}

          {isSignedIn ? (
            <UserButton />
          ) : (
            <>
              <PulsatingButton
                className="border border-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-500 transition-all"
                pulseColor="yellow"
                onClick={() => go("/signup")}
              >
                Sign Up
              </PulsatingButton>
              <PulsatingButton
                className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-400 transition-all"
                pulseColor="yellow"
                onClick={() => go("/signin")}
              >
                Sign In
              </PulsatingButton>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="block md:hidden text-white"
          aria-label="Toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      <div
        className={`md:hidden bg-gray-900 transition-all duration-300 overflow-hidden ${
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 flex flex-col space-y-4">
          {email === "9thbpunaykukreja@gmail.com" && isSignedIn && (
            <PulsatingButton
              className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md hover:bg-yellow-400"
              onClick={() => go("/addProblem")}
            >
              Add Problem
            </PulsatingButton>
          )}

          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <>
              <PulsatingButton
                className="border border-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-500"
                pulseColor="yellow"
                onClick={() => go("/signup")}
              >
                Sign Up
              </PulsatingButton>
              <PulsatingButton
                className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-400"
                pulseColor="yellow"
                onClick={() => go("/signin")}
              >
                Sign In
              </PulsatingButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
