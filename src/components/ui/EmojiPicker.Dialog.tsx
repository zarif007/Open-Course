"use client";

import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { FaFaceGrinBeam } from "react-icons/fa6";
import { useTheme } from "next-themes";

const EmojiPickerDialog = ({
  handleAddEmoji,
}: {
  handleAddEmoji: (emoji: string) => Promise<void>;
}) => {
  const { theme } = useTheme();
  const handleEmojiOnSelect = (emoji: any) => {
    handleAddEmoji(emoji.native);
  };
  return (
    <Dialog>
      <DialogTrigger>
        <FaFaceGrinBeam className={`h-5 w-5 cursor-pointer`} />
      </DialogTrigger>
      <DialogContent className="p-0 max-w-fit">
        <Picker theme={theme} data={data} onEmojiSelect={handleEmojiOnSelect} />
      </DialogContent>
    </Dialog>
  );
};

export default EmojiPickerDialog;
