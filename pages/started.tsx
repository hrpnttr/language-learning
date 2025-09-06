import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

import { QuizzesAPI, Quizzes, Page } from "@/lib/quizzes";
import { useRouter } from "next/router";
import { useSearchParams, usePathname } from "next/navigation";

const Started = () => {
  const [page, setPage] = useState<Page<Quizzes> | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const sequence = Number(searchParams.get("seq") ?? "0");
  const { id } = router.query;

  const handleStart = (qid: string) => {
    // optional: clean the preview params in the current entry
    const params = new URLSearchParams(searchParams);
    router.replace(`${pathname}?${params.toString()}`);

    // then navigate to the test page
    router.push(`/${qid}`);
  };

  const load = () => {
    QuizzesAPI.list()
      .then(setPage)
      .catch((e) => setError(e.message));
  };

  useEffect(() => {
    load();
  }, []);

  const matched = page?.content?.filter((item) => item.class_id === id) ?? [];

  return (
    <div>
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

      {matched.length > 0 ? (
        matched.map((item) => (
          <div key={item.id}>
            <div className="text-black flex justify-center flex-col w-[80%] h-[100%] mx-auto">
              <div className="mt-[1.5rem] font-semibold text-[#1F2937] text-4xl">
                Placement Test
              </div>
              <div className="mt-[2rem] font-semibold text-[#1F2937]">
                {item.title ? `${item.title} | Starting Off` : "No Test Found"}
              </div>
              <div className="mt-[1rem] text-[#6B7280]">
                {item.description} The test consists of 30 questions and takes
                roughly 15 minutes.
              </div>
            </div>
            <div className="flex items-center justify-center mt-[1rem] pb-[2rem]">
              <button
                className="bg-[#0a48f3] text-white px-6 py-3 rounded-md shadow-md hover:text-gray-500"
                onClick={() => handleStart(item.id)}
              >
                Start
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center mt-[2rem] mb-[2rem] font-semibold text-red-500 text-xl">
          No Test Found
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Started;
