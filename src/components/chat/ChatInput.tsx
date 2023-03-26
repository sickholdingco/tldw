import React, { useState } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import { type Message } from "./Chat";
import { enterPress } from "../../utils/helperFunctions/enterPress";

interface ChatInputProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const ChatInput = (props: ChatInputProps) => {
  const { setMessages } = props;

  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString(), content: input, isUser: true },
      ]);
    }

    setInput("");
  };

  return (
    <div className="absolute bottom-0 flex w-full justify-center text-black">
      <div className="relative flex w-full flex-grow rounded-md border border-gray-600 bg-gray-700 py-2">
        <input
          className="h-6 max-h-52 w-full resize-none bg-gray-700 bg-transparent p-2 text-sm text-white  focus:outline-none focus:ring-0 focus-visible:ring-0"
          onKeyDown={(e) => enterPress(e, handleSubmit)}
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button
          className="absolute bottom-1.5 right-1 rounded p-1"
          onClick={handleSubmit}
        >
          <ArrowUpCircleIcon className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
