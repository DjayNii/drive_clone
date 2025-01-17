import React, { useEffect, useState } from "react";

function Home() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/home", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setFiles(response.data.files);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to Fetch files. Internal error"
        );
      }
    };

    fetchFiles();
  }, []);

  return (
    <>
      <h1>Home</h1>
      {error && <p>{error}</p>}

      {/* <div>
        {files.map((items) => (
          <p key={items._id}>{items.filename}</p>
        ))}
      </div> */}
    </>
  );
}

export default Home;
