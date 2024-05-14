import React from "react";

const OpenCV: React.FC = () => {
  const handleOpenPdf = () => {
    const pdfPath = "/adrian-todd.pdf";

    // Open the PDF in a new browser tab
    window.open(pdfPath, "_blank");
  };

  return (
    <button
      onClick={handleOpenPdf}
      className='px-1 inline-block py-1  w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br hover:bg-gradient-to-tl from-primary-500 to-secondary-950  text-white mt-3'
    >
      <span className='block bg-[#121212]  rounded-full px-5 py-2'>
        Open CV
      </span>
    </button>
  );
};

export default OpenCV;
