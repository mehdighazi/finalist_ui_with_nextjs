"use client"
import * as React from "react";
import { useState, useEffect } from "react";
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
import { styled } from "@mui/material/styles";
import teamPng from '@/components/assets/images/screen/team.png';
import { hostAddress } from '@/components/api/api';
import CustomRating from "@/components/ui-component/rating";
import Avatar from "@/components/ui-component/extended/Avatar";

// حذف شد: import { string } from "prop-types"; <--- این باعث ارور می‌شد

//----------------------------------- Types & Interfaces -----------------------------------
interface Team {
    team_id: string | number;
    province: {
        province_id: string | number;
        province_title: string;
    };
    city: {
        city_id: string | number;
        city_title: string;
    };
    [key: string]: any;
}

interface Step0Props {
    userTeam: Team[];
    formData: any;
    onChange: (payload: { name: any; value: any }) => void;


}

interface TeamBoxProps {
    title: string;
    logo: string;
    rating: number;
}

//-------------------------------------- Styled Components -----------------------------------------

const CustomBox = styled(Box)(({ theme }) => ({
    minWidth: "100%",
    marginTop: 8,
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
            alignItems: 'center',
            justifyContent: "center",
            width: '100%'
        }}>
            <Stack sx={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: 'row', // برای نمایش افقی
                gap: 2
            }}>
                <Avatar size='sm' src={logo} />
                <Typography align="center" fontSize={12}>
                    {title}
                </Typography>
                <CustomRating rate={rating} />
            </Stack>
        </Box>
    );
};

//------------------------------------------ Step 0 Component ---------------------------------------------

const Step0: React.FC<Step0Props> = (props) => {
    const theme = useTheme();


    // مقدار اولیه را از روی formData می‌گیریم تا اگر صفحه رفرش شد، انتخاب کاربر باقی بماند
    // اگر مقدار وجود داشت، آن را با پیشوند  ست می‌کنیم
    const [selectedValue, setSelectedValue] = useState<string>("");

    useEffect(() => {
        if (props.formData.host_team_id) {
            setSelectedValue(`_${props.formData.host_team_id}`);
        }
    }, [props.formData.host_team_id]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value; // مقدار چیزی مثل "_123" است
        setSelectedValue(val);

        // جدا کردن ID از پیشوند 
        const teamId = val.startsWith("_") ? val.substring(1) : val;

        props.onChange({
            name: "host_team_id",
            value: teamId
        });
    };

    const rateHost = 0;
    const logoHost = "";

    return (
        <Box sx={{ minWidth: "100%", px: 2 }}>
            <CustomBox>
                {props.userTeam && props.userTeam.length !== 0 ? (
                    <>
                        <Typography variant="h5" align="right" sx={{ mb: 1 }}>
                            یکی از تیم ها را انتخاب کنید
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <FormControl
                            sx={{
                                direction: "rtl",
                                width: "100%",
                                mt: 1,
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
                                                rating={rateHost}
                                                logo={item.logo ? `${hostAddress}/${item.logo.logo_path}` : logoHost}
                                                title={item.team_name}
                                            />
                                        }
                                        sx={{
                                            backgroundColor: selectedValue === `_${item.team_id}` ? "lightblue" : theme.palette.grey[100],
                                            borderRadius: "8px",
                                            padding: "8px",
                                            margin: "4px 0",
                                            width: "100%",
                                            border: "1px solid #eee"
                                        }}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </>
                ) : (
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