"use client";
import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import ChatInput from "./ChatInput";

const MAX_MESSAGES = 20;
interface MessageType {
  text: string;
  sender: "user" | "model";
}

function ChatApp() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        text: "Hi! I am Adrian's Study Buddy. Ask me anything about Computer Science!",
        sender: "model",
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (userMessage: string) => {
    if (messages.length > MAX_MESSAGES) return;

    const newMessage: MessageType = { text: userMessage, sender: "user" };
    setMessages(prevMessages => [...prevMessages, newMessage]); //add before blocking
    setIsLoading(true);

    try {
      // Prepare previous messages for context (limit to last few)
      const previousMessagesForAPI = messages
        .filter(msg => msg.sender !== "model" || messages.length > 1) // Remove initial message
        .slice(-5)
        .map(msg => ({
          roll: msg.sender,
          parts: msg.text,
        }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage, previousMessagesForAPI }),
      });

      if (!response.ok) {
        if (response.status === 400 || response.status === 429) {
          const errorData = await response.json();
          setMessages(prevMessages => [
            ...prevMessages,
            { text: errorData.error, sender: "model" },
          ]);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else {
        const data = await response.json();
        setMessages(prevMessages => [
          ...prevMessages,
          { text: data.response, sender: "model" },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prevMessages => [
        ...prevMessages,
        { text: "Sorry, something went wrong.", sender: "model" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='chat-header bg-gradient-to-tr  from-primary-800 to-secondary-700 text-white p-4 m-1 text-center rounded-t-lg'>
        <h2 className='text-lg font-semibold'>Study Buddy</h2>
      </div>
      <div className='chat-messages flex-grow overflow-y-auto p-4 space-y-2'>
        {messages.length >= MAX_MESSAGES && (
          <p className='text-red-500 text-center'>
            You've reached the maximum number of messages.
          </p>
        )}
        {messages.map((message, index) => (
          <Message key={index} message={message.text} sender={message.sender} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={isLoading || messages.length >= MAX_MESSAGES}
      />
      {isLoading && (
        <div className='typing-indicator text-gray-500 p-2 text-center'>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </div>
  );
}

export default ChatApp;
