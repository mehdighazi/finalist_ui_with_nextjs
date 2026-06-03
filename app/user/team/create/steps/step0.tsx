"use client"
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

//ui-material
import {
    Box, Stack, TextField, Typography, useTheme, CircularProgress,
    Checkbox, FormControlLabel, FormHelperText, FormControl
} from "@mui/material";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
//tabler icon
import { IconX, IconCircleCheckFilled, IconMapPin, IconUsersGroup, IconId, IconCategory } from '@tabler/icons-react'
//project import

import ProvinceCitySelector from '@/components/ui-component/utilities/ProvinceCitySelector'
import SportSelector from "@/components/ui-component/utilities/SportSelector";
import { styled } from "@mui/material/styles";
import { CustomTextField } from '@/components/ui-component/utilities/inputs'
import IconText from '@/components/ui-component/utilities/IconText'
import { showBottomSheet, hideBottomSheet } from "@/components/store/slices/bottomSheetSlice";
import api from '@/components/api/api'
import dataHandler from '@/components/api/dataHandler'

//--------------------------------------|Step 1|---------------------------------------------------
interface Step0Props {
    formData: any; // یا TeamFormData که قبلاً تعریف کردیم
    onChange: (e: { name: string; value: any }) => void;
}
const SectionBox = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: theme.spacing(1),

}));

const Step0: React.FC<Step0Props> = (props) => {
    const theme = useTheme()
    const dispatch = useDispatch();
    const TextColor = theme.palette.primary.main
    const [sport, setSport] = useState("")
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    // State ها با تایپ مشخص
    const [teamIdentifier, setTeamIdentifier] = useState<string>(props.formData.team_identifier || "");
    const [valueValidity, setValueValidity] = useState<string>("");
    const [province_City_Title, setprovince_City_Title] = useState<string>(
        props.formData.province_title ? `${props.formData.province_title}/${props.formData.city_title}` : ""
    );

    // این‌ها باید از Parent یا Redux بیایند، فعلاً اینجا تعریف کردم که ارور ندهد
    const [usernameChecking, setUsernameChecking] = useState<boolean>(false);
    const [usernameExists, setUsernameExists] = useState<boolean | null>(null);
    useEffect(() => {
        // ۱. اعتبارسنجی اولیه: اگر نام کوتاه است یا خالی، چک نکن
        if (!teamIdentifier || teamIdentifier.length < 3) {
            setUsernameChecking(false);
            setUsernameExists(null); // ریست وضعیت نامشخص
            return;
        }

        // ۲. شروع چک کردن
        setUsernameChecking(true);

        // پاک‌سازی تایمر قبلی اگر کاربر سریع تایپ می‌کند (Debouncing)
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        // ۳. تعریف تاخیر ۶۰۰ میلی‌ثانیه‌ای
        debounceRef.current = setTimeout(() => {
            // فراخوانی API به صورت کال‌بک
            dataHandler(
                api.teamIdentifierChecking(teamIdentifier),
                "get",
                ""
            )((data: any, status: boolean) => {

                // منطق بررسی پاسخ سرور
                // فرض: data.result.valid بودن یعنی نام "آزاد" است
                // اگر valid باشد => نام آزاد است => Exists باید false شود
                // اگر valid نباشد => نام گرفته شده => Exists باید true شود

                let isTaken = false;

                if (status) {
                    if (data && data.result && data.result.valid === true) {
                        isTaken = false; // نام آزاد است
                    } else {
                        isTaken = true;  // نام گرفته شده یا خطا در اعتبارسنجی سرور
                    }
                } else {
                    // در صورت خطای شبکه یا سرور، فرض می‌کنیم نمی‌توانیم تایید کنیم
                    // معمولاً در این حالت وضعیت را خنثی نگه می‌داریم یا ارور می‌دهیم
                    console.error("API Error:", data);
                }

                // تنظیم استیت‌ها
                setUsernameExists(isTaken);
                setUsernameChecking(false); // پایان چک کردن
            });

        }, 600);

        // پاک‌سازی هنگام خراب شدن کامپوننت یا تغییر teamIdentifier
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [teamIdentifier, api, dataHandler]);
    return (
        <Box sx={{ textAlign: "right",p:0.5 }}>
            <SectionBox>

                <Box sx={{ mb: 4, textAlign: 'right' }}>

                    <IconText textPaddingTop={-1} fontSize={12} icon={<GroupAddIcon sx={{ color: 'primary.main', fontSize: 30 }} />} color={TextColor} text={"  ثبت اطلاعات تیم ورزشی"} />


                    <Typography variant="body2" color="text.secondary" sx={{ pr: 1, borderRight: '3px solid', borderColor: 'primary.light', lineHeight: 1.8 }}>
                        لطفاً مشخصات تیم خود را با دقت وارد نمایید. انتخاب صحیح شهر و وضعیت جنسیتی تیم در دسته‌بندی مسابقات تأثیرگذار است.
                    </Typography>
                </Box>
            </SectionBox>
            <SectionBox>
                <IconText textPaddingTop={-1} fontSize={12} icon={<IconCategory />} color={TextColor} text={" رشته ورزشی"} />


                <CustomTextField
                    onChange={() => console.log("click")}
                    onClick={() => dispatch(
                        showBottomSheet({
                            title: 'انتخاب رشته ورزشی',
                            //ptSX: '10%',
                            renderContent: () => (
                                <SportSelector

                                    onChange={(e) => {
                                       
                                        props.onChange({
                                            name: "sport_field_id",
                                            value: e.sport_field_id
                                        })
                                        props.onChange({
                                            name: "sport_field_title",
                                            value: e.sport_field_title
                                        })
                                        setSport(e.sport_parent_title + "/" + e.sport_field_title);
                                        dispatch(hideBottomSheet())
                                    }} />
                                     
                            ),
                        })
                    )
                    }

                    value={sport}
                    readOnly={true}
                    fontSize={14}
                    placeholder={"برای انتخاب رشته ورزشی تیم اینجا کلیک کنید"}
                //  fullWidth


                //variant="filled"
                />
            </SectionBox>

            {/* نام تیم */}
            <SectionBox >
                <IconText textPaddingTop={-1} fontSize={12} icon={<IconUsersGroup size={18} />} color={TextColor} text="نام تیم" />

                <CustomTextField
                    errorText="لطفا از نام‌های متعارف استفاده نمایید"
                    fontSize={14}
                    placeholder="نام تیم را به فارسی وارد کنید"
                    onChange={(e: string) => props.onChange({ name: "team_name", value: e })}
                    value={props.formData["team_name"]}
                />
            </SectionBox>

            {/* نام کاربری تیم */}
            <SectionBox >
                <IconText textPaddingTop={-1} fontSize={12} icon={<IconId size={18} />} color={TextColor} text=" نام کاربری تیم " />

                <CustomTextField
                    startIcon={
                        usernameChecking ? <CircularProgress size={20} /> :
                            usernameExists === true ? <IconCircleCheckFilled color="green" /> :
                                usernameExists === false ? <IconX color="red" /> : null
                    }
                    fontSize={14}
                    placeholder="نام کاربری (انگلیسی و عدد)"
                    //fullWidth
                    //name="team_identifier"
                    // id="team_identifier"
                    value={teamIdentifier}
                    onChange={(value: string) => {

                        const valid = /^[a-zA-Z0-9]*$/.test(value);
                        setValueValidity(valid ? "" : "فقط حروف انگلیسی و اعداد مجاز است");
                        if (valid) {
                            setTeamIdentifier(value);
                            props.onChange({ name: "team_identifier", value });
                        }
                    }}
                    errorText={valueValidity}
                />
            </SectionBox>
            {/* انتخاب استان/شهر */}
            <SectionBox>
                <IconText textPaddingTop={-1} fontSize={12} icon={<IconMapPin size={18} />} color={TextColor} text="انتخاب استان/شهر" />

                <CustomTextField
                    onChange={() => console.log("Click..")}
                    onClick={() => dispatch(
                        showBottomSheet({
                            title: 'انتخاب شهر',
                            ptSX: '10%',
                            renderContent: () => (
                                <ProvinceCitySelector
                                    onChange={(e: any) => {
                                        props.onChange({ name: "city_id", value: e.city_id });
                                        props.onChange({ name: "province_id", value: e.province_id });
                                        props.onChange({ name: "city_title", value: e.city_title });
                                        props.onChange({ name: "province_title", value: e.province_title });

                                        setprovince_City_Title(`${e.province_title}/${e.city_title}`);
                                        dispatch(hideBottomSheet());
                                    }}
                                />
                            ),
                        })
                    )
                    }



                    readOnly={true}
                    fontSize={14}
                    placeholder="برای انتخاب استان و شهر اینجا کلیک کنید"
                    //fullWidth
                    value={province_City_Title}
                //variant="filled"
                />
            </SectionBox>
            <Box sx={{ textAlign: 'right', py: 1, px: 1, border: '1px solid #e2e2e2', mt: 1, borderRadius: 5 }}>
                <FormControl sx={{ p: 0, width: '100%' }}>
                    <FormControlLabel
                        sx={{
                            mr: 0, // حذف مارجین راست
                            ml: 1, // کمی فاصله از چپ (اختیاری)
                            flexDirection: 'row-reverse', // معکوس کردن جهت برای راست‌چین شدن دقیق
                            justifyContent: 'flex-start',
                            '& .MuiFormControlLabel-label': {
                                fontSize: '0.9rem', // تنظیم سایز فونت در صورت نیاز
                            }
                        }}
                        control={
                            <Checkbox
                                checked={props.formData["is_womens"] || false}
                                sx={{
                                    pr: 0, // حذف پدینگ راستِ خودِ چک‌باکس
                                }}
                                onChange={(e) =>
                                    props.onChange({
                                        name: "is_womens",
                                        value: e.target.checked
                                    })
                                }
                            />
                        }
                        label="تیم بانوان می باشد"
                    />
                    <FormHelperText sx={{ color: "red", fontSize: 10, textAlign: 'right', pr: 2 }} id="team-identifier-error">
                        <span>{"چنانچه تیم بانوان می باشید حتما این گزینه را فعال کنید"}</span>
                    </FormHelperText>
                </FormControl>
            </Box>

        </Box>
    );
};

export default Step0