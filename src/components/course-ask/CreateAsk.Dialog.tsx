import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog';
import { Button } from '../ui/Button';
import { FcQuestions } from 'react-icons/fc';
import { BsFillQuestionOctagonFill } from 'react-icons/bs';
import CourseAskForm from './CourseAsk.Form';

const CreateAskDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="flex space-x-1 items-center">
        <Button className="flex items-center space-x-2">
          <p>Ask a Question</p>
          <BsFillQuestionOctagonFill className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-100 dark:bg-gray-950 border-slate-300 dark:border-gray-800 max-w-3xl w-full p-2 md:px-8 py-8 mx-auto">
        <div className="w-full">
          <CourseAskForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAskDialog;
