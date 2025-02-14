"use client";
import React from "react";

interface QuizMessageProps {
  question: string;
  options: string[];
  sender: "user" | "bot";
  onAnswer: (answer: string) => void;
}

function QuizMessage({
  question,
  options,
  sender,
  onAnswer,
}: QuizMessageProps) {
  const messageClasses =
    sender === "user"
      ? "bg-blue-100 text-blue-800 ml-auto"
      : "bg-gray-100 text-gray-800 mr-auto";
  return (
    <div
      className={`chat-message rounded-xl py-2 px-4 max-w-[70%] ${messageClasses}`}
    >
      <p className='font-bold'>{question}</p>
      <div className='mt-2 space-y-1'>
        {options.map((option, index) => (
          <button
            key={index}
            className='block w-full text-left px-4 py-2 bg-white hover:bg-gray-100 rounded border'
            onClick={() => onAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizMessage;
