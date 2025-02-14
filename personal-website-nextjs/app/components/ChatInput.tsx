import React, { useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSendMessage(inputValue);
    setInputValue("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <form
      className='chat-input flex p-4 border-t border-gray-200'
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        id='user-input'
        placeholder='Ask me anything about CS...'
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className='flex-grow px-4 py-2 text-[#181818] border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
      />
      <button
        type='submit'
        id='send-button'
        disabled={disabled}
        className={`${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-tr hover:bg-gradient-to-bl from-primary-900 to-secondary-700"
        } text-white px-6 py-2 rounded-r-md font-medium transition-colors`}
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
