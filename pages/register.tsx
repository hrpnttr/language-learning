import React, { useState, useEffect } from "react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Link from "next/link";
import { StudentsAPI } from "../lib/students";

interface Students {
  id: string;
  full_name: string;
  phone: number;
  email: string;
  password: string;
  createdAt: string;
}

const Register = () => {
  const [students, setStudents] = useState<Students[]>([]);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // useEffect(() => {
  //   StudentsAPI.list()
  //     .then(setStudents)
  //     .catch((e) => setError(e.message));
  // }, []);

  async function sha256Hex(input: string): Promise<string> {
    const buf = new TextEncoder().encode(input);
    const hash = await crypto.subtle.digest("SHA-256", buf);
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const hashed = await sha256Hex(form.password);

      // If your API expects 'password_hash' (recommended):
      const { password, ...rest } = form;
      const payload = { ...rest, password: hashed };

      const u = await StudentsAPI.create(payload);
      // localStorage.setItem("access_token", u.data.accessToken);
      // setStudents((prev) => [...prev, u]);
      setForm({ full_name: "", phone: "", email: "", password: "" });
    } catch (e: unknown) {
      //   setError(e.message);
      if (e instanceof Error) {
        setError(e.message);
      } else if (typeof e === "string") {
        setError(e);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div>
      <Nav />
      <div className="w-[80%] mx-auto pt-12 pb-12">
        <div className="font-semibold text-2xl text-[#1F2937] text-center mt-[1.5rem]">
          CREATE AN ACCOUNT
        </div>
        <p className="text-center text-gray-500">
          Please fill all fields below to create an account
        </p>
        <div className="mt-8 max-w-md mx-auto border border-gray-200 p-8 rounded-lg shadow-md">
          <form onSubmit={submit} className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-gray-700">Full name</span>
              <input
                type="text"
                value={form.full_name}
                onChange={(e) =>
                  setForm({ ...form, full_name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 px-3 py-2"
                placeholder="John Doe"
                required
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Phone</span>
              <input
                type="number"
                inputMode="numeric"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 px-3 py-2"
                placeholder="Phone Number"
                required
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Email address</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 px-3 py-2"
                placeholder="john.doe@example.com"
                required
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Password</span>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
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
              Register
            </button>
            <hr className="border-gray-400" />
            <Link href="/login" legacyBehavior>
              <a className="w-full block text-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700">
                Cancel
              </a>
            </Link>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
