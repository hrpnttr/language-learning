import React, { useEffect, useState } from "react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import Accordion from "@/components/helper/accordion";

import { ClassesAPI, Classes, Myclass } from "@/lib/classes";
// import { CoursesAPI, Courses, Page } from "@/lib/courses";
import { S_coursesAPI, Contents, Page } from "@/lib/s_courses";

import RequireAuth from "../components/RequireAuth";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  email: string;
  full_name: string | null;
  createdAt: string;
}

const My_courses = () => {
  const [myclass, setMyclass] = useState<Myclass<Classes> | null>(null);
  const [course, setPage] = useState<Page<Contents> | null>(null);
  const [q, setQ] = useState("");
  const [p, setP] = useState(0);
  const size = 10;

  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const [openVideo, setOpenVideo] = useState<string | null>(null);
  const [openPdf, setOpenPdf] = useState<string | null>(null);

  const load = () => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      // If no user data in localStorage, redirect to login
      router.push("/login");
      return;
    }

    const user = JSON.parse(userData);
    setUser(user);

    ClassesAPI.list(p, size, q)
      .then(setMyclass)
      .catch((e) => setError(e.message));
    S_coursesAPI.list(user?.id)
      .then(setPage)
      .catch((e) => setError(e.message));
  };

  useEffect(() => {
    load();
  }, [p, q]);

  const handleClick = (id: string) => {
    // setId(id);
    router.push(`/started?id=${id}`);
  };

  const contents = Array.isArray(course)
    ? course.flatMap((c) => c.contents ?? [])
    : course?.contents ?? [];

  // const materials = [
  //   {
  //     id: 1,
  //     title: "Video Lesson",
  //     type: "video",
  //     fileName: "Bring-Me-The-Horizon-Shadow-Moses-Official-Video.mp4",
  //   },
  //   { id: 2, title: "PDF Module", type: "pdf", fileName: "john_doe.pdf" },
  //   { id: 3, title: "Practice Quiz", type: "quiz" },
  // ];

  const handleToggle = (type?: string, fileName?: string) => {
    if (!fileName) return;

    if (type === "video") {
      // toggle: kalau sudah terbuka → tutup, kalau belum → buka
      setOpenVideo((prev) => (prev === fileName ? null : fileName));
    } else {
      setOpenPdf((prev) => (prev === fileName ? null : fileName));
    }
  };

  return (
    <RequireAuth>
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
        {contents && contents.length > 0 ? (
          contents?.map((data, i) => {
            const classesForCourse =
              myclass?.content?.filter(
                (c) => String(c.course_id) === String(data.courseId)
              ) ?? [];

            return (
              <Accordion key={data.courseId} title={data.title}>
                <div className="mt-3 rounded-2xl border border-gray-100 bg-white/90 shadow-sm">
                  {classesForCourse.length ? (
                    <ul className="divide-y divide-gray-100">
                      {classesForCourse.map((c, i) => (
                        <li
                          key={c.id}
                          className="p-4 transition-colors hover:bg-gray-50/60"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-gray-900">
                                {c.class_name ?? "-"}
                              </p>
                              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                                {c.description ?? "-"}
                              </p>
                              {/* Materials */}
                              <div className="mt-3 space-y-2">
                                <p className="text-xs font-medium text-gray-500">
                                  Materials:
                                </p>
                                {Array.isArray(c.materials) &&
                                c.materials.length > 0 ? (
                                  c.materials.map((m) => (
                                    <div
                                      key={c.id}
                                      className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm"
                                    >
                                      {/* Baris utama material */}
                                      <div className="flex items-start justify-between gap-4">
                                        {/* Kolom kiri: Title */}
                                        <div className="min-w-0">
                                          <span className="text-sm font-medium text-gray-700">
                                            {m.title}
                                          </span>
                                          <p className="text-xs text-gray-500">
                                            {m.type === "video"
                                              ? "Watch this lesson"
                                              : m.type === "pdf"
                                              ? "Read the module"
                                              : "Take the quiz"}
                                          </p>
                                        </div>

                                        {/* Kolom kanan: Button */}
                                        <div>
                                          {m.type === "video" ||
                                          m.type === "pdf" ? (
                                            <button
                                              className="shrink-0 rounded-xl bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                                              onClick={() =>
                                                handleToggle(m.type, m.fileName)
                                              }
                                            >
                                              {openVideo === m.fileName ||
                                              openPdf === m.fileName
                                                ? "Hide"
                                                : "Go"}
                                            </button>
                                          ) : (
                                            <button
                                              className="shrink-0 rounded-xl bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                                              onClick={() => handleClick(c.id)}
                                            >
                                              Go
                                            </button>
                                          )}
                                        </div>
                                      </div>

                                      {/* Video muncul langsung di bawah Video Lesson */}
                                      {m.type === "video" &&
                                        openVideo === m.fileName && (
                                          <div className="mt-3">
                                            <video
                                              controls
                                              width="100%"
                                              className="rounded-lg shadow"
                                            >
                                              <source
                                                src={`/videos/${m.fileName}`}
                                                type="video/mp4"
                                              />
                                              Your browser does not support the
                                              video tag.
                                            </video>
                                          </div>
                                        )}

                                      {m.type === "pdf" &&
                                        openPdf === m.fileName && (
                                          <div className="mt-3 h-[70vh] rounded-lg overflow-hidden border">
                                            <iframe
                                              key={m.fileName}
                                              src={`/documents/${m.fileName}#toolbar=1&navpanes=0`}
                                              className="h-full w-full"
                                              title={m.title}
                                            />
                                          </div>
                                        )}
                                    </div>
                                  ))
                                ) : (
                                  <div className="mt-2 rounded-lg border border-dashed border-gray-200 bg-white px-3 py-2 text-sm text-gray-500">
                                    No materials uploaded yet.
                                  </div>
                                )}
                              </div>
                            </div>
                            {/* <button
                              className="shrink-0 rounded-xl bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                              onClick={() => handleClick(c.id)}
                            >
                              Go to Class
                            </button> */}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-sm text-gray-600">
                      No classes for this course.
                    </div>
                  )}
                </div>
              </Accordion>
            );
          })
        ) : (
          <div className="p-4 text-center text-sm text-gray-600">
            You haven’t enrolled any courses yet.
          </div>
        )}
      </div>
      <Footer />
    </RequireAuth>
  );
};

export default My_courses;
