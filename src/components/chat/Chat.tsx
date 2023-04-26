/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import ChatInput from "./ChatInput";
import { type Message } from "@/types";
import MessageSection from "./MessageSection";
import clsx from "clsx";

const messageList: Message[] = [];

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
        <ChatInput
          messages={messages}
          setMessages={setMessages}
          db_id={db_id}
        />
      </div>
    </div>
  );
};
