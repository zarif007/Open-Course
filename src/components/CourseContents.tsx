import React from 'react'

const CourseContents = () => {
  return (
    <section className="w-full max-w-5xl mx-auto">
        <div className="my-3">
            {Array(100)
            .fill(0)
            .map((elm, index) => (
                <p key={index}>{elm}</p>
            ))}
        </div>
    </section>
  )
}

export default CourseContents