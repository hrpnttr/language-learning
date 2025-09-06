import React from "react";
import Services from "./helper/services";

const Course = () => {
  return (
    <div className="bg-[#E0F2FE]">
      <div className="w-[80%] h-[100%] mx-auto pb-[2.5rem]">
        <div className="text-[#1F2937] pt-[1.5rem]">
          <span className="font-semibold text-2xl">
            Find the right course for you
          </span>
        </div>
        <div className="pt-[1.5rem] w-[80-%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3rem] items-center">
          <Services title="A1 | A2" num="01" />
          <Services title="B1 | B2" num="02" />
          <Services title="C1 | C2" num="03" />
        </div>
      </div>
    </div>
  );
};

export default Course;
