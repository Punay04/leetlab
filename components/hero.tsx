import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-black via-neutral-900 to-zinc-900 h-screen flex items-center justify-center px-4">
      <div className="relative w-full max-w-[1000px]">
        <Image
          src="/hero.png"
          alt="hero"
          width={1000}
          height={1000}
          className="w-full h-auto object-contain rounded-2xl shadow-[0_0_60px_0_rgba(255,193,7,0.2)] transition-transform duration-300 hover:scale-[1.03]"
          priority
        />
      </div>
    </div>
  );
};

export default Hero;