import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { BiFullscreen } from "react-icons/bi";
import createEmbeddableUrls from "@/utils/getEmbedableUrl";

const CourseContentFullscreenDialog = ({ url }: { url: string }) => {
  return (
    <Dialog>
      <DialogTrigger className="flex space-x-1 items-center">
        <BiFullscreen />
        <p>Full Screen</p>
      </DialogTrigger>
      <DialogContent className="bg-slate-100 dark:bg-gray-950 border-slate-300 dark:border-gray-800 max-w-7xl w-full h-[98vh] p-0 py-12">
        <iframe
          src={createEmbeddableUrls(url)}
          className="border-[3px] border-rose-500 rounded "
          width="100%"
          height="100%"
          title="Embedded Website"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </DialogContent>
    </Dialog>
  );
};

export default CourseContentFullscreenDialog;
