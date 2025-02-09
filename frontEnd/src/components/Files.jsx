import React from "react";
import FileLogos from "./FileLogos";
import { RiDownloadFill } from "@remixicon/react";
import axios from "axios";

function Files({ Name, fileType, path }) {
  async function handleSubmit() {
    try {
      const response = await axios.get(
        `https://thriveapp.onrender.com/download/${path.replace(
          "uploads/",
          ""
        )}`,
        {
          withCredentials: true,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to get download URL");
      }

      const signedUrl = response.data.sign;

      // Fetch the actual file content using the signed URL
      const fileResponse = await fetch(signedUrl);
      const fileBlob = await fileResponse.blob();

      // Create a temporar URL for the blob
      const blobUrl = window.URL.createObjectURL(fileBlob);

      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", Name);

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download error:", error);
    }
  }

  return (
    <>
      <div className="w-[17vw] break-words overflow-hidden flex flex-col border-2 border-primary6 dark:border-primary6 gap-4 rounded-md p-4 shadow-fileShadowWhite dark:shadow-fileShadowDark">
        <div className="bg-black1 p-2 rounded-md flex justify-center">
          <FileLogos fileType={fileType} />
        </div>
        <div className="flex flex-row text-xs gap-3 items-center justify-between text-primary5">
          <p className="break-words font-parkinsans  ">{Name}</p>
          <div className="border-2 border-primary5 rounded-md p-1 cursor-pointer">
            <RiDownloadFill size={20} color="#4682B4" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Files;
