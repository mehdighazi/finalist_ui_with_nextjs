"use client"
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Box, Fade, Paper, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
//table icon
import { IconCheckbox } from '@tabler/icons-react'
// project imports
import { rlPadding } from '@/components/store/constant';
import Stepper from '@/components/ui-component/utilities/Stepper';
import Step0 from "./steps/step0";
import Step1 from "./steps/step1";
//import Step2 from "./steps/step2";
import TitleBox from "@/components/ui-component/utilities/TitleBox";
import IconText from "@/components/ui-component/utilities/IconText";
// data handling
import api from '@/components/api/api';
import dataHandler from '@/components/api/dataHandler';
import { showAlert } from "@/components/store/slices/alertSlice";

// ================================== CreateTeam
const cityList = [{ title: "تهران", value: 1 }, { title: "اصفهان", value: 2 }];
const provinceList = [{ title: "تهران", value: 1 }, { title: "اصفهان", value: 2 }, { title: "شیراز", value: 3 }];
const sportFieldList = [{ title: "فوتبال سالنی", value: 1 }, { title: "فوتبال چمنی", value: 2 }];

// مشخص کردن تایپ داده‌های فرم (برای تمیزی کد)

interface TeamFormData {
    city_id: number | null;
    province_id: number | null;
    sport_field_id: number | null;
    team_logo_id: any;
    team_name: string | null;
    team_identifier: string | null;
    province_title: string | null; // این‌ها حتماً باید باشند
    city_title: string | null;     // این‌ها حتماً باید باشند
    sport_field_title: string | null; // این‌ها حتماً باید باشند
    is_womens: number | boolean;
}

// اگر استپر را در فایل دیگری داری، اینجا ایمپورت کن
// import Stepper from './Stepper';

const CreateTeam: React.FC = () => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const containerRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch()
    // پدینگ چپ و راست برای زمانی که سایدبار باز است (معمولاً در داشبوردها)
    const rlPadding: string = "20px";

    const [step, setStep] = useState<number>(0);
    const [formData, setFormData] = useState<TeamFormData>({
        city_id: null,
        province_id: null,
        sport_field_id: null,
        team_logo_id: null,
        team_name: null,
        team_identifier: null,
        // این ۳ فیلد زیر را حتماً اضافه کن:
        province_title: null,
        city_title: null,
        sport_field_title: null,
        is_womens: 0
    });
    // تعریف دقیق ساختار ورودی e
    interface InputChangeEvent {
        name: keyof TeamFormData; // نام فیلد حتماً باید یکی از کلیدهای formData باشد
        value: any;
    }
    const setData = (name: any, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const renderStep = (): React.ReactNode => {
        switch (step) {
            case 0:
                return (
                    <Box sx={{ minWidth: "100%" }}>
                        <Step0 formData={formData} onChange={(e) => handleInputChange(e, 0)} userinfo={"A"} />
                    </Box>
                );
            case 1:
                return (
                    <Fade in>
                        <Box sx={{ minWidth: "100%" }}>
                            <Step1
                                //  cityList={cityList}
                                //provinceList={provinceList}
                                //sportFieldList={sportFieldList}
                                formData={formData}

                            />
                        </Box>
                    </Fade>
                );
            default:
                return (
                    <Fade in>
                        <Box sx={{ minWidth: "100%" }}>
                            <Step1 formData={formData} />
                        </Box>
                    </Fade>
                );
        }
    };
    const sendData = async (): Promise<void> => {
        try {
            // ۱. فراخوانی API (در اینجا فعلاً آی‌دی ۱۴ ثابت مانده طبق کد خودت)
            const result = dataHandler(api.createTeam(""), "post", formData);

            // ۲. هندل کردن نتیجه (دقت کن که دیتا و استاتوس تایپ‌گذاری شدند)
            result((data: any, status: boolean) => {
                if (status) {
                    // عملیات موفقیت‌آمیز
                    setStep(5); // رفتن به مرحله پایان
                    dispatch(showAlert({
                        message: "عملیات با موفقیت انجام شد",
                        type: status ? 'success' : 'error'
                    }));

                } else {
                    dispatch(showAlert({
                        message: "خطایی در ثبت اطلاعات رخ داده است",
                        type: 'error'
                    }));

                }
            });

        } catch (error: unknown) {
            dispatch(showAlert({
                message: "خطای غیرمنتظره‌ای رخ داد",
                type: 'error'
            }));

        }
    };


    // هندلر تغییر مرحله
    const stepHandler = (action: string | number) => {
        if (action === 'Next') {
            setStep((prev) => prev + 1);
        } else if (action === 'Back') {
            setStep((prev) => (prev > 0 ? prev - 1 : 0));
        } else if (typeof action === 'number') {
            setStep(action);
        }
    };
    const handleInputChange = (e: InputChangeEvent, stepNumber: number): void => {
        const { name, value } = e;

        if (stepNumber === 0) {
            if (name === "team_identifier") {
                // ریجکس فقط کاراکترهای مجاز را چک می‌کند (خروجی: true یا false)
                const isAlphabetic: boolean = /^[a-zA-Z0-9]$/.test(value);

                if (isAlphabetic) {
                    setData(name, value);
                }
            } else {
                setData(name, value);
            }
        }
        // اگر از قبل اینترفیس ApiResponse را نداری، ساده‌اش این است:
        interface ApiResponse {
            data: any;
            status: boolean;
        }




    };

    return (
        <Box sx={{ p: 2, pb: 10 }}>
            <Stack
                ref={containerRef}
                spacing={2}
                sx={{ justifyContent: "center", alignItems: "center" }}
            >
                {renderStep()}

                <Box
                    sx={{
                        minWidth: "100%",
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        paddingLeft: matchDownMd ? "0%" : rlPadding,
                        paddingRight: matchDownMd ? "-2%" : rlPadding,
                    }}
                >
                    <Paper elevation={3}>
                        <Stepper stepnumber={2} step={step} onChange={stepHandler} />
                    </Paper>
                </Box>
            </Stack>
        </Box>
    );
};

export default CreateTeam;