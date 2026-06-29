'use client';

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation'; // تغییر به نکست‌جی‌اس برای هدایت صفحات

// ui-material
import {
    Box, Paper, useMediaQuery, useTheme,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography,
    ListItemIcon,
    Avatar,
    Chip,
    Popper,
    ButtonBase,
    ClickAwayListener
} from "@mui/material";
import { styled } from "@mui/material/styles";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

// project import
import { rlPadding } from '@/components/store/constant';
import dataHandler from "@/components/api/dataHandler";
import api, { hostAddress } from "@/components/api/api";
import Transitions from '@/components/ui-component/extended/Transitions';
import MainCard from '@/components/ui-component/cards/MainCard_pre';
import DialogBox from '@/components/ui-component/dialog';
import CustomAvatar from '@/components/ui-component/extended/Avatar';

// Tabler icons
import { 
    IconBookmark, 
    IconPennant2, 
    IconSwords, 
    IconChevronLeft, 
    IconEdit, 
    IconArrowsUpDown, 
    IconUser 
} from '@tabler/icons-react';

// Interfaces & Types
interface TeamLogo {
    logo_path?: string;
}

interface TeamItem {
    team_id: string | number;
    team_name: string;
    logo?: TeamLogo;
    team_logo?: string;
}

interface DialogContentSelectTeamProps {
    onChange: (value: TeamItem) => void;
    data: TeamItem[];
}

interface TeamProfileMenuListProps {
    onChange: (action: string) => void;
    teamID: string | number | null;
}

interface TeamProfileProps {
    onChange: (value: TeamItem) => void;
    userTeamList: TeamItem[];
    teamInfo: TeamItem | string;
}

interface PagesBottomNavigationProps {
    customWidth: number;
}

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

const DialogContentSelectTeam: React.FC<DialogContentSelectTeamProps> = ({ onChange, data }) => {
    return (
        <Box sx={{ direction: 'rtl' }}>
            <List sx={{ width: "100%", bgcolor: 'background.paper' }}>
                {data.map((item, i) => {
                    const labelId = `checkbox-list-label-${i}`;
                    return (
                        <ListItem
                            key={item.team_id ?? i}
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
                                    onChange({
                                        team_id: item.team_id,
                                        team_name: item.team_name,
                                        team_logo: item?.logo?.logo_path ?? "",
                                    })
                                }
                                dense
                            >
                                <ListItemText
                                    sx={{ float: 'right', mr: '0.8rem', direction: "rtl", textAlign: 'right' }}
                                    id={labelId} 
                                    primary={item["team_name"]} 
                                />
                                <ListItemIcon>
                                    <IconChevronLeft />
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
};

const TeamProfileMenuList: React.FC<TeamProfileMenuListProps> = ({ onChange, teamID }) => {
    const theme = useTheme();

    return (
        <List
            sx={{
                width: 150,
                maxWidth: 450,
                py: 0,
                borderRadius: '10px',
                [theme.breakpoints.down('md')]: {
                    width: 200 // اصلاح غلط املایی with به width
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
                '& .MuiListItemAvatar-root': {
                    minWidth: "auto",
                    mx: 1
                }
            }}
        >
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
    );
};

const TeamProfile: React.FC<TeamProfileProps> = ({ onChange, userTeamList, teamInfo }) => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter(); // استفاده از روتر نکست‌جی‌اس

    const [teamName, setTeamName] = useState<string | null>(null);
    const [teamID, setTeamID] = useState<string | number | null>(null);
    const [logo, setLogo] = useState<string | null>(null);
    const [logoPath, setLogoPath] = useState<string>("");
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const anchorRef = useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
            return;
        }
        setOpen(false);
    };

    const teamRadioOnchange = (value: TeamItem) => {
        setTeamName(value.team_name);
        setTeamID(value.team_id);
        setLogo(value.team_logo ?? null);
        onChange(value);
        setDialogOpen(false);
    };

    useEffect(() => {
        if (teamInfo && typeof teamInfo !== 'string') {
            setTeamName(teamInfo.team_name);
            setTeamID(teamInfo.team_id);
            setLogo(teamInfo.team_logo ?? null);
        }
    }, [teamInfo]);

    useEffect(() => {
        setLogoPath(logo ? `${hostAddress}${logo}` : "");
    }, [logo, teamID]);

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current?.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const handleMenuOnChange = (event: string) => {
        if (event === 'changeTeam') {
            setDialogOpen(true);
        } else if (event === 'editTeam') {
            router.push(`/app/team/profile/edit?tid=${teamID}`);
        } else if (event === 'editMember') {
            router.push(`/app/user/team/member/edit/list/${teamID}`);
        }
    };

    return (
        <>
            <DialogBox 
                title={"انتخاب تیم"} 
                onChange={(event: boolean) => setDialogOpen(event)}
                open={dialogOpen}
                content={<DialogContentSelectTeam data={userTeamList} onChange={(e) => teamRadioOnchange(e)} />} 
            />
            <Box sx={{ mb: 1 }}>
                <ButtonBase onClick={handleToggle} sx={{ borderRadius: 0 }} ref={anchorRef}>
                    <Chip
                        sx={{
                            border: 0,
                            background: "none",
                            mr: 0,
                            mt: 0,
                            direction: "ltr",
                            display: "flex",
                            flexDirection: "row-reverse",
                            alignItems: "center",
                            "& .MuiChip-label": {
                                ml: 0,
                                pr: 0,
                            },
                            "& .MuiChip-avatar ": {
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
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                color="inherit"
                                src={logoPath}
                            />
                        }
                        size="small"
                        label={
                            <Typography
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
                            </Typography>
                        }
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
                        <Paper sx={{ zIndex: 50 }}>
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

const PagesBottomNavigation: React.FC<PagesBottomNavigationProps> = () => {
    const theme = useTheme();
    const router = useRouter(); // استفاده از روتر جدید نکست‌جی‌اس
    const [value, setValue] = useState<number>(0);
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

    const [teamInfo, setTeamInfo] = useState<TeamItem | string>("");
    const [userTeamList, setUserTeamList] = useState<TeamItem[]>([]);

    const getData = () => {
        const result = dataHandler(api.listUserTeam(), "get", "");
        try {
            result(async function (data: { result: TeamItem[] }, status: boolean) {
                if (status) {
                    setUserTeamList(data.result);
                }
            });
        } catch (error) {
            console.error("Error fetching teams:", error);
        }
    };

    useEffect(() => {
        if (userTeamList.length === 0) {
            getData();
        }
        const storedInfo = localStorage.getItem("team_info");
        if (storedInfo) {
            setTeamInfo(JSON.parse(storedInfo));
        }
    }, []);

    useEffect(() => {
        const tid = typeof teamInfo !== 'string' ? teamInfo?.team_id : '';
        switch (value) {
            case 0:
                break;
            case 1:
                router.push('/user/match/create');
                break;
            case 2:
                router.push('/app/match/list');
                break;
            case 3:
                if (tid) {
                    window.open(`/app/team/profile?tid=${tid}`, '_blank');
                }
                break;
            default:
                break;
        }
    }, [value, teamInfo, router]);

    const elemSX = {
        color: theme.palette.orange.main,
        '& .hover': {
            cursor: 'pointer'
        },
        '& .MuiBottomNavigationAction-label': {
            fontSize: '0.55rem',
        },
        '&.Mui-selected': {
            color: theme.palette.secondary.main,
            fontSize: '0.55rem',
        }
    };

    const iconSize = 18;

    return (
        <Paper 
            sx={{ 
                position: 'fixed', 
                bottom: 0, 
                left: matchUpMd ? rlPadding : 0, 
                right: matchUpMd ? rlPadding : 0, 
                height: 45 
            }}
            elevation={3}
        >
            <BottomNavigation
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    minWidth: "100%",
                    bottom: 0,
                    p: 0
                }}
                showLabels
                value={value}
                onChange={(_, newValue: number) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label={<span>نشان شده ها</span>} sx={elemSX} icon={<IconBookmark size={iconSize} />} />
             <BottomNavigationAction label={<span>شروع مسابقه</span>} sx={elemSX} icon={<IconSwords size={iconSize} />} />
                <BottomNavigationAction label={<span> مسابقات</span>} sx={elemSX} icon={<IconPennant2 size={iconSize} />} />
                <BottomNavigationAction 
                    label="" 
                    sx={elemSX} 
                    icon={
                        <TeamProfile 
                            teamInfo={teamInfo} 
                            userTeamList={userTeamList} 
                            onChange={(e) => console.log(e)} 
                        />
                    } 
                />
            </BottomNavigation>
        </Paper>
    );
};

const CustomBottomNavigation: React.FC = () => {
    const boxRef = useRef<HTMLDivElement>(null);
    const [boxWidth, setBoxWidth] = useState<number>(0);

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

    return (
        <Box ref={boxRef} sx={{ p: 0, pr: 0, position: "relative", minHeight: "100vh" }}>
            <PagesBottomNavigation customWidth={boxWidth} />
        </Box>
    );
};

export default CustomBottomNavigation;