"use client";
import * as React from 'react'
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Button,
    ButtonBase,
    CardActions,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    Paper,
    Popper,
    Stack,
    Badge,
    Typography,
    useMediaQuery
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from '@/components/ui-component/utilities/cards/MainCard_pre';
import Transitions from '@/components/ui-component/utilities/extended/Transitions';
import NotificationList from './NotificationList';
import dataHandler from '@/components/api/dataHandler';
import api from '@/components/api/api'
// assets
import { IconBell } from '@tabler/icons-react';

// notification status options

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
    const [data, setData] = React.useState(null);
    

    const getData = () => {

        const result = dataHandler(api.notificationList("sent", ""), "get", "");
        try {
            result(async function (data, status) {

                if (status)
                    setData(data.result)
            
                

            })
        } catch (error) {
            //error handle here

        }
    }
    React.useEffect(() => {

        getData()
    }, [])

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



    return (
        <>
            <Box
                sx={{
                    ml: 2,
                    mr: 0,
                    [theme.breakpoints.down('md')]: {
                        mr: 0
                    }
                }}
            >
                <ButtonBase sx={{ borderRadius: '12px' }}>
                    {console.log(data)}
                    <Badge
                        color="error"
                        variant="dot" // یا می‌تونی از badgeContent عددی استفاده کنی
                        invisible={data&&data.data.length>0?false:true} // وقتی نوتیف نداری، مخفیش می‌کنه
                        overlap="circular"
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <Avatar
                            variant="rounded"
                            sx={{
                                ...theme.typography.commonAvatar,
                                ...theme.typography.mediumAvatar,
                                transition: 'all .2s ease-in-out',
                                background: theme.palette.grey[600],
                                color: theme.palette.grey[400],
                                '&[aria-controls="menu-list-grow"],&:hover': {
                                    background: theme.palette.grey[500],
                                    color: theme.palette.grey[200],
                                },
                            }}
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                            color="inherit"
                        >
                            <IconBell stroke={1.5} size="1.3rem" />
                        </Avatar>
                    </Badge>
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
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item xs={12}>
                                            <Grid container alignItems="center" justifyContent="space-between" sx={{ pt: 2, px: 2 }}>
                                                <Grid xs={12} item>
                                                    <Stack direction="row" spacing={2}>
                                                        <Typography color={theme.palette.grey[400]} variant="subtitle1">اعلانات</Typography>
                                                        <Chip
                                                            size="small"
                                                            label={<span>{data.total_records}</span>}
                                                            sx={{
                                                                color: theme.palette.grey[100],
                                                                bgcolor: theme.palette.error.dark
                                                            }}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid xs={12} item>
                                                    <Typography component={Link} to="app/user/profile/notification" variant="subtitle2" color="primary">
                                                        مشاهده همه
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <PerfectScrollbar
                                                style={{ height: '100%', maxHeight: 'calc(100vh - 205px)', overflowX: 'hidden' }}
                                            >

                                               <NotificationList data={data.data} /> 
                                                
                                            </PerfectScrollbar>
                                        </Grid>
                                    </Grid>
                                    {/**  <Divider />
                                    <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                                        <Button size="small" disableElevation>
                                            View All
                                        </Button>
                                    </CardActions>
                                    */}
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default NotificationSection;
