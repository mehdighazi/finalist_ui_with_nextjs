
"use client"

import *  as React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    Box, Fade, Paper, Stack, useMediaQuery, useTheme
} from "@mui/material";

import { rlPadding } from '@/components/store/constant';
import Stepper from '@/components/ui-component/utilities/Stepper';
import Step0 from "./steps/step0";
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import dataHandler from '@/components/api/dataHandler';
import api from '@/components/api/api';
import { showAlert } from "@/components/store/slices/alertSlice";
import { useRouter } from "next/navigation";

// Interfaces
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

interface MatchFormData {
    match_time: string | null;
    match_date: string | null;
    match_local_date: string | null;
    host_team_id: string | number | null;
    match_province_id: string | number | null;
    match_city_id: string | number | null;
    description: string | null;
    match_location_address: string | null;
    match_type: number;
}

const CreateMatch: React.FC = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();
    const [step, setStep] = useState<number>(0);
    const [userTeam, setUserTeam] = useState<Team[]>([]);
    const [teamLocation, setTeamLocation] = useState<string>("");

    const [formData, setFormData] = useState<MatchFormData>({
        match_time: null,
        match_date: null,
        match_local_date: null,
        host_team_id: null,
        match_province_id: null,
        match_city_id: null,
        description: null,
        match_location_address: null,
        match_type: 1
    });

    const handleInputChange = ({ name, value }: { name: keyof MatchFormData; value: any }) => {
        setFormData(prev => ({ ...prev, [name]: value }));

    };

    const fetchUserTeams = async () => {
        try {
            const result = dataHandler(api.listUserTeam(""), "get", "");
            result(async (data: any, status: boolean) => {
                if (status) {
                    setUserTeam(data.result);
                }
            });
        } catch (error) {
            console.error("Error loading teams", error);
        }
    };
     React.useEffect(() => {
            document.title = "ایجاد مسابقه | فینالیست";
        }, []);

    useEffect(() => {
        fetchUserTeams();
    }, []);

    useEffect(() => {
        if (formData.host_team_id && userTeam.length) {
            const selectedTeam = userTeam.find(
                team => team.team_id.toString() === formData.host_team_id?.toString()
            );
            if (selectedTeam) {
                setTeamLocation(`${selectedTeam.province.province_title}/${selectedTeam.city.city_title}`);
                handleInputChange({ name: "match_province_id", value: selectedTeam.province.province_id });
                handleInputChange({ name: "match_city_id", value: selectedTeam.city.city_id });
            }
        }
    }, [formData.host_team_id, userTeam]);

    const sendData = async () => {
        try {
            const result = dataHandler(api.createMatch("1"), "post", formData);
            result(async (data: any, status: boolean) => {
                dispatch(showAlert({
                    message: status ? data.message : (data.response?.data?.message || "خطا در ارسال اطلاعات"),
                    type: status ? "success" : "error"
                }));
                if (status) {
                    setTimeout(() => {
                        router.push("/matches/list");
                    }, 3000);
                }
            });
        } catch (error) {
            dispatch(showAlert({
                message: "خطایی رخ داده است",
                type: 'error'
            }));
        }
    };


    const stepHandler = (action: 'Next' | 'Back') => {
        switch (action) {
            case 'Next':
                if (step === 0) {
                    if (formData.host_team_id) setStep(step + 1);
                    else dispatch(showAlert({ message: "تیم انتخاب نشده است", type: "error" }));
                } else if (step === 1) {
                    const { match_province_id, match_city_id, match_time, match_date, match_location_address } = formData;
                    if (match_province_id && match_city_id && match_time && match_date && match_location_address)
                        setStep(step + 1);
                    else dispatch(showAlert({ message: "لطفا اطلاعات را تکمیل نمایید", type: "error" }));
                } else if (step === 2) {
                    setStep(step + 1);
                    sendData();
                }
                break;
            case 'Back':
                setStep(step - 1);
                break;
            default:
                break;
        }
    };

    const selectedTeam = userTeam.find(team =>
        team.team_id?.toString() === formData.host_team_id?.toString()
    );

    const renderStep = () => {
        switch (step) {
            case 0:
                return (
                    <Step0
                        userTeam={userTeam}
                        formData={formData}
                        onChange={handleInputChange}
                    />
                );
            case 1:
                return (
                    <Fade in={true} timeout={400}>
                        <div>
                            <Step1
                                userTeam={userTeam}
                                teamLocation={teamLocation}
                                setTeamLocation={setTeamLocation}
                                formData={formData}
                                onChange={handleInputChange}
                                selectedTeam={selectedTeam}
                            />
                        </div>
                    </Fade>
                );
            case 2:
                return (
                    <Fade in={true} timeout={400}>
                        <div>
                            <Step2
                                teamLocation={teamLocation}
                                formData={formData}
                                selectedTeam={selectedTeam}
                            />
                        </div>
                    </Fade>
                );
            default:
                return (
                    <Step2
                        teamLocation={teamLocation}
                        formData={formData}
                        selectedTeam={selectedTeam}
                    />
                );
        }
    };

    return (
        <Box sx={{ p: 1, height: "100vh" }}>
            <Stack spacing={2} sx={{ justifyContent: "center", alignItems: "flex-end" }}>
                <Box sx={{ minWidth: "100%" }}>{renderStep()}</Box>
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
                        <Stepper stepnumber={3} step={step} onChange={stepHandler} />
                    </Paper>
                </Box>
            </Stack>
        </Box>
    );
};

export default CreateMatch;