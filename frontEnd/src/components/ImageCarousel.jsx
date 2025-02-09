import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "../components/Image";
import Frame_1 from "../Assests/Frame_1.png";
import uploading from "../Assests/uploading.webp";

const ImageCarousel = ({ X1, X2 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      src: Frame_1,
      caption: "Upload your Different files",
    },
    {
      src: uploading,
      caption: "Optimize your workflow",
    },
  ];

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="carousel-container w-full h-full">
      <motion.div
        className="carousel-image-container w-full h-full"
        key={currentIndex}
        initial={{ opacity: 0.5, x: X1 }}
        animate={{ opacity: 1, x: X2 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Image
          Src={images[currentIndex].src}
          Caption={images[currentIndex].caption}
        />
      </motion.div>
    </div>
  );
};

export default ImageCarousel;
