import * as React from "react";
import { useLocation } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
//ui-material
import {
     Box, Stack, Typography, useMediaQuery, useTheme,
    List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Link,Button
} from "@mui/material";
//tabler icon
import { IconList, IconMedal, IconOlympics, IconPhoto, IconPackageImportm, IconMailPlus } from '@tabler/icons-react'
//project import
import IconText from '@/components/ui-component/utilities/IconText'
import dataHandler from '@/components/api/dataHandler';
import api from 'api/api'
import ImageListCard from "ui-component/cards/Skeleton/UserList";
import CustomAvatar from 'ui-component/extended/Avatar'
import {showAlert} from "store/alertReducer";
import Transition from "ui-component/extended/Transitions";
import NotFoundPlaceHolder from 'ui-component/NotFound'
const InviteList = () => {
    const [inviteList, setInviteList] = React.useState([])
    const [loadedItems, setLoadedItems] = React.useState([]);
    const [notFound,setNotFound]=React.useState(false)
    const theme = useTheme();
    const dispatch=useDispatch();
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
    
    const acceptHandler=async(team_id,accepted)=>
    {
      const body=  {
            "team_id":team_id,
            "accepted":accepted
           
        }
       
        const result = dataHandler(api.acceptInvite(), "post", body);
        try {
            result(async function (data, status) {
             
                dispatch(showAlert(status ? data["message"] : data.response.data["message"],
                                     status ? "success" : "error"  ))


            })
        } catch (error) {
            //error handle here

        }
    }
    const getData = async (body) => {
        const result = dataHandler(api.listInvitedUser(body), "get", "");
        try {
            result(async function (data, status) {
                if (status)
                 
              
                    setInviteList(data.result)
                     setTimeout(()=>setNotFound(true), 5000)
                


            })
        } catch (error) {
            //error handle here

        }
    }
    return (<>

        <Box sx={{ p: 1 }}>
            <Typography variant="h6" align="right">
                <IconText text={  <Typography variant="h5" align="right"> درخواست های عضویت  </Typography>} icon={<IconList />} />
            </Typography>
            <Divider sx={{ m: 1 }} />

            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {inviteList && inviteList.length > 0 ? loadedItems.map((item,index) => (
                    <>
                      <Transition type={"fade"} in={true} key={index}>
                        <ListItem sx={{ direction: "rtl" }}>
                            <ListItemAvatar>
                                <Avatar ><IconMailPlus /></Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                sx={{ textAlign: "right", fontSize: 12}}
                                primary={`درخواست عضویت`}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            fontSize={12}
                                            align={"right"}
                                            component="span"
                                            variant="subtitle1"
                                            sx={{ color: theme.palette.primary.main, display: 'inline' }}
                                        >
                                            {
                                                <span>
                                                    شما به عضویت در تیم&nbsp;
                                                    <Link
                                                        sx={{
                                                            textDecoration: 'none', color: theme.palette.primary.light, fontWeight: 500,
                                                            '&:hover': {
                                                                textDecoration: 'none',
                                                            },
                                                        }}
                                                        href={`/app/team/profile?tid=${item.team_id}`}>
                                                        {item.team_name}
                                                    </Link>
                                                    &nbsp;دعوت شده‌اید.
                                                </span>
                                            }
                                        </Typography>

                                    </React.Fragment>
                                }
                            />
                            {/*  دکمه‌های تایید/رد */}
                            <Stack direction="row" spacing={1} mt={1} justifyContent="flex-end">
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="success"
                                    onClick={() => acceptHandler(item.team_id,true)}
                                    sx={{ml:1}}
                                >
                                   <span>تایید</span> 
                                </Button>
                                
                                <Button
                                    size="small"
                                    variant="outlined"
                                    color="error"
                                    onClick={() => acceptHandler(item.team_id,false)}
                                    sx={{mr:1}}
                                    
                                >
                                  <span> انصراف</span> 
                                </Button>
                            </Stack>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        </Transition>
                    </>
                )) :
                (
                          !notFound?  <ImageListCard />:<NotFoundPlaceHolder />
                          )}
            </List>

        </Box>
    </>)
}
export default InviteList