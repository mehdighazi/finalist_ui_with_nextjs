"use client"
import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
//ui-material
import {
    Box, Stack, Typography, useMediaQuery, useTheme,
    List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Link, Button
} from "@mui/material";
//tabler icon
import { IconList, IconMedal, IconOlympics, IconPhoto, IconPackageImportm, IconMailPlus } from '@tabler/icons-react'
//project import
import IconText from '@/components/ui-component/utilities/IconText'
import dataHandler from '@/components/api/dataHandler';
import api from '@/components/api/api';
import ImageListCard from "@/components/ui-component/cards/Skeleton/UserList";
import CustomAvatar from '@/components/ui-component/extended/Avatar'
import { showAlert } from "@/components/store/slices/alertSlice";
import Transition from "@/components/ui-component/extended/Transitions";
import NotFoundPlaceHolder from '@/components/ui-component/NotFound'
const InviteList = () => {
    const [inviteList, setInviteList] = React.useState([])
    const [loadedItems, setLoadedItems] = React.useState([]);
    const [notFound, setNotFound] = React.useState(false)
    const theme = useTheme();
    const dispatch = useDispatch();
    React.useEffect(() => {

        getData() 
    }, [])
    React.useEffect(() => {
        inviteList.forEach((item, index) => {
            setTimeout(() => {
                setLoadedItems((prev) => [...prev, item]);
            }, index * 100);
        });
    }, [inviteList]);

    const acceptHandler = async (team_member_id, accepted,team_id) => {
        console.log(team_member_id, accepted,team_id)
        const body = {
            team_member_id: team_member_id,
            accepted: accepted,
            team_id:team_id

        }

        const result = dataHandler(api.acceptInvite(), "post", body);
        try {
            result(async function (data, status) {

                dispatch(showAlert({
                    message: data?.message,
                    type: status ? 'success' : 'error'
                }));


            })
        } catch (error) {
            ispatch(showAlert({
                message: 'خطایی رخ داده',
                type: 'error'
            }));

        }
    }
    const getData = async (body) => {
        const result = dataHandler(api.listInvitedUser(body), "get", "");
        try {
            result(async function (data, status) {
                if (status)


                    setInviteList(data.result)
                setTimeout(() => setNotFound(true), 5000)



            })
        } catch (error) {
            //error handle here

        }
    }
    return (<>

        <Box sx={{ p: 1 }}>

            <IconText text={<Typography variant="h5" align="right"> درخواست های عضویت  </Typography>} icon={<IconList />} />

            <Divider sx={{ m: 1 }} />

            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {inviteList && inviteList.length > 0 ? loadedItems.map((item, index) => (
                    <>
                        <Transition type={"fade"} in={true} key={index}>
                            <ListItem sx={{ direction: "rtl", alignItems: "flex-start" }}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <IconMailPlus />
                                    </Avatar>
                                </ListItemAvatar>

                                <Box sx={{ flex: 1 }}>
                                    <ListItemText
                                        primary="درخواست عضویت"
                                        secondary={
                                            <Typography
                                                component="div"
                                                fontSize={12}
                                                align="right"
                                                sx={{ mt: 0.5 }}
                                            >
                                                <span>
                                                    شما به عضویت در تیم&nbsp;
                                                    <Link
                                                        href={`/team/profile/feed?tid=${item.team_id}`}
                                                        sx={{
                                                            textDecoration: "none",
                                                            color: theme.palette.primary.light,
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {item.team_name}
                                                    </Link>
                                                    &nbsp;دعوت شده‌اید.
                                                </span>
                                            </Typography>
                                        }
                                    />

                                    <Box
                                        direction="row"
                                        justifyContent="center"
                                        spacing={2}
                                        sx={{ mt: 2 }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="success"
                                            size="small"
                                            sx={{ minWidth: 110, m: 1 }}
                                            onClick={() => acceptHandler(item.members[0].team_member_id, true,item.team_id)}
                                        >
                                            <span>تایید</span>
                                        </Button>

                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            sx={{ minWidth: 110 }}
                                            onClick={() =>acceptHandler(item.members[0].team_member_id, false,item.team_id)}
                                        >
                                            <span>انصراف</span>
                                        </Button>
                                    </Box>
                                </Box>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </Transition>
                    </>
                )) :
                    (
                        !notFound ? <ImageListCard /> : <NotFoundPlaceHolder />
                    )}
            </List>

        </Box>
    </>)
}
export default InviteList