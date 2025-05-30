import {
  courseFilterableFields,
  courseSearchableFields,
} from '@/constants/course';
import { paginationFields } from '@/constants/shared';
import { paginationHelpers } from '@/helpers/paginationHelpers';
import { connectToDB } from '@/lib/connectToMongoose';
import Course from '@/lib/models/course.model';
import CourseTopic from '@/lib/models/courseTopic.model';
import User from '@/lib/models/user.model';
import pick from '@/utils/pick';
import { SortOrder } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  await connectToDB();

  const { searchTerm, ...filtersData } = pick(
    req.nextUrl.searchParams,
    courseFilterableFields,
    true
  );

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(
      pick(req.nextUrl.searchParams, paginationFields, false)
    );

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm && searchTerm.length > 0) {
    const constraints = [
      ...courseSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm[0],
          $options: 'i',
        },
      })),
    ];
    andConditions.push({
      $or: constraints,
    });
  }

  // Handle isAIGenerated filter specially
  const { isAIGenerated, ...otherFilters } = filtersData;

  if (isAIGenerated) {
    const isAIGeneratedValue = isAIGenerated[0]; // Assuming it's an array from your pick function

    if (isAIGeneratedValue === 'true') {
      // Only AI-generated courses
      andConditions.push({
        isAIGenerated: true,
      });
    } else if (isAIGeneratedValue === 'false') {
      // Non-AI courses (false or field doesn't exist)
      andConditions.push({
        $or: [{ isAIGenerated: false }, { isAIGenerated: { $exists: false } }],
      });
    }
  }

  // Filters needs $and to fulfill all the conditions (for other filters)
  if (Object.keys(otherFilters).length) {
    andConditions.push({
      $and: Object.entries(otherFilters).map(([field, value]) => ({
        [field]: {
          $all: value,
        },
      })),
    });
  }

  // Dynamic Sort needs field to do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const courses = await Course.find(whereConditions)
    .populate({
      path: 'topics',
      model: CourseTopic,
      select:
        'updatedAt versions.type versions.data.title versions.data.description versions.data.source versions.data.duration',
    })
    .populate({
      path: 'creator',
      model: User,
      select: 'name image userName',
    })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Course.countDocuments(whereConditions);

  return NextResponse.json({
    meta: {
      page,
      limit,
      total,
    },
    data: courses,
  });
};
