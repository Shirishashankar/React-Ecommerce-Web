import React from 'react'
import { Rating } from '@mui/material';
const Ratings = ({ value }) => {
    value = +value;
  return (
    <Rating
            name="simple-controlled"
            value={value ? value : 0}
        />
  )
}

export default Ratings
