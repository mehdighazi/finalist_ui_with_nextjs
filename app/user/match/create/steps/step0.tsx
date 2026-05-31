
"use client"
import * as React from "react";
import { useState } from "react";
// ui-material
import {
    Box,
    Divider,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Stack,
    Typography,
    useTheme
} from "@mui/material";

// project import
// @ts-ignore
import { styled } from "@mui/material/styles";
import teamPng from '@/components/assets/images/screen/team.png' 
//const teamPng = require('assets/images/screen/team.png');

// import defaultLogo from 'assets/images/screen/defaultlogo.png'; // در صورت نیاز فعال کنید
import { hostAddress } from '@/components/api/api';
import CustomRating from "@/components/ui-component/rating";
import Avatar from "@/components/ui-component/extended/Avatar";
import { string } from "prop-types";

//----------------------------------- Types & Interfaces -----------------------------------

interface Team {
    team_id: string | number;
    team_name: string;
    logo?: {
        logo_path: string;
    } | null;
    [key: string]: any;
}

interface Step0Props {
    userTeam: Team[];
    formData: any;
    onChange: (payload: { name: string; value: any }) => void;
}

interface TeamBoxProps {
    title: string;
    logo: string;
    rating: number;
    color?: string;
}

//-------------------------------------- Styled Components -----------------------------------------

const CustomBox = styled(Box)(({ theme }) => ({
    minWidth: "100%",
    marginTop: 8, // معادل mt: 1
    paddingLeft: "0%",
    alignItems: "center",
    justifyContent: "center",

    "& input": {
        borderRadius: 5,
        minWidth: "100%",
        border: "solid 2px #e2e2e2",
        fontFamily: "numberfarsi",
        padding: 5,
        paddingRight: 10,
        color: theme.palette.secondary.dark
    }
}));

const TeamBox: React.FC<TeamBoxProps> = ({ title, logo, rating }) => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: "center",
        }}>
            <Stack sx={{
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Avatar size='sm' src={logo} />
                <Typography align="center" fontSize={12}>
                    {title}
                </Typography>
                <CustomRating  rate={rating}  />
            </Stack>
        </Box>
    );
};

//------------------------------------------ Step 0 Component ---------------------------------------------

const Step0: React.FC<Step0Props> = (props) => {
    const theme = useTheme();
    // مقدار اولیه را مطابق کد خودتان 1 گذاشتم، اما در اجرا با رشته‌های "_id" جایگزین می‌شود
    const [selectedValue, setSelectedValue] = useState<string | number>(1);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setSelectedValue(val);

        // منطق جدا کردن ID که در کدتان بود
        const teamid = val.split("_");
        props.onChange({
            name: "host_team_id",
            value: teamid[1]
        });
    };

    const rateHost = 0;
    const logoHost = "";

    return (
        <Box sx={{ minWidth: "100%",px:2 }}>
            <CustomBox>
                {props.userTeam.length !== 0 ? (
                    <>
                        <Typography variant="h5" align="right">یکی از تیم ها را انتخاب کنید</Typography>
                        <Divider sx={{ mt: 1 }} />

                        <FormControl
                            sx={{
                                direction: "rtl",
                                width: "100%",
                                mt: 1,
                                ml: 2,
                            }}

                            component="fieldset"
                        >
                            <RadioGroup
                                name="radio-buttons-group"
                                value={selectedValue}
                                onChange={handleChange}
                                sx={{ p: 0 }}
                            >
                                {props.userTeam.map((item) => (
                                    <FormControlLabel
                                        key={item.team_id}
                                        value={`_${item.team_id}`}
                                        control={<Radio />}
                                        label={
                                            <TeamBox
                                                rating={!rateHost ? 0 : rateHost}
                                                logo={item.logo ? `${hostAddress}/${item.logo.logo_path}` : logoHost}
                                                title={item.team_name}
                                            />
                                        }
                                        sx={{
                                            backgroundColor: selectedValue === `_${item.team_id}` ? "lightblue" : theme.palette.grey[100],
                                            borderRadius: "8px",
                                            padding: "8px",
                                            pt: 1,
                                            margin: "4px 0",
                                            width: "100%"
                                        }}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </>
                ) : (
                    // در صورتی که کاربر تیمی ندارد
                    <Box sx={{ p: 5, textAlign: 'center' }}>
                        <img src={teamPng} alt="no-team" style={{ width: "225px", height: "auto" }} />
                        <Typography variant="h5" sx={{ color: theme.palette.grey[500], mt: 2 }}>
                            تیم نداری؟ از <a href="#"> اینجا </a> یه تیم ایجاد کن
                        </Typography>
                    </Box>
                )}
            </CustomBox>
        </Box>
    );
};

export default Step0;