import React from "react";
import { BsCardImage } from "react-icons/bs";
import { HiOutlineDocumentText } from "react-icons/hi";
import { TbListDetails } from "react-icons/tb";

const styles = {
  icon: "w-6 h-6 my-2",
};

const steps = [
  {
    icon: <HiOutlineDocumentText className={styles.icon} />,
    text: "Details",
  },
  {
    icon: <TbListDetails className={styles.icon} />,
    text: "Topic",
  },
  {
    icon: <BsCardImage className={styles.icon} />,
    text: "Banner",
  },
];

const CourseCreationSteps = ({ step }: { step: number }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full my-3">
      <div className="flex flex-row w-[75%] md:w-[50%] justify-center">
        {steps.map((elm, index) => {
          return (
            <div key={index} className="flex items-center">
              <div
                className={`flex flex-col items-center ${
                  step >= index ? "text-rose-500" : "text-gray-500"
                }`}
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    step >= index ? "bg-rose-500" : "bg-gray-500"
                  } text-white`}
                >
                  <span>{index + 1}</span>
                </div>
                {elm.icon}
                <h2 className="text-sm font-bold">{elm.text}</h2>
              </div>
              {index < 2 && (
                <div
                  className={`w-20 md:w-60 h-0 p-0 m-0 border-2 border-dashed mx-2 ${
                    index < step ? "border-rose-500" : "border-gray-500"
                  }`}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseCreationSteps;
