import React from "react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

const ResetPassword = () => {
  return (
    <div>
      <Nav />
      <div className="w-[80%] mx-auto pt-12 pb-12">
        <div className="mt-8 max-w-md mx-auto border border-gray-200 p-8 rounded-lg shadow-md">
          <div className="font-semibold text-2xl text-[#1F2937] text-center">
            RESET YOUR PASSWORD
          </div>
          <p className="text-center text-gray-500 mt-4">
            Enter your new password below.
          </p>
          <div className="mt-8">
            <label className="block">
              <span className="text-gray-700">New Password</span>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 px-3 py-2"
                placeholder="New Password"
              />
            </label>
            <label className="block mt-6">
              <span className="text-gray-700">Confirm New Password</span>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 px-3 py-2"
                placeholder="Confirm New Password"
              />
            </label>
            <button className="w-full mt-6 bg-[#0a48f3] text-white p-3 rounded-md shadow-md hover:bg-blue-700">
              Reset Password
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
