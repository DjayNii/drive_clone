import React, { useEffect, useState } from "react";
import {
  RiFileImageFill,
  RiFilePdf2Fill,
  RiFileTextFill,
  RiFileMusicFill,
} from "@remixicon/react";

function FileLogos({ fileType }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  if (fileType === "image") {
    return <RiFileImageFill size={75} color={isDarkMode ? "black" : "white"} />;
  } else if (fileType === "application") {
    return <RiFilePdf2Fill size={75} color={isDarkMode ? "black" : "white"} />;
  } else if (fileType === "text") {
    return <RiFileTextFill size={75} color={isDarkMode ? "black" : "white"} />;
  } else if (fileType === "video") {
    return <RiFileMusicFill size={75} color={isDarkMode ? "black" : "white"} />;
  }

  return null;
}

export default FileLogos;
