import React from "react";
import { Textarea } from "../ui/Textarea";
import ErrorMessage from "../ui/ErrorMessage";
import { Button } from "../ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentCreationSchema } from "@/validations/discussion";
import axios from "axios";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import { IDiscussion } from "@/types/discussion";

const DiscussionEdit = ({
  discussion,
  editingStatus,
  setEditingStatus,
}: {
  discussion: IDiscussion;
  editingStatus: "editing" | "processing";
  setEditingStatus: React.Dispatch<
    React.SetStateAction<"no" | "editing" | "processing">
  >;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    comment: string;
  }>({ resolver: zodResolver(commentCreationSchema) });
  const handleEdit = async (data: { comment: string }) => {
    try {
      setEditingStatus("processing");
      await axios.put(`${nextApiEndPoint}/discussion/${discussion.id}`, {
        ...discussion,
        comment: data.comment,
      });
      setEditingStatus("no");
    } catch (error) {}
  };
  return (
    <form onSubmit={handleSubmit(handleEdit)}>
      <Textarea
        {...register("comment")}
        className="text-md font-semibold white-space w-full"
        defaultValue={discussion.comment}
      />
      <ErrorMessage text={errors.comment?.message} />
      <div className="flex justify-end space-x-2 mt-2">
        <Button
          variant="outline"
          type="reset"
          onClick={() => setEditingStatus("no")}
        >
          Cancel
        </Button>
        <Button type="submit" isLoading={editingStatus === "processing"}>
          Edit
        </Button>
      </div>
    </form>
  );
};

export default DiscussionEdit;
