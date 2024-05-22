"use client";
import { FormEvent, useState } from "react";
import { useChat } from "ai/react";
import ChatContainer from "./components/ChatContainer";
import PersonalitySelector from "./components/PersonalitySelector";
import ChatForm from "./components/ChatForm";

export default function Home() {
  const [personality, setPersonality] = useState("pirate");
  const endpoint = "api/chat";
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat({
    api: endpoint,
    body: {
      personality,
    },
    onError: (e) => {
      console.error(e);
    },
  });
  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    handleSubmit(e);
  };
  const handlePersonalityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonality(e.target.value);
    setMessages([]);
  };

  return (
    <div>
      <h1 className="text-2xl p-4">
        LangChainJS + Next.js - Chat with a character!
      </h1>
      <ChatContainer messages={messages} />
      <ChatForm
        onChange={handleInputChange}
        personality={personality}
        isLoading={isLoading}
        input={input}
        onSubmit={sendMessage}
      />
      <PersonalitySelector
        onChange={handlePersonalityChange}
        personality={personality}
      />
    </div>
  );
}
