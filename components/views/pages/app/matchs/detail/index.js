import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
//ui-material
import { Box, Button, Chip, Divider, Stack, Typography, useMediaQuery, useTheme, } from "@mui/material";
import { styled } from "@mui/material/styles";
//Tabler icon
import { IconListDetails } from "@tabler/icons-react";
//project import
import dataHandler from '@/components/api/dataHandler';
import api from '@/components/api/api';
import AlertBox from "@/components/ui-component/alert";
import CustomCard from "@/components/ui-component/cards/CustomCard";
import CustomLoadingButton from "@/components/ui-component/utilities/CustomLoadingButton";
import { MatchDetailCardContent } from "@/components/ui-component/utilities/MatchCardContent";
import useWindowDimensions from "@/components/utils/getScreenDimension";
import DialogBox from '@/components/ui-component/utilities/Dialog'
import BottomSheetDialog from '@/components/ui-component/utilities/BottomSheet'
import Logo1 from "@/components/assets//images/test/t1.png";
import { persiandate } from "@/components/utils/Lib";
import SelectTeamChip from '@/components/ui-component/utilities/SelectTeamChip'
import { showAlert } from "@/components/store/slices/alertSlice";
import IconText from '@/components/ui-component/utilities/IconText'

import  {hostAddress} from '@/components/api/api';
import { showBUTTOMSheet } from "store/bottomSheetReducer";
//-------------------------------------|  Detail Matchs and Send Request
const CustomBox = styled(Box)(({ theme, screenHeight }) => ({
    filter: blur("8px"),
    "-webkit-filter": blur("8px"),
    minHeight: screenHeight,
    position: "relative",
    paddingTop: 15,
    //backgroundImage: `url(${ScreenImage})`,
    backgroundPosition: "center" /* Center the image */,
    backgroundRepeat: "no-repeat" /* Do not repeat the image */,
    backgroundSize: "100% 100%",
    [theme.breakpoints.up("md")]: {
        //  marginRight: (drawerWidth + 20),
        //  width: `calc(100% + ${drawerWidth}px)`,
        width: `100%`,
    },
    [theme.breakpoints.down("md")]: {
        width: `100%`,
        //  height:600,
        // minWidth: `120%`,
        //  padding: '16px'
    },
    [theme.breakpoints.down("sm")]: {
        width: `100%`,
        // minWidth: `120%`,
        height: "100%",
    },
    [theme.breakpoints.up("sm")]: {
        height: "100%",
    },

    fontFamily: "orginalfont",
    "&": {
        // color: theme.palette.grey[500],
        fontFamily: "orginalfont",
        fontSize: "14",
    },
    "& .MuiTable-root ": {
        fontFamily: "orginalfont!impornat"
    },
    "& .MuiTableCell-root":
    {
        fontFamily: "orginalfont!impornat"
    }
}));
//------------------------------------------------
const BottomSheetContent = ({ onChange, guestTeamName, hostTeamName }) => {
    return (
        <>
            <Stack sx={{ p: 3 }}>
                <Typography variant={"caption"} component={"p"}>
                    {` شما در حال ارسال درخواست مسابقه با تیم `}
                    <b>{guestTeamName}</b>
                    {' به تیم '}
                    <b>{hostTeamName}</b>
                    {` می باشید درصورت تایید اطلاعات شما به جهت هماهنگی به سرپرست تیم حریف نمایش داده خواهد شد.ادامه میدهید؟`}
                </Typography>
                <Stack direction={"row"} spacing={2}>
                    <Button color={"error"} variant={"outlined"}
                        onClick={() => onChange(false)}><span>انصراف</span></Button>
                    <Button onClick={() => onChange(true)} color={"success"}
                        variant={"contained"}><span>بله </span></Button>

                </Stack>
            </Stack>
        </>
    )
}
//-----------------------------------------------| Detail Match
const DetailMatchs = ({ callRequestPage }) => {
    const theme = useTheme();
    const { match_id } = useParams();
    const dispatch = useDispatch();
    const [teamName, setTeamName] = React.useState(null)
    const [teamID, setTeamID] = React.useState(null)
    const { height, width } = useWindowDimensions();
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const [formData, setFormData] = useState({
        "match_id": "",
        "team_id": "",
        "host_team_id": "",
        "host_team_name": "",
        "guest_team_name": teamName,
        "match_time": "",
        "match_date": "",
        "match_location": "",
    })
    const getData = (team_info) => {
        const result = dataHandler(api.detailMatch(match_id), "get", "");
        try {
            result(async function (data, status) {
                //get user team info from local storage saved selecTeamChip component

                //----------------------------------------------
                console.log(data)


                setFormData({

                    "match_id": match_id,
                    "team_id": "",
                    "host_team_id": data.result.host_team["team_id"],
                    "host_logo": `${hostAddress}/${data.result.host_team.logo["logo_path"]}`,
                    "host_team_name": data.result.host_team["team_name"],
                    "guest_team_name": "",
                    "match_time": data.result["match_time"],
                    "match_date": persiandate(data.result["match_date"])[1],
                    "match_location": data.result["match_location_address"],
                    "city": data.result.city_match["city_title"],
                    "match_sport_field": data.result.match_sport["field_title"],
                    "province": data.result.province_match["province_title"],
                    "description": data.result["description"],
                    "createdAt": data.result["createdAt"],
                    "viewer_count": data.result["viewer_count"]
                })

            })
        } catch (error) {


        }

    }
    const sendData = (body) => {

        const result = dataHandler(api.createMatchRequest(2), "post", formData);


        try {
            result(async function (data, status) {


                setDialogOpen(false)
                if (status)
                    dispatch(showAlert("عملیات موفقیت آمیز",
                        "success"))
                else dispatch(showAlert(data.response.data.message,
                    "error"))


            })
        } catch (error) {
            dispatch(showAlert("خطایی رخ داده",
                "error"))

        }
    }
    const requestButtononClick = () => {
        try {
            const team_info = localStorage.getItem("team_info")


            if (team_info) {

                const jsonObj = JSON.parse(team_info);
                const thisTeamID = jsonObj['team_id']
                const thisTeamName = jsonObj['team_name']
                setTeamID(thisTeamID);
                setTeamName(thisTeamName);
                setFormData(prev => ({ ...prev, ["team_id"]: thisTeamID }));
                setFormData(prev => ({ ...prev, ["guest_team_name"]: thisTeamName }));
                if (thisTeamID && thisTeamName) {
                }
            }
            else {
                dispatch(showAlert("تیم خود را انتخاب نمایید",
                    "error"))

            }
        } catch (err) {
            console.log(err)
        }
    }
    const dilogHandler = (event) => {
        if (event === false)//dont accept dialog question
        {
            setDialogOpen(false)
        } else {

            //accept dialpg question
            sendData()

        }

    }
    React.useEffect(() => {
        getData();
    }, [])
    React.useEffect(() => {
        if (teamName && teamID) {
            dispatch(showBUTTOMSheet(
                <BottomSheetContent hostTeamName={formData.host_team_name}
                    guestTeamName={teamName}
                    onChange={(e) => dilogHandler(e)} />, "ارسال درخواست مسابقه", "30%"))
            setTeamID("")
        }

    }, [teamID])
    return (
        <>

           

               
                            <Box sx={{p:1}}>

                                <MatchDetailCardContent
                                    createDate={formData["createdAt"]}
                                    matchId={formData["match_id"]}
                                    //sendRequestDate={"در روز پیش"}
                                    
                                    hostTeamName={formData["host_team_name"]}
                                    logoHost={formData["host_logo"]}
                                    rateHost={0}
                                    rateGuest={0}
                                    description={formData["description"]}
                                    //logoGuest={Logo2}
                                    //guestTeamN={"ستارگان"}
                                    matchSport={formData["match_sport_field"]}
                                    dateMatch={formData["match_date"]}
                                    timeMatch={formData["match_time"]}
                                    location={formData["match_location"]}
                                    city={formData["city"]}
                                    province={formData["province"]}
                                />
                              
                            </Box>
                        
                    

               
            {
                !callRequestPage ? <Box sx={{ mb: '4rem', p: 2 }}>
                    <CustomLoadingButton

                        color="orange"
                        inColor={theme.palette.grey[50]}
                        padding={1}
                        variant="contained"
                        onChange={(event) => requestButtononClick()}
                    >
                        <span>درخواست بازی</span>
                    </CustomLoadingButton>


                </Box> : <></>
            }

        </>
    );
};

export default DetailMatchs;
