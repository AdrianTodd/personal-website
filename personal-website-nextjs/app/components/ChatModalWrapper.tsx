"use client";

import React, { useState } from "react";
import ChatModal from "./ChatModal";
import { BsChatDotsFill } from "react-icons/bs";

function ChatModalWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        className='fixed bottom-4 right-4 bg-gradient-to-br hover:bg-gradient-to-tl from-secondary-600 to-secondary-950 text-white p-3 rounded-full shadow-lg z-40'
        onClick={() => setIsOpen(true)}
      >
        <BsChatDotsFill size={24} />
      </button>
      <ChatModal isOpen={isOpen} onClose={handleClose} />
    </>
  );
}

export default ChatModalWrapper;
