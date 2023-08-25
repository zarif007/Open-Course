import React from 'react'
import Paragraph from './ui/Paragraph'
import {Snippet} from "@nextui-org/react";


const CourseUrl = ({ url }: { url: string}) => {
  return ( 
    <div className='w-fit mx-auto mt-24 px-6 py-4 flex justify-center my-auto bg-slate-300 dark:bg-gray-800 rounded'>
        <Paragraph className="font-semibold text-lg truncate-text-1-line">{url}</Paragraph>
    </div>
  )
}

export default CourseUrl