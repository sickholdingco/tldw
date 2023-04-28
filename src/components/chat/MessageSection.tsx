import Message from "./Message";
import { Fragment, useEffect, useRef } from "react";
import type { Message as MessageType } from "@/types";

const AlwaysScrollToBottom = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => elementRef?.current?.scrollIntoView());
  return <div ref={elementRef} />;
};

interface ChatLayoutProps {
  messages: MessageType[];
}

const MessageSection = (props: ChatLayoutProps) => {
  const { messages } = props;
  return (
    <div className="flex h-full flex-col gap-3 overflow-auto">
      <div className="flex-1 space-y-4 overflow-y-auto px-2">
        {messages?.map((message) => {
          const formattedMessage =
            message && message.content
              ? message.content.replace(/['"\\]+/g, "")
              : "";
          return (
            <Fragment key={message.id}>
              <Message isUser={message.isUser}>{formattedMessage}</Message>
              <AlwaysScrollToBottom />
            </Fragment>
          );
        })}
        <div className="h-10 w-full flex-shrink-0 md:h-20"></div>
      </div>
    </div>
  );
};

export default MessageSection;
