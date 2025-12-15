import * as React from "react";
//ui-material
import {Box,Avatar, Button, ButtonGroup, Chip, Divider, Grid, Stack, Typography, useTheme} from "@mui/material";
import {styled} from "@mui/material/styles";
import MainCard from "ui-component/cards/MainCard_pre";
//tabler icon
import {IconHeart} from "@tabler/icons-react"
//project import
import dataHandler from "api/dataHandler";
import api from "api/api";
import Contents from './contents'
import {hideAlert} from "../../../../../../../../../app/store/alertReducer";

const ContentList=({userInfo,uid})=>
{
    const [content,setContents]=React.useState([])
    //----------------------------| functions |-----------------------------
    const getData=()=>
    {
        const queryParams = new URLSearchParams(location.search);
        const team_id= queryParams.get('tid')
        const result = dataHandler(api.listContent(uid,team_id,'team'), "get", "");

        try {
            result(async function (data, status)
            {
                console.log(data)
                if(status)
             setTimeout(() => {
                   setContents(data.result.data)
                }, 2000);


            })
        } catch (error) {
            //error handle here

        }
    }

    //----------------------------------------------------------------------
    React.useEffect(()=>{
        if(content.length===0)
            getData()
        console.log(content)
    },[])
    return(<>
        <Box sx={{p:1}}>

       <Contents  contents={content}/>
            </Box>
        </>)
}
export default ContentList