import * as React from "react";
import { Rating } from "@mui/material";

interface CustomRatingProps {
    rate?: number | null;
}

const CustomRating: React.FC<CustomRatingProps> = ({ rate }) => (
    <Rating
        size="small"
        name="read-only"
        sx={{
            '& .MuiRating-icon': {
                fontSize: '16px', // یا حتی کوچک‌تر مثل '12px'
            },
        }}
        value={rate ?? 0}
        readOnly
    />
);

export default CustomRating;