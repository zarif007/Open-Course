'use client'
import React, {useState} from "react";
import CourseTopicsSidebar from "@/components/CourseTopics.Sidebar";
import { MdOutlineMenuOpen } from "react-icons/md";

const CourseCreation = () => {

  const [showCourseTopics, setShowCourseTopics] = useState(true);
  const styles = {
    icon: `w-10 h-10 text-gray-900 dark:text-slate-100 ${!showCourseTopics && 'rotate-180'}`
  }
  
  return (
    <section className="w-full max-w-8xl mx-auto h-full flex flex-col">
      <div className="ml-6 flex justify-start fixed cursor-pointer" onClick={() => setShowCourseTopics(!showCourseTopics)}>
        <MdOutlineMenuOpen className={styles.icon}/> 
      </div>
      <div className="flex">
        {/* Left */}
        
        {
          showCourseTopics && <CourseTopicsSidebar />
        }

        {/* Right */}
        <div className={`${showCourseTopics ? 'w-full md:w-9/12' : 'w-full'}  ml-auto rounded mt-6`}>
          <div className="m-4 w-full max-w-5xl mx-auto">
            {Array(100)
              .fill(0)
              .map((elm, index) => (
                <p key={index}>{elm}</p>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseCreation;
