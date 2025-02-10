import React from "react";

function Image({ Src }) {
  return (
    <>
      <div className="h-[100%] w-[100%]  flex   justify-center items-center">
        <img className="h-[100vh] opacity-65" src={Src} alt="images" />
      </div>
    </>
  );
}

export default Image;
