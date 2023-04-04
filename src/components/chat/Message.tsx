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
          "max-w-xs break-words rounded-t-lg py-2 px-4 text-sm",
          isUser
            ? "rounded-bl-lg bg-blueAccent"
            : "rounded-br-lg bg-dimmed-800",
        )}
      >
        {children}
      </p>
    </div>
  );
};

export default Message;
