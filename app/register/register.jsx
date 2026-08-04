"use client"
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
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
import { GetFileButtonWithCrop, uploadHandler } from '@/components/ui-component/utilities/uploadfile'
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

//--------------------------------------| Teb List |--------------------------------------
const Register = () => {
    const theme = useTheme();
    const [mobile, setMobile] = useState("")
    const [usernameChecking, setUsernameChecking] = useState(false);
    const [usernameExists, setUsernameExists] = useState(null); // true/false/nul
    const [percentUpload, setPercentUpload] = React.useState(0)
    const [avatarPath, setAvatarPath] = React.useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const [data, setData] = useState([])
    const dispatch = useDispatch();
    const router = useRouter();
    const [value, setValue] = useState({
        birthdayDate: "",

    });
    React.useEffect(() => {
        const getCode = localStorage.getItem("mobile")
        if (getCode)//if redirect from login page else navigate to login page
        {
            setMobile(getCode)
            localStorage.removeItem("mobile")
        }
    }, [])

    const handleClick = (event) => {

        setAnchorEl(anchorEl ? null : event.currentTarget); // باز و بسته کردن منو
    };
    const handleClose = () => {
        setAnchorEl(null);

    };


    const sendData = async (formData) => {

        //add mobile to formData
        formData.mobile = mobile

        const result = dataHandler(api.createUser(), "post", formData);
        try {
            result(async function (data, status) {


                //setDialogOpen(false)
                if (status) {
                    const userInfo = {
                        fullname: resultData.fullname || [resultData.first_name, resultData.last_name].filter(Boolean).join(' ') || 'کاربر',
                        first_name: resultData.first_name || '',
                        last_name: resultData.last_name || '',
                        avatar: resultData.avatar || null,
                        token: resultData.token || '',
                        type: resultData.type || 'active',
                        ...resultData,
                    };

                    localStorage.setItem("token", resultData.token || "")
                    localStorage.setItem("userInfo", JSON.stringify(userInfo))
                    localStorage.setItem("token", data.result.token)
                    dispatch(showAlert({
                        message: 'ورود موفقیت آمیز',
                        type: 'success'
                    }));


                    const timeout = setTimeout(() => {
                        router.push(`/user/profile/feed?st=login`)
                    }, 500);
                }
                else dispatch(showAlert({
                    message: 'خطایی رخ داده',
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


    return (
        data ?
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

                                {/* فیلدها با لیبل */}
                                <Stack spacing={2}> {/* فاصله بین فیلدها */}

                                    {/* فیلد نام */}
                                    <Box>
                                        <Typography textAlign={"right"} variant="body2" sx={{ mb: 0.5, fontWeight: 500, fontSize: '0.875rem' }}>
                                            نام
                                        </Typography>
                                        <CustomTextField
                                            sx={{ ...theme.typography.customInput, p: 5 }}
                                            name="first_name"
                                            value={values.first_name}
                                            onChange={(e) => setFieldValue("first_name", e)}
                                            placeHolder="نام"
                                        />
                                    </Box>

                                    {/* فیلد نام خانوادگی */}
                                    <Box>
                                        <Typography textAlign={"right"} variant="body2" sx={{ mb: 0.5, fontWeight: 500, fontSize: '0.875rem' }}>
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
                                        <Typography textAlign={"right"} variant="body2" sx={{ mb: 0.5, fontWeight: 500, fontSize: '0.875rem' }}>
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

                                    {/* فیلد نام کاربری */}
                                    <Box>
                                        <Typography textAlign={"right"} variant="body2" sx={{ mb: 0.5, fontWeight: 500, fontSize: '0.875rem' }}>
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
                                            onChange={(e) => setFieldValue("username", e)}
                                            placeHolder="نام کاربری"
                                        />
                                    </Box>

                                </Stack>

                                {/* دکمه ثبت */}
                                <CustomSubmitButton color={"primary"} variant={"contained"} padding={1.5}>
                                    <Typography fontSize={12}>{"قبول قوانین و ثبت"}</Typography>
                                </CustomSubmitButton>

                            </Stack>
                        </Form>
                    )
                }}
            </Formik > : <EditProfileSkeleton />

    )
}
export default Register