import Image from "next/image";
import React from "react";
import { DotPattern } from "./magicui/dot-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AuroraText } from "./magicui/aurora-text";

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-black via-neutral-900 to-zinc-900 h-screen flex items-center justify-center flex-col px-4">
      <div className="relative w-full max-w-[1000px] mt-10">
        <Image
          src="/hero.png"
          alt="hero"
          width={1000}
          height={1000}
          className="w-full h-auto object-contain rounded-2xl shadow-[0_0_60px_0_rgba(255,193,7,0.2)] transition-transform duration-300 hover:scale-[1.03]"
          priority
        />
      </div>
      <div className="flex justify-between w-full items-center mt-30">
        <h1 className="text-xl font-bold text-white">
          Developer : <AuroraText>Punay Kukreja</AuroraText>{" "}
        </h1>
        <Link href={"https://x.com/PunayKukreja"}>
          <Image
            src={"twitter.svg"}
            alt="twitter"
            width={40}
            height={40}
            className=""
          />
        </Link>
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
          )}
        />
      </div>
    </div>
  );
};

export default Hero;
