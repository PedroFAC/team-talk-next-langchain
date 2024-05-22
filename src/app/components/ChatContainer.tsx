import { Message } from "ai/react";
import ChatMessage from "./ChatMessage";

interface ChatContainerProps {
  messages: Message[];
}

const ChatContainer = ({ messages }: ChatContainerProps) => {
  return (
    <div className="flex flex-col items-center py-4 md:p-8 rounded border bg-white border max-h-120">
      <div className="flex flex-col-reverse w-full mb-4 overflow-auto transition-[flex-grow] ease-in-out ">
        {messages.length > 0
          ? [...messages].reverse().map((m, i) => {
              return <ChatMessage key={i} role={m.role} content={m.content} />;
            })
          : ""}
      </div>
    </div>
  );
};

export default ChatContainer;
