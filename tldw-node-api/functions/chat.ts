import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

interface Message {
  content: string;
  isUser: boolean;
  id: string;
}

export const chat = async (messages: Message[], text: string) => {
  const formattedMesages = messages.map((message) => {
    return {
      role: message.isUser
        ? "user"
        : ("system" as ChatCompletionRequestMessageRoleEnum),
      content: message.content,
    };
  });
  formattedMesages.unshift({
    role: "system",
    content:
      "You are a helpful chat bot that answers a question in a concise manner, using your own knowledge and the context provided to you.",
  });

  formattedMesages[formattedMesages.length - 1].content =
    formattedMesages[formattedMesages.length - 1].content +
    "\n Context: \n" +
    text;

  const answer = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: formattedMesages,
  });
  return answer.data.choices[0].message.content;
};
