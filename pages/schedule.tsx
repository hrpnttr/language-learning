import React from "react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

import RequireAuth from "../components/RequireAuth";

const Schedule = () => {
  return (
    <RequireAuth>
      <Nav />
      <div className="w-[80%] mx-auto pt-[5rem] pb-12">
        <div className="font-semibold text-2xl text-[#1F2937] text-center mt-[1.5rem]">
          CLASS SCHEDULE
        </div>
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border border-gray-200 p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-[#1F2937]">
                  English Beginer Class
                </h3>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800`}
                >
                  ongoing
                </span>
              </div>
              <p className="text-gray-600 mt-2">Mondays, 6:00 PM - 7:30</p>
              <p className="text-gray-600 mt-2">Instructor: John Doe</p>
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-4 inline-block"
              >
                Join Class
              </a>
            </div>
            <div className="border border-gray-200 p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-[#1F2937]">
                  German Beginer Class
                </h3>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800`}
                >
                  ongoing
                </span>
              </div>
              <p className="text-gray-600 mt-2">Tuesdays, 6:00 PM - 7:30</p>
              <p className="text-gray-600 mt-2">Instructor: John Doe</p>
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-4 inline-block"
              >
                Join Class
              </a>
            </div>
            <div className="border border-gray-200 p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-[#1F2937]">
                  Turkish Beginer Class
                </h3>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800`}
                >
                  ongoing
                </span>
              </div>
              <p className="text-gray-600 mt-2">Wednesdays, 6:00 PM - 7:30</p>
              <p className="text-gray-600 mt-2">Instructor: John Doe</p>
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-4 inline-block"
              >
                Join Class
              </a>
            </div>
            <div className="border border-gray-200 p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-[#1F2937]">
                  Spanish Beginer Class
                </h3>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800`}
                >
                  ongoing
                </span>
              </div>
              <p className="text-gray-600 mt-2">Thursdays, 6:00 PM - 7:30</p>
              <p className="text-gray-600 mt-2">Instructor: John Doe</p>
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-4 inline-block"
              >
                Join Class
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </RequireAuth>
  );
};

export default Schedule;
