import * as React from "react";
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
//ui-material
import {
    Box, Stack, Typography, useMediaQuery, useTheme,
    List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Link, Button,IconButton
} from "@mui/material";
//tabler icon
import { IconList, IconMail,IconTrash,IconX } from '@tabler/icons-react'
//project import
import IconText from "views/utilities/IconText";
import dataHandler from "api/dataHandler";
import api from 'api/api'
import ImageListCard from "ui-component/cards/Skeleton/ImageListCard";
import CustomAvatar from 'ui-component/extended/Avatar'
import { showAlert } from "store/alertReducer";
import Transition from "ui-component/extended/Transitions";
import NotFoundPlaceHolder from 'ui-component/NotFound'
const NotifList = () => {
    const [notifList, setNotifList] = React.useState([])
    const [loadedItems, setLoadedItems] = React.useState([]);
     const [notFound,setNotFound]=React.useState(false)
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

                dispatch(showAlert(status ? data["message"] : data.response.data["message"],
                    status ? "success" : "error"))


            })
        } catch (error) {
            //error handle here

        }
    }
    
    const getData = async (body) => {
        const result = dataHandler(api.notificationList('','profile'), "get", "");
        try {
            result(async function (data, status) {
                if (status)
                    console.log(data)         
                   setTimeout(()=>setNotFound(true), 5000)
                    setNotifList(data.result.data)



            })
        } catch (error) {
            //error handle here

        }
    }
    return (<>

        <Box sx={{ p: 1,height:"100vh",mb:5,pb:10 }}>
            <Typography variant="h4" align="right">
                <IconText text={"اعلان ها"} icon={<IconList />} />
            </Typography>
            <Divider sx={{ m: 1 }} />

            <List sx={{ width: '100%', bgcolor: 'background.paper',mb:5 }}>
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
                                        <IconX size={16}/>
                                    </IconButton>
                                </Stack>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </Transition>
                    </>
                     
                )) : !notFound? <ImageListCard />:<NotFoundPlaceHolder /> }
            </List>

        </Box>
    </>)
}
export default NotifList