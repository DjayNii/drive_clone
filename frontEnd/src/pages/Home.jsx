import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadButton from "../components/UploadButton";
import Files from "../components/Files";

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
      console.log(response.data);

      setFiles(response.data.files || []);
      setDets(response.data.dets || {});
      console.log(dets);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to Fetch files. Internal error"
      );
    }
  };

  return (
    <>
      <main className="p-0 bg-white1 dark:bg-blackMin1 h-screen w-screen">
        {error && <p>{error}</p>}

        <nav className="mb-3 flex flex-row  p-3 justify-between items-center shadow-fileShadowWhite dark:shadow-fileShadowDark">
          {/* the upload button */}
          <UploadButton refereshFiles={fetchFiles} />
          <h1 className="font-Sora font-bold text-[2vw]  text-black1 dark:text-white1 ">
            Thrive
          </h1>
          {/* the logOut button */}
          <div className="flex flex-row gap-2">
            <button className="bg-primary5 hover:bg-primary6 text-white font-bold font-mono py-2 px-4 rounded-md ">
              Log Out
            </button>
          </div>
        </nav>

        {/* Hero section */}
        <div className="w-full">
          {/* title */}
          <div className="p-2">
            <h1 className="font-Sora font-bold text-[5vw]  text-black1 dark:text-white1 ">
              Hello {dets.username}
            </h1>
          </div>
          {/* the files */}
          <div className="flex flex-row  flex-wrap gap-2 p-2">
            {files.length > 0 ? (
              files.map((file) => (
                <div
                  key={file._id}
                  className="mb-2 p-2 flex flex-row justify-around"
                >
                  <Files Name={file.originName} fileType={file.fileType} />
                </div>
              ))
            ) : (
              <p>No files available</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
