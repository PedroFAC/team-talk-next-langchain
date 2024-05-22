import { ChangeEventHandler, FormEventHandler } from "react";

interface ChatFormProps {
  isLoading: boolean;
  personality: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  input: string;
}

const ChatForm = ({
  onSubmit,
  isLoading,
  personality="pirate",
  onChange,
  input,
}: ChatFormProps) => {
  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col px-4">
      <div className="flex w-full mt-4 my-4">
        <input
          value={input}
          onChange={onChange}
          type="text"
          placeholder={`Chat with the ${personality}!`}
          className="grow mr-8 p-4 border rounded outline-none"
        />
        <button
          type="submit"
          className={`shrink-0 px-8 py-4 ${
            isLoading ? "bg-gray-600" : "bg-sky-600"
          }  rounded w-28 text-white`}
          disabled={isLoading}
        >
          <span>Send</span>
        </button>
      </div>
    </form>
  );
};

export default ChatForm;
