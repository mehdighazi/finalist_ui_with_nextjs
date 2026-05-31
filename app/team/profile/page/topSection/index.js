import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
//ui-material
import { Box,Button, ButtonGroup, Chip, Divider, Grid, Stack, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import MainCard from "ui-component/cards/MainCard_pre";
//tabler icon
import { IconHeart, IconUserCheck, IconPlus } from "@tabler/icons-react"
//project import
import AnimatedButton from 'ui-component/extended/AnimateButton'
import CustomAvatar from 'ui-component/extended/Avatar'
import DefaultAvatar from 'assets/images/screen/default-avatar.jpg'
import BOTTOMSheet from '@/components/ui-component/utilities/BottomSheet'
import Content from './addContent'
import { GetFileButtonWithCrop, Fileuploader } from '@/components/ui-component/utilities/uploadfile'
import { showAlert } from "@/components/store/slices/alertSlice";
import { showBottomSheet, hideBottomSheet } from "@/components/store/slices/bottomSheetSlice";
import { hostAddress } from 'api/api'
import ProfileSkeleton from 'ui-component/cards/Skeleton/profile'
import api from 'api/api'
import dataHandler from 'api/dataHandler'
import TopSectionUnified from "@/components/ui-component/utilities/profilePageTopSection";

const teamProfileTopSection=({ teamInfo })=>
{
     const queryParams = new URLSearchParams(location.search);
   return (<>
        <TopSectionUnified
            type="team"
            info={teamInfo}
            id={ queryParams.get('tid')}  
            hostAddress={hostAddress}
        />

    </>)

}

export default teamProfileTopSection