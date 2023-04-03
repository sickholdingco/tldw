import type { KeyboardEvent } from "react";

export const enterPress = (e: KeyboardEvent, callback: () => void) => {
  if (e.code === "Enter") {
    e.preventDefault();
    callback();
  }

  return;
};
