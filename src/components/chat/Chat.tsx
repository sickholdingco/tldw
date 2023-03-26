/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import ChatInput from "./ChatInput";
import { useAnswerQuestion } from "./hooks/useAnswerQuestion";
import MessageSection from "./MessageSection";

export interface Message {
  content: string;
  isUser: boolean;
  id: string;
}

const messageList: Message[] = [
  { content: "messywessy 1", isUser: false, id: "1" },
  {
    content: "a message",
    isUser: true,
    id: "2",
  },
  {
    content:
      "I really like how organic sounding this feature is. Not just one part was given to the feature artist (Jungkook) but it became an ACTUAL duet collab of the two. The vocal mixture-- Charlie's crisp and Jungkook's smooth vocal style-- blends perfectly which is just amazing! Great job!For some reason, this song reminds me of East Wing Latino Laugh",
    isUser: false,
    id: "3",
  },
];

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>(messageList);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // const { data, isLoading, isError, isFetching, refetch } =
  //   useAnswerQuestion(searchInput);

  // const onSubmit = (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  //   // eslint-disable-next-line @typescript-eslint/no-floating-promises
  //   refetch();
  // };

  return (
    <div className="h-full overflow-y-auto">
      <div className="relative h-full overflow-auto">
        <MessageSection messages={messages} />
        <ChatInput setMessages={setMessages} />
      </div>
    </div>
  );
};
