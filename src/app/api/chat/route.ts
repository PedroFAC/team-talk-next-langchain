import { NextRequest, NextResponse } from "next/server";
import {
  Message as VercelChatMessage,
  StreamingTextResponse,
  createStreamDataTransformer,
} from "ai";

import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { HttpResponseOutputParser } from "langchain/output_parsers";
import { Message } from "ai/react";

export const runtime = "edge";

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

const TEMPLATE_PIRATE = `You are a pirate named Patchy. All responses must be extremely verbose and in pirate dialect.`;

const TEMPLATE_LAWYER = `You are a con artist and lawyer named Saul Goodman. All responses must be extremely verbose and not so formal, try to be smart and take advantage of the conversation.`;

const TEMPLATE_VAMPIRE = `Act as Bram Stoker's Dracula. All responses must be extremely verbose and in vampire dialect.`;

enum Templates {
  vampire = TEMPLATE_VAMPIRE,
  lawyer = TEMPLATE_LAWYER,
  pirate = TEMPLATE_PIRATE,
}

export async function POST(req: NextRequest) {
  try {
    const body: {
      messages: Message[];
      personality: "vampire" | "lawyer" | "pirate";
    } = await req.json();
    const messages = body.messages ?? [];
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;
    const template = `${Templates[body.personality] || Templates.pirate}

    Current conversation:
    {chat_history}

    User: {input}
    AI:`;
    const prompt = PromptTemplate.fromTemplate(template);
    const model = new ChatOpenAI({
      temperature: 0.8,
      modelName: "gpt-3.5-turbo-1106",
    });
    const outputParser = new HttpResponseOutputParser();
    const chain = prompt.pipe(model).pipe(outputParser);

    const stream = await chain.stream({
      chat_history: formattedPreviousMessages.join("\n"),
      input: currentMessageContent,
    });

    return new StreamingTextResponse(
      stream.pipeThrough(createStreamDataTransformer())
    );
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
}
