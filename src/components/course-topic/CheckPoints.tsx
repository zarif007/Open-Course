import { ICheckPoint } from "@/types/checkPoint";
import React, { useState } from "react";
import { BiSolidFlagCheckered } from "react-icons/bi";
import { MdCancel, MdOutlineCancelPresentation } from "react-icons/md";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setCourseForCreation } from "@/redux/features/course-creation-slice";
import { setCourseForUpdate } from "@/redux/features/course-update-slice";
import { IoIosAddCircle } from "react-icons/io";
import { ICourse } from "@/types/course";

const CheckPoints = ({
  topicID,
  checkPoints,
  mode,
  isAddCheckPointButtonClicked,
}: {
  topicID: number;
  checkPoints: ICheckPoint[];
  mode: "creation" | "edit" | "view";
  isAddCheckPointButtonClicked: boolean;
}) => {
  const checkForCheckPoints = (topicID: number): ICheckPoint[] => {
    return checkPoints
      ? checkPoints.filter((cp) => cp.topicID === topicID)
      : [];
  };

  const course = useAppSelector((state) =>
    mode === "view"
      ? state.courseViewReducer.value.course
      : mode === "creation"
      ? state.courseCreationReducer.value.course
      : state.courseUpdateReducer.value.course
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveCheckPoint = (checkPointID: number) => {
    const updated = {
      ...course,
      checkPoints: course.checkPoints.filter(
        (cp) => cp.checkPointID !== checkPointID
      ),
    };
    dispatch(
      mode === "creation"
        ? setCourseForCreation(updated)
        : setCourseForUpdate(updated)
    );
  };

  return (
    <div className="w-full">
      {mode === "view" || !isAddCheckPointButtonClicked ? (
        checkForCheckPoints(topicID as number).length ? (
          checkForCheckPoints(topicID as number).map((cp) => {
            return (
              <div
                key={cp.checkPointID}
                className="mx-2 my-0 p-0 text-sm flex justify-between items-center font-semibold text-slate-500 dark:text-gray-500"
              >
                <div className="flex space-x-1 items-center truncate">
                  <BiSolidFlagCheckered />
                  <p className="truncate">{cp.name}</p>
                </div>
                {mode !== "view" && (
                  <MdCancel
                    className="cursor-pointer w-4 h-4"
                    onClick={() => handleRemoveCheckPoint(cp.checkPointID)}
                  />
                )}
              </div>
            );
          })
        ) : (
          <React.Fragment></React.Fragment>
        )
      ) : (
        <CheckPointsAddition mode={mode} course={course} />
      )}
    </div>
  );
};

const CheckPointsAddition = ({
  mode,
  course,
}: {
  mode: "creation" | "edit";
  course: ICourse;
}) => {
  const [isBarClicked, setIsBarClicked] = useState<boolean>(false);
  const [checkPointName, setCheckPointName] = useState<string>("");

  const currentCourseTopic = useAppSelector((state) =>
    mode === "creation"
      ? state.courseCreationReducer.value.currentCourseTopic
      : state.courseUpdateReducer.value.currentCourseTopic
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleAddCheckPoint = () => {
    const checkPoint = {
      checkPointID: course.checkPoints ? course.checkPoints.length + 1 : 1,
      topicID:
        !currentCourseTopic.topicID || currentCourseTopic.topicID <= 0
          ? 1
          : currentCourseTopic.topicID,
      name: checkPointName,
    };
    const updated = {
      ...course,
      checkPoints: [...(course.checkPoints ?? []), checkPoint],
    };
    dispatch(
      mode === "creation"
        ? setCourseForCreation(updated)
        : setCourseForUpdate(updated)
    );
    setIsBarClicked(false);
  };
  return (
    <div>
      {!isBarClicked ? (
        <div
          className="flex items-center p-0 m-0 cursor-pointer"
          onClick={() => setIsBarClicked(true)}
        >
          <div
            className={`m-0 p-[1px] w-full h-0 rounded border border-gray-500 bg-gray-500`}
          />
          <IoIosAddCircle className="p-0 m-0 text-gray-500" />
        </div>
      ) : (
        <div className="flex items-center space-x-1 my-2">
          <Input
            placeholder="Checkpoint Name"
            defaultValue={checkPointName}
            onChange={(e) => setCheckPointName(e.target.value)}
          />
          <Button className="focus:ring-0" onClick={handleAddCheckPoint}>
            Set
          </Button>
          <Button
            variant="outline"
            className="focus:ring-0 p-1 py-0"
            onClick={() => setIsBarClicked(false)}
          >
            <MdOutlineCancelPresentation className="w-6 h-6" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CheckPoints;
