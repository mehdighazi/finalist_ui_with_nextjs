import * as React from "react";
import { useEffect, useRef, useState } from "react";
//ui-material
import { ClickAwayListener, Paper, Popper, ButtonBase, useMediaQuery, Avatar, Box, Chip, IconButton, Typography, useTheme } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

//project import
import dataHandler from "api/dataHandler";
import api, { hostAddress } from "api/api";
import CustomAvatar from 'ui-component/extended/Avatar'
import MainCard from 'ui-component/cards/MainCard_pre';
import Transitions from 'ui-component/extended/Transitions';
import DialogBox from 'views/utilities/Dialog'
import { IconChevronDown, IconChevronLeft } from "@tabler/icons-react";
import DefaultAvatar from "../../assets/images/screen/default-avatar.jpg";
//-------------------------------------------Content
const DialogContentSelectTeam = ({ onChange, data }) => {
    const [value, setValue] = React.useState()
    const radioGroupRef = React.useRef(null);

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };
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

                                    <CustomAvatar src={item && item.logo["logo_path"]
                                        ? `${hostAddress}/${item.logo["logo_path"]}` : DefaultAvatar} />

                                }
                                disablePadding
                            >
                                <ListItemButton
                                    onClick={() => itemSelectOnChangeHandler({
                                        team_id: item["team_id"], team_name: item["team_name"]
                                        , team_logo: item.logo['logo_path']
                                    })}
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

//-------------------------------------------Main Select Team Chip
export const SelectTeamChip = ({ onChange }) => {
    const theme = useTheme();
    const [teamName, setTeamName] = React.useState(null)
    const [teamID, setTeamID] = React.useState(null)
    const [logo, setLogo] = React.useState(null)
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [userTeamList, setUserTeamList] = React.useState([])
    //------------------------------------------------------------Functions
    const teamRadioOnchange = (value) => {
        //splite team select radio value teamname_teamid
        const { team_id, team_name, team_log } = value

        setTeamName(team_name)
        setTeamID(team_id)
        setLogo(team_log)
        onChange(value)
        setDialogOpen(false)

    }
    const getData = () => {
        const result = dataHandler(api.listUserTeam(), "get", "");

        try {
            result(async function (data, status) {
                // console.log(data.result["teams"])
                if (status) {
                    setUserTeamList(data.result)
                    // console.log(data.result[0].teams["team_name"])
                    setTeamName(data.result[0]["team_name"])
                    //{`${item["team_name"]}_${item["team_id"]}`}
                    onChange({
                        team_id: data.result[0]["team_id"], team_name: data.result[0]["team_name"]
                        , team_logo: data.result[0].logo['logo_path']
                    })
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

        } else if (!teamName)
            console.log(userTeamList)
        // setTeamName(userTeamList[0].teams["team_name"])

    }, [])
    return (<>
        <DialogBox title={"انتخاب تیم"} onChange={(event) => setDialogOpen(event)}
            open={dialogOpen}
            content={<DialogContentSelectTeam data={userTeamList} onChange={(e) => teamRadioOnchange(e)} />} />
        <Chip
            deleteIcon={<IconChevronDown />}
            variant={"outlined"}
            onDelete={() => setDialogOpen(true)}
            sx={{
                px: 1,
                background: "none",
                mr: 0,
                mt: 2,
                "& .MuiChip-label": {
                    ml: 2,
                    pr: 0
                }
                , "& .MuiChip-icon ": {
                    mb: "4px",

                },
                "& .MuiChip-deleteIcon": {
                    mr: "-20px",

                }
            }}
            avatar={<Avatar sx={{ m: 0 }} alt="Natacha" src={logo} />}
            label={<Typography
                sx={{
                    fontWeight: 500,
                    color: teamName ? theme.palette.primary.main : theme.palette.grey[400]
                }}>{teamName ?? 'انتخاب تیم'}</Typography>}

        />
    </>)
}
//export default SelectTeamChip

//-------------------------------------------Mini Select Team Chip
export function SelectTeamChipMini_({ onChange }) {
    const theme = useTheme();
    const [teamName, setTeamName] = React.useState(null)
    const [teamID, setTeamID] = React.useState(null)
    const [logo, setLogo] = React.useState(null)
    const [logoPath, setLogoPath] = React.useState(null)
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [userTeamList, setUserTeamList] = React.useState([])
    //------------------------------------------------------------Functions
    const teamRadioOnchange = (value) => {
        const { team_id, team_name, team_logo } = value

        setTeamName(team_name)
        setTeamID(team_id)
        setLogo(team_logo)
        onChange(value)
        setDialogOpen(false)

    }
    const getData = () => {
        const result = dataHandler(api.listUserTeam(), "get", "");

        try {
            result(async function (data, status) {
               
                if (status) {

                    setUserTeamList(data.result)
                    setTeamName(data.result[0]["team_name"])
                    //   onChange(`${data.result[0]["team_name"]}_${data.result[0]["team_id"]}`)
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
        if (team_info) {
            const jsonObj = JSON.parse(team_info);
            setTeamID(jsonObj['team_id'])
            setLogo(jsonObj['team_logo'])
            setTeamName(jsonObj['team_name'])
        }


    }, [])
    React.useEffect(() => {

        setLogoPath(`${hostAddress}${logo}`)

    }, [teamID])
    return (<>
        <DialogBox title={"انتخاب تیم"} onChange={(event) => setDialogOpen(event)}
            open={dialogOpen}
            content={<DialogContentSelectTeam data={userTeamList} onChange={(e) => teamRadioOnchange(e)} />} />
        <IconButton

            onClick={() => setDialogOpen(true)}
            size={"latge"}>

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
                avatar={<CustomAvatar outline={true} size={'large'} sx={{ m: 0 }} alt="لوگو تیم" src={logoPath ?? ""} />}
                size="small"
                label={<Typography variant={"h5"} color={'secondary.main'} fontSize={12}
                    align={"right"}
                    noWrap={false}>{teamName}</Typography>}
            />
        </IconButton>

    </>)
}
export const SelectTeamChipMini = ({ onChange,content }) => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
    //-----------------------------------------------
    const [teamName, setTeamName] = React.useState(null)
    const [teamID, setTeamID] = React.useState(null)
    const [logo, setLogo] = React.useState(null)
    const [logoPath, setLogoPath] = React.useState(null)
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [userTeamList, setUserTeamList] = React.useState([])
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

    const handleChange = (event) => {
        if (event?.target.value) setValue(event?.target.value);
    };

    return (
        <>
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
                <ButtonBase sx={{ borderRadius: 0 }}>
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
                                onClick={handleToggle}
                                color="inherit"
                                src={logoPath ?? ""}
                            >

                            </Avatar>
                        }
                        size="small"
                        label={<Typography 
                            noWrap 
                            sx={{ 
                              maxWidth: 120,
                              fontSize: '0.75rem',
                              fontWeight: 500,
                              color:theme.palette.secondary.main
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
                                  {content}
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

