import {
   
    Rating,
    
} from "@mui/material";
 const CustomRating=({rate})=>
 (
   <Rating size="small" name="read-only" sx={{
                       '& .MuiRating-icon': {
                           fontSize: '16px', // یا حتی کوچک‌تر مثل '12px'
                       },
                   }} value={rate??0} readOnly />
 )
 export default CustomRating