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
import { z } from 'zod';

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
    const constraints = courseSearchableFields.map((field) => ({
      [field]: {
        $regex: searchTerm[0],
        $options: 'i',
      },
    }));
    andConditions.push({
      $or: constraints,
    });
  }

  // Filters need $and to fulfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: {
          $all: value,
        },
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const courses = await Course.aggregate([
    // Match documents based on filters
    { $match: whereConditions },

    {
      $addFields: {
        enrolledUsersLength: { $size: '$enrolledUsers' },
      },
    },

    {
      $lookup: {
        from: 'coursetopics',
        localField: 'topics',
        foreignField: '_id',
        as: 'topics',
      },
    },

    {
      $lookup: {
        from: 'users',
        localField: 'creator',
        foreignField: '_id',
        as: 'creator',
      },
    },

    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            '$$ROOT',
            { enrolledUsersLength: '$enrolledUsersLength' },
          ],
        },
      },
    },

    {
      $sort: {
        // ...sortConditions,
        enrolledUsersLength: -1,
      },
    },

    // Pagination stages
    { $skip: skip },
    { $limit: limit },
  ]);

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
