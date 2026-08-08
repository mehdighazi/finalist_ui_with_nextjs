"use client"
import *  as React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { use } from 'react'
// formik
import { Formik, Form, FormikHelpers } from 'formik';
// ui-material
import {
    Box, Stack, Typography, useTheme, Divider, CircularProgress, FormControl,
    FormHelperText, FormControlLabel, Checkbox
} from "@mui/material";
// tabler icons
import {
    IconUser, IconUserCheck, IconCircleCheckFilled, IconX
} from "@tabler/icons-react";

// project imports
import { uploadHandler, AvatarCropper } from '@/components/ui-component/utilities/uploadfile';
import CustomAvatar from "@/components/ui-component/extended/Avatar";
import DefaultAvatar from "@/components/assets/images/screen/default-avatar.jpg";
import api from '@/components/api/api';
import dataHandler from '@/components/api/dataHandler';
import { CustomTextField } from "@/components/ui-component/utilities/inputs";
import { persiandate, base64ToBlob } from '@/components/utils/Lib';
import IconText from "@/components/ui-component/utilities/IconText";
import { CustomSubmitButton } from "@/components/ui-component/utilities/CustomLoadingButton";
import { showAlert } from "@/components/store/slices/alertSlice";
import { MainCardWrapper } from "@/components/ui-component/cards/MainCardWrapper";
import EditProfileSkeleton from '@/components/ui-component/cards/Skeleton/EditProfile';
import { hostAddress } from '@/components/api/api';

// --- Interfaces ---
interface TeamData {
    team_name: string;
    team_identifier: string;
    about: string;
    createdAt: string;
    is_womens: boolean;
    logo?: {
        logo_path: string;
    };
    [key: string]: any;
}

interface UserInfo {
    id: string | number;
    [key: string]: any;
}

interface FormValues {
    team_name: string;
    team_identifier: string;
    about: string;
    created_at: string | null;
    is_womens: boolean;
    team_id: string | null;
    logo_path: string | null;
}
interface TeamEditProps {
    params: Promise<{
        teamId: string; // نام پوشه شما که در کروشه است (مثلاً [id])
    }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function TeamEdit({ params, searchParams }: TeamEditProps) {

    const theme = useTheme();

    const resolvedParams = use(params);
    const tid = resolvedParams.teamId;

    const dispatch = useDispatch();

    const [team_identifierChecking, setTeam_identifierChecking] = useState<boolean>(false);
    const [team_identifiereExists, setTeam_identifierExists] = useState<boolean | null>(null);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [percentUpload, setPercentUpload] = useState<number>(0);
    const [logo, setLogo] = useState<string | null>(null);
    const [logoPath, setLogoPath] = useState<string | null>(null);
    const [teamId, setTeamId] = useState<string | null>(null);
    const [data, setData] = useState<TeamData | undefined>();

    const IconColor = theme.palette.grey[400];
    const TextColor = theme.palette.grey[600];
    React.useEffect(() => {
        document.title = "ویرایش تیم | فینالیست";
    }, []);
    // --- Functions ---
    const handleUploadComplete = (res: { filepath: string }) => {
        setLogo(`${hostAddress}/${res.filepath}`);
        setLogoPath(res.filepath);
    };

    const uploadFile = (file: string) => {
        const blobFile = base64ToBlob(file);
        uploadHandler({
            onChange: handleUploadComplete,
            fileObj: blobFile,
            sectionId: "4",
            setPercentOfFileUploaded: setPercentUpload
        });
    };

    const sendData = async (formData: FormValues) => {
        const result = dataHandler(api.teamUpdate(), "post", formData);
        try {

            result(async function (res: any, status: boolean) {

                dispatch(showAlert({
                    message: res?.message,
                    type: status ? 'success' : 'error'
                }));


            });
        } catch (error) {
            dispatch(showAlert({
                message: 'خطایی رخ داده',
                type: 'error'
            }));
        }
    };

    const checkTeam_identifier = async (parameter: string) => {
        setTeam_identifierChecking(true);
        const result = dataHandler(api.teamIdentifierChecking(parameter), "get", "");
        try {
            result(async function (res: any, status: boolean) {
                if (status && res.result.valid) {
                    setTeam_identifierExists(false); // Valid means it doesn't exist/is free
                } else {
                    setTeam_identifierExists(true);
                }
                setTeam_identifierChecking(false);
            });
        } catch (error) {
            setTeam_identifierChecking(false);
            setTeam_identifierExists(true);
        }
    };

    const getTeamData = async () => {

        setTeamId(tid);
        // if (!tid) return;
        const result = dataHandler(api.teamInfo(tid), "get", "");

        try {
            result(async function (res: any, status: boolean) {
                if (status) {
                    const teamRes = res.result as TeamData;

                    setLogo(teamRes?.logo?.logo_path ? `${hostAddress}/${teamRes.logo.logo_path}` : "");
                    setLogoPath(teamRes?.logo?.logo_path || null);

                    const [shamsiShort] = persiandate(teamRes?.createdAt || 'ثبت نشده');
                    teamRes.createdAt = shamsiShort;

                    if (teamRes.team_identifier) setTeam_identifierExists(false);
                    setData(teamRes);
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { getTeamData(); }, []);

    // --- Render ---
    return (
        <Box sx={{ mb: 5, height: "100vh" }}>
            {data ? (
                <Formik
                    enableReinitialize
                    initialValues={{
                        team_name: data?.team_name || '',
                        team_identifier: data?.team_identifier || '',
                        about: data?.about || '',
                        created_at: data?.createdAt || null,
                        is_womens: data?.is_womens || false,
                        team_id: teamId,
                        logo_path: logoPath
                    }}
                    onSubmit={(values: FormValues) => {
                        sendData(values);
                    }}
                >
                    {({ values, setFieldValue }) => {
                        // Debounce logic for identifier check
                        useEffect(() => {
                            const timeout = setTimeout(() => {
                                if (values.team_identifier && values.team_identifier.length > 8 && values.team_identifier !== data.team_identifier) {
                                    checkTeam_identifier(values.team_identifier);
                                }
                            }, 500);
                            return () => clearTimeout(timeout);
                        }, [values.team_identifier]);

                        return (
                            <Form>
                                <Stack spacing={2} sx={{ p: 1, px: 2, width: "100%", height: "100%", overflow: "auto", mb: 10 }}>

                                    <MainCardWrapper border={false} sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                                        <Box sx={{ position: 'relative', display: 'inline-block' }}>
                                            <CustomAvatar
                                                src={logo || DefaultAvatar || ""}
                                                sx={{ width: 90, height: 90, boxShadow: theme.shadows[3], border: '2px solid #fff' }}
                                            />
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    right: 2,
                                                    bottom: 1,
                                                    backdropFilter: 'blur(4px)',
                                                    bgcolor: 'rgba(255, 255, 255, 0.7)',
                                                    borderRadius: '50%',
                                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                                    boxShadow: theme.shadows[4]
                                                }}
                                            >
                                                <AvatarCropper
                                                    uploadIconButton={true}
                                                    onChange={(e: any) => {

                                                        uploadFile(e)
                                                    }
                                                    }
                                                />
                                            </Box>
                                        </Box>
                                    </MainCardWrapper>

                                    <Divider />

                                    <Stack spacing={1}>
                                        <CustomTextField
                                            //name="team_name"
                                            onChange={() => console.log("e")}
                                            value={values.team_name} readOnly
                                            placeholder="نام تیم" />
                                        <CustomTextField
                                            value={values.created_at || ""}
                                            onChange={() => console.log("e")}
                                            readOnly placeholder="تاریخ تاسیس" />
                                        <CustomTextField
                                            //name="about" 
                                            value={values.about}
                                            onChange={(val: string) => setFieldValue("about", val)}
                                            placeholder="درباره تیم"
                                        />
                                    </Stack>

                                    <Box textAlign="right">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={values.is_womens}
                                                    onChange={(e) => setFieldValue("is_womens", e.target.checked)}
                                                />
                                            }
                                            label="تیم بانوان می باشد"
                                        />
                                        <FormHelperText sx={{ textAlign: 'right' }}>
                                            <span>{"چنانچه تیم بانوان می باشید حتما این گزینه را فعال کنید"}</span>
                                        </FormHelperText>
                                    </Box>

                                    <Divider />


                                    <IconText fontSize={12} icon={<IconUserCheck />} color={TextColor} text={"شناسه تیم"} />


                                    <CustomTextField
                                        endIcon={
                                            team_identifierChecking ? <CircularProgress size={20} /> :
                                                team_identifiereExists ? <IconX color="red" /> : <IconCircleCheckFilled color='green' />
                                        }
                                        //name="team_identifier" 
                                        value={values.team_identifier}
                                        onChange={(val: string) => setFieldValue("team_identifier", val)}
                                        placeholder="شناسه تیم"

                                    />

                                    <CustomSubmitButton color="primary" variant="contained" borderRadius={3} padding={1.5} type="submit">
                                        <Typography fontSize={12}>{"ثبت اطلاعات"}</Typography>
                                    </CustomSubmitButton>

                                </Stack>
                            </Form>
                        );
                    }}
                </Formik>
            ) : (
                <EditProfileSkeleton />
            )}

        </Box>
    );
};

