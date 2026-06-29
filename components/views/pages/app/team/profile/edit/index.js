import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
//formik
import { Formik, Form } from 'formik';
//ui-material
import {
    Box, Stack, Typography, useTheme, Divider, Button, CircularProgress, FormControl
    , FormHelperText, FormControlLabel, Checkbox, Paper
} from "@mui/material";
import { styled } from '@mui/material/styles';
//tabler icon
import {
    IconUser, IconUserCheck, IconCircleCheckFilled, IconX

} from "@tabler/icons-react";
//project import
import MainCard from 'ui-component/cards/MainCard_pre'
import { GetFileButtonWithCrop, uploadHandler, AvatarCropper } from '@/components/ui-component/utilities/uploadfile'
import CustomAvatar from "ui-component/extended/Avatar";
import DefaultAvatar from "@/components/assets//images/screen/default-avatar.jpg";
import  api from '@/components/api/api';
import dataHandler from '@/components/api/dataHandler'
import { CustomTextField } from "@/components/ui-component/utilities/inputs";
import PopperCalender from '@/components/ui-component/utilities/PopperCalender'
import { StartDate4MYSQL, persiandate } from 'utils/Lib'
import IconText from '@/components/ui-component/utilities/IconText'
import { CustomSubmitButton } from "@/components/ui-component/utilities/CustomLoadingButton";
import { showAlert } from "@/components/store/slices/alertSlice";
import { MainCardWrapper } from "ui-component/cards/MainCardWrapper";
import EditProfileSkeleton from 'ui-component/cards/Skeleton/EditProfile'
import {hostAddress}  from '@/components/api/api';
import { base64ToBlob } from 'utils/Lib'
//--------------------------------------| MainCard Wrapeer |------------------------------

//--------------------------------------| Teb List |--------------------------------------
const TeamEdit = () => {
    const theme = useTheme();
     const navigate = useNavigate()
    const location = useLocation()
    const [team_identifierChecking, setTeam_identifierChecking] = useState(false);
    const [team_identifiereExists, setTeam_identifierExists] = useState(null); // true/false/null
    const [userInfo, setUserInfo] = React.useState(null)
    const [percentUpload, setPercentUpload] = React.useState(0)
    const [cropedImage, setCropedImage] = React.useState(null)
    const [logo, setLogo] = React.useState(null)
    const [logoPath, setLogoPath] = React.useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const [teamId, setTeamId] = useState(null)
    const [data, setData] = useState()
    const dispatch = useDispatch();
    const IconColor = theme.palette.grey[400]
    const TextColor = theme.palette.grey[600]

    function handleUploadComplete(data) {

    const { fileskey, filepath }=data
        setLogo(`${hostAddress}/${filepath}`)
        setLogoPath(filepath)
        console.log(`${hostAddress}/${filepath}`)
    }

    const uploadFile = (file) => {
        const blobFile = base64ToBlob(file)
        uploadHandler({
            onChange: handleUploadComplete,
            fileObj: blobFile,
            sectionId: 4,//for save to team_media/logo path in fileup api 
            setPercentOfFileUploaded: setPercentUpload
        }) 
    }
    const sendData = async (formData) => {

        const result = dataHandler(api.teamUpdate(), "post", formData);

        try {
            result(async function (data, status) {


                //setDialogOpen(false)
                if (status)
                    dispatch(showAlert("عملیات موفقیت آمیز",
                        "success"))
                else dispatch(showAlert(data.response.data.message,
                    "error"))


            })
        } catch (error) {
            dispatch(showAlert("خطایی رخ داده",
                "error"))

        }
    }
    const getTeamData = async () => {
        const queryParams = new URLSearchParams(location.search);
        const result = dataHandler(api.teamInfo(queryParams.get('tid')), "get", "");
        setTeamId(queryParams.get('tid'))
        try {
            result(async function (data, status) {

                const result = data.result
                console.log("teamDAta",data)
                if (status) {
                    setLogo(
                        result?.logo?.logo_path
                            ? `${hostAddress}/${result.logo.logo_path}`
                            : ""
                    );

                    const [shamsiShort] = persiandate(result.createdAt);
                    result.createdAt = shamsiShort;

                    if (result.team_identifier)
                        setTeam_identifierExists(false)//green check icon 
                    setData(result)
                }

            })
        } catch (error) {
            //error handle here
        }
    }
    React.useEffect(() => {
        getTeamData()
    }, [])
    //-----------------------------------
        const getData = (body) => {
            const result = dataHandler(api.getUserInfo({ uid: '' }), "get", "");
            try {
                result(async function (data, status) {
     
                   
                    if (status) {
                        setUserInfo(data.result)
    
                    }
    
                   else navigate("/splash")
                })
            } catch (error) {
                //error handle here
    
            }
        }
        React.useEffect(() => {
            
            if (!userInfo)
                getData()
    
        }, [])
    
    const checkTeam_identifier = async (parametr) => {
        setTeam_identifierChecking(true)
        const result = dataHandler(api.teamIdentifierChecking(parametr), "get", "");
        try {
            result(async function (data, status) {
                if (status && data.result.valid) {

                    setTeam_identifierExists(true); // یعنی پارامتر قابل استفاده نیست
                } else {
                    setTeam_identifierExists(false);
                }
                setTeam_identifierChecking(false)

            })
        } catch (error) {
            //error handle here

            setTeam_identifierExists(true)
        }

    }

    React.useEffect(() => {

        console.log(percentUpload)

    }, [percentUpload]
    )
    return (
        <Box
        sx={{mb:5}}
        >
            {
                data ?
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
                        onSubmit={(values) => {
                            //هندل کردن مقدار خالی تاریخ تولد

                            sendData(values)

                            // اینجا می‌تونی API ارسال اطلاعات رو بزنی
                        }}
                    >
                        {({ values, handleChange, setFieldValue }) => {
                            // ✅ بررسی team_identifier در اینجا
                            React.useEffect(() => {

                                const timeout = setTimeout(() => {
                                    if (values.team_identifier && values.team_identifier.length > 8) {
                                        checkTeam_identifier(values.team_identifier);
                                    }
                                    else {
                                        setTeam_identifierExists(true)

                                    }
                                }, 500);

                                return () => clearTimeout(timeout);
                            }, [values.team_identifier]);

                            return (
                                <Form>
                                    <Stack spacing={2} sx={{ p: 1, px: 2, width: "100%", height: "100%", overflow: "auto", mb: 10 }}>

                                        {/* Avatar */}

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
                                            <Box
                                                sx={{
                                                    height: '100%',
                                                    // minHeight: 200, // می‌تونی ارتفاع دلخواه بزاری
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    position: 'relative',
                                                    p: 2,
                                                }}
                                            >
                                                <CustomAvatar
                                                    size="sm"
                                                    src={logo || DefaultAvatar}
                                                    sx={{
                                                        width: theme?.spacing?.(7) || 56,
                                                        height: theme?.spacing?.(7) || 56,
                                                        cursor: 'pointer',
                                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                                        mb: 2,
                                                    }}
                                                    aria-label="profile picture"
                                                    aria-haspopup="true"
                                                    color="inherit"
                                                />
                                                <Box sx={{ maxWidth: 250, position: "absolute", left: 19, bottom: 27 }}>

                                                    <AvatarCropper uploadIconButton={true} onChange={(e) => uploadFile(e)} />
                                                </Box>
                                            </Box>

                                        </MainCardWrapper>



                                        <Divider />
                                        <Typography align={"right"} sx={{ fontWeight: 200, mt: 1, color: IconColor }}>
                                            <IconText text_pt={0.5} fontSize={12} icon={<IconUser />} color={TextColor} text={"اطلاعات پایه"} />
                                        </Typography>


                                        {/* Fields */}
                                        <Stack spacing={1}>
                                            <CustomTextField color={theme.palette.primary[200]} name="team_name" value={values.team_name} readOnly={true} placeHolder="نام تیم" />
                                            <Box >
                                                <CustomTextField
                                                    color={theme.palette.primary[200]}
                                                    name="createdAt"
                                                    value={values.created_at}
                                                    readOnly
                                                    placeHolder=" تاریخ تاسیس"
                                                />
                                            </Box>

                                            <CustomTextField name="about" value={values.about} onChange={(e) => setFieldValue("about", e)} placeHolder="درباره تیم" />
                                        </Stack>

                                        <Divider />
                                        {/**-------------------------------------- چک باکس بانوان---------------------------- */}
                                        <Box textAlign={"right"} sx={{ width: "100%" }}>
                                            <FormControl sx={{ textAlign: "right" }}>
                                                <FormControlLabel
                                                    sx={{ ml: 11 }}
                                                    control={
                                                        <Checkbox
                                                            checked={values.is_womens || false}
                                                            onChange={(e) =>
                                                                setFieldValue("is_womens",
                                                                    e.target.checked
                                                                )
                                                            }
                                                        />
                                                    }
                                                    label="تیم بانوان می باشد"
                                                />
                                                <FormHelperText sx={{ color: "red", fontSize: 10 }} id="team-identifier-error">
                                                    <span>{"چنانچه تیم بانوان می باشید حتما این گزینه را فعال کنید"}</span>
                                                </FormHelperText>
                                            </FormControl>
                                        </Box>
                                        <Divider />
                                        {/**--------------------------------------شناسه تیم---------------------------- */}

                                        <Typography align={"right"} sx={{ fontWeight: 200, mt: 1, color: IconColor }}>
                                            <IconText text_pt={0.5} fontSize={12} icon={<IconUserCheck />} color={TextColor} text={"شناسه تیم"} />
                                        </Typography>
                                        <CustomTextField endIcon={team_identifierChecking ? <CircularProgress size={20} /> :
                                            team_identifiereExists ?//check exist username and change icon in end field
                                                <IconX color="red" /> :
                                                <IconCircleCheckFilled color='green' />}
                                            name="team_identifier" value={values.team_identifier}
                                            onChange={(e) => {
                                                setFieldValue("team_identifier", e)

                                            }} placeHolder="شناسه تیم" />


                                        <CustomSubmitButton color={"primary"} variant={"contained"} borderRadius={3} padding={1.5}>
                                            <Typography fontSize={12}>{"ثبت اطلاعات"}</Typography>
                                        </CustomSubmitButton>

                                    </Stack>
                                </Form >
                            )
                        }}
                    </Formik >
                    :
                    <EditProfileSkeleton />
            }
        </Box>
    )
}
export default TeamEdit