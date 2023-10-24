import {
  courseFilterableFields,
  courseSearchableFields,
} from "@/constants/course";
import { paginationFields } from "@/constants/shared";
import { paginationHelpers } from "@/helpers/paginationHelpers";
import { connectToDB } from "@/lib/connectToMongoose";
import Course from "@/lib/models/course.model";
import CourseTopic from "@/lib/models/courseTopic.model";
import User from "@/lib/models/user.model";
import pick from "@/utils/pick";
import { SortOrder } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  connectToDB();

  const { searchTerm, ...filtersData } = pick(
    req.nextUrl.searchParams,
    courseFilterableFields
  );

  console.log(filtersData);
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(
      pick(req.nextUrl.searchParams, paginationFields)
    );

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: courseSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  console.log(andConditions, searchTerm, courseSearchableFields);
  // Filters needs $and to full fill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const courses = await Course.find(whereConditions)
    .populate({
      path: "topics",
      model: CourseTopic,
    })
    .populate({
      path: "creator",
      model: User,
    })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Course.countDocuments(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  return NextResponse.json({
    meta: {
      page,
      limit,
      total,
    },
    data: courses,
  });
};
