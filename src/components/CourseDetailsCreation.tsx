import React, { useState } from "react";
import CourseDetailsCreationForm from './CourseDetailsCreation.Form'
import { Button } from "./ui/Button";
import { useAppSelector } from "@/redux/store";

const CourseDetailsCreation = () => {
  const [courseTitle, setCourseTitle] = useState<string>('Dragon Training 🐉')
  const [selectedCourseTypes, setSelectedCourseTypes] = useState<string[]>([]);
  const courseTopics = useAppSelector((state) => state.courseCreationReducer.value.courseTopics)
  const submitData = () => {
    const course = {
      title: courseTitle,
      categories: selectedCourseTypes,
      courseTopics: courseTopics.filter(courseTopic => courseTopic.id !== 0),
    }
    console.log(course)
  }
  return (
    <div className=" border-slate-300 dark:border-gray-800 rounded my-4 p-3 md:p-6">
      <CourseDetailsCreationForm 
        selectedCourseTypes={selectedCourseTypes} 
        setSelectedCourseTypes={setSelectedCourseTypes} 
        courseTitle={courseTitle} 
        setCourseTitle={setCourseTitle} />
      
      <div className="flex my-2 flex-wrap">
        {selectedCourseTypes.map((selectedCourseType, index) => (
          <div
            key={index}
            className="w-fit p-1 m-1 text-xs font-semibold bg-gray-950 text-slate-200  dark:bg-slate-200 dark:text-gray-950 rounded-md"
          >
            {selectedCourseType}
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Button variant="general" className="px-12 py-6" onClick={submitData}>Done Creating Course?</Button>
      </div>
    </div>
  );
};

export default CourseDetailsCreation;
