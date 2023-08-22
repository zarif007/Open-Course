import { cn } from '@/lib/utils';
import React from 'react'

const ErrorMessage = ({ text, className, ...props }: { text: string | undefined, className: string | undefined }) => {
    if (!text) return null;
    return <div {...props} className={cn('text-red-600 font-sm font-semibold', className)}>{text}</div>;
  };
  
export default ErrorMessage