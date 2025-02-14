"use client";
import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import ChatInput from "./ChatInput";
import QuizMessage from "./QuizMessage"; // New component for quiz questions

interface MessageType {
  text?: string;
  sender: "user" | "bot";
  type: "text" | "quiz"; // Add type property
  question?: string; // For quiz questions
  options?: string[]; // For quiz options
  correct?: string; // Correct answer for quiz
  topic?: string; //Used to check if user answer is related
}

function ChatApp() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentQuiz, setCurrentQuiz] = useState<MessageType | null>(null); // Keep track of current quiz question

  useEffect(() => {
    setMessages([
      {
        text: "Hi! I am your Study Buddy. Ask me anything about CS!",
        sender: "bot",
        type: "text",
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
    if (!userMessage.trim()) return;
    let userMessageType: "text" | "quiz" = "text";

    //Check for quiz response
    if (currentQuiz) {
      userMessageType = "quiz";
    }
    setMessages(prevMessages => [
      ...prevMessages,
      { text: userMessage, sender: "user", type: userMessageType },
    ]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data.response;

      if (botResponse.type === "quiz") {
        // Store the quiz question for later answer checking
        setCurrentQuiz(botResponse);
        setMessages(prevMessages => [
          ...prevMessages,
          { ...botResponse, sender: "bot" },
        ]);
      } else {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: botResponse.content, sender: "bot", type: "text" },
        ]);
        setCurrentQuiz(null);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prevMessages => [
        ...prevMessages,
        { text: "Sorry, something went wrong.", sender: "bot", type: "text" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='chat-header bg-gradient-to-tr hover:bg-gradient-to-bl from-primary-800 to-secondary-700 text-white p-4 m-1 text-center rounded-t-lg'>
        <h2 className='text-lg font-semibold'>Study Buddy</h2>
      </div>
      <div className='chat-messages flex-grow overflow-y-auto p-4 space-y-2'>
        {messages.map((message, index) => {
          if (message.type === "quiz") {
            return (
              <QuizMessage
                key={index}
                question={message.question!}
                options={message.options!}
                sender={message.sender}
                onAnswer={answer => {
                  if (
                    currentQuiz &&
                    message.question === currentQuiz.question
                  ) {
                    const isCorrect = answer === currentQuiz.correct;
                    const feedback = isCorrect
                      ? `Correct! ${currentQuiz.correct} is the right answer.`
                      : `Incorrect. The correct answer was ${currentQuiz.correct}.`;
                    setMessages(prevMessages => [
                      ...prevMessages,
                      { text: feedback, sender: "bot", type: "text" },
                    ]);
                    setCurrentQuiz(null); // Clear current quiz after feedback
                  }
                }}
              />
            );
          } else {
            return (
              <Message
                key={index}
                message={message.text!}
                sender={message.sender}
              />
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={isLoading || currentQuiz != null}
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
