"use client";
import React from "react";
import { LineShadowText } from "./magicui/line-shadow-text";
import { RetroGrid } from "./magicui/retro-grid";
import { ShimmerButton } from "./magicui/shimmer-button";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <div className="relative flex justify-center items-center h-screen flex-col overflow-hidden">
      <div className="flex flex-row items-center justify-center gap-2">
        <span className="text-7xl sm:text-8xl text-yellow-500 font-extrabold drop-shadow-md tracking-tight">
          Leet
        </span>
        <LineShadowText
          className="text-7xl sm:text-8xl text-amber-500 font-extrabold drop-shadow-md tracking-tight"
          shadowColor="yellow"
        >
          Lab
        </LineShadowText>
      </div>

      <p className="text-xl sm:text-2xl text-gray-300 mt-6 text-center">
        A playground for your coding skills
      </p>
      <p className="text-md sm:text-lg text-gray-400 mt-2 text-center max-w-[500px]">
        Explore challenges, sharpen your logic, and connect with developers worldwide.
      </p>

      <div className="mt-10">
        <ShimmerButton
          shimmerColor="black"
          shimmerSize="2px"
          background="orange"
          onClick={() => router.push("/problems")}
          className="text-white text-lg sm:text-xl font-semibold px-6 py-2 rounded-md shadow-lg hover:scale-105 transition-transform duration-200"
        >
          Start Coding
        </ShimmerButton>
      </div>

      <RetroGrid opacity={0.2} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
};

export default Header;