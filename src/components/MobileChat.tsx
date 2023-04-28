import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import { Chat } from "./chat/Chat";

const MobileChat = ({ db_id }: { db_id: string }) => {
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
          <Chat db_id={db_id} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MobileChat;
