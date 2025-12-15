"use client";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Typography, Button } from '@mui/material';


// project imports
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import SiteLogo from './siteLogo'
import logoimg from '@/components/assets/images/screen/logo.png'

// assets
import { IconMenu2 } from '@tabler/icons-react';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle, userInfo }) => {
    const theme = useTheme();
    const dispatch = useDispatch()
   
    const router = useRouter();

    return (
        <>

            {/* logo & toggler button */}

            {/* header search */}
            {/*<SearchSection />*/}
            {/*<ProfileSection userInfo={userInfo}/>*/}
            <Box
                sx={{
                    width: "100%",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                {/* لوگو در سمت چپ */}
                <Box component="span" sx={{ display: { xs: 'block', md: 'block' } }}>
                    <SiteLogo imgPath={logoimg} />
                    <Typography fontSize={14}>فینالیست</Typography>
                </Box>

                {/* سمت راست (بسته به userInfo) */}
                {userInfo ? (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            marginLeft: 'auto'
                        }}
                    >
                        <NotificationSection />
                        <ButtonBase sx={{ borderRadius: 0, overflow: 'hidden',m:0.5 }}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.mediumAvatar,
                                    transition: 'all .2s ease-in-out',
                                    background: theme.palette.grey[600],
                                    color: theme.palette.grey[400],
                                    '&:hover': {
                                        background: theme.palette.grey[500],
                                        color: theme.palette.grey[200]
                                    }
                                }}
                                onClick={() => dispatch(showMENU())}
                            >
                                <IconMenu2 stroke={1.5} size="1.3rem" />
                            </Avatar>
                        </ButtonBase>
                    </Box>
                ) : (
                    <Button
                        variant="outlined"
                        sx={{
                            marginLeft: 'auto',
                            borderColor: theme.palette.secondary.main,
                            color: theme.palette.secondary.main,
                            fontSize: 12,
                            borderRadius: 2,
                            px: 2,
                            py: 0.7,
                            '&:hover': {
                                borderColor:  theme.palette.secondary.main,
                                color: theme.palette.secondary.main,
                                background: 'rgba(199, 199, 199, 0.08)'
                            }

                        }}
                        onClick={() => router.push('/user/login')}
                    >
                        <span>ورود/ثبت نام</span>
                    </Button>
                )}
            </Box>

        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
