import { useEffect, useState } from 'react';

// material-ui
import { Grid,Box, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// project imports

import { gridSpacing } from 'store/constant';
const LableBox = styled(Box)(({ theme }) => ({
    background:theme.palette.primary[200],
    color:`${theme.palette.primary}!important`,
     width:"100%",
     opacity:0.8,
     fontSize:"12px!important",
     borderRadius:10,
     padding:6,
     border:'1px solid',
     borderColor:theme.palette.primary[800],
     boxShadow:theme.shadows[1]

}))
//=============================================================TitleBox
const TitleBox=(props)=>
{
    const theme=useTheme();
    return(
        <>
     
   <LableBox>
    <Typography  >
        {props.title}
    </Typography>
   </LableBox>
      

        </>
    )
}
export default TitleBox;