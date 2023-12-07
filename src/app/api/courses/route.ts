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
  try {
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

    // Filters needs $and to full fill all the conditions
    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: {
            $all: value,
          },
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
        path: 'topics',
        model: CourseTopic,
        select:
          'versions.type versions.data.title versions.data.description versions.data.source versions.data.duration',
      })
      .populate({
        path: 'creator',
        model: User,
        select: 'name image userName',
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
  } catch (error) {
    let status = 500;
    let message = 'Internal server error';
    if (error instanceof z.ZodError) {
      status = 422;
      message = error.issues.join('');
    }
    return NextResponse.json({
      data: null,
      status,
      message,
      success: false,
    });
  }
};
