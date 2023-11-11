import OngoingCourse from "@/components/dashboard/OngoingCourses";
import Heatmap from "@/components/dashboard/Heatmap";
import React from "react";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-3">
      <Heatmap />
      <OngoingCourse />
    </div>
  );
};

export default Dashboard;
