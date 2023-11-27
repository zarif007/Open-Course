import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import TooltipComponent from "../ui/TooltipComponent";
import { FcGoodDecision } from "react-icons/fc";
import { Button } from "../ui/Button";
import { useAppSelector } from "@/redux/store";
import { mainEndPoint, nextApiEndPoint } from "@/utils/apiEndpoints";
import axios from "axios";

const CourseInvitationDialog = ({ courseSlug }: { courseSlug: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );
  const createInvitationLink = async () => {
    if (!signedInUser || isLoading) return;
    setIsLoading(true);
    const payload = {
      user: signedInUser.id,
      courseSlug,
    };

    const { data } = await axios.post(
      `${nextApiEndPoint}/invitationLink`,
      payload
    );
    console.log(data.link);

    setIsLoading(false);
  };
  return (
    <Dialog>
      <DialogTrigger>
        <TooltipComponent content="Invite Friends">
          <FcGoodDecision className="w-8 h-8 cursor-pointer" />
        </TooltipComponent>
      </DialogTrigger>
      <DialogContent className="bg-slate-100 dark:bg-gray-950 border border-slate-300 dark:border-gray-800 max-w-xl w-full">
        <Button
          className="w-full focus:ring-0"
          isLoading={isLoading}
          onClick={createInvitationLink}
        >
          Generate Invitation Link
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CourseInvitationDialog;
