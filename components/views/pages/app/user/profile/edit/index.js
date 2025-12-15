import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Redirect, useNavigate } from 'react-router-dom';
//formik
import { Formik, Form } from 'formik';
//ui-material
import { Paper, Box, Stack, Typography, useTheme, Divider, Button, CircularProgress } from "@mui/material";
import { styled } from '@mui/material/styles';
//tabler icon
import {
    IconUser, IconUserCheck, IconCircleCheckFilled, IconX

} from "@tabler/icons-react";
//project import
import { GetFileButtonWithCrop, uploadHandler, AvatarCropper } from 'views/utilities/uploadfile'
import CustomAvatar from "ui-component/extended/Avatar";
import DefaultAvatar from "assets/images/screen/default-avatar.jpg";
import api from 'api/api'
import dataHandler from 'api/dataHandler'
import { CustomTextField } from "views/utilities/inputs";
import PopperCalender from 'views/utilities/PopperCalender'
import { StartDate4MYSQL, persiandate } from 'utils/Lib'
import IconText from "views/utilities/IconText";
import { CustomSubmitButton } from "views/utilities/CustomLoadingButton";
import { showAlert } from "store/alertReducer";
import { MainCardWrapper } from "ui-component/cards/MainCardWrapper";
import EditProfileSkeleton from 'ui-component/cards/Skeleton/EditProfile'
import { hostAddress } from 'api/api'
import { base64ToBlob } from 'utils/Lib'

//--------------------------------------| Teb List |--------------------------------------
const Edit = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [usernameChecking, setUsernameChecking] = useState(false);
    const [usernameExists, setUsernameExists] = useState(null); // true/false/null
    const [userInfo, setUserInfo] = React.useState(null)
    const [percentUpload, setPercentUpload] = React.useState(0)
    const [cropedImage, setCropedImage] = React.useState(null)
    const [profileAvatar, setProfileAvatar] = React.useState(null)
    const [avatarPath, setAvatarPath] = React.useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const [data, setData] = useState([])
    const dispatch = useDispatch();
    const IconColor = theme.palette.grey[400]
    const TextColor = theme.palette.grey[600]
    function handleUploadComplete({ fileskey, filepath }) {

        setProfileAvatar(`${hostAddress}/${filepath}`)
        setAvatarPath(filepath)
    }
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget); // باز و بسته کردن منو
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const uploadFile = (file) => {
        const blobFile = base64ToBlob(file)
        uploadHandler({
            onChange: handleUploadComplete,
            fileObj: blobFile,
            sectionId: 1,
            setPercentOfFileUploaded: setPercentUpload
        })
    }
    const sendData = async (formData) => {

        formData.avatar_path = avatarPath//add profile avatar
        const result = dataHandler(api.userUpdate(), "post", formData);
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

    const getData = async () => {
        const result = dataHandler(api.getUserProfileInfo(), "get", "");
        try {
            result(async function (data, status) {
                const resultData = data.result
             
                if (status) {
                    if (resultData) {
                        setData(resultData)
                        if (resultData.avatar)
                            setProfileAvatar(
                                resultData?.avatar?.path
                                    ? `${hostAddress}/${resultData.avatar.path}`
                                    : DefaultAvatar
                            );

                        if (resultData.birthday_date) {
                            const [shamsiShort] = persiandate(resultData.birthday_date);

                            resultData.birthday_date_display = shamsiShort;
                        } else {
                            resultData.birthday_date_display = '';
                        }
                        if (resultData.username)
                            setUsernameExists(false)//green check icon 
                    }
                    else
                    {
                       navigate("./splash")
                    }

                }
                else
                    {
                        navigate("/splash")
                    }

            })
        } catch (error) {
            //error handle here
        }
    }
    const checkUsername = async (username) => {
        setUsernameChecking(true)
        const result = dataHandler(api.checkUserName(username), "get", "");
        try {
            result(async function (data, status) {

                if (status && data.result.valid) {

                    setUsernameExists(true); // اگه در دسترس نبود، یعنی قبلاً گرفته شده
                } else {
                    setUsernameExists(false);
                }
                setUsernameChecking(false)

            })
        } catch (error) {
            //error handle here
        }

    }

    React.useEffect(() => {

        console.log(percentUpload)

    }, [percentUpload]

    )
    React.useEffect(() => {
        getData()
    }, [])
    return (
        <Box
            sx={{ mb: 5 }}
        >
            {data ?
                <Formik
                    enableReinitialize
                    initialValues={{
                        first_name: data?.first_name || '',
                        last_name: data?.last_name || '',
                        bio: data?.bio || '',
                        username: data?.username || '',
                        email: data?.email || '',
                        shabaNumber: data?.shabaNumber || '',
                        birthday_date: data?.birthday_date || null,
                        birthday_date_display: data?.birthday_date_display || '',  // برای نمایش تو UI
                    }}
                    onSubmit={(values) => {
                        //هندل کردن مقدار خالی تاریخ تولد

                        sendData(values)
                        console.log(values)
                        // اینجا می‌تونی API ارسال اطلاعات رو بزنی
                    }}
                >
                    {({ values, handleChange, setFieldValue }) => {
                        // ✅ بررسی username در اینجا
                        React.useEffect(() => {

                            const timeout = setTimeout(() => {
                                if (values.username && values.username.length > 3) {
                                    checkUsername(values.username);
                                }
                            }, 500);

                            return () => clearTimeout(timeout);
                        }, [values.username]);

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
                                            //  background: theme.palette.grey[100]
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
                                                src={profileAvatar || DefaultAvatar}
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

                                    <Typography align={"right"} sx={{ fontWeight: 200, mt: 1, color: IconColor }}>
                                        <IconText text_pt={0.5} fontSize={12} icon={<IconUser />} color={TextColor} text={"اطلاعات پایه"} />
                                    </Typography>

                                    {/* Fields */}
                                    <Stack spacing={1}>
                                        <CustomTextField name="first_name" value={values.first_name} onChange={(e) => setFieldValue("first_name", e)} placeHolder="نام" />
                                        <CustomTextField name="last_name" value={values.last_name} onChange={(e) => setFieldValue("last_name", e)} placeHolder="نام خانوادگی" />

                                        <PopperCalender
                                            anchorEl={anchorEl}
                                            handleClose={handleClose}
                                            onChange={(e) => {
                                                const [shamsiShort, shamsiLong] = persiandate(e);
                                                setFieldValue("birthday_date", StartDate4MYSQL(e))
                                                setFieldValue("birthday_date_display", shamsiShort);
                                                handleClose();
                                            }}
                                        />
                                        <Box onClick={(e) => handleClick(e)}>
                                            <CustomTextField
                                                name="birthdayDate"
                                                value={values.birthday_date_display}
                                                readOnly
                                                placeHolder="تاریخ تولد"
                                            />
                                        </Box>

                                        <CustomTextField name="bio" value={values.bio} onChange={(e) => setFieldValue("bio", e)} placeHolder="بیوگرافی" />
                                    </Stack>

                                    <Divider />
                                    <Typography align={"right"} sx={{ fontWeight: 200, mt: 1, color: IconColor }}>
                                        <IconText text_pt={0.5} fontSize={12} icon={<IconUserCheck />} color={TextColor} text={"حساب کاربری"} />
                                    </Typography>


                                    <CustomTextField endIcon={usernameChecking ? <CircularProgress size={20} /> :
                                        usernameExists ?//check exist username and change icon in end field
                                            <IconX color="red" /> :
                                            <IconCircleCheckFilled color='green' />}
                                        name="username" value={values.username}
                                        onChange={(e) => setFieldValue("username", e)} placeHolder="نام کاربری" />
                                    <CustomTextField endIcon={<IconCircleCheckFilled />} name="email" value={values.email} onChange={(e) => setFieldValue("email", e)} placeHolder="ایمیل" />

                                    <Divider />

                                    <Typography align={"right"} sx={{ fontWeight: 200, mt: 1, color: IconColor }}>
                                        <IconText text_pt={0.5} fontSize={12} icon={<IconUserCheck />} color={TextColor} text={"حساب بانکی"} />
                                    </Typography>
                                    <CustomTextField name="shabaNumber" value={values.shabaNumber} onChange={handleChange} placeHolder="شماره شبا" />

                                    <CustomSubmitButton color={"primary"} variant={"contained"} borderRadius={3} padding={1.5}>
                                        <Typography fontSize={12}>{"ثبت اطلاعات"}</Typography>
                                    </CustomSubmitButton>

                                </Stack>
                            </Form >
                        )
                    }}
                </Formik > : <EditProfileSkeleton />
            }
        </Box>

    )
}
export default Edit