import { ICheckPoint } from "@/types/checkPoint";
import React from "react";
import { BiSolidFlagCheckered } from "react-icons/bi";
import { MdCancel } from "react-icons/md";

const CheckPoints = ({
  topicID,
  checkPoints,
  handleRemoveCheckPoint,
  mode,
}: {
  topicID: number;
  checkPoints: ICheckPoint[];
  handleRemoveCheckPoint: (checkPointID: number) => void;
  mode: "creation" | "edit" | "view";
}) => {
  const checkForCheckPoints = (topicID: number): ICheckPoint[] => {
    return checkPoints
      ? checkPoints.filter((cp) => cp.topicID === topicID)
      : [];
  };
  return (
    <div>
      {checkForCheckPoints(topicID as number).length ? (
        checkForCheckPoints(topicID as number).map((cp) => {
          return (
            <div
              key={cp.checkPointID}
              className="mx-2 text-sm flex justify-between font-semibold text-slate-500 dark:text-gray-500"
            >
              <div className="flex space-x-1 items-center">
                <BiSolidFlagCheckered />
                <p>{cp.name}</p>
              </div>
              {mode !== "view" && (
                <MdCancel
                  className="cursor-pointer"
                  onClick={() => handleRemoveCheckPoint(cp.checkPointID)}
                />
              )}
            </div>
          );
        })
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </div>
  );
};

export default CheckPoints;
