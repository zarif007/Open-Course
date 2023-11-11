import OngoingCourses from "@/components/dashboard/OngoingCourses";
import Heatmap from "@/components/dashboard/Heatmap";
import React from "react";
import FinishedCourses from "@/components/dashboard/FinishedCourses";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-3">
      <Heatmap />
      <OngoingCourses />
      <FinishedCourses />
    </div>
  );
};

export default Dashboard;
