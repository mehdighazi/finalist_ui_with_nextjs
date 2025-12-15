import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from 'react-router-dom';

//ui-material
import {
  Box,
  useTheme,
  useMediaQuery,
  Link,
  Fab,
  Breadcrumbs,
  Typography,
 

} from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { styled } from "@mui/material/styles";
//-----------------------------------------------------BreadCrumbs------------------------------------------
const BreadCrumbs =(props)=>
{
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" >
          {props.pageTitle}
        </Link>
      ];
      return (
       
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {'breadcrumbs'}
          </Breadcrumbs>
       
      );
    
}
export default BreadCrumbs