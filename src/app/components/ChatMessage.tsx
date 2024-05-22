interface ChatMessageProps {
  role: string;
  content: string;
}
 const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const colorClassName =
    role === "user" ? "bg-sky-600" : "bg-green-600";
  const alignmentClassName = role === "user" ? "ml-auto" : "mr-auto";
  return (
    <div
      className={`${alignmentClassName} ${colorClassName} text-white rounded px-4 py-2 max-w-[80%] mb-8 flex`}
    >
      <div className="mr-2">{role === "user" ? "🧑" : "🤖"}</div>
      <div className="whitespace-pre-wrap flex flex-col">: {content}</div>
    </div>
  );
};

export default ChatMessage