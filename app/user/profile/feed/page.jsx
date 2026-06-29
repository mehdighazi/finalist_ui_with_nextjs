"use client"
import * as React from "react";
import {useLocation,useNavigate} from 'react-router-dom';
//ui-material
import {AppBar, Box, Chip, Divider, Grid, Tab, Tabs, Typography, useMediaQuery, useTheme} from "@mui/material";
//tabler icon
import {IconList, IconMedal, IconOlympics, IconPhoto} from '@tabler/icons-react'
//project import
import TopSection from './topSection/addContent'
import SportsTabContent from './tabs/sportsTab/page'
import CurrentMatchTabContent from "./tabs/currentMatchTab/page";
import ContentTabContent from './tabs/contentTab/contentTab'
import PropTypes from "prop-types";
import {styled} from "@mui/material/styles";
import dataHandler from '@/components/api/dataHandler';
import api from '@/components/api/api';
import {useParams} from "react-router";


//--------------------------------------| Teb List |--------------------------------------

const TabsList =
    [
        {
            label: "مسابقات",
            icon: IconList
        }
        ,
        {
            label: "ورزش ها",
            icon: IconOlympics
        },

       /* {
            label: "آلبوم تصاویر",
            icon: IconPhoto
        },
        /*{
            label: "افتخارات",
            icon: IconMedal
        }*/

    ]


//--------------------------------------| Style |-----------------------------------------
const BoxWrapped = styled(Box)(({theme}) => ({
    minWidth: "100%",
    marginTop: 8,
   // border: "1px solid",
    borderRadius: 3,
   // borderColor: theme.palette.divider,
    paddingLeft: "0%",
    padding: 0.5,

    //background:`${theme.palette.grey[200]}!important`,


}));
const TabWrapped = styled(Tab)(({theme}) => ({
    fontSize: 12,
    p: 0,
    minHeight: 50,
    //background:theme.palette.secondary.
}))
//--------------------------------------| Functions |-------------------------------------

//Content Sections
/*
/---------------
1-Profile Image
2-FullName
3-Follower
4-
 */
const Profile = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const [userID, setUserId] = React.useState()
    const [startGet,setStartGet]= React.useState(false)
    const [userInfo, setUserInfo] = React.useState()
    const location = useLocation();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    //const {id} = useParams();
    const queryParams = new URLSearchParams(location.search); // Extract query params
    const getData = (uid) => {

        const result = dataHandler(api.getUserInfo({uid: uid, m: "2"}), "get", "");

        try {
            result(async function (data, status) {
             
                setUserInfo({
                    fullname: data.result["fullname"],
                    avatar: data.result["avatar"],
                    bio:data.result["bio"],
                    isFollowing:data.result.isFollowing,
                    totalFollowers:data.result.totalFollowers
                })
            })
        } catch (error) {
            //error handle here

        }
    }
    React.useEffect(() => {
        setUserId(queryParams.get('uid'))
        if(queryParams.get('st')==='login')//if page redirect from login page
        setStartGet(true)
        getData(queryParams.get('uid'))
        const token = localStorage.getItem("token")
        if(!token&&!queryParams.get('uid'))//if dont login and dont have uid paramter in url
              navigate("/splash")

    }, [userID,setStartGet])

    function TabPanel(props) {
        const {children, value, index, ...other} = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{p: 0}}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

    const tabsHandleOnChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
             <Box sx={{p: 1, minHeight: "100hv"}}>
                <Grid container spacing={2}>
                    <Grid xs={12} lg={12} item>
                       
                        {<TopSection userID={userID} userInfo={userInfo}/>}
                   
                    </Grid>
                    <Grid xs={12} lg={12} item>
                        <Box sx={{width: "100%", direction: "rtl", mt: 1}}>
                            <AppBar position="static"
                                    sx={{boxShadow:0, direction: "rtl",
                                     width: "100%", fontSize: 12, 
                                     borderRadius: 2,
                                      background: "none"}}>
                                <Tabs
                                    value={value}
                                    onChange={tabsHandleOnChange}
                                    indicatorColor="secondary"
                                    textColor="inherit"
                                    variant={matchDownMd ? "fullWidth" : ""}
                                    aria-label="profile tabs"
                                >
                                    {
                                        TabsList.map((item, i) => {
                                            //if uid is not null in url parametr currentMatch tab should be disapear

                                            if (userID && i === 0)
                                                return ('')
                                            else {
                                                const Icon = item.icon

                                                return (<TabWrapped label={<span
                                                        style={{paddingRight: "1px", '&:hover': {
                                                                                                                cursor: 'pointer',
                                                                                                                color: theme.palette.primary.main,
                                                                                                            }}}>
                                                      <Chip
                                                          variant={"filled"}
                                                          sx={{
                                                              background: "none",
                                                              color: theme.palette.primary.main,
                                                              m: 0,
                                                              p: 0,
                                                              "& .MuiChip-label": {
                                                                  ml: 0,
                                                                  pr: 0,

                                                              }
                                                              , "& .MuiChip-icon ": {
                                                                  //mb: "4px",
                                                                  color: theme.palette.primary.main
                                                              }
                                                          }}
                                                          icon={!matchDownMd ? <Icon stroke={1.5} size="1.3rem"/> : ""}
                                                          size="small"
                                                          label={item.label}
                                                      />
                                                </span>} {...a11yProps(() => userID ? i : i + 1)} />
                                                )
                                            }


                                        })
                                    }

                                </Tabs>
                            </AppBar>
                        </Box>
                        <Divider/>
                        <BoxWrapped>
                            {/*if uid paramtr not valid add current match tab for logined user */}
                            {!userID ? <TabPanel value={value} index={0} dir={theme.direction}>
                                <Box sx={{mt: 0}}>
                                    {<CurrentMatchTabContent/>}
                                </Box>
                            </TabPanel> : ""
                            }
                            <TabPanel value={value} index={userID ? 0 : 1} dir={theme.direction}>
                                <Box sx={{mt: 1}}>
                                    {<SportsTabContent/>}
                                </Box>
                            </TabPanel>
                            <TabPanel value={value} index={userID ? 1 : 2} dir={theme.direction}>
                                <Box sx={{mt: 0}}>
                                    {<ContentTabContent uid={userID} userInfo={userInfo}/>}
                                </Box>
                            </TabPanel>

                            <TabPanel value={value} index={userID ? 2 : 3} dir={theme.direction}>
                                <Box sx={{mt: 0}}>
                                    {<h6></h6>}
                                </Box>
                            </TabPanel>
                        </BoxWrapped>
                    </Grid>

                </Grid>
                </Box>
            
        </>)

}
export default Profile