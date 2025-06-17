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

  const { isAIGenerated, ...otherFilters } = filtersData;

  if (isAIGenerated) {
    const isAIGeneratedValue = isAIGenerated[0];

    if (isAIGeneratedValue === 'true') {
      andConditions.push({
        isAIGenerated: true,
      });
    } else if (isAIGeneratedValue === 'false') {
      andConditions.push({
        $or: [{ isAIGenerated: false }, { isAIGenerated: { $exists: false } }],
      });
    }
  }

  if (Object.keys(otherFilters).length) {
    andConditions.push({
      $and: Object.entries(otherFilters).map(([field, value]) => ({
        [field]: {
          $all: value,
        },
      })),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const pipeline: any[] = [];

  if (Object.keys(whereConditions).length > 0) {
    pipeline.push({ $match: whereConditions });
  }

  pipeline.push({
    $addFields: {
      enrolledUsersCount: { $size: { $ifNull: ['$enrolledUsers', []] } },
    },
  });

  const sortStage: any = {
    enrolledUsersCount: -1,
  };

  if (sortBy && sortOrder) {
    const mongoSortOrder = sortOrder === 'desc' || sortOrder === -1 ? -1 : 1;
    sortStage[sortBy] = mongoSortOrder;
  }

  pipeline.push({
    $sort: sortStage,
  });

  pipeline.push({ $skip: skip });
  pipeline.push({ $limit: limit });

  pipeline.push({
    $lookup: {
      from: 'coursetopics',
      localField: 'topics',
      foreignField: '_id',
      as: 'topics',
      pipeline: [
        {
          $project: {
            updatedAt: 1,
            'versions.type': 1,
            'versions.data.title': 1,
            'versions.data.description': 1,
            'versions.data.source': 1,
            'versions.data.duration': 1,
          },
        },
      ],
    },
  });

  pipeline.push({
    $lookup: {
      from: 'users',
      localField: 'creator',
      foreignField: '_id',
      as: 'creator',
      pipeline: [
        {
          $project: {
            name: 1,
            image: 1,
            userName: 1,
          },
        },
      ],
    },
  });

  pipeline.push({
    $addFields: {
      creator: { $arrayElemAt: ['$creator', 0] },
    },
  });

  pipeline.push({
    $project: {
      enrolledUsersCount: 0,
    },
  });

  const courses = await Course.aggregate(pipeline);
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
