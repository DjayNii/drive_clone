import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:3000/user/register",
        formData
      );
      setSuccess("Registration successful!");
      setFormData({ username: "", email: "", password: "" }); // Reset form
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <>
      <div className="relative h-screen w-screen overflow-hidden">
        <div className="bg-hero-pattern bg-contain h-full w-full"></div>
        <div className="absolute top-0 left-0 h-full w-full bg-custom-radial-darker opacity-80"></div>
        <div className="absolute top-0 left- h-full w-[100%] bg-custom-radial-darker  opacity-40"></div>
        <div className="absolute top-0 left-0 h-full w-full flex flex-col gap-[5vh] items-center justify-center z-20">
          <h1 className="font-parkinsans text-white text-[8vh] font-extrabold">
            THIRVE
          </h1>
          <form
            onSubmit={handleSubmit}
            className="w-[25vw] backdrop-blur-[16px] backdrop-saturate-[180%] bg-darkGlass border border-[rgba(255,255,255,0.125)]  p-6 rounded-lg dark:shadow-darkAccent shadow-2xl"
          >
            <h2 className="text-darkPrimary dark:text-litePrimary text-lg font-bold mb-4">
              Register
            </h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}

            <div className="mb-6">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-darkPrimary dark:text-litePrimary mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full p-2 rounded-lg  dark:bg-litePrimary text-darkPrimary dark:text-darkPrimary"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-darkPrimary  dark:text-litePrimary  mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                className="w-full p-2 rounded-lg text-darkPrimary dark:text-darkPrimary dark:bg-litePrimary"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-darkPrimary  dark:text-litePrimary mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="•••••••••"
                className="w-full p-2 rounded-lg text-darkPrimary dark:text-darkPrimary dark:bg-litePrimary "
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-darkSecondary dark:bg-liteAccent text-litePrimary rounded-lg hover:bg-darkPrimary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
