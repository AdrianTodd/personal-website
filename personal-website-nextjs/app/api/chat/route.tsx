import { NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { RateLimiterMemory } from "rate-limiter-flexible";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || "AIzaSyD_AQTd3dOxHZCaTn9JFoBSSHLMwUJjhLM"
);
const prompt = `You are a helpful study buddy for computer science students.
 Answer the following question as concisely as possible, and be accurate.`;
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: prompt,
});

const MAX_TOKENS = 4000; //  Example token limit
const MAX_REQUESTS_PER_MINUTE = 30;

const limiter = new RateLimiterMemory({
  points: MAX_REQUESTS_PER_MINUTE, // Number of points (requests)
  duration: 60, // Per 60 seconds
});

//Helper function to count tokens
async function countTokens(text: string): Promise<number> {
  const tokenCountData = await model.countTokens(text);
  return tokenCountData.totalTokens;
}

// Helper function to get IP (handling proxies)
function getClientIP(req: Request): string {
  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "127.0.0.1"; // Fallback
}

export async function POST(request: Request) {
  try {
    const ip = getClientIP(request);
    try {
      await limiter.consume(ip);
    } catch (rej) {
      if (rej instanceof Error) {
        console.error("Rate Limiting Error:", rej);
      }
      return new NextResponse("Too many requests. Please try again later.", {
        status: 429,
      });
    }

    const data = await request.json();
    console.log("Request Data:", data);
    const userMessage = data.message as string;
    const previousMessages = data.previousMessages || [];

    // --- Calculate Total Tokens
    let totalTokens = 0;
    for (const msg of previousMessages) {
      totalTokens += await countTokens(msg.text);
    }
    totalTokens += await countTokens(userMessage);

    if (totalTokens > MAX_TOKENS) {
      return NextResponse.json(
        { error: "Sorry, the conversation has reached its token limit." },
        { status: 400 }
      );
    }

    // --- Construct Prompt (adjust as needed) ---
    const chatHistory = [];

    if (previousMessages.length === 0) {
      chatHistory.push({ role: "user", parts: { prompt } }); // Or an empty string ""
    } else {
      //If there ARE previous messages, correctly format them.
      for (const msg of previousMessages) {
        chatHistory.push({
          role: msg.sender === "user" ? "user" : "model",
          parts: [msg.text],
        });
      }
    }
    chatHistory.push({
      role: "user",
      parts: [userMessage],
    });
    const chat = model.startChat({
      generationConfig: {
        maxOutputTokens: 150, // Limit response length
      },
      safetySettings: [
        //Reduce likelyhood of problematic responses
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
    });

    const result = await chat.sendMessage(userMessage); // Use Gemini API
    const botResponse = result.response.text();
    console.log("Bot Response:", botResponse);

    return NextResponse.json({ response: botResponse });
  } catch (error) {
    if (error instanceof Error && error.message === "Rate limit exceeded") {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      ); // 429 Too Many Requests
    }
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to get a response." },
      { status: 500 }
    );
  }
}
