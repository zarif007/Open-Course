"use client";

import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Theme } from "emoji-picker-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { FaFaceGrinBeam } from "react-icons/fa6";
import { useTheme } from "next-themes";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerDialog = ({
  handleAddEmoji,
}: {
  handleAddEmoji: (emoji: string) => void;
}) => {
  const { theme } = useTheme();
  const handleEmojiOnSelect = (emoji: any) => {
    handleAddEmoji(emoji.emoji);
  };

  const emojiTheme = theme === "dark" ? Theme.DARK : Theme.LIGHT;
  return (
    <Dialog>
      <DialogTrigger>
        <FaFaceGrinBeam className={`h-5 w-5 cursor-pointer`} />
      </DialogTrigger>
      <DialogContent className="p-0 max-w-fit">
        <EmojiPicker theme={emojiTheme} onEmojiClick={handleEmojiOnSelect} />
      </DialogContent>
    </Dialog>
  );
};

export default EmojiPickerDialog;
