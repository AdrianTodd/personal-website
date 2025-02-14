import { NextResponse } from "next/server";
import knowledgeBase from "../../../knowledge.json";
console.log("Imported knowledgeBase:", knowledgeBase);
interface QuizItem {
  q: string;
  options: string[];
  correct: string;
}

interface KnowledgeItem {
  keywords: string[];
  answer: string;
  hint?: string;
  quiz?: QuizItem[];
}

interface KnowledgeBase {
  keywords: string[];
  answer: string;
  hint?: string | undefined;
  quiz?: QuizItem[] | undefined;
}

interface ChatResponse {
  response: {
    type: "text" | "quiz";
    content?: string;
    question?: string;
    options?: string[];
    correct?: string;
    topic?: string;
  };
}

export async function POST(request: Request) {
  const { message } = await request.json();
  const userMessage = message.toLowerCase();

  let response: ChatResponse = {
    response: {
      type: "text",
      content:
        "I'm not sure I understand. Can you rephrase or ask about a specific CS topic?",
    },
  };

  for (const item of knowledgeBase as unknown as KnowledgeItem[]) {
    for (const keyword of item.keywords || []) {
      if (userMessage.includes(keyword)) {
        if (userMessage.includes("hint") && item.hint) {
          response = { response: { type: "text", content: item.hint } };
        } else if (userMessage.includes("quiz") && item.quiz) {
          const quizItem =
            item.quiz[Math.floor(Math.random() * item.quiz.length)];
          response = {
            response: {
              type: "quiz",
              question: quizItem.q,
              options: quizItem.options,
              correct: quizItem.correct,
              topic: keyword,
            },
          };
        } else {
          response = { response: { type: "text", content: item.answer } };
        }
        break;
      }
    }
    if (
      response.response.content !=
      "I'm not sure I understand.  Can you rephrase or ask about a specific CS topic?"
    ) {
      break;
    }
  }
  return NextResponse.json(response);
}
