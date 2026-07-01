import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Box, Fade, Paper, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
//table icon
import {IconCheckbox} from '@tabler/icons-react'
// project imports
import { rlPadding } from '@/components/store/constant';
import Stepper from '@/components/ui-component/utilities/Stepper';
import Step0 from "./steps/step0";
import Step1 from "./steps/step1";
//import Step2 from "./steps/step2";
import TitleBox from "@/components/ui-component/utilities/TitleBox";
import IconText from '@/components/ui-component/utilities/IconText'
// data handling
import api from '@/components/api/api';
import dataHandler from '@/components/api/dataHandler';
import { showAlert } from "@/components/store/slices/alertSlice";

// ================================== CreateTeam

const CreateTeam = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const containerRef = useRef(null);

    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        city_id: null,
        province_id: null,
        sport_field_id: null,
        team_logo_id: null, // TODO: change later
        team_name: null,
        team_identifier: null,
        province_title: null,
        city_title: null,
        sport_field_title: null,
        is_womens:0//0 is mens
    });

    const cityList = [{ title: "تهران", value: 1 }, { title: "اصفهان", value: 2 }];
    const provinceList = [{ title: "تهران", value: 1 }, { title: "اصفهان", value: 2 }, { title: "شیراز", value: 3 }];
    const sportFieldList = [{ title: "فوتبال سالنی", value: 1 }, { title: "فوتبال چمنی", value: 2 }];

    const setData = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleInputChange = (e, stepNumber) => {
        const { name, value } = e;
       
        if (stepNumber === 0) {
            if (name === "team_identifier") {
                const isAlphabetic =  /^[a-zA-Z0-9]*$/.test(value);
                if (isAlphabetic) setData(name, value);
            } else {
               
                setData(name, value);
            }
        }

    };

    const sendData = async () => {
        try {
            const result = dataHandler(api.createTeam(14), "post", formData); // TODO: dynamic user id
            result((data, status) => {
                if (status) {
                    setStep(5); // no more step after success
                   dispatch(showAlert({
                    message: status ? data.message : (data.response?.data?.message || "خطا در ارسال اطلاعات"),
                    type: status ? "success" : "error"
                }));
                } else {
                     dispatch(showAlert({
                message: "خطایی رخ داده است",
                type: 'error'
            }));
                }
            });
        } catch (error) {
             dispatch(showAlert({
                message: "خطایی رخ داده است",
                type: 'error'
            }));
        }
    };

    const stepHandler = (action) => {
        if (action === 'Next') {
            if (step === 0) {
                if (formData.team_name && formData.team_identifier&&
                    formData.sport_field_id && formData.province_id && formData.city_id
                ) 
                {
                    setStep(prev => prev + 1);
                } else {
                    dispatch(showAlert("نام تیم ها نادرست است", "error"));
                }
            } else if (step === 1) {
                setStep(prev => prev + 1);
                sendData();
                } 
            
        } else if (action === 'Back' && step > 0) {
            setStep(prev => prev - 1);
        }
    };

    const renderStep = () => {
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
                                cityList={cityList}
                                provinceList={provinceList}
                                sportFieldList={sportFieldList}
                                formData={formData}
                                onChange={(e) => handleInputChange(e, 1)}
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
    React.useEffect(()=>
    {

    console.log(formData)
    
    },[formData])

    return (
        <Box sx={{ p: 2 }}>
            <Stack ref={containerRef} spacing={2} sx={{ justifyContent: "center", alignItems: "flex-end" }}>
              
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
