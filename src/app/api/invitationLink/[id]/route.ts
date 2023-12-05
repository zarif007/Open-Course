import { connectToRedis } from '@/lib/connectToRedis';
import IInvitationLink from '@/types/invitationLink';
import { nextApiEndPoint } from '@/utils/apiEndpoints';
import axios from 'axios';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

interface PageParams {
  params: {
    id: string;
  };
}

export const GET = async (req: NextRequest, { params }: PageParams) => {
  try {
    const redis = connectToRedis();
    const data: IInvitationLink | null = await redis.get(params.id);

    if (!data || data.maxCapacity <= 0) {
      return NextResponse.json({
        status: !data ? 404 : 403,
        message: !data ? 'Invitation link is expired' : 'Seat limit exceeded',
        data: null,
      });
    }

    return NextResponse.json({ data, message: null, status: 200 });
  } catch {
    return NextResponse.json({
      data: null,
      message: 'Something went wrong, please try again later',
      status: 505,
    });
  }
};

export const PUT = async (req: NextRequest, { params }: PageParams) => {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({
      status: 401,
      message: 'Unauthorized: Login required',
    });
  }

  try {
    const redis = connectToRedis();

    const data: IInvitationLink | null = await redis.get(params.id);

    if (!data || data.maxCapacity <= 0) {
      return NextResponse.json({
        status: !data ? 404 : 403,
        message: !data ? 'Invitation link is expired' : 'Seat limit exceeded',
        data: null,
      });
    }

    const updated = {
      ...data,
      maxCapacity: data.maxCapacity - 1,
    };
    const currentTTL = await redis.ttl(params.id);

    await redis.setex(params.id, currentTTL, updated);

    return NextResponse.json({ data: updated, message: null, status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      data: null,
      message: 'Something went wrong, please try again later',
      status: 505,
    });
  }
};
