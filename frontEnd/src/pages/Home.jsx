import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadButton from "../components/UploadButton";

function Home() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

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
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to Fetch files. Internal error"
      );
    }
  };

  const filetype = (file) => {
    const fileImage = file.fileType.split("/")[1];
    if (fileImage === "jpeg") {
      return "primary5";
    }

    return "secondary1";
  };

  return (
    <>
      <main className="p-3 bg-white1 dark:bg-black1 h-screen w-screen">
        {error && <p>{error}</p>}

        <nav className="flex flex-row justify-between">
          {/* the upload button */}
          <UploadButton refereshFiles={fetchFiles} />
          {/* the logOut button */}
          <div>
            <button className="bg-primary5 hover:bg-primary6 text-white font-bold font-mono py-2 px-4 rounded-md mb-4">
              Log Out
            </button>
          </div>
        </nav>

        {/* the files */}
        <div>
          {files.length > 0 ? (
            files.map((file) => (
              <div
                key={file._id}
                className={`bg-${filetype(
                  file
                )} mb-2 p-2 flex flex-row justify-around`}
              >
                <p>File Name: {file.originName}</p>
                <p>fileType: {file.fileType.split("/")[1]}</p>
              </div>
            ))
          ) : (
            <p>No files available</p>
          )}
        </div>
      </main>
    </>
  );
}

export default Home;
