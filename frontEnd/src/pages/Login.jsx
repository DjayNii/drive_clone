import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";

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
        "http://localhost:3000/user/login",
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
      <div className="bg-white1 w-screen h-screen flex flex-col relative">
        <motion.div
          className="right bg-primary1 rounded-[46px] w-[60%] h-[90%] top-[5vh] right-[0vh] absolute shadow-custom"
          initial={{ x: "100%", scale: 0.5, rotate: -10, opacity: 0 }}
          animate={{ x: "0%", scale: 1, rotate: 0, opacity: 1 }}
          exit={{ x: "-50%", scale: 1.2, rotate: 15, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1.03, 0.36, 1] }}
        ></motion.div>
        <motion.div
          className="left w-[40%] h-full pl-[5vh] pt-[25vh]"
          initial={{ x: "-50%", opacity: 0, scale: 0.8 }}
          animate={{ x: "0%", opacity: 1, scale: 1 }}
          exit={{ x: "50%", opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Heading Animation */}
          <motion.div
            className="heading flex flex-col leading-[6vh]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <p className="font-Sora text-black1 text-[72px] font-extrabold m-0 inline">
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
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
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
                  ease: "easeOut",
                }}
              >
                <label htmlFor={field} className="font-Sora text-black">
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                <input
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter your ${field}`}
                  className="w-full p-2 bg-white1 rounded-md border-white4 border-solid border-[.3vh] shadow-white4 shadow-md placeholder-black5"
                />
              </motion.div>
            ))}

            {error && <p className="text-secondary6 ml-3">{error}</p>}

            {/* Submit Button Animation */}
            <motion.button
              className="mt-3 ml-3 w-[97%] p-3 rounded-md bg-secondary1 text-[2vh] font-bold hover:bg-[#d2bb44]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
            >
              Submit
            </motion.button>
          </motion.form>

          {/* Link Animation */}
          <motion.h4
            className="mt-4 ml-4 font-Sora font-light"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
          >
            Not a new user?{" "}
            <Link
              to="/register"
              className="font-bold text-primary6 underline cursor-pointer"
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
