import React, { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/Form';
import LargeHeading from '../ui/LargeHeading';
import RichTextEditor from '../ui/RichTextEditor';
import { Button } from '../ui/Button';
import { useAppSelector } from '@/redux/store';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Paragraph from '../ui/Paragraph';
import { IAskResponse } from '@/types/courseAsk/response';
import { trpc } from '@/app/_trpc/client';
import { toast } from '../ui/Toast';
import { UseTRPCQueryResult } from '@trpc/react-query/dist/shared';

const AskResponseForm = ({
  topic,
  version,
}: {
  topic: string;
  version: number;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const responseSchema = z.object({
    answer: z
      .string()
      .min(10, { message: 'Response must be minimum 10 characters' })
      .max(20000, { message: 'Response must be maximum 20000 characters' })
      .trim(),
  });

  const form = useForm<z.infer<typeof responseSchema>>({
    resolver: zodResolver(responseSchema),
    mode: 'onChange',
  });

  const responses = trpc.getAskResponses.useQuery({
    topic,
    version,
  });

  const createAskResponse = trpc.createAskResponse.useMutation({
    onSettled: () => {
      responses.refetch();
    },
  });

  const onSubmit = async (data: { answer: string }) => {
    if (!signedInUser || isLoading) return;

    setIsLoading(true);

    const ask: Partial<IAskResponse> = {
      author: signedInUser?.id!,
      topic,
      version,
      answer: data.answer,
    };

    try {
      await createAskResponse.mutateAsync(ask);
      form.reset();
      toast({
        title: 'Success',
        type: 'success',
        message: 'Response created successfully',
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Something went wrong',
        type: 'error',
        message: 'please Try again later',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Paragraph className="text-start font-bold text-md">
        Your Answer
      </Paragraph>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormControl>
                  <RichTextEditor description={''} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AskResponseForm;
