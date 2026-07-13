"use client"
import Link from 'next/link';

import * as React from "react";
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../authentication/AuthWrapper1';
import AuthCardWrapper from '../authentication/AuthCardWrapper';
import Logo from '@/components/ui-component/Logo';
//import AuthRegister from './AuthRegister';
import AuthFooter from '@/components/ui-component/cards/AuthFooter';
import Register from './register'
import AlertCompnent from '@/components/ui-component/alert'
// assets

// ===============================|| AUTH3 - REGISTER ||=============================== //

const RegisterForm = () => {
    const theme = useTheme();
     let router = useRouter();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
     const getCode = localStorage.getItem("mobile")
    React.useEffect(() => {
        if (!getCode)//if redirect from login page else navigate to login page
            router.push('/user/login')
          
       
    }, [])
    return (
        <AuthWrapper1>
            <AlertCompnent />
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }}>
                                        <Link href="#">
                                            <Logo />
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color={theme.palette.secondary.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        ثبت نام
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        fontSize="16px"
                                                        textAlign={matchDownSM ? 'center' : 'inherit'}
                                                    >
                                                        لطفا اطلاعات خود را وارد نمایید
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Register />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            <Link
                                                
                                                href="/login/login3"
                                               
                                            >
                                                ورود به حساب کاربری
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default RegisterForm;
