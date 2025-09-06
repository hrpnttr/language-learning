/* eslint-disable react/no-unescaped-entities */
import { EnvelopeIcon, MapIcon, PhoneIcon } from "@heroicons/react/16/solid";
import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div
      className="pt-[2rem] pb-[1rem] justify-items-center bg-[#111827]"
      id="footer"
    >
      <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2rem] border-b-[1.4px] pb-5 border-gray-600 border-opacity-40">
        <div>
          {/* <div className="font-logo text-[18px]"> */}
          <Image
            src="/images/2_no.png"
            alt="b1"
            height={80}
            width={150}
            className="object-contain"
          />
          {/* </div> */}
          <h1 className="text-[14px] opacity-70">
            Built with React, Next.js, Tailwind CSS, and TypeScript
          </h1>
        </div>
        <div className="md:mx-auto">
          <h1 className="text-[14px] mt-[1rem] opacity-70">Let's connect:</h1>
          <p className="mt-[0.5rem] underline font-semibold">
            adityariyan367@gmail.com
          </p>
        </div>
        <div className="md:mx-auto">
          <h1 className="font-semibold mb-[1.4rem] text-[14px]">Address</h1>
          <div className="flex items-center mt-[1rem] space-x-2">
            <MapIcon className="w-[1rem] h-[1rem]" />
            <p className="text-[17px] font-normal">Bali, Indonesia</p>
          </div>
          <div className="flex items-center mt-[1rem] space-x-2">
            <EnvelopeIcon className="w-[1rem] h-[1rem]" />
            <p className="text-[17px] font-normal">adityariyan367@gmail.com</p>
          </div>
          <div className="flex items-center mt-[1rem] space-x-2">
            <PhoneIcon className="w-[1rem] h-[1rem]" />
            <p className="text-[17px] font-normal">+62 8822 8163 162</p>
          </div>
        </div>
      </div>
      <div className="mt-[1.4rem] w-[80%] mx-auto opacity-80">
        &#169; 2025 Aditya Farid Riyan Wijaya | All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
