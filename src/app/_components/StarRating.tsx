import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { StarLabels } from './utils/helpers';
import { Dispatch, SetStateAction, useState } from 'react';

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${StarLabels[value]}`;
}

export default function HoverRating({
  rating,
  setRating,
}: {
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
}) {
  const [hover, setHover] = useState(-1);

  return (
    <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
      <Rating
        name="hover-feedback"
        value={rating}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setRating(newValue || 3);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {rating !== null && (
        <Box sx={{ ml: 2 }}>{StarLabels[hover !== -1 ? hover : rating]}</Box>
      )}
    </Box>
  );
}
