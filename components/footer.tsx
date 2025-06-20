import React from "react";
import { AuroraText } from "./magicui/aurora-text";
import { DotPattern } from "./magicui/dot-pattern";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-black opacity-80 text-white py-4 px-6 mt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">
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

export default Footer;
