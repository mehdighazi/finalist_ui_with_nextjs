import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
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
import CustomAvatar from "ui-component/extended/Avatar";
import DefaultAvatar from "assets/images/screen/default-avatar.jpg";
import api from 'api/api'
import dataHandler from 'api/dataHandler'
import { CustomTextField } from "@/components/ui-component/utilities/inputs";
import PopperCalender from '@/components/ui-component/utilities/PopperCalender'
import { StartDate4MYSQL, persiandate } from 'utils/Lib'
import IconText from '@/components/ui-component/utilities/IconText'
import { CustomSubmitButton } from "@/components/ui-component/utilities/CustomLoadingButton";
import { showAlert } from "@/components/store/slices/alertSlice";
import { MainCardWrapper } from "ui-component/cards/MainCardWrapper";
import EditProfileSkeleton from 'ui-component/cards/Skeleton/EditProfile'
import { hostAddress } from 'api/api'

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
    let navi = useNavigate();
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
                    console.log(data.result.token)
                      localStorage.setItem("token", data.result.token)
                    dispatch(showAlert("عملیات موفقیت آمیز",
                        "success"))
                    
                       
                        const timeout = setTimeout(() => {
                            navi(`/app/user/profile?st=login`)
                        }, 500);
                }
                else dispatch(showAlert(data.response.data.message,
                    "error"))


            })
        } catch (error) {
            dispatch(showAlert("خطایی رخ داده",
                "error"))

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


                                {/* Fields */}
                                <Stack spacing={1}>

                                    <CustomTextField sx={{ ...theme.typography.customInput, p: 5 }} name="first_name" value={values.first_name} onChange={(e) => setFieldValue("first_name", e)} placeHolder="نام" />
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


                                </Stack>



                                <CustomTextField endIcon={usernameChecking ? <CircularProgress size={20} /> :
                                    usernameExists ?//check exist username and change icon in end field
                                        <IconX color="red" /> :
                                        <IconCircleCheckFilled color='green' />}
                                    name="username" value={values.username}
                                    onChange={(e) => setFieldValue("username", e)} placeHolder="نام کاربری" />





                                <CustomSubmitButton color={"primary"} variant={"contained"} borderRadius={3} padding={1.5}>
                                    <Typography fontSize={12}>{"قبول قوانین و ثبت"}</Typography>
                                </CustomSubmitButton>

                            </Stack>
                        </Form >
                    )
                }}
            </Formik > : <EditProfileSkeleton />

    )
}
export default Register