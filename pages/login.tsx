import React, { useState } from "react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/students/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      // backend may return accessToken OR access_token
      const token: string | undefined = data.accessToken ?? data.access_token;
      if (!token) throw new Error("No access token in response");

      // tell the provider immediately (this also writes localStorage inside login())
      login(token);

      // In a real app, you would store the JWT from the response
      // Store user data in localStorage for profile access
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("access_token", data.accessToken);
      router.push("/profile"); // Redirect to profile page on successful login
    } else {
      setError(data.error || "Login failed. Please try again.");
    }
  };

  return (
    <div>
      <Nav />
      <div className="w-[80%] mx-auto pt-12 pb-6">
        <div className="font-semibold text-2xl text-[#1F2937] text-center mt-[1.5rem]">
          LOGIN
        </div>
        <p className="text-center text-gray-500">
          Please fill all fields below to log in
        </p>
        <div className="mt-5 max-w-md mx-auto border border-gray-200 p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-gray-700">Email address</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 px-3 py-2"
                placeholder="john@example.com"
                required
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 px-3 py-2"
                placeholder="Password"
                required
              />
            </label>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#0a48f3] text-white p-3 rounded-md shadow-md hover:bg-blue-700"
            >
              Login
            </button>
            <div className="mt-1">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <div>
                  <Link href="/register" legacyBehavior>
                    <a className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50">
                      Register
                    </a>
                  </Link>
                </div>

                <div>
                  <Link href="/forgot-password" legacyBehavior>
                    <a className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50">
                      Forgot Password
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
