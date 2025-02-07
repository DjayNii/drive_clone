import React, { useEffect, useState } from "react";
import {
  RiFileImageFill,
  RiFilePdf2Fill,
  RiFileTextFill,
  RiFileMusicFill,
  RiJavascriptFill,
  RiFileCodeFill,
  RiHtml5Fill,
  RiFileZipFill,
} from "@remixicon/react";

function FileLogos({ fileType }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const icons = {
    image: <RiFileImageFill size={75} color={isDarkMode ? "black" : "white"} />,
    html: <RiHtml5Fill size={75} color={isDarkMode ? "black" : "white"} />,
    pdf: <RiFilePdf2Fill size={75} color={isDarkMode ? "black" : "white"} />,
    "x-javascript": (
      <RiJavascriptFill size={75} color={isDarkMode ? "black" : "white"} />
    ),
    "x-zip-compressed": (
      <RiFileZipFill size={75} color={isDarkMode ? "black" : "white"} />
    ),
    application: (
      <RiFileCodeFill size={75} color={isDarkMode ? "black" : "white"} />
    ),
    text: <RiFileTextFill size={75} color={isDarkMode ? "black" : "white"} />,
    video: <RiFileMusicFill size={75} color={isDarkMode ? "black" : "white"} />,
  };

  for (const [key, icon] of Object.entries(icons)) {
    // object.enttries returns imageiconhtmlicon
    if (fileType.includes(key)) return icon;
  }

  return null;
}

export default FileLogos;
