"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

import { QuizzesAPI, Quizzes, Page } from "@/lib/quizzes";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const Placement_test = () => {
  const [page, setPage] = useState<Page<Quizzes> | null>(null);
  const [error, setError] = useState("");

  const [move, setMove] = useState(false);
  const [id, setId] = useState("");
  // const [sequence, setSquence] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const sequence = Number(searchParams.get("seq") ?? "0");

  const load = () => {
    QuizzesAPI.list()
      .then(setPage)
      .catch((e) => setError(e.message));
  };

  useEffect(() => {
    load();

    const onPop = () => {
      // user pressed Back/Forward -> leave preview
      setMove(false);
    };
    window.addEventListener("popstate", onPop);

    // if user lands with ?preview=1 (e.g., forward), honor it
    const params = new URLSearchParams(window.location.search);
    setMove(params.get("preview") === "1");

    return () => window.removeEventListener("popstate", onPop);
  }, []);

  if (error) return <div>{error || "Test not found."}</div>;

  const handleClick = (id: string, i: number) => {
    setMove(true);
    setId(id);
    // setSquence(i);

    const params = new URLSearchParams(searchParams);

    params.set("seq", String(i));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleStart = () => {
    // optional: clean the preview params in the current entry
    const params = new URLSearchParams(searchParams);
    params.delete("preview");
    params.delete("id");
    params.delete("seq");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });

    // then navigate to the test page
    router.push(`/${id}`);
  };

  const matched = page?.content?.filter((item) => item.class_id == null) ?? [];

  return (
    <div id="placement">
      <Nav />
      <div className="w-full flex justify-center">
        <Image
          src="/images/b1.jpg"
          alt="b1"
          height={6500}
          width={1440}
          className="object-contain"
        />
      </div>
      {!move ? (
        <div className="pb-[2rem]">
          <div className="text-[#1F2937] flex justify-center flex-col w-[80%] h-[100%] mx-auto">
            <div className="mt-[1.5rem] text-2xl font-semibold">
              Placement Test
            </div>
            <div className="mt-[1rem] text-[#6B7280]">
              How good is your Language? Not sure which course is right for you?
              Take our test and find out!
            </div>

            {matched?.map((a, i) => (
              <div
                className="pt-[2rem] w-[80-%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[3rem] items-center"
                key={i}
              >
                <div className="font-semibold text-1xl">
                  {/* <Link key={a.id} href={`/${a.id}`}> */}
                  <div
                    className="block hover:underline"
                    onClick={() => handleClick(a.id, i)}
                  >
                    <h1 id={a.id}>{a.title}</h1>
                  </div>
                  {/* </Link> */}
                </div>
                <div>
                  <p className="mt-[0.5rem] mb-[1rem] text-[#6B7280]">
                    {a.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="text-black flex justify-center flex-col w-[80%] h-[100%] mx-auto">
            <div className="mt-[1.5rem] font-semibold text-[#1F2937] text-4xl">
              Placement Test
            </div>
            <div className="mt-[2rem] font-semibold text-[#1F2937]">
              {page?.content[sequence].title} | Starting Off
            </div>
            <div className="mt-[1rem] text-[#6B7280]">
              {page?.content[sequence].description} The test consists of 30
              questions and takes roughly 15 minutes.
            </div>
          </div>
          <div className="flex items-center justify-center mt-[1rem] pb-[2rem]">
            {/* <Link href={`/${id}`}> */}
            <button
              className="bg-[#0a48f3] text-white px-6 py-3 rounded-md shadow-md hover:text-gray-500"
              onClick={handleStart}
            >
              Start
            </button>
            {/* </Link> */}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Placement_test;
