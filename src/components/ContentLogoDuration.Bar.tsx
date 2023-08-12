import { ICourseTopic } from '@/types/courseTopic'
import { getFavicon } from '@/utils/getFavicon'
import React from 'react'

const ContentLogoDurationBar = ({ topics }: { topics: ICourseTopic[] }) => {
  const totalDuration = () => {
    let duration = 0;
    topics.map(topic => {
      duration += topic.versions[topic.versions.length - 1].duration
    })
    const inMin = parseInt((duration % 60).toFixed(0));
    const inHr = parseInt((duration / 60).toFixed(0));
    return `${inHr !== 0 && `${inHr}h `}${inMin}m`
  }
  return (
    <div className='flex justify-between items-center'>
        <div className="flex">
          {
              topics.slice(0, 6).map((topic, index) => (
                  <img key={index} className={`h-7 w-7 rounded-full border-2 border-rose-500 ${index !== 0 && '-ml-2'}`} src={getFavicon(topic.versions[topic.versions.length - 1].url)} alt="logo" />
              ))
          }
        </div>
        <p className="font-semibold text-gray-500">{totalDuration()}</p>
    </div>
  )
}

export default ContentLogoDurationBar