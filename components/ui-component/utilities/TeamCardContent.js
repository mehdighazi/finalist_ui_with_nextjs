import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar  from 'ui-component/extended/Avatar';
//ui-material
import {
  Grid,
  Box,
  Typography,
  useTheme,
  MenuItem,
  Divider,
  Select,
  Container,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Rating,
  // Breadcrumbs
} from "@mui/material";

//project import

import DefaultLogo from 'assets/images/screen/defaultlogo.png'
import CustomRating from "ui-component/rating";
//Tabler icon
import { IconFilter,IconCalendar,IconMapPin } from "@tabler/icons-react";

//jalali datapicker
import { DatePicker } from "zaman";
const TeamBox=({title,logo,color,rating})=>
{
    return(<>
    <Box sx={{
        pl: 5, pr: 3, align: 'center', minWidth: "100%",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100hv",
        display: 'flex',
    }}>
    <Stack sx={{alignItems:"center",
    justifyContent:"center",}}>
         <Avatar size='md' src={logo}/>
         <Typography align="center" sx={{m:1}} component="div" variant="h5">
         {title}
         
    </Typography>
    <CustomRating size="small" name="read-only" value={rating} readOnly />
    </Stack>
    </Box>
    </>)

}
const TeamCardContent = ({
    title,
    city,
    logo,
    location,
    rate,
    nameTeam
    
  }) => {
    const theme = useTheme();
    return (
      <>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <TeamBox
              rating={!rate ? 0 : rate}
              logo={!logo ? DefaultLogo : logo}
              title={nameTeam}
              color={"green"}
            />
          </Grid>
         
        
        </Grid>
      </>
    );
  };
  export default TeamCardContent;