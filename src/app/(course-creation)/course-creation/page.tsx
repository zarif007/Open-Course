import LargeHeading from "@/components/ui/LargeHeading";
import React from "react";

const CourseCreation = () => {
  return (
    <section className="w-full max-w-8xl mx-auto h-full flex flex-col">
      <LargeHeading size="lg" className="">
        Create Course
      </LargeHeading>
      <div className="flex">
        {/* Left */}
        <div className="w-4/12 border h-[72vh] fixed overflow-y-auto">
          {Array(75)
            .fill(0)
            .map((elm, index) => (
              <p key={index}>{index}</p>
            ))}
        </div>

        {/* Right */}
        <div className="w-8/12 border ml-auto">
          {" "}
          {/* Add ml-auto for right margin */}
          {Array(100)
            .fill(0)
            .map((elm, index) => (
              <p key={index}>{elm}</p>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CourseCreation;
