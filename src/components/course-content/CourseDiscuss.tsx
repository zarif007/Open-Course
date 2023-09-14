import React, { useState } from "react";
import Paragraph from "../ui/Paragraph";
import { BsEmojiLaughing } from "react-icons/bs";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useAppSelector } from "@/redux/store";
import { IDiscuss } from "@/types/discuss";

const CourseDiscuss = () => {
  const [comment, setComment] = useState<string>("");
  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const handleSubmit = async () => {
    if (!signedInUser) return;
    const payload: Partial<IDiscuss> = {
      sender: signedInUser?._id!,
      comment,
    };
    console.log(payload);
  };

  return (
    <div>
      <Input
        placeholder="Comment"
        className="py-8 text-lg mb-4 mt-8"
        onChange={(e) => setComment(e.target.value)}
      />
      <form
        onSubmit={handleSubmit}
        className="flex justify-end space-x-3 items-center"
      >
        <BsEmojiLaughing className="h-8 w-8 cursor-pointer" />
        <Button type="submit">Comment</Button>
      </form>
    </div>
  );
};

export default CourseDiscuss;
