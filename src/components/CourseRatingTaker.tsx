'use client'

import React, { useState } from "react";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'


export default function CourseRatingTaker(){
    const [rating, setRating] = useState(1);

    
    return <Rating
    style={{ maxWidth: 180 }}
    value={rating}
    onChange={setRating}
  />
}