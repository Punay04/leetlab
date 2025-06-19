"use client";
import React from "react";
import { LineShadowText } from "./magicui/line-shadow-text";
import { RetroGrid } from "./magicui/retro-grid";
import { ShimmerButton } from "./magicui/shimmer-button";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-full flex-col">
      <div className="flex flex-row items-center justify-center">
        <span className="text-7xl text-yellow-500 font-bold ">Leet</span>
        <LineShadowText
          className="text-7xl text-amber-600 font-bold"
          shadowColor="yellow"
        >
          Lab
        </LineShadowText>
      </div>
      <p className="text-2xl text-gray-300 mt-4">
        A playground for your coding skills
      </p>
      <p className="text-lg text-gray-400 mt-2">
        Explore challenges, improve your skills, and connect with the community.
      </p>
      <div className="mt-8">
        <ShimmerButton
          shimmerColor="black"
          shimmerSize="2px"
          background="orange"
          onClick={() => router.push("/problems")}
          className="text-white text-xl font-semibold"
        >
          Start Coding
        </ShimmerButton>
      </div>

      <RetroGrid opacity={0.2} className="absolute w-full h-full " />
    </div>
  );
};

export default Hero;
