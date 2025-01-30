import React from "react";
import FileLogos from "./FileLogos";
import { RiDownloadFill } from "@remixicon/react";

function Files({ Name, fileType }) {
  return (
    <>
      <div className="w-[17vw] break-words overflow-hidden flex flex-col border-2 border-primary6 dark:border-primary6 gap-4 rounded-md p-4 shadow-fileShadowWhite dark:shadow-fileShadowDark">
        <div className="bg-black1 p-2 rounded-md flex justify-center">
          <FileLogos fileType={fileType} />
        </div>
        <div className="flex flex-row text-sm gap-3 items-center justify-between   text-primary5">
          <p className="break-words ">{Name}</p>
          <div className="border-2 border-primary5 rounded-md p-1 cursor-pointer">
            <RiDownloadFill size={20} color="#4682B4" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Files;
