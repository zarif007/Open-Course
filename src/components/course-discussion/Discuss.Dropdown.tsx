import React from "react";
import { FaFaceGrinBeam, FaReply } from "react-icons/fa6";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";

const DiscussDropdown = ({
  handleDelete,
  setEditingStatus,
}: {
  handleDelete: () => Promise<void>;
  setEditingStatus: React.Dispatch<
    React.SetStateAction<"no" | "editing" | "processing">
  >;
}) => {
  const styles = {
    icon: `h-5 w-5 cursor-pointer`,
  };

  return (
    <div
      className={`rounded bg-slate-300 dark:bg-gray-900 px-2 py-2 flex space-x-3 w-fit`}
    >
      <FaFaceGrinBeam className={styles.icon} />
      <FaReply className={styles.icon} />
      <AiTwotoneEdit
        className={styles.icon}
        onClick={() => setEditingStatus("editing")}
      />
      <AiTwotoneDelete className={styles.icon} onClick={handleDelete} />
    </div>
  );
};

export default DiscussDropdown;
