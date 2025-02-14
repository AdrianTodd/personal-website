"use client";
import React, { useState } from "react";
import ChatApp from "./ChatApp";
import { AiOutlineClose } from "react-icons/ai";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ChatModal({ isOpen, onClose }: ChatModalProps) {
  if (!isOpen) return null; // Don't render anything if not open

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div
        className='bg-[#181818] p-4 rounded-lg shadow-lg relative'
        style={{ width: "450px", height: "500px" }}
      >
        <AiOutlineClose
          className='absolute top-6 right-6 text-gray-400 hover:text-gray-800'
          onClick={onClose}
        />
        <ChatApp />
      </div>
    </div>
  );
}

export default ChatModal;
