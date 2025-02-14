import React from "react";

interface MessageProps {
  message: string;
  sender: "user" | "bot";
}

function Message({ message, sender }: MessageProps) {
  const messageClasses =
    sender === "user"
      ? "bg-secondary-100 text-secondary-800 ml-auto" // User messages on the right
      : "bg-primary-100 text-primary-800 mr-auto"; // Bot messages on the left

  return (
    <div
      className={`chat-message rounded-xl py-2 px-4 max-w-[70%] ${messageClasses}`}
    >
      {message}
    </div>
  );
}

export default Message;
