import React, { useState } from "react";
import axios from "axios";

function UploadButton({ refereshFiles }) {
  const [file, setFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("No file selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "https://thriveapp.onrender.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("File uploaded successfully:", response.data);
      alert("File uploaded successfully!");
      refereshFiles();
    } catch (error) {
      console.error("Error uploading file:", error.message);
      alert("Error uploading file");
    }
  };

  return (
    <div>
      {/* Upload Button */}
      <button
        onClick={() => setShowPopup(true)}
        className="bg-blue-600 dark:bg-secondary4 hover:bg-blue-800 dark:hover:bg-secondary6 text-white dark:text-blackMin1 font-bold font-parkinsans py-2 px-4 rounded-md"
      >
        Upload File
      </button>

      {/* Popup */}
      {showPopup && (
        <div className="pop flex items-center justify-center fixed top-0 left-0 h-full w-full backdrop-blur bg-black/50">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center w-96"
          >
            {/* Dropzone */}
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-gray-600 hover:bg-gray-900 text-white rounded-md py-2 px-4 font-bold font-mono mt-2"
            >
              Upload File
            </button>
          </form>

          {/* Close Button */}
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-5 right-5 text-gray-400 dark:text-gray-500 text-2xl"
          >
            <i className="ri-close-line">×</i>
          </button>
        </div>
      )}
    </div>
  );
}

export default UploadButton;
