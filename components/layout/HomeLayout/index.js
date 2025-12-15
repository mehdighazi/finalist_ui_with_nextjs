import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from 'react-router-dom';

//ui-material
import {
  CardContent,
  Card,
  Grid,
  Box,
  Button,
  FormControl,
  Typography,
  useTheme,
  Avatar,
  OutlinedInput,
  MenuItem,
  Paper,
  Breadcrumbs,
  Link,
  Divider,
  Tab, Tabs,
  IconButton,
  Select,
  TextField,
  useMediaQuery,
  Stack,
  Fab 

} from "@mui/material";
import { styled } from "@mui/material/styles";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SvgIcon from '@mui/material/SvgIcon';
//assest
import { ReactComponent as MatchsIcon }  from 'assets/images/icons/matchs.svg';



//-------------------
//Bottom Navigation
//marginLayout is margin sides in mainlayout that is 30%
const MarginLayout="39.99%";
//.MuiBottomNavigationAction-root
const CustomFab = styled(Fab)(({ theme }) => ({
padding:32,
backgroundColor:theme.palette.orange.light,
fontSize:16,
marginBottom:20
}));

function SimpleBottomNavigation() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const elemSX={
        color:theme.palette.orange.main,
    }
    return (
      <Box sx={{position:"fixed",bottom:5,minWidth:matchUpMd?MarginLayout: "100%"}} >
   
        <BottomNavigation
        sx={{backgroundColor:theme.palette.grey[800],minWidth:"100%",bottom:0}}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction  label="منو" sx={elemSX} icon={<RestoreIcon  />} />
          <BottomNavigationAction label={<span>علاقه مندی</span>} sx={elemSX} icon={<LocationOnIcon />} />
          <BottomNavigationAction label="Nearby"  sx={elemSX}icon={<CustomFab><SvgIcon sx={{fontSize:32}} component={MatchsIcon} inheritViewBox /></CustomFab>} />
          <BottomNavigationAction label="Nearby"  sx={elemSX}icon={<LocationOnIcon />} />
          <BottomNavigationAction label="Nearby" sx={elemSX}  icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Box>
    );
  }

const Home=()=>
{
    return(<>
    
<SimpleBottomNavigation/>
<Outlet/>
    </>)
}
export default Home;
