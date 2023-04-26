import React, { useCallback, useEffect, useState } from "react";
import { useAnswerQuestion } from "./hooks/useAnswerQuestion";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import { type Message } from "@/types";
import { enterPress } from "../../utils/helperFunctions/enterPress";

interface ChatInputProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  db_id: string;
}

const ChatInput = (props: ChatInputProps) => {
  const { messages, setMessages } = props;
  const [question, setQuestion] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, isLoading, isError, isFetching, refetch } = useAnswerQuestion(
    messages,
    props.db_id,
  );
  console.log(data);
  useEffect(() => {
    if (data) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          content: data.answer.body,
          isUser: false,
        },
      ]);
    }
  }, [data]);

  const handleSubmit = async () => {
    if (question !== "") {
      const message = {
        id: Date.now().toString(),
        content: question,
        isUser: true,
      };
      setQuestion("");
      setMessages((prevMessages) => [...prevMessages, message]);

      const messagesArray = messages;
      messagesArray.push(message);
      await refetch({
        queryKey: [messages, props.db_id],
      });
    }

    setQuestion("");
  };

  return (
    <div className="absolute bottom-0 flex w-full justify-center text-black">
      <div className="relative flex w-full flex-grow rounded-md border border-dimmed-600 bg-dimmedBlack py-2">
        <input
          className="h-6 max-h-52 w-full resize-none bg-gray-700 bg-transparent p-2 text-sm  text-dimmed-100 focus:outline-none focus:ring-0 focus-visible:ring-0"
          onKeyDown={(e) => enterPress(e, handleSubmit)}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />
        <button
          className="absolute bottom-1.5 right-1 rounded p-1"
          onClick={handleSubmit}
        >
          <ArrowUpCircleIcon className="h-5 w-5 text-dimmed-100" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
