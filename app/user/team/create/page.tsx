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

// data handling
import api from '@/components/api/api';
import dataHandler from '@/components/api/dataHandler';
import { showAlert } from "@/components/store/slices/alertSlice";



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
interface CustomInputEvent {
    name: string;
    value: string;
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
                        <Step0 formData={formData} onChange={(e) => handleInputChange(e, 0)} />
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

            if (step === 1) {
                sendData()
                setStep((prev) => prev + 1);
            }

            if (step === 0 && formData.city_id && formData.sport_field_id &&
                formData.team_identifier
            )
                setStep((prev) => prev + 1);
            else dispatch(showAlert({
                message: "لطفا فیلد هارا تکمیل نمایید",
                type: 'error'
            }));

        } else if (action === 'Back') {
            setStep((prev) => (prev > 0 ? prev - 1 : 0));
        } else if (typeof action === 'number') {
            setStep(action);
        }
    };
    const handleInputChange = (e: CustomInputEvent, stepNumber: number): void => {
        // استخراج name و value از e.target
        const { name, value } = e;

        if (stepNumber === 0) {
            if (name === "team_identifier") {
                // اصلاح ریجکس: 
                // ریجکس قبلی شما فقط اجازه ورود ۱ کاراکتر را می‌داد (^) و ($)
                // برای چک کردن کل رشته از این استفاده کنید:
                const isAlphanumeric = /^[a-zA-Z0-9]*$/.test(value);
                console.log(isAlphanumeric)
                if (isAlphanumeric) {
                    setData(name, value);
                }
            } else {
                setData(name, value);
            }
        }
    };


    return (
        <Box sx={{ height: "100vh" }}>
            <Stack
                ref={containerRef}
                spacing={2}
                sx={{ justifyContent: "center", alignItems: "center" }}
            >
                {renderStep()}


                <Box sx={{
                    width: "100%",
                    position: "fixed", // تغییر از absolute به fixed
                    bottom: 0,         // چسبیدن دقیق به کف
                    left: '50%',       // برای وسط‌چین ماندن با وجود maxWidth
                    transform: 'translateX(-50%)',
                    maxWidth: { lg: 600, md: 600, xs: '100%' }, // اضافه کردن xs برای موبایل
                    //background: theme.palette.secondary.main,
                    zIndex: 1100,      // برای اینکه روی بقیه المان‌ها باشد
                    borderRadius: 0,   // حذف گردی لبه‌ها برای چسبیدن کامل
                }} >
                    <Stepper stepnumber={2} step={step} onChange={stepHandler} />
                </Box>

            </Stack>
        </Box>
    );
};

export default CreateTeam;