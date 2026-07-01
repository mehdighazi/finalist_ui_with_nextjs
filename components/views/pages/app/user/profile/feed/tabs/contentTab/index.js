import * as React from "react";
//ui-material
import {Box,Avatar, Button, ButtonGroup, Chip, Divider, Grid, Stack, Typography, useTheme} from "@mui/material";
import {styled} from "@mui/material/styles";
import MainCard from "@/components/ui-component/cards/MainCard_pre";
//tabler icon
import {IconHeart} from "@tabler/icons-react"
//project import
import dataHandler from '@/components/api/dataHandler';
import api from '@/components/api/api';
import Contents from './contents'
import {hideAlert} from "../../../../../../../../../app/store/alertReducer";

const ContentList=({userInfo,uid})=>
{
    const [content,setContents]=React.useState([])
    const hasFetchedData = React.useRef(false);
    //----------------------------| functions |-----------------------------
    const getData=()=>
    {
        const result = dataHandler(api.listContent(uid,"",'user'), "get", "");

        try {
            result(async function (data, status)
            {
                
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
        if (!hasFetchedData.current) { // فقط اگر داده‌ها قبلاً دریافت نشده‌اند
            getData();
            hasFetchedData.current = true; // علامت گذاری که داده‌ها دریافت شده‌اند
        }
    },[])
    return(<>
        <Box sx={{p:1}}>
       <Contents userInfo={userInfo} uid={uid} contents={content}/>
            </Box>
        </>)
}
export default ContentList