"use client"
import * as React from "react";
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
//ui-material
import {
    Box, Stack, Typography, useMediaQuery, useTheme,
    List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Link, Button, IconButton
} from "@mui/material";
//tabler icon
import { IconList, IconMail, IconTrash, IconX } from '@tabler/icons-react'
//project import
import IconText from '@/components/ui-component/utilities/IconText'
import dataHandler from '@/components/api/dataHandler';
import api from '@/components/api/api';
import ImageListCard from "@/components/ui-component/cards/Skeleton/ImageListCard";
import CustomAvatar from '@/components/ui-component/extended/Avatar'
import { showAlert } from "@/components/store/slices/alertSlice";
import Transition from "@/components/ui-component/extended/Transitions";
import NotFoundPlaceHolder from '@/components/ui-component/NotFound'
const NotifList = () => {
    const [notifList, setNotifList] = React.useState([])
    const [loadedItems, setLoadedItems] = React.useState([]);
    const [notFound, setNotFound] = React.useState(false)
    const theme = useTheme();
    const dispatch = useDispatch();
    React.useEffect(() => {

        getData()
    }, [])
    React.useEffect(() => {
        notifList.forEach((item, index) => {
            setTimeout(() => {
                setLoadedItems((prev) => [...prev, item]);
            }, index * 100);
        });
    }, [notifList]);

    const deleteHandler = async (notification_id) => {

        const result = dataHandler(api.notificationDelete(notification_id), "get", "");
        try {
            result(async function (data, status) {
                dispatch(showAlert({
                    message: status ? data.message : (data.response?.data?.message || "خطا در ارسال اطلاعات"),
                    type: status ? "success" : "error"
                }));


            })
        } catch (error) {
            dispatch(showAlert({
                message: "خطایی رخ داده است",
                type: 'error'
            }));

        }
    }

    const getData = async (body) => {
        const result = dataHandler(api.notificationList('', 'profile'), "get", "");
        try {
            result(async function (data, status) {
                if (status)

                    setTimeout(() => setNotFound(true), 5000)
                setNotifList(data.result.data)



            })
        } catch (error) {
            //error handle here
            throw new Error("خطا در دریافت اطلاعات اعلان ها:", error);

        }
    }
    return (<>

        <Box sx={{ p: 1, height: "100vh", mb: 5, pb: 10 }}>

            <IconText text={"اعلان ها"} icon={<IconList />} />

            <Divider sx={{ m: 1 }} />

            <List sx={{ width: '100%', bgcolor: 'background.paper', mb: 5 }}>
                {notifList && notifList.length > 0 ? loadedItems.map((item, index) => (
                    <>
                        <Transition type={"fade"} in={true} key={index}>
                            <ListItem sx={{ direction: "rtl" }}>
                                <ListItemAvatar>
                                    <Avatar ><IconMail /></Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{ textAlign: "right", fontSize: 14 }}
                                    primary={'پیام سیستمی'}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                fontSize={12}
                                                align={"right"}
                                                component="span"
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.primary.main, display: 'inline' }}
                                            >

                                                {item.content}

                                            </Typography>

                                        </React.Fragment>
                                    }
                                />
                                {/*  دکمه‌های تایید/رد */}
                                <Stack direction="row" spacing={1} mt={1} justifyContent="flex-end">


                                    <IconButton
                                        size="small"
                                        variant="outlined"
                                        color="error"
                                        onClick={() => deleteHandler(item.notification_id)}
                                        sx={{ mr: 1 }}

                                    >
                                        <IconX size={16} />
                                    </IconButton>
                                </Stack>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </Transition>
                    </>

                )) : !notFound ? <ImageListCard /> : <NotFoundPlaceHolder />}
            </List>

        </Box>
    </>)
}
export default NotifList