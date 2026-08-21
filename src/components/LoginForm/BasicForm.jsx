import React, { useState } from "react";

const BasicForm = () => {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    isLoading: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Create an Account
          </h2>
        </div>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            setInputData({
              name: "",
              email: "",
              password: "",
              isLoading: false,
            });
            console.log(inputData);
          }}
          className="mt-8 space-y-6"
        >
          <div className="space-y-4 rounded-md shadow-sm">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                value={inputData.name}
                type="text"
                onChange={handleInput}
                name="name"
                id="name"
                className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                value={inputData.email}
                type="email"
                name="email"
                id="email"
                onChange={handleInput}
                className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                value={inputData.password}
                onChange={handleInput}
                type="password"
                name="password"
                id="password"
                className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BasicForm;
