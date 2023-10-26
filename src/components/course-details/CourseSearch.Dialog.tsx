"use client";

import { TbFilterSearch } from "react-icons/tb";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/Dialog";
import React, { useState } from "react";
import { Input } from "../ui/Input";
import { useRouter, useSearchParams } from "next/navigation";

const CourseSearchDialog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchTermFromParams = searchParams?.get("searchTerm") ?? "";
  const [searchTerm, setSearchTerm] = useState<string>(searchTermFromParams);
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex space-x-2">
          <TbFilterSearch className="w-6 h-6" />
          <p className="font-semibold">Search & Filter</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-100 dark:bg-gray-950 border border-slate-300 dark:border-gray-800 max-w-md w-full m-3">
        <label htmlFor="text" className="font-bold">
          Search Courses
        </label>
        <Input
          defaultValue={searchTerm}
          placeholder="Search Courses"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTermFromParams !== "" && (
          <React.Fragment>
            <label htmlFor="text" className="font-bold">
              Searching for
            </label>
            <p className="px-2 dark:bg-slate-100 bg-gray-950 w-fit rounded text-slate-100 dark:text-gray-950 font-semibold text-md">
              {searchTermFromParams}
            </p>
          </React.Fragment>
        )}
        <DialogClose className="w-full">
          <Button
            onClick={() => router.push(`?searchTerm=${searchTerm}`)}
            className="w-full"
          >
            Search
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default CourseSearchDialog;
