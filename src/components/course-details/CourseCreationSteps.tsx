import React from "react";
import { BsCardImage } from "react-icons/bs";
import { HiOutlineDocumentText } from "react-icons/hi";
import { TbListDetails } from "react-icons/tb";

const CourseCreationSteps = ({ step }: { step: number }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-3">
      <div className="flex flex-row justify-between w-[75%] md:w-[50%]">
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              step >= 0 ? "bg-rose-500" : "bg-gray-500"
            } text-white`}
          >
            <span>1</span>
          </div>
          <HiOutlineDocumentText className="w-8 h-8 my-2 text-gray-500" />
          <h2 className="text-sm font-bold text-gray-500">Details</h2>
        </div>
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              step >= 1 ? "bg-rose-500" : "bg-gray-500"
            } text-white`}
          >
            <span>2</span>
          </div>
          <TbListDetails className="w-8 h-8 my-2 text-gray-500" />
          <h2 className="text-sm font-bold text-gray-500">Topic</h2>
        </div>
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              step === 2 ? "bg-rose-500" : "bg-gray-500"
            } text-white`}
          >
            <span>3</span>
          </div>
          <BsCardImage className="w-8 h-8 my-2 text-gray-500" />
          <h2 className="text-sm font-bold text-gray-500">Banner</h2>
        </div>
      </div>
    </div>
  );
};

export default CourseCreationSteps;
