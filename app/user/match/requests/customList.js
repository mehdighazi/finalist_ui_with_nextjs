import * as React from "react";
import { useDispatch } from "react-redux";
//ui-material
import {
    Box,
    Button,
    IconButton, Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    Typography,
    useTheme
} from "@mui/material";
import { withStyles } from "@mui/styles";
//project import
import Avatar from 'ui-component/extended/Avatar';
import { IconChevronLeft, IconEye } from "@tabler/icons-react";
import { createDateLetter,createDateStr } from "utils/Lib";
import CustomRating from "ui-component/rating";
import { hostAddress } from "api/api";
import dataHandler from '@/components/api/dataHandler';
import api from '@/components/api/api';
import { useState } from "react";
//--------------------------------------| Custom ListBox |-------------------------------


const CustomList = ({ data, onChange }) => {
    const theme = useTheme();
    const [requesterMobile, setRequesterMobile] = useState("XXXXXXXXXXXX")
 
    const getInfo = (match_request_id) => {
        
        const result = dataHandler(api.getMatchRequesterInfo(match_request_id), "get", "");
        try {
            result(async function (data, status) {

                setRequesterMobile(data.result.requesterMobile)

            })
        } catch (error) {
            //error handle here
        }
       
        
    }
    //-----------------------------------------| Custom list Item |--------------------------


    return (<>
        <List sx={{
            width: '100%',
            "& .MuiListItem-root": {
                textAlign: 'right!important'
            }
        }}>{
                !data ? "" : data.map(item => (
                    <>

                        <Box sx={{
                            borderRadius: 1, mt: 1,
                            border: '1px solid',
                            borderColor: theme.palette.grey[100],
                            backgroundColor: item.accepted ? theme.palette.success.light : theme.palette.secondary.light,
                            cursor: 'pointer',

                            "&:hover": {
                                "-webkit-transition": " all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);",
                                " -ms-transition": "background-color  150ms linear",
                                transition: "all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)",


                            }
                        }}>
                            <ListItem
                                sx={{ cursor: "pointer" }}

                                alignItems="center">
                                <ListItemAvatar>
                                    <Stack sx={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}>
                                        <Avatar size='sm' src={item.requester_match_team.logo ? `${hostAddress}/${item.requester_match_team.logo["logo_path"]}` : ""} />

                                        <CustomRating size="small" name="read-only" readOnly />
                                    </Stack>

                                </ListItemAvatar>
                                <ListItemText
                                    sx={{ float: 'right', direction: 'rtl!important' }}
                                    primary={
                                        <Typography
                                            sx={{ display: 'inline', direction: 'rtl' }}
                                            align="right"
                                            component="div"

                                            color="text.primary"
                                        >
                                            <Link href='/store/home/team/detail'
                                                underline="none"
                                                sx={{
                                                    textDecoration: 'none',
                                                    //  color: `primary.main`
                                                }}>  {item.requester_match_team["team_name"]}</Link>
                                        </Typography>


                                    }
                                    color="text.primary"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                fontSize={"0.6rem"}
                                                sx={{ display: 'inline' }}
                                                align="right"
                                                component="span"
                                                // variant="h6"
                                                color={theme.palette.primary.light}

                                            >
                                                {createDateStr( createDateLetter(item["requested_at"]))}
                                            </Typography>

                                        </React.Fragment>
                                    }
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'start' }}>


                                    {/**  <Button disabled={item.accepted} onClick={(event) => onChange({ match_request_id: item["match_request_id"], creator_user_id: item.requester_match_team["creator_user_id"], requester_team_id: item.requester_match_team["team_id"] })} color={"success"} variant={"contained"}>

                                        {!item.accepted?<span>تایید </span>:<span>تایید شده </span>}

                                    </Button>
                                    */}
                                    <Stack spacing={0.5} direction={"row"}>
                                        <Typography sx={{ pt: 0.7 }} fontSize={"0.8rem"}>
                                            شماره تلفن سرپرست:
                                        </Typography>
                                        <Typography fontFamily={'numberfarsi'} sx={{ pt: 0.7 }} fontSize={"0.8rem"}>
                                            {requesterMobile}
                                        </Typography>
                                        <IconButton onClick={()=>getInfo(item.match_request_id)} sx={{ p: 0 }}>
                                            <IconEye />
                                        </IconButton>
                                    </Stack>


                                </Box>

                            </ListItem>
                        </Box>

                    </>))
            }


        </List>
    </>)

}
export default CustomList