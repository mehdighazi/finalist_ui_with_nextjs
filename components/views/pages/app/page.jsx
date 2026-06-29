import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

//ui-material
import {
    Box, Fab, Paper, useMediaQuery, useTheme,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
    ListItemIcon,
    Avatar,
    Chip,
    Popper,
    Link,
    ButtonBase,
    ClickAwayListener
} from "@mui/material";
import { styled, darken } from "@mui/material/styles";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
//assest
//project import
import { rlPadding } from 'store/constant'
import dataHandler from '@/components/api/dataHandler';
import {hostAddress}  from '@/components/api/api';
import Transitions from 'ui-component/extended/Transitions';
import MainCard from 'ui-component/cards/MainCard_pre';
import DialogBox from '@/components/ui-component/utilities/Dialog'
import CustomAvatar from 'ui-component/extended/Avatar'
//Tabler icon
import { IconBookmark, IconPennant2, IconSwords, IconHeart, IconHome, IconList, IconMenu2, IconChevronLeft, IconEdit, IconArrowsUpDown, IconUser } from '@tabler/icons-react';
//-------------------
// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    padding: 0,
    '&:hover': {
        background: theme.palette.primary[100]
    },
    '& .MuiListItem-root': {
        padding: 0
    }
}));



const DialogContentSelectTeam = ({ onChange, data }) => {
    const [value, setValue] = React.useState()
    const radioGroupRef = React.useRef(null);


    const itemSelectOnChangeHandler = (e) => {
        //set in local web storage for read later
        localStorage.setItem("team_info", JSON.stringify(e))
        setValue(e);
        onChange(e);


    }

    return (
        <>
            <Box sx={{ direction: 'rtl' }}>
                <List sx={{ width: "100%", bgcolor: 'background.paper' }}>

                    {data.map((item, i) => {
                        const labelId = `checkbox-list-label-${i}`;


                        return (
                            <ListItem
                                key={value}
                                secondaryAction={

                                    <CustomAvatar src={
                                        item?.logo?.logo_path
                                            ? `${hostAddress}/${item.logo.logo_path}`
                                            : ""
                                    } />

                                }
                                disablePadding
                            >
                                <ListItemButton
                                    onClick={() =>
                                        itemSelectOnChangeHandler({
                                            team_id: item.team_id,
                                            team_name: item.team_name,
                                            team_logo: item?.logo?.logo_path ?? "", // اگر null/undefined باشه، DefaultAvatar
                                        })
                                    }
                                    role={undefined} dense>
                                    <ListItemText

                                        sx={{ float: 'right', mr: '0.8rem', direction: "rtl", textAlign: 'right', }}
                                        id={labelId} primary={item["team_name"]} />
                                    <ListItemIcon>

                                        <IconChevronLeft />
                                        {/* <FormControlLabel
                                            value={`${item["team_name"]}_${item["team_id"]}`}
                                            key={item["team_id"]}
                                          //  control={<Radio/>}
                                           // label={item["team_name"]}
                                        />*/}
                                    </ListItemIcon>

                                </ListItemButton>
                            </ListItem>
                        );
                    })}

                </List>
            </Box>
        </>
    )
}
const TeamProfileMenuList = ({ onChange, teamID }) => {
    const theme = useTheme();
    let navi = useNavigate();
    const IconLeftChevron = () =>
        (<IconChevronLeft size={14} color={theme.palette.grey[400]} />)

    return (<>
        <List
            sx={{
                width: 150,
                maxWidth: 450,
                py: 0,
                borderRadius: '10px',
                [theme.breakpoints.down('md')]: {
                    with: 200
                },
                '& .MuiListItemSecondaryAction-root': {
                    top: 1
                },
                '& .MuiDivider-root': {
                    my: 0
                },
                '& .list-container': {
                    pl: 0
                },
                '& .MuiListItemAvatar-root':
                {
                    minWidth: "auto",
                    mx: 1
                }
            }}
        >
            {/**change team item */}
            <ListItemWrapper>
                <ListItem
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                    onClick={() => onChange('changeTeam')}
                >
                    <ListItemAvatar sx={{ ml: 0 }}>
                        <IconArrowsUpDown size={16} color={theme.palette.grey[400]} />
                    </ListItemAvatar>

                    <ListItemText
                        sx={{ mx: 0, textAlign: 'center', width: "100%" }}
                        primary={
                            <Typography textAlign="right" variant="caption" display="block" gutterBottom>
                                تغییر تیم
                            </Typography>
                        }
                    />


                </ListItem>
            </ListItemWrapper>
            {/*profile team item */}
            <ListItemWrapper>
                <ListItem
                disabled={!teamID}
                    component="a"
                    href={`/app/team/profile?tid=${teamID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        p: 0,
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        '&:hover': {
                            textDecoration: 'none'
                        },
                    }}
                //  onClick={() => navi()}
                >
                    <ListItemAvatar sx={{ ml: 0 }}>
                        <IconUser size={16} color={theme.palette.grey[400]} />
                    </ListItemAvatar>

                    <ListItemText
                        sx={{ mx: 0, textAlign: 'center', width: "100%" }}
                        primary={
                            <Typography textAlign="right" variant="caption" display="block" gutterBottom>
                                پروفایل
                            </Typography>
                        }
                    />


                </ListItem>
            </ListItemWrapper>
             {/**edit member team item */}
            <ListItemWrapper>
                <ListItem
                 disabled={!teamID}
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                    onClick={() => onChange('editMember')}
                >
                    <ListItemAvatar sx={{ ml: 0 }}>
                        <IconEdit size={16} color={theme.palette.grey[400]} />
                    </ListItemAvatar>

                    <ListItemText
                        sx={{ mx: 0, textAlign: 'center' }}
                        primary={
                            <Typography textAlign="right" variant="caption" display="block" gutterBottom>
                            ویرایش اعضا
                            </Typography>
                        }
                    />


                </ListItem>


            </ListItemWrapper>
            {/**edit team item */}
            <ListItemWrapper>
                <ListItem
                disabled={!teamID}
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                    onClick={() => onChange('editTeam')}
                >
                    <ListItemAvatar sx={{ ml: 0 }}>
                        <IconEdit size={16} color={theme.palette.grey[400]} />
                    </ListItemAvatar>

                    <ListItemText
                        sx={{ mx: 0, textAlign: 'center' }}
                        primary={
                            <Typography textAlign="right" variant="caption" display="block" gutterBottom>
                                ویرایش
                            </Typography>
                        }
                    />


                </ListItem>


            </ListItemWrapper>
        </List>

    </>)
}
const TeamProfile = ({ onChange, userTeamList, teamInfo }) => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
    let navi = useNavigate();

    //-----------------------------------------------
    const [teamName, setTeamName] = React.useState(null)
    const [teamID, setTeamID] = React.useState(null)
    const [logo, setLogo] = React.useState(null)
    const [logoPath, setLogoPath] = React.useState(null)
    const [dialogOpen, setDialogOpen] = React.useState(false);
    //------------------------------------------------------------Functions
    const teamRadioOnchange = (value) => {
        const { team_id, team_name, team_logo } = value
        setTeamName(team_name)
        setTeamID(team_id)
        setLogo(team_logo)
        onChange(value)
        setDialogOpen(false)

    }
    React.useEffect(() => {

        if (teamInfo) {
            const { team_id, team_name, team_logo } = teamInfo
            setTeamName(team_name)
            setTeamID(team_id)
            setLogo(team_logo)

        }
        setLogoPath(`${hostAddress}${logo}`)

    }, [teamInfo])

    React.useEffect(() => {

        setLogoPath(`${hostAddress}${logo}`)

    }, [teamID])
    //-----------------------------------------------
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);
    const handleMenuOnChange = (event) => {
        //get event from menu
        if (event === 'changeTeam') {
            setDialogOpen(true)
        }
        else if (event === 'editTeam') {
            navi(`team/profile/edit?tid=${teamID}`)

        }
         else if (event === 'editMember') {
          
            navi(`user/team/member/edit/list/${teamID}`)

        }
    };

    return (
        <>
            <DialogBox title={"انتخاب تیم"} onChange={(event) => setDialogOpen(event)}
                open={dialogOpen}
                content={<DialogContentSelectTeam data={userTeamList} onChange={(e) => teamRadioOnchange(e)} />} />
            <Box
                sx={{
                    mb: 1,
                    // ml: 2,
                    //  mr: 3,
                    [theme.breakpoints.down('md')]: {
                        //    mr: 2
                    }
                }}
            >
                <ButtonBase onClick={handleToggle} sx={{ borderRadius: 0 }}>
                    <Chip
                        sx={{
                            // justifyContent: "left",
                            border: 0,
                            background: "none",
                            mr: 0,
                            mt: 0,
                            direction: "ltr",

                            display: "flex",
                            flexDirection: "row-reverse", // تغییر ترتیب عناصر
                            alignItems: "center",

                            "& .MuiChip-label": {
                                ml: 0,
                                pr: 0,

                            }
                            , "& .MuiChip-avatar ": {
                                mb: "1px",
                                width: 30,
                                height: 30

                            }
                        }}
                        avatar={
                            <Avatar
                                variant="rounded"
                                sx={{
                                    cursor: 'pointer',
                                    borderRadius: "50%",
                                    width: 28,
                                    height: 28,
                                    bgcolor: 'grey.200',
                                    transition: 'all 0.2s',
                                    ...(open && {
                                        boxShadow: 2,
                                        bgcolor: 'primary.light'
                                    })
                                }}
                                ref={anchorRef}
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"

                                color="inherit"
                                src={logoPath ?? ""}
                            >

                            </Avatar>
                        }
                        size="small"
                        label={<Typography
                            noWrap
                            sx={{
                                cursor: 'pointer',
                                maxWidth: 120,
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                color: theme.palette.secondary.main
                            }}
                        >
                            {teamName}
                        </Typography>}
                    />

                </ButtonBase>
            </Box>
            <Popper
                sx={{ zIndex: 50 }}
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? 5 : 0, 20]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
                        <Paper
                            sx={{ zIndex: 50 }}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <TeamProfileMenuList teamID={teamID} onChange={(e) => handleMenuOnChange(e)} />
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};



function PagesBottomNavigation({ customWidth }) {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const matchDown400 = useMediaQuery(('(max-width:400px)'));

    const [teamInfo, setTeamInfo] = React.useState("")

    const [userTeamList, setUserTeamList] = React.useState([])
    const getData = () => {

        console.log(api.listUserTeam())
        const result = dataHandler(api.listUserTeam(), "get", "");
        try {
            result(async function (data, status) {
                console.log(data)
                if (status) {
                    setUserTeamList(data.result)
                }
            })
        } catch (error) {
            //error handle here

        }
    }
    //------------------------------------------------------------
    React.useEffect(() => {
        if (userTeamList.length === 0) {
            getData();

        }
        //retrive team_info from local storage
        const team_info = localStorage.getItem("team_info")
        //const jsonObj = 
        setTeamInfo(JSON.parse(team_info))

    }, [])
    //for redirect page if bottomNavgation change value
    let navi = useNavigate();

    React.useEffect(() => {

        switch (value) {
            case 0:

                break;
            case 1:
                navi('/app/user/match/create')
                break;
            case 2:
                navi('/app/match/list')
                break;
            case 3:
                // window.open(`/site/app/team/profile?tid=${teamInfo.team_id}`, '_blank');

                break;
            case 4:

                break;
            default:
                break;
        }

    }, [value])
    const elemSX = {
        color: theme.palette.orange.main,
        '& .hover':
        {
            cursor: 'pointer'
        },
        '& .MuiBottomNavigationAction-label': {
            fontSize: '0.55rem', // فونت کوچک‌تر
        },
        '&.Mui-selected': {
            color: darken(theme.palette.orange.main, 0.2), // 20% تیره‌تر از رنگ اصلی, // رنگ آیکون و متن در حالت انتخاب‌شده
            fontSize: '0.55rem', // فونت کوچک‌تر
        }

    }
    const iconSize = 18
    return (

        <Paper sx={{ position: 'fixed', bottom: 0, left: matchUpMd ? rlPadding : 0, right: matchUpMd ? rlPadding : 0, height: 45 }}
            elevation={3}>
            <BottomNavigation
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    minWidth: "100%",
                    bottom: 0,

                    p: 0

                }}
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    //alert(newValue)

                    setValue(newValue);
                }}
            >

                <BottomNavigationAction label={<span>نشان شده ها</span>} sx={elemSX} icon={<IconBookmark size={iconSize} />} />
                <BottomNavigationAction label={<span>شروع مسابقه</span>} sx={elemSX} icon={<IconSwords size={iconSize} />} />
                <BottomNavigationAction label={<span> مسابقات</span>} sx={elemSX} icon={<IconPennant2 size={iconSize} />} />
                <BottomNavigationAction label={""} sx={elemSX} icon={<TeamProfile teamInfo={teamInfo ?? ""} userTeamList={userTeamList} onChange={(e) => console.log(e)} />} />
            </BottomNavigation>
        </Paper>

    );
}

const Home = () => {
    const boxRef = useRef(null);
    const [boxWidth, setBoxWidth] = useState(0);
    const location = useLocation();
    const hiddenPaths = ['/app/user/match/create',
        //'/app/user/profile',
        '/app/user/team/create',
        //'/app/user/team/member/edit/list' // مسیر کلی بدون آی‌دی];
    ]
    const shouldShowBottomNav = hiddenPaths.some(path => location.pathname.startsWith(path));

    useEffect(() => {

        if (boxRef.current) {
            setBoxWidth(boxRef.current.offsetWidth);
        }

        const handleResize = () => {
            if (boxRef.current) {
                setBoxWidth(boxRef.current.offsetWidth);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (<>
        <Box ref={boxRef} sx={{ p: 0, pr: 0, position: "relative", minHeight: "100vh" }}>

            <Outlet />
            {!shouldShowBottomNav && <PagesBottomNavigation customWidth={boxWidth} />}
        </Box>


    </>)
}
export default Home;
