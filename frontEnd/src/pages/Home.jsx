import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadButton from "../components/UploadButton";
import Files from "../components/Files";
import LogoutButton from "../components/LogoutButton";
import { motion } from "framer-motion";

function Home() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [dets, setDets] = useState({});

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      let response = await axios.get("http://localhost:3000/home", {
        withCredentials: true,
      });

      setFiles(response.data.files || []);
      setDets(response.data.dets || {});
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to Fetch files. Internal error"
      );
    }
  };

  return (
    <>
      <motion.main
        className="p-0 bg-white3 dark:bg-blackMin1 h-screen w-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {error && <p>{error}</p>}

        {/* Navigation */}
        <motion.nav
          className="mb-3 flex flex-row p-3 justify-between items-center shadow-fileShadowWhite dark:shadow-fileShadowDark"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <UploadButton refereshFiles={fetchFiles} />
          <h1 className="font-Sora font-bold text-[2vw] text-black1 dark:text-white1 ">
            Thrive
          </h1>
          <LogoutButton />
        </motion.nav>

        {/* Hero Section */}
        <motion.div
          initial={{ y: -90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeIn" }}
        >
          <div className="p-2">
            <h1 className="font-Sora font-bold text-[5vw] text-black1 dark:text-white1 ">
              Hello {dets.username}
            </h1>
          </div>
        </motion.div>

        {/* Files Section */}
        <motion.div
          className="flex flex-row flex-wrap gap-2 p-2 bg-white3 dark:bg-blackMin1"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {files.length > 0 ? (
            files.map((file) => (
              <motion.div
                key={file._id}
                className="mb-2 p-2 flex flex-row justify-around"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                whileHover={{ scale: 1.1 }}
              >
                <Files
                  Name={file.originName}
                  fileType={file.fileType}
                  path={file.path}
                />
              </motion.div>
            ))
          ) : (
            <p>No files available</p>
          )}
        </motion.div>
      </motion.main>
    </>
  );
}

export default Home;
