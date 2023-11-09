"use client";
import { IDiscussion } from "@/types/discussion";
import React, { useEffect } from "react";
import Discussion from "./Discussion";
import io from "socket.io-client";

const Discussions = ({ discussions }: { discussions: IDiscussion[] }) => {
  // useEffect(() => {
  //   let ws: WebSocket;

  //   ws = new WebSocket("ws://localhost:5000/api/v1/discussion");

  //   ws.addEventListener("error", () => {
  //     console.log("error");
  //   });

  //   ws.addEventListener("open", () => {
  //     console.log("open");
  //   });
  //   ws.addEventListener("close", () => {
  //     console.log("close");
  //   });
  //   ws.addEventListener("message", (msg) => {
  //     console.log("msg", msg);
  //   });
  //   return () => {
  //     ws.close();
  //   };
  // }, []);
  return (
    <div>
      {discussions.map((discussion) => (
        <Discussion key={discussion.id} discussion={discussion} />
      ))}
    </div>
  );
};
export default Discussions;
