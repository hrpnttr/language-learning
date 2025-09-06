import React from "react";
import { LanguageIcon } from "@heroicons/react/16/solid";

interface Props {
  title: string;
  num: string;
}

const Services = ({ title, num }: Props) => {
  return (
    <div>
      <div className="bg-[#4F46E5] custom_service before:bg-gray-600 z-[100] relative transform rounded-2xl text-center p-6 shadow-md">
        <LanguageIcon className="w-[5rem] relative z-[1] mx-auto h-[5rem] text-black" />
        <h1 className="text-[25px] reelative z-[1] text-white mt-[1rem]">
          {title}
        </h1>
        <p className="text-white text-[1.6rem] font-bold absolute top-3 right-4">
          {num}
        </p>
      </div>
    </div>
  );
};

export default Services;
