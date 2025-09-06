import React, { useState, useEffect } from "react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { useRouter } from "next/router";

interface User {
  id: number;
  email: string;
  full_name: string | null;
  createdAt: string;
}

interface Enrollment {
  id: number;
  class: {
    id: number;
    name: string;
    time: string;
    instructor: string;
    status: string;
    course: {
      id: number;
      title: string;
      description: string;
    };
  };
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loadUserProfile = () => {
      try {
        // Check if we're in the browser environment
        if (typeof window !== "undefined") {
          // Get user data from localStorage
          const userData = localStorage.getItem("user");

          if (!userData) {
            // If no user data in localStorage, redirect to login
            router.push("/login");
            return;
          }

          // Parse user data from localStorage
          const user = JSON.parse(userData);
          setUser(user);

          // In a real app, you would fetch enrollments from the API
          // For now, we'll just show an empty list
          setEnrollments([]);
        }
      } catch (err) {
        setError("Failed to load profile. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [router]);

  if (loading) {
    return (
      <div>
        <Nav />
        <div className="w-[80%] mx-auto pt-12 pb-6">
          <div className="text-center">Loading profile...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Nav />
        <div className="w-[80%] mx-auto pt-50 pb-50">
          <div className="text-center text-red-500">{error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <div className="w-[80%] mx-auto pt-12 pb-6">
        <div className="font-semibold text-2xl text-[#1F2937] text-center mt-[1.5rem]">
          MY PROFILE
        </div>

        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                User Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Personal details and enrollments.
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.full_name || "Not provided"}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.email}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Member since
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : ""}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Enrolled Courses
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Courses you are currently enrolled in.
              </p>
            </div>
            <div className="border-t border-gray-200">
              {enrollments.length === 0 ? (
                <div className="px-4 py-5 text-sm text-gray-500">
                  You are not enrolled in any courses yet.
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {enrollments.map((enrollment) => (
                    <li key={enrollment.id} className="px-4 py-4">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">
                            {enrollment.class.course.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {enrollment.class.name} -{" "}
                            {enrollment.class.instructor}
                          </p>
                          <p className="text-sm text-gray-500">
                            Time: {enrollment.class.time}
                          </p>
                        </div>
                        <div>
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              enrollment.class.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {enrollment.class.status}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
