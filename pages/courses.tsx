import React, { useEffect, useState } from "react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Image from "next/image";
import Accordion from "@/components/helper/accordion";

import { CoursesAPI, Courses, Page } from "@/lib/courses";
import { S_coursesAPI } from "@/lib/s_courses";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const CoursePage = () => {
  const [page, setPage] = useState<Page<Courses> | null>(null);
  const [q, setQ] = useState("");
  const [p, setP] = useState(0);
  const size = 10;

  const [studentId, setStudentId] = useState("");
  const router = useRouter();

  const [error, setError] = useState("");

  const load = () => {
    CoursesAPI.list(p, size, q)
      .then(setPage)
      .catch((e) => setError(e.message));
  };

  useEffect(() => {
    load();
  }, [p, q]);

  const handleClick = (id: string, title: string) => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      // If no user data in localStorage, redirect to login
      router.push("/login");
      return;
    } else {
      const user = JSON.parse(userData);

      const payload = {
        studentId: user.id,
        contents: [
          {
            courseId: id,
            title: title,
          },
        ],
      };

      const promise = S_coursesAPI.create(payload);

      toast.promise(promise, {
        loading: "Saving course...",
        success: "Course has been saved successfully!",
        error: (err) => err?.response?.data?.message || "Failed to save course",
      });

      promise
        .then((res) => {
          console.log("Course saved:", res);
        })
        .catch((err) => {
          // console.error("Error saving course:", err);
        });
    }
  };

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
      <div className="text-[#1F2937] flex justify-center flex-col w-[80%] h-[100%] mx-auto pt-[2rem] pb-[2rem]">
        <div className="text-2xl font-semibold mt-4">Courses</div>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>

      <div className="w-[80%] mx-auto pb-8 text-[#1F2937]">
        <strong>Total:</strong> {page?.totalElements ?? 0}
        {page?.content.map((c) => (
          <Accordion key={c.id} title={c.title}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm text-gray-700">{c.description ?? "-"}</p>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs text-gray-700">
                    <span className="font-medium mr-1">Level:</span>
                    <span className="capitalize">{c.level ?? "-"}</span>
                  </span>
                  <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs text-gray-700">
                    <span className="font-medium mr-1">Language:</span>
                    <span className="capitalize">{c.language ?? "-"}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-start md:items-center justify-end w-full">
                <button
                  onClick={() => handleClick(c.id, c.title)}
                  className="bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 px-4 py-1 transition-all duration-200"
                >
                  Enroll
                </button>
              </div>
            </div>
          </Accordion>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default CoursePage;
