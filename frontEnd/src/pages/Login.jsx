import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import pattern from "../Assests/pattern.svg";
import Image from "../components/Image";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://thriveapp.onrender.com/user/login",
        formData,
        {
          withCredentials: true, // Ensures cookies are included
        }
      );

      const token = response.data.token;
      console.log(token);

      // Save the token to localStorage with a key
      localStorage.setItem("token", token);

      // Navigate to the /home route
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "something went wrong");
    }
  };

  return (
    <div>
      <div className="bg-white2 dark:bg-blackMin1 w-screen h-screen flex flex-col relative">
        <motion.div
          className="right bg-deep-ocean dark:bg-custom-gradient flex justify-center  items-center   w-[49%] h-[100%]  right-[0vh] absolute "
          initial={{ x: "100%", scale: 0.5, rotate: -10, opacity: 0 }}
          animate={{ x: "0%", scale: 1, rotate: 0, opacity: 1 }}
          exit={{ x: "-50%", scale: 1.2, rotate: 15, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1.03, 0.36, 1] }}
        >
          <Image Src={pattern}></Image>
        </motion.div>
        <motion.div
          className="left w-[50%] h-full pl-[5vh] pt-[25vh]"
          initial={{ x: "-50%", opacity: 0, scale: 0.8 }}
          animate={{ x: "0%", opacity: 1, scale: 1 }}
          exit={{ x: "50%", opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8 }}
        >
          {/* Heading Animation */}
          <motion.div
            className="heading flex flex-col leading-[6vh]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="font-Sora text-black1 dark:text-white1 text-[72px] font-extrabold m-0 inline">
              THRIVE
            </p>
            <p className="font-Sora text-[21px] text-black7 font-light m-0 ps-3">
              Organize, Manage, and Optimize your files.
            </p>
          </motion.div>

          {/* Form Animation */}
          <motion.form
            className="form mt-16 w-1/2"
            onSubmit={handlesubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {["username", "password"].map((field, index) => (
              <motion.div
                key={field}
                className="pl-3 mt-3 flex flex-col w-full gap-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + index * 0.1,
                  ease: "backIn",
                }}
              >
                <label
                  htmlFor={field}
                  className="font-Sora text-black  dark:text-white"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                <input
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter your ${field}`}
                  className="w-full p-2 bg-white2 dark:bg-blackMin1 rounded-md border-white4 dark:border-primary6 border-solid border-[.3vh] shadow-white4 dark:shadow-fileShadowDark font-mono dark:text-white1 text-sm shadow-md placeholder-black5 dark:placeholder-black7 "
                />
              </motion.div>
            ))}

            {error && <p className="text-secondary6 ml-3">{error}</p>}

            {/* Submit Button Animation */}
            <motion.button
              className="mt-3 ml-3 w-[97%] p-3 rounded-md bg-secondary1 font-mono text-lg  shadow-fileShadowWhite dark:shadow-fileShadowDark dark:bg-deep-ocean dark:text-white  text-[2vh] font-bold hover:bg-[#d2bb44]  "
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Submit
            </motion.button>
          </motion.form>

          {/* Link Animation */}
          <motion.h4
            className="mt-4 ml-4 font-Sora font-light dark:text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            New user ?
            <Link
              to="/register"
              className="font-bold font-parkinsans ml-1 text-primary6 dark:text-secondary6 underline cursor-pointer"
            >
              Sign up
            </Link>
          </motion.h4>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
