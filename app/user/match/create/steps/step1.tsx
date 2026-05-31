
"use client"

import *  as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
// UI Material
import { Paper, Box, Divider, Typography, useTheme, styled, Button } from "@mui/material";
import { AccessTime, CalendarMonth, PinDrop, Comment } from "@mui/icons-material";

// tabler icon 
import { IconChecklist } from '@tabler/icons-react'

// ابزار پروژه
import { hostAddress } from "@/components/api/api";
import IconText from "@/components/ui-component/utilities/IconText";
import { persiandate, StartDate4MYSQL } from "@/components/utils/Lib";
import { TeamBox } from "@/components/ui-component/utilities/MatchCardContent";
import { CustomTextField } from "@/components/ui-component/utilities/inputs";
import PopperCalender from '@/components/ui-component/utilities/PopperCalender'
import { PopperTimePicker } from "@/components/ui-component/utilities/TimeSwipPicker";
import { showBottomSheet, hideBottomSheet } from "@/components/store/slices/bottomSheetSlice";
import ProvinceCitySelector from '@/components/ui-component/utilities/ProvinceCitySelector'
import { MainCardWrapper } from "@/components/ui-component/cards/MainCardWrapper";

// تعریف اینترفیس‌ها
interface Team {
    team_name: string;
    logo?: {
        logo_path: string;
    } | null;
}

interface FormData {
    match_local_date?: string;
    match_date?: string;
    match_time?: string;
    match_location_address?: string;
    description?: string;
    match_province_id?: number;
    match_city_id?: number;
}

interface Step1Props {
    formData: FormData;
    selectedTeam: Team;
    teamLocation: string;
    onChange: (payload: { name: keyof FormData; value: any }) => void;
    setTeamLocation: (location: string) => void;
}

interface LocationChangeEvent {
    province_id: number;
    city_id: number;
    province_title: string;
    city_title: string;
}

const CustomBox = styled(Paper)(({ theme }) => ({
    minWidth: "100%",
    marginTop: 0,
    padding: 10,
    marginBottom: 40
}));
const SectionBox = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: theme.spacing(1),

}));


const Step1: React.FC<Step1Props> = (props) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [calendarValue, setCalendarValue] = useState<string>(props.formData.match_local_date || "");
    const [timeValue, setTimeValue] = useState<string>(props.formData.match_time || "");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorTimePickerEl, setAnchorTimePickerEl] = useState<null | HTMLElement>(null);
    const [changedTeamLocation, setChangedTeamLocation] = useState<string | null>(null);

    const IconColor = theme.palette.grey[400];
    const TextColor = theme.palette.grey[600];

    const handleDatePickerOnClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleDatePickerClose = () => {
        setAnchorEl(null);
    };

    const handleTimePickerOnClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorTimePickerEl(anchorTimePickerEl ? null : event.currentTarget);
    };

    const handleTimePickerClose = () => {
        setAnchorTimePickerEl(null);
    };

    const handleLocationOnchange = (e: LocationChangeEvent) => {
        dispatch(hideBottomSheet());
        props.onChange({ name: "match_province_id", value: e.province_id });
        props.onChange({ name: "match_city_id", value: e.city_id });
        props.setTeamLocation(`${e.province_title} / ${e.city_title}`);
    };

    return (
        <CustomBox sx={{ minWidth: "100%", marginBottom: 10 }}>
            <MainCardWrapper
                border={false}
                sx={{
                    display: "flex",
                    justifyContent: "center",

                    alignItems: "center",
                    width: "100%",
                }}
            >
                <TeamBox
                    title={props.selectedTeam?.team_name}
                    logo={props.selectedTeam?.logo ? `${hostAddress}/${props.selectedTeam.logo.logo_path}` : "/default-avatar.jpg"}
                />
            </MainCardWrapper>

            <SectionBox>
               
                    <IconText fontSize={14} icon={<IconChecklist />} color={TextColor} text={" اطلاعات مسابقه"} />
               
            </SectionBox>
            <Divider />

            {/* بخش تاریخ */}
            <SectionBox sx={{ mt: 1 }}>
                
                    <IconText textPaddingTop={0.5} fontSize={12} icon={<CalendarMonth  />} color={TextColor} text={"تاریخ برگزاری"} />
               
                <PopperCalender
                    anchorEl={anchorEl}
                    handleClose={handleDatePickerClose}
                    onChange={(e: any) => {
                        const pDate = persiandate(e);
                        props.onChange({ name: "match_local_date", value: pDate });
                        props.onChange({ name: "match_date", value: StartDate4MYSQL(e) });
                        setCalendarValue(pDate.toString());
                        handleDatePickerClose();
                    }}
                />
                <Box onClick={handleDatePickerOnClick} sx={{ p: 0.5 }}>
                    <CustomTextField onChange={() => console.log("")} value={calendarValue} readOnly={true} placeholder={"جهت انتخاب تاریخ کلیک کنید"} />
                </Box>
            </SectionBox>

            {/* بخش زمان */}
            <SectionBox>
                
                    <IconText fontSize={12} icon={<AccessTime />} color={TextColor} text={"زمان برگزاری"} />
              
                <Box onClick={handleTimePickerOnClick} sx={{ p: 0.5 }}>
                    <CustomTextField onChange={() => console.log("")} fontFamily="numberfarsi" fontSize={14} value={timeValue} readOnly={true} placeholder={"جهت انتخاب ساعت کلیک کنید"} />
                </Box>
                <PopperTimePicker
                    anchorEl={anchorTimePickerEl}
                    handleClose={handleTimePickerClose}
                    onChange={(e: { hour: string | number; minute: string | number }) => {
                        const timeStr = `${e.hour}:${e.minute}`;
                        props.onChange({ name: "match_time", value: timeStr });
                        setTimeValue(timeStr);
                        handleTimePickerClose();
                    }}
                />
            </SectionBox>

            {/* بخش محل برگزاری */}
            <SectionBox>
               
                    <IconText textPaddingTop={0.5} fontSize={12} icon={<PinDrop />} color={TextColor} text={"محل برگزاری"} />
         


                <Typography color={"secondary"} variant={"subtitle2"} fontSize={12} align="right" sx={{ pt: 0.2, mr: 2 }}>
                    <Button
                        sx={{ fontFamily: "orginalfont", fontSize: 12 }}
                        onClick={() => dispatch(
                            showBottomSheet({
                                title: 'انتخاب شهر',
                                ptSX: '10%',
                                renderContent: () => (
                                    <ProvinceCitySelector
                                        onChange={(e: any) => {
                                            props.onChange({ name: "match_city_id", value: e.city_id });
                                            props.onChange({ name: "match_province_id", value: e.province_id });
                                            setChangedTeamLocation(`${e.province_title}/${e.city_title}`)
                                            dispatch(hideBottomSheet());
                                        }}
                                    />
                                ),
                            })
                        )
                        }
                    >
                        {props.teamLocation || changedTeamLocation || "(انتخاب شهر)"}
                    </Button>
                </Typography>

                <CustomTextField
                    fontFamily={"orginalfont"}
                    fontSize={14}

                    placeholder={"آدرس دقیق محل برگزاری مسابقه"}
                    value={props.formData.match_location_address || ""}
                    onChange={(val: string) => props.onChange({ name: "match_location_address", value: val })}
                />
            </SectionBox>
            {/* بخش توضیحات */}
            <SectionBox>
               
                    <IconText textPaddingTop={0.2} fontSize={12} icon={<Comment />} color={TextColor} text={"توضیحات "} />
                

                <Box sx={{ mb: 6, p: 0.5 }}>
                    <CustomTextField
                        fontSize={14}
                        fontFamily={"orginalfont"}
                        placeholder={"توضیحاتی اضافی از قبیل شرایط زمانی مسابقه را اینجا بنویسید"}
                        value={props.formData.description || ""}
                        onChange={(val: string) => props.onChange({ name: "description", value: val })}
                    />
                </Box>
            </SectionBox>
        </CustomBox>
    );
};

export default Step1;
