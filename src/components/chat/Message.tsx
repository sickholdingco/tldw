import clsx from "clsx";

interface MessageProps {
  children: React.ReactNode;
  isUser?: boolean;
}

// bg-green-500 text-white text-sm rounded-t-lg rounded-bl-lg py-2 px-4 max-w-xs

const Message = (props: MessageProps) => {
  const { children, isUser = false } = props;

  return (
    <div
      className={clsx(
        "flex",
        isUser ? "items-end justify-end" : "items-start justify-start",
      )}
    >
      <p
        className={clsx(
          "max-w-xs break-words   rounded-t-lg py-2 px-4 text-sm text-white",
          isUser ? "rounded-bl-lg bg-blue-500" : "rounded-br-lg bg-gray-500",
        )}
      >
        {children}
      </p>
    </div>
  );
};

export default Message;
