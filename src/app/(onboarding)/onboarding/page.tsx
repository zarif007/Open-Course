/* eslint-disable @next/next/no-img-element */
"use client";

import SelectedTopics from "@/components/course-details/SelectedTopics";
import { Button } from "@/components/ui/Button";
import { Combobox } from "@/components/ui/Combobox";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { Input } from "@/components/ui/Input";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import { toast } from "@/components/ui/Toast";
import { IUser } from "@/types/user";
import { v1MainEndpoint } from "@/utils/apiEndpoints";
import { courseCategories } from "@/constants/courseCategories";
import createSlug from "@/utils/createSlug";
import formatUser from "@/utils/formatUser";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Onboarding = () => {
  const [preferences, setPreferences] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { user } = useUser();

  const handleSubmit = async () => {
    if (!user || isLoading) return;
    console.log(user);

    setError("");
    if (preferences.length === 0) {
      setError("You must select at least one preference");
      return;
    }

    const { data } = await axios.get(
      `${v1MainEndpoint}/user/byExternalId/${user.id}`
    );

    setIsLoading(true);
    const userInfo: IUser = {
      ...formatUser(user),
      preferences,
      userName: data.data
        ? data.data.userName
        : createSlug(user?.fullName || ""),
    };

    console.log(userInfo);

    try {
      await axios.post(`${v1MainEndpoint}/user`, userInfo);
      // window.location.reload();
      // router.replace("/");
      toast({
        title: "Success",
        message: `Profile Updated`,
        type: "success",
      });
      window.history.back();
    } catch (error) {
      toast({
        title: "Error",
        message: `Something went wrong, try again!`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addPreferences = (preferences: string[]) => {
    setPreferences(preferences);
  };

  return (
    <div className="w-full max-w-3xl mx-auto h-full flex flex-col px-4">
      <LargeHeading>
        <span className="underline decoration-rose-500 decoration-4">
          Thanks for
        </span>{" "}
        <span className="text-rose-500 dark:text-rose-500">Joining</span>
      </LargeHeading>
      <LargeHeading size="sm">Complete your profile</LargeHeading>
      <div className="mt-8 mx-auto flex space-x-3 rounded-xl bg-slate-300 dark:bg-gray-800 p-2">
        <img src={user?.imageUrl} className="h-16 w-16 rounded-xl" alt="DP" />
        <div className="pr-2">
          <p className="font-bold text-xl text-rose-500 dark:text-rose-500">
            {user?.fullName}
          </p>
          <p className="font-semibold text-lg">
            {user?.emailAddresses[0].emailAddress}
          </p>
        </div>
      </div>
      <div className="my-16">
        <Paragraph className="font-semibold text-md">
          Select Preferences (max 5)
        </Paragraph>
        <Combobox
          title="Preferences"
          list={courseCategories}
          currentValues={preferences}
          setCurrentValuesFunction={addPreferences}
          limit={5}
        />
        <div className="mt-8 px-2 h-20 rounded border-2 border-slate-300 dark:border-gray-800">
          <SelectedTopics
            selectedTopics={preferences}
            mode="creation"
            setSelectedTopics={addPreferences}
          />
        </div>
      </div>
      <ErrorMessage text={error} className="mb-4" />
      <Button onClick={handleSubmit} isLoading={isLoading}>
        Complete?
      </Button>
    </div>
  );
};

export default Onboarding;
