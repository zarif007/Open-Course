'use client';

import React, { useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import LargeHeading from '../ui/LargeHeading';
import { ICourse } from '@/types/course';
import { Button } from '../ui/Button';
import axios from 'axios';
import { nextApiEndPoint } from '@/utils/apiEndpoints';
import { toast } from '../ui/Toast';
import Paragraph from '../ui/Paragraph';
import { useAppSelector } from '@/redux/store';
import { Textarea } from '../ui/Textarea';
import { LucideHeartHandshake } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseReviewSchema } from '@/validations/courseReview';
import { z } from 'zod';
import { IUser } from '@/types/user';
import { FaStar } from 'react-icons/fa6';
import { Skeleton } from '../ui/Skeleton';
import { ICourseReview } from '@/types/courseReview';

const StarDrawing = (
  <path
    d={`M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 
  14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z`}
  ></path>
);

export default function CourseReviewTaker({ course }: { course: ICourse }) {
  const [isAlreadyReviewed, setIsAlreadyReviewed] = useState<
    'loading' | 'no' | { rating: number; comment: string }
  >('loading');

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  useEffect(() => {
    if (!course.id || !signedInUser?.id) return;

    const getReview = async () => {
      try {
        const { data } = await axios.get(
          `${nextApiEndPoint}/courseReview?courseId=${course.id}&userId=${signedInUser.id}`
        );
        if (data.data.rating) {
          setIsAlreadyReviewed({
            comment: data.data.comment,
            rating: data.data.rating,
          });
        } else {
          setIsAlreadyReviewed('no');
        }
      } catch (error) {
        console.log(error);
        setIsAlreadyReviewed('no');
      }
    };

    getReview();
  }, [course, signedInUser]);

  return (
    <div className="mx-auto my-16 w-[75%] md:w-[50%]">
      {typeof isAlreadyReviewed === 'string' ? (
        isAlreadyReviewed === 'loading' ? (
          <Skeleton className="w-full h-40" />
        ) : (
          <ReviewTakingForm
            course={course}
            setIsAlreadyReviewed={setIsAlreadyReviewed}
          />
        )
      ) : (
        <CurrentUserReview
          rating={isAlreadyReviewed.rating}
          comment={isAlreadyReviewed.comment}
        />
      )}
    </div>
  );
}

const ReviewTakingForm = ({
  course,
  setIsAlreadyReviewed,
}: {
  course: ICourse;
  setIsAlreadyReviewed: React.Dispatch<
    React.SetStateAction<
      | 'loading'
      | 'no'
      | {
          rating: number;
          comment: string;
        }
    >
  >;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const form = useForm<z.infer<typeof courseReviewSchema>>({
    resolver: zodResolver(courseReviewSchema),
    mode: 'onChange',
    defaultValues: {
      user: signedInUser?.id,
      courseId: course?.id,
      rating: 1,
      comment: '',
    },
  });

  const customStyles = {
    itemShapes: StarDrawing,
    activeFillColor: '#f43f5e',
    inactiveFillColor: '#fda4af',
  };

  const handleSubmit = async (data: z.infer<typeof courseReviewSchema>) => {
    if (isLoading || !signedInUser?.id || !course.id) return;

    setIsLoading(true);

    try {
      const review: ICourseReview = {
        courseId: course.id,
        user: signedInUser.id,
        comment: data.comment!,
        rating: data.rating!,
      };

      const { data: response } = await axios.post(
        `${nextApiEndPoint}/courseReview`,
        review
      );

      setIsAlreadyReviewed({
        comment: response.data.comment,
        rating: response.data.rating,
      });

      toast({
        title: 'Success',
        message: `Rated successfully`,
        type: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error',
        message: `Something went wrong`,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <LargeHeading size="sm" className="">
        Rate this course
      </LargeHeading>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormControl>
                  <div className="flex space-x-2 items-center justify-center my-3">
                    <Rating
                      {...field}
                      style={{ maxWidth: 220 }}
                      itemStyles={customStyles}
                      value={field.value ?? 0}
                      onChange={field.onChange}
                    />
                    <p className="font-bold p-2 px-3 rounded bg-slate-300 dark:bg-gray-800">
                      {field.value}
                    </p>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Write something nice!!!"
                    className="font-semibold"
                    onChange={field.onChange}
                    defaultValue={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="my-6 w-full flex justify-center items-center space-x-2"
            isLoading={isLoading}
          >
            <p>Submit</p>
            <LucideHeartHandshake className="w-6 h-6" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

const CurrentUserReview = ({
  rating,
  comment,
}: {
  rating: number;
  comment: string;
}) => {
  return (
    <React.Fragment>
      <div className="flex items-center justify-center space-x-2 my-3 text-rose-500">
        <Paragraph className="font-semibold text-center">
          You have rated {rating}
        </Paragraph>
        <FaStar />
      </div>

      <p className="font-semibold text-start text-rose-500">You Comment</p>
      <p className="font-medium text-start text-sm">{comment}</p>
    </React.Fragment>
  );
};
