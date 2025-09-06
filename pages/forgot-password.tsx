import React, { useState } from "react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Link from "next/link";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (email === "hrpnttr@gmail.com") {
    //   setShowSuccess(true);
    //   setError("");
    // } else {
    //   setError("Email not found. Please try again.");
    //   setShowSuccess(false);
    // }

    setError("");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/students/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setShowSuccess(true);
    } else {
      setError(data.error || "Email not found. Please try again.");
      setShowSuccess(false);
    }
  };

  const handleClose = () => {
    router.push("/reset-password");
    setShowSuccess(false);
  };

  return (
    <div>
      <Nav />
      <div className="w-[80%] mx-auto pt-12 pb-12">
        {showSuccess ? (
          <div className="mt-[9rem] mb-[2.5rem] max-w-md mx-auto border border-gray-200 p-8 rounded-lg shadow-md">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-600">Success!</h2>
              <p className="mt-4 text-gray-600">
                An email has been sent to your address with instructions to
                reset your password.
              </p>
              <button
                onClick={handleClose}
                className="w-full mt-6 bg-gray-600 text-white p-3 rounded-md shadow-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-10 mb-[0.5rem] max-w-md mx-auto border border-gray-200 p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="font-semibold text-2xl text-[#1F2937] text-center">
                FORGOT YOUR PASSWORD?
              </div>
              <p className="text-center text-gray-500 mt-4">
                Enter your email address below and we will send you a link to
                reset your password.
              </p>
              <div className="mt-8">
                <label className="block">
                  <span className="text-gray-700">Email address</span>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 px-3 py-2"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <button
                  type="submit"
                  className="w-full mt-6 bg-[#0a48f3] text-white p-3 rounded-md shadow-md hover:bg-blue-700"
                >
                  Send Reset Link
                </button>
                <div className="text-center mt-4">
                  <Link href="/login" legacyBehavior>
                    <a className="text-sm text-blue-600 hover:underline">
                      Back to Login
                    </a>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
