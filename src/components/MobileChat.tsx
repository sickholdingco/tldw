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
    <div className="absolute bottom-2 right-1/2 md:hidden">
      <Dialog>
        <DialogTrigger>Chat</DialogTrigger>
        <DialogContent className="h-[75vh]">
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <Chat />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MobileChat;
