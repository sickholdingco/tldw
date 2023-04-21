/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import ChatInput from "./ChatInput";
import { useAnswerQuestion } from "./hooks/useAnswerQuestion";
import MessageSection from "./MessageSection";
import clsx from "clsx";

export interface Message {
  content: string;
  isUser: boolean;
  id: string;
}

const messageList: Message[] = [
  {
    content: "Ask me any question relating to the videos...",
    isUser: false,
    id: "1",
  },
];

export const Chat = ({
  className,
  db_id,
}: {
  className?: string;
  db_id: string;
}) => {
  const [messages, setMessages] = useState<Message[]>(messageList);

  return (
    <div className={clsx("h-full overflow-y-auto", className)}>
      <div className="relative h-full overflow-auto">
        <MessageSection messages={messages} />
        <ChatInput setMessages={setMessages} db_id={db_id} />
      </div>
    </div>
  );
};
