import { ICourseTopic } from "@/types/courseTopic";

const sortCompareBasedOnSortID = (a: ICourseTopic, b: ICourseTopic) => {
  if (typeof a.sortID === "number" && typeof b.sortID === "number") {
    return a.sortID - b.sortID;
  }
  if (!a.sortID) return 1;
  if (!b.sortID) return -1;
  if (typeof a.sortID === "number") return -1;
  return 1;
};

export default sortCompareBasedOnSortID;
