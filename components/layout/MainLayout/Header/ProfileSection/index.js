import {useEffect, useRef, useState} from 'react';

import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

// material-ui
import {useTheme} from '@mui/material/styles';
import {
    Avatar,
    Box,
    Chip,
    ClickAwayListener,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Stack,
    Typography
} from '@mui/material';

// third-party

// project imports
import MainCard from '@/components/ui-component/utilities/cards/MainCard';
import Transitions from  '@/components/ui-component/utilities/extended/Transitions';
import User1 from  '@/components/assets/images/users/user.png';

// assets
import {IconLogout, IconSettings, IconUser} from '@tabler/icons-react';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = ({userInfo}) => {
    const theme = useTheme();
    const customization = useSelector((state) => state.sidebarMenu);
    const navigate = useNavigate();

    const [sdm, setSdm] = useState(true);
    const [value, setValue] = useState('');
    const [notification, setNotification] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);
    const handleLogout = async () => {
        console.log('Logout');
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleListItemClick = (event, index, route = '') => {
        setSelectedIndex(index);
        handleClose(event);

        if (route && route !== '') {
            navigate(route);
        }
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.grey[500],
                    backgroundColor: theme.palette.grey[600],
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.grey[500]}!important`,
                        color: theme.palette.grey[200],
                        '& svg': {
                            stroke: theme.palette.primary.light
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                icon={
                    <Avatar
                        src={User1}
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                    />
                }
                label={<IconSettings stroke={1.5} size="1.5rem" color={   theme.palette.grey[400]}/>}
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="primary"
            />
            <Popper
                sx={{zIndex: 50}}
                placement="bottom-end"
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
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({TransitionProps}) => (
                    <Transitions in={open} {...TransitionProps} sx={{zIndex: 90}}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow
                                          shadow={theme.shadows[16]}>
                                    <Box sx={{p: 2}}>
                                        <Stack>
                                            <Stack direction="row" spacing={0.5} alignItems="right" sx={{direction:"rtl"}}>
                                                 <Typography component="span"  align={"right"} variant="h6" sx={{fontWeight: 500}}>
                                                     {userInfo["fullname"]}
                                                </Typography>
                                                <Typography align={"right"} variant="h6">,خوش آمدی</Typography>


                                            </Stack>

                                        </Stack>


                                    </Box>

                                    <List
                                        component="nav"
                                        sx={{
                                            textAlign:"right",
                                            width: '100%',
                                            maxWidth: 350,
                                            minWidth: 300,
                                            backgroundColor: theme.palette.background.paper,
                                            borderRadius: '10px',
                                            [theme.breakpoints.down('md')]: {
                                                minWidth: '100%'
                                            },
                                            '& .MuiListItemButton-root': {
                                                mt: 0.5,
                                                 direction:"rtl",
                                                   textAlign:"right",


                                            }
                                        }}
                                    >
                                        <ListItemButton
                                            sx={{borderRadius: `${customization.borderRadius}px`}}
                                            selected={selectedIndex === 0}
                                            onClick={(event) => handleListItemClick(event, 0, '/user/account-profile/profile1')}
                                        >
                                            <ListItemIcon>
                                                <IconSettings stroke={1.5} size="1.3rem"/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={<Typography variant="body2">حساب کاربری</Typography>}/>
                                        </ListItemButton>
                                        {/*<ListItemButton
                                            sx={{borderRadius: `${customization.borderRadius}px`}}
                                            selected={selectedIndex === 1}
                                            onClick={(event) => handleListItemClick(event, 1, '/user/social-profile/posts')}
                                        >
                                            <ListItemIcon>
                                                <IconUser stroke={1.5} size="1.3rem"/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Grid container spacing={1} justifyContent="space-between">
                                                        <Grid item>
                                                            <Typography variant="body2">Social Profile</Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Chip
                                                                label="02"
                                                                size="small"
                                                                sx={{
                                                                    bgcolor: theme.palette.warning.dark,
                                                                    color: theme.palette.background.default
                                                                }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                }
                                            />
                                        </ListItemButton>*/}
                                        <ListItemButton
                                            sx={{borderRadius: `${customization.borderRadius}px`}}
                                            selected={selectedIndex === 4}
                                            onClick={handleLogout}
                                        >
                                            <ListItemIcon>
                                                <IconLogout stroke={1.5} size="1.3rem"/>
                                            </ListItemIcon>
                                            <ListItemText primary={<Typography variant="body2">خروج</Typography>}/>
                                        </ListItemButton>
                                    </List>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default ProfileSection;
