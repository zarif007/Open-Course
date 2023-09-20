import { IDiscussion } from "@/types/discussion";
import React from "react";
import Discussion from "./Discussion";

const Discussions = ({ discussions }: { discussions: IDiscussion[] }) => {
  return (
    <div>
      {discussions.map((discussion) => (
        <Discussion key={discussion.id} discussion={discussion} />
      ))}
    </div>
  );
};
export default Discussions;
