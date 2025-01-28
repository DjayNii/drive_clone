import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <>
      <div className="bg-white1 w-screen h-screen flex flex-col relative">
        <div className="right bg-primary1 rounded-[46px] w-[60%] h-[90%] top-[5vh] right-[2vh] absolute shadow-custom"></div>
        <div className="left w-[40%] h-full pl-[5vh] pt-[25vh]">
          <div className="heading flex flex-col leading-[6vh]">
            <p className="font-Sora  text-black1 text-[72px] font-extrabold m-0 inline">
              THRIVE
            </p>
            <p className="font-Sora text-[21px] text-black7 font-light m-0 ps-3">
              Organize, Manage, and Optimize your files.
            </p>
          </div>

          <form className="form mt-16 w-1/2" onSubmit={handlesubmit}>
            <div className="pl-3 flex flex-col w-full gap-2">
              <label htmlFor="username" className="font-Sora text-black">
                Username:
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="enter your username"
                className="w-full p-2 bg-white1 rounded-md border-white4 border-solid border-[.3vh] shadow-white4 shadow-md placeholder-black5"
              />
            </div>
            <div className="pl-3 mt-3 flex flex-col w-full gap-2">
              <label htmlFor="password" className="font-Sora">
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="enter your password"
                className="w-full p-2 bg-white1 rounded-md border-white4 border-solid border-[.3vh] shadow-white4 shadow-md placeholder-black5"
              />
            </div>

            {error && <p className="text-secondary6 ml-3">{error}</p>}
            <button className="mt-3 ml-3 w-[97%] p-3 rounded-md bg-secondary1 text-[2vh] font-bold hover:bg-[#d2bb44]">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
