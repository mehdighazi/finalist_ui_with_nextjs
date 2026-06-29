import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
//ui-material
import { Button, ButtonGroup, Chip, Divider, Grid, Stack, Typography, useTheme, Paper, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import MainCard from "ui-component/cards/MainCard_pre";
//tabler icon
import { IconHeart, IconPlus, IconUserCheck } from "@tabler/icons-react"
//project import
import TopSectionUnified from "@/components/ui-component/utilities/profilePageTopSection";
import { hostAddress} from '@/components/api/api'

//Content Sections
/*
/---------------
1-Profile Image
2-FullName
3-Follower
4-
 */
const CardWrapper = styled(MainCard)(({ theme }) => ({
    // backgroundColor: theme.palette.grey[100],
    border: "1px solid",
    borderColor: theme.palette.grey[100],
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 0,
    height: 150


}));


const TopSection = ({ userInfo, userID }) => {
    return (<>
        <TopSectionUnified
            type="user"
            info={userInfo}
            id={userID}  
            hostAddress={hostAddress}
        />

    </>)

}
export default TopSection