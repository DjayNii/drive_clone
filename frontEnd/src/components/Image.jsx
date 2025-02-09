import React from "react";

function Image({ Src, Caption }) {
  return (
    <>
      <div className="h-full w-full">
        <img
          className="h-[100%] rounded-[46px] shadow-fileShadowWhite  "
          src={Src}
          alt="images"
        />
        <p className="font-Sora bg-Glass shadow-Glass rounded-md backdrop-blur-[14.5px] p-3 text-black1 uppercase font-bold top-[80%] left-[30%] text-2xl absolute">
          {Caption}
        </p>
      </div>
    </>
  );
}

export default Image;
