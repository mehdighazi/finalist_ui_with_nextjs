import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
// UI Material
import {Paper, Box, Divider, Stack, TextField, Typography, useTheme, styled, Button } from "@mui/material";
import { AccessTime, CalendarMonth, Festival, LocationCity, PinDrop, Comment } from "@mui/icons-material";

//tabler icon 
import { IconChecklist } from '@tabler/icons-react'
// ابزار پروژه
import "../style.css";
import  {hostAddress} from '@/components/api/api';;
import IconText from '@/components/ui-component/utilities/IconText'
import MainCard from "@/components/ui-component/cards/MainCard_pre";
import { persiandate, StartDate4MYSQL } from "@/components/utils/Lib";
import { TeamBox } from "@/components/ui-component/utilities/MatchCardContent";
import DefaultAvatar from "@/components/assets//images/screen/default-avatar.jpg";
import { CustomTextField } from "@/components/ui-component/utilities/inputs";
import PopperCalender from '@/components/ui-component/utilities/PopperCalender'
import TimeSwipPicker, { PopperTimePicker } from "@/components/ui-component/utilities/TimeSwipPicker";
import { showBottomSheet, hideBottomSheet } from "@/components/store/slices/bottomSheetSlice";
import ProvinceCitySelector from '@/components/ui-component/utilities/ProvinceCitySelector'
import { MainCardWrapper } from "@/components/ui-component/cards/MainCardWrapper";

// CustomBox استایل برای باکس‌ها
//--------------------------------------| MainCard Wrapeer |------------------------------
const CustomBox = styled(Paper)(({ theme }) => ({
  minWidth: "100%",
  marginTop: 0,
  padding: 10,
 // background: theme.palette.grey[50],
 marginBottom:40
}));
const Step1 = (props) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [calendarValue, setCalendarValue] = useState(null);
    const [timeValue, setTimeValue] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorTimePickerEl, setAnchorTimePickerEl] = useState(null);
    const IconColor = theme.palette.grey[400]
    const TextColor = theme.palette.grey[600]
    const handleDatePickerOnClick = (event, textField) => {
        // setTextField(textField)
        setAnchorEl(anchorEl ? null : event.currentTarget); // باز و بسته کردن منو
    };
    const handleDatePickerClose = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);

    };
    const handleTimePickerOnClick = (event, textField) => {
        // setTextField(textField)
        setAnchorTimePickerEl(anchorTimePickerEl ? null : event.currentTarget); // باز و بسته کردن منو
    };
    const handleTimePickerClose = () => {

        setAnchorTimePickerEl(null);

    };
    const handleLocationOnchange = (e) => {

        dispatch(hideBUTTOMSheet())
        props.onChange({ name: "match_province_id", value: e.province_id });
        props.onChange({ name: "match_city_id", value: e.city_id });
        props.setTeamLocation(`${e.province_title}/${e.city_title}`);

    }
    return (
        <CustomBox sx={{ minWidth: "100%", marginBottom: 10 }}>
          
                <MainCardWrapper
                    border={false}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                       // background: theme.palette.grey[100]
                    }}
                >

                    <TeamBox title={props.selectedTeam.team_name}
                        logo={props.selectedTeam.logo ? `${hostAddress}/${props.selectedTeam.logo.logo_path}` : DefaultAvatar}>

                    </TeamBox>

                </MainCardWrapper>
           
            <Box>
                <Typography align={"right"} sx={{ fontWeight: 200, mt: 2, color: IconColor }}>
                    <IconText fontSize={14} icon={<IconChecklist />} color={TextColor} text={" اطلاعات مسابقه"} />
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ mt: 1, p: 0.5 }} >
                <Typography align={"right"} sx={{ fontWeight: 200, mt: 1 }}>
                    <IconText text_pt={0.5} fontSize={12} icon={<CalendarMonth sx={{ color: IconColor }} />} color={TextColor} text={"تاریخ برگزاری"} />
                </Typography>
                <PopperCalender anchorEl={anchorEl} handleClose={handleDatePickerClose} onChange={(e) => {
                    props.onChange({ name: "match_local_date", value: persiandate(e) });
                    props.onChange({ name: "match_date", value: StartDate4MYSQL(e) });
                    setCalendarValue(persiandate(e)[1])
                }} />
                <Box onClick={(e) => handleDatePickerOnClick(e, 'startDate')} sx={{ p: 0.5 }}>
                    <CustomTextField value={calendarValue} readOnly={true} placeHolder={"جهت انتخاب تاریخ کلیک کنید"} />
                </Box>
            </Box>
            <Box>
                <Typography align={"right"} sx={{ fontWeight: 200, mt: 1 }}>
                    <IconText fontSize={12} icon={<AccessTime sx={{ color: IconColor }} />} color={TextColor} text={"زمان برگزاری"} />
                </Typography>
                <Box onClick={(e) => handleTimePickerOnClick(e, 'startDate')} sx={{ p: 0.5 }}>
                    <CustomTextField fontFamily="numberfarsi" fontSize={14} value={timeValue} readOnly={true} placeHolder={"جهت انتخاب ساعت کلیک کنید"} />
                </Box>
                <PopperTimePicker anchorEl={anchorTimePickerEl} handleClose={handleTimePickerClose}
                    onChange={(e) => {
                        props.onChange({ name: "match_time", value: `${e.hour}:${e.minute}` })
                        setTimeValue(`${e.hour}:${e.minute}`)
                    }
                    } />
            </Box>

            <Box>
                <Typography align={"right"} sx={{ fontWeight: 200, mt: 0.5, color: IconColor }}>
                    <IconText text_pt={0.5} fontSize={12} icon={<PinDrop />} color={TextColor} text={"محل برگزاری"} />
                </Typography>
            </Box>

            <Typography color={"secondary"} variant={"subtitle2"} fontSize={12} align="right" sx={{ pt: 0.2, mr: 2 }}>
                <Button sx={{ fontFamily: "orginalfont", fontSize: 12 }} onClick={() => dispatch(showBUTTOMSheet(<ProvinceCitySelector
                    onChange={(e) => { handleLocationOnchange(e) }} />, "انتخاب شهر", ""))}>{`(${props.teamLocation})`} </Button>

            </Typography>

            <CustomTextField fontFamily={"orginalfont"} fontSize={14} placeHolder={"آدرس دقیق محل برگزاری مسابقه"} onChange={(e) =>
                props.onChange({ name: "match_location_address", value: `${e}` })
            }></CustomTextField>
            <Box>
                <Typography align={"right"} sx={{ fontWeight: 200, mt: 1, color: IconColor }}>
                    <IconText text_pt={0.2} fontSize={12} icon={<Comment />} color={TextColor} text={"توضیحات "} />
                </Typography>
            </Box>
            <Box sx={{ mb: 6, p: 0.5 }}>
                <CustomTextField fontSize={14} fontFamily={"orginalfont"} placeHolder={"توضیحاتی اضافی از قبیل شرایط زمانی مسابقه را اینجا بنویسید"} onChange={(e) =>
                    props.onChange({ name: "description", value: `${e}` })
                }></CustomTextField>
            </Box>
        </CustomBox>
    );
};

export default Step1;
