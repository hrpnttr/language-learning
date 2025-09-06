"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Nav from "@/components/nav";
import Card from "@/components/course-card";
import Footer from "@/components/footer";
import Link from "next/link";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const maxScroll = 500;
  const opacity = 1 - Math.min(scrollY / maxScroll, 1);

  return (
    <div id="home">
      <Nav />
      {/* Full-width background image that fades out on scroll */}
      <section className="relative w-full">
        <div
          className="w-full transition-opacity duration-300 ease-out"
          style={{ opacity }}
        >
          {/* give the image a box to fill */}
          <div className="relative h-[70vh] md:h-[80vh]">
            <Image
              src="/images/upscalemedia-transformed (3).png"
              alt="Students studying together"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />

            {/* light overlay so dark text stands out */}
            {/* <div className="absolute inset-0 bg-white/40" /> */}

            {/* centered text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="mx-auto w-[80%] text-center">
                <h1 className="font-extrabold leading-tight text-[#ffffff] text-[clamp(1.6rem,6vw,4.2rem)]">
                  Let&apos;s Explore the Most Exciting
                </h1>
                <p className="mt-2 font-semibold text-[#ffffff] text-[clamp(1.1rem,3.5vw,2.4rem)]">
                  Learning Method
                </p>

                {/* optional CTA */}
                {/* <Link href="/courses" className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-2 text-white hover:bg-slate-800">
              Browse Courses
            </Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="text-[#1F2937] flex justify-center flex-col w-[80%] h-[100%] mx-auto">
        <div className="mt-[1.5rem] text-4xl font-semibold">
          Learn Language Online
        </div>
        <div className="mt-[1rem] mb-[1.5rem] text-[#6B7280]">
          With this platform courses, you can learn Language easily and free of
          charge. Whether you are a beginner or highly proficient, this is where
          you will find Language courses. You can also learn Learn with the news
          or music - from level A1 to C1. For Language teachers there are
          teaching materials and the latest on Languge language teaching.
        </div>
      </div>
      <Card />
      <div className="pt-[1.5rem] w-[80-%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[3rem] items-center pl-[9rem] pr-[9rem] pb-[1.5rem]">
        <div>
          <span className="font-bold text-2xl text-[#1F2937]">
            Fun and Effective
          </span>
          <div className="mt-[1rem] mb-[1.5rem] text-[#6B7280]">
            Learning with us is fun, you will earn points and unlock new levels
            while gaining real-world communication skills.
          </div>
        </div>
        <div>
          <Image
            src="/images/upscalemedia-transformed.png"
            alt="b1"
            width={300}
            height={300}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
      <div className="pt-[1.5rem] w-[80-%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[3rem] items-center pl-[9rem] pr-[9rem] pb-[1.5rem] bg-[#E0F2FE]">
        <div>
          <Image
            src="/images/upscalemedia-transformed (1).png"
            alt="b1"
            width={300}
            height={300}
            className="w-full h-auto object-cover"
          />
        </div>
        <div>
          <span className="font-bold text-2xl text-[#1F2937]">
            Backed by Science
          </span>
          <div className="mt-[1rem] mb-[1.5rem] text-[#6B7280]">
            We use a combination of research-backed teaching methods and
            delightful content to create courses that effectively teach reading,
            writing, listening, and speaking skills!
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
