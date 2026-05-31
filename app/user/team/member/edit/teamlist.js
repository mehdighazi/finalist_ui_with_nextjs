import * as React from "react";
import {useState} from "react";
import {Outlet,Redirect,useNavigate } from 'react-router-dom';
//ui-material
import {
    Box,
  
    Stack,
    Typography,
    useTheme
} from "@mui/material";

//project import
import "./style.css"
import {styled} from "@mui/material/styles";
import SelectTeamCard from '@/components/ui-component/utilities/SelectTeamCard'
import teamPng from 'assets/images/screen/team.png'
import defaultLogo from 'assets/images/screen/defaultlogo.png'
import CustomRating from "ui-component/rating";
//DataHandling
import api from 'api/api'
import dataHandler from 'api/dataHandler'
import Avatar from "ui-component/extended/Avatar";

//--------------------------------------|Step 1|---------------------------------------------------

const TeamBox = ({title, logo, color, rating}) => {
    return (<>
        <Box sx={{
            p:2,
            align: 'right',
            justifyContent: "right",
            //minHeight: "100hv",
            display: 'flex',
            alignItems: 'flex-start',
            background:"#e2e2e2"
        }}>
            <Stack sx={{
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Avatar size='md' src={logo}/>
                <Typography align="center" variant="h5">
                    {title}
                </Typography>
                <CustomRating size="small" name="read-only" value={rating} readOnly/>
            </Stack>
        </Box>
    </>)

}

//-----------------------------------------------------------------------
 
const formconstrolStyle = {
    direction: "rtl", minWidth: "100%", border: "1px solid #e2e2e2 ", borderStyle: "dashed", pt: 2, mt: 1,
}
const Teamlist = (props) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const selectedHandler=(e)=>
    {
     
        const {value,name}=e
        navigate(`list/${value}`)

    }
    return (<>
        <Box sx={{minWidth: "100%",p:3}}>
        <SelectTeamCard onChange={(e)=>selectedHandler(e)} userTeam={props.userTeam??[]}/>
        </Box>

    </>)
}
export default Teamlist