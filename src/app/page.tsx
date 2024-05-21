"use client";
import { FormEvent, useState } from "react";

interface Message {
  content: string;
  role: "user" | "AI";
  id: string;
}
import { useChat } from "ai/react";

export default function Home() {
  const [personality, setPersonality] = useState("pirate");
  const endpoint = "api/chat";
  const {
    messages,
    input,
    setInput,
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
    // e.preventDefault();
    handleSubmit(e);
  };
  const handlePersonalityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonality(e.target.value);
    console.log(e.target.value);
    setMessages([]);
  };

  return (
    <div>
      {messages.length > 0
        ? [...messages].reverse().map((m, i) => {
            return (
              <div key={i}>
                <div>{m.role === "user" ? "🧑" : "🤖"}:</div>
                <div>{m.content}</div>
              </div>
            );
          })
        : ""}
      <form onSubmit={sendMessage}>
        <input
          value={input}
          onChange={handleInputChange}
          type="text"
          placeholder={`Chat with the ${personality}!`}
        />
        <button type="submit">
          <span>{isLoading ? "Loading..." : "Send"}</span>
        </button>
        <div >
          <label>
            <input
              type="radio"
              value="pirate"
              checked={personality === "pirate"}
              onChange={handlePersonalityChange}
            />
            Pirate
          </label>
        </div>
        <div >
          <label>
            <input
              type="radio"
              value="lawyer"
              checked={personality === "lawyer"}
              onChange={handlePersonalityChange}
            />
            Lawyer
          </label>
        </div>
        <div >
          <label>
            <input
              type="radio"
              value="vampire"
              checked={personality === "vampire"}
              onChange={handlePersonalityChange}
            />
            Vampire
          </label>
        </div>
      </form>
    </div>
  );
}
