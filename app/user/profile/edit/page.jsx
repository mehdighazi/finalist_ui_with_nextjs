"use client";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRouter, useSearchParams } from 'next/navigation';
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
import { GetFileButtonWithCrop, uploadHandler, AvatarCropper } from '@/components/ui-component/utilities/uploadfile'
import CustomAvatar from "@/components/ui-component/extended/Avatar";
import DefaultAvatar from "@/components/assets//images/screen/default-avatar.jpg";
import api from '@/components/api/api';
import dataHandler from '@/components/api/dataHandler'
import { CustomTextField } from "@/components/ui-component/utilities/inputs";
import PopperCalender from '@/components/ui-component/utilities/PopperCalender'
import { StartDate4MYSQL, persiandate } from '@/components/utils/Lib'
import IconText from '@/components/ui-component/utilities/IconText'
import { CustomSubmitButton } from "@/components/ui-component/utilities/CustomLoadingButton";
import { showAlert } from "@/components/store/slices/alertSlice";
import { MainCardWrapper } from "@/components/ui-component/cards/MainCardWrapper";
import EditProfileSkeleton from '@/components/ui-component/cards/Skeleton/EditProfile'
import { hostAddress } from '@/components/api/api';
import { base64ToBlob } from '@/components/utils/Lib'

//--------------------------------------| Teb List |--------------------------------------
const Edit = () => {
    const theme = useTheme();
    const router = useRouter();
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
    const usernameTimeout = React.useRef(null);
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
            result(async function (res, status) {
                //setDialogOpen(false)
                if (status)
                    dispatch(showAlert({
                        message: res?.message,
                        type: status ? 'success' : 'error'
                    }));
                else dispatch(showAlert({
                    message: res?.response?.data?.message,
                    type: 'error'
                }));

            })
        } catch (error) {
            dispatch(showAlert({
                message: 'خطایی رخ داده',
                type: 'error'
            }));
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
                    else {
                        router.push("./splash")
                    }

                }
                else {
                    router.push("/splash")
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
     React.useEffect(() => {
        document.title = "ویرایش پروفایل | فینالیست";
    }, []);
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
                        const handleUsernameChange = (value, setFieldValue) => {
                            setFieldValue("username", value);

                            if (usernameTimeout.current) {
                                clearTimeout(usernameTimeout.current);
                            }

                            // اگر کاربر چیزی پاک کرد
                            if (value.length <= 3) {
                                setUsernameExists(null);
                                return;
                            }

                            usernameTimeout.current = setTimeout(() => {
                                checkUsername(value);
                            }, 500);
                        };
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
                                            p: 2,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: "relative",
                                                display: "inline-block",
                                            }}
                                        >
                                            <CustomAvatar
                                                size="sm"
                                                src={profileAvatar || DefaultAvatar}
                                                sx={{
                                                    width: 90,
                                                    height: 90,
                                                    cursor: "pointer",
                                                    border: "2px solid #fff",
                                                    boxShadow: theme.shadows[4],
                                                }}
                                                aria-label="profile picture"
                                                aria-haspopup="true"
                                            />

                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    right: 2,
                                                    bottom: 2,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    bgcolor: "rgba(255,255,255,0.75)",
                                                    backdropFilter: "blur(8px)",
                                                    borderRadius: "50%",
                                                    border: "1px solid rgba(255,255,255,0.4)",
                                                    boxShadow: theme.shadows[4],
                                                    p: 0.3,
                                                }}
                                            >
                                                <AvatarCropper
                                                    uploadIconButton
                                                    onChange={(e) => uploadFile(e)}
                                                />
                                            </Box>

                                            {percentUpload > 0 && percentUpload < 100 && (
                                                <Box
                                                    sx={{
                                                        position: "absolute",
                                                        inset: 0,
                                                        borderRadius: "50%",
                                                        bgcolor: "rgba(0,0,0,.45)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    <CircularProgress
                                                        variant="determinate"
                                                        value={percentUpload}
                                                        size={70}
                                                        thickness={4}
                                                    />
                                                </Box>
                                            )}
                                        </Box>
                                    </MainCardWrapper>

                                    <IconText text_pt={0.5} fontSize={12} icon={<IconUser />} color={TextColor} text={"اطلاعات پایه"} />

                                    {/* Fields */}
                                    <Stack spacing={2}> {/* تغییر از 1 به 2 برای فاصله بیشتر */}

                                        {/* فیلد نام */}
                                        <Box>
                                            <Typography   variant="body2" sx={{ mb: 0.5, fontWeight: 500, fontSize: '0.875rem' }}>
                                                نام
                                            </Typography>
                                            <CustomTextField
                                                name="first_name"
                                                value={values.first_name}
                                                onChange={(e) => setFieldValue("first_name", e)}
                                                placeHolder="نام"
                                            />
                                        </Box>

                                        {/* فیلد نام خانوادگی */}
                                        <Box>
                                            <Typography  textAlign={"right"} variant="body2" sx={{ mb: 0.5, fontWeight: 500, fontSize: '0.875rem' }}>
                                                نام خانوادگی
                                            </Typography>
                                            <CustomTextField
                                                name="last_name"
                                                value={values.last_name}
                                                onChange={(e) => setFieldValue("last_name", e)}
                                                placeHolder="نام خانوادگی"
                                            />
                                        </Box>

                                        {/* فیلد تاریخ تولد */}
                                        <Box>
                                            <Typography  textAlign={"right"} variant="body2" sx={{ mb: 0.5, fontWeight: 500, fontSize: '0.875rem' }}>
                                                تاریخ تولد
                                            </Typography>
                                            <PopperCalender
                                                anchorEl={anchorEl}
                                                handleClose={handleClose}
                                                onChange={(e) => {
                                                    const [shamsiShort, shamsiLong] = persiandate(e.value);
                                                    setFieldValue("birthday_date", StartDate4MYSQL(e.value))
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
                                        </Box>

                                        {/* فیلد بیوگرافی */}
                                        <Box>
                                            <Typography  textAlign={"right"} variant="body2" sx={{ mb: 0.5, fontWeight: 500, fontSize: '0.875rem' }}>
                                                بیوگرافی
                                            </Typography>
                                            <CustomTextField
                                                name="bio"
                                                value={values.bio}
                                                onChange={(e) => setFieldValue("bio", e)}
                                                placeHolder="بیوگرافی"
                                            />
                                        </Box>

                                    </Stack>

                                    <Divider />

                                    <IconText text_pt={0.5} fontSize={12} icon={<IconUserCheck />} color={TextColor} text={"حساب کاربری"} />

                                    {/* فیلد نام کاربری */}
                                    <Box>
                                        <Typography  textAlign={"right"} variant="body2" sx={{ mb: 0.5, fontWeight: 500, fontSize: '0.875rem' }}>
                                            نام کاربری
                                        </Typography>
                                        <CustomTextField
                                            endIcon={usernameChecking ? <CircularProgress size={20} /> :
                                                usernameExists ?
                                                    <IconX color="red" /> :
                                                    <IconCircleCheckFilled color='green' />
                                            }
                                            name="username"
                                            value={values.username}
                                            onChange={(e) => handleUsernameChange(e, setFieldValue)}
                                            placeHolder="نام کاربری"
                                        />
                                    </Box>

                                    {/* فیلد ایمیل */}
                                    <Box>
                                        <Typography  textAlign={"right"} variant="body2" sx={{ mb: 0.5, fontWeight: 500, fontSize: '0.875rem' }}>
                                            ایمیل
                                        </Typography>
                                        <CustomTextField
                                            endIcon={<IconCircleCheckFilled />}
                                            name="email"
                                            value={values.email}
                                            onChange={(e) => setFieldValue("email", e)}
                                            placeHolder="ایمیل"
                                        />
                                    </Box>

                                    <Divider />

                                    <IconText text_pt={0.5} fontSize={12} icon={<IconUserCheck />} color={TextColor} text={"حساب بانکی"} />

                                    {/* فیلد شماره شبا */}
                                    <Box>
                                        <Typography textAlign={"right"} variant="body2" sx={{ mb: 0.5, fontWeight: 500, fontSize: '0.875rem' }}>
                                            شماره شبا
                                        </Typography>
                                        <CustomTextField
                                            name="shabaNumber"
                                            value={values.shabaNumber}
                                            onChange={handleChange}
                                            placeHolder="شماره شبا"
                                        />
                                    </Box>

                                    <CustomSubmitButton color={"primary"} variant={"contained"} borderRadius={3} padding={1.5}>
                                        <Typography fontSize={12}>{"ثبت اطلاعات"}</Typography>
                                    </CustomSubmitButton>

                                </Stack>
                            </Form>
                        )
                    }}
                </Formik > : <EditProfileSkeleton />
            }
        </Box>

    )
}
export default Edit