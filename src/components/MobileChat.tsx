import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import { Chat } from "./chat/Chat";

const MobileChat = () => {
  return (
    <div className="absolute bottom-10 right-10 md:hidden">
      <Dialog>
        <DialogTrigger asChild>
          <button className="rounded-full bg-blueHighlight p-2">chat</button>
        </DialogTrigger>
        <DialogContent className="h-[75vh]">
          <DialogHeader>
            <DialogTitle>Chat</DialogTitle>
          </DialogHeader>
          <Chat />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MobileChat;
