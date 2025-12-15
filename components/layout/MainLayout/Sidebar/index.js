import PropTypes from 'prop-types';
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery, IconButton,Chip } from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';
//taqbler icon
import { IconX } from '@tabler/icons-react'
// project imports
import MenuList from './MenuList';
import CustomAvatar from '@/components/ui-component/extended/Avatar'
import DefaultAvatar from '@/components/assets/images/screen/default-avatar.jpg'
import { styled } from "@mui/styles";
import { hideMENU } from '@/components/store/slices/sidebarMenuSlice'
import api from '@/components/api/api'
import dataHandler from '@/components/api/dataHandler'
import { hostAddress } from '@/components/api/api'

// ==============================|| SIDEBAR DRAWER ||============================== //
const CustomDrawerPaper = styled('div')(({ theme, open }) => ({
    width: '150px', // Drawer width
    transition: 'transform 0.5s ease', // Smooth transition
    // transform: open ? 'translateX(0)' : 'translateX(50%)', // Control close position (50% still visible)
}));
const Sidebar = ({ drawerOpen, drawerToggle, window, rlPadding }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = React.useState("")
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const { visible } = useSelector(
        (state) => state.sidebarMenu//in reducer file
    );
    const [inClose, setInClose] = React.useState(false)
    const handleClose = () => {
        dispatch(hideMENU());
    };
    const getData = (body) => {
        const result = dataHandler(api.getUserInfo({ uid: '' }), "get", "");
        try {
            result(async function (data, status) {
                console.log(data)
                if (status)
                    setUserInfo(data.result)
            })
        } catch (error) {
            //error handle here

        }
    }
    React.useEffect(() => {
        // console.log(userInfo)
        if (!userInfo)
            getData()
    }, [])
    const drawer = (
        <>
            <Box sx={{ display: { xs: 'block', md: 'block' }, direction: "rtl", p: 1, background: theme.palette.secondary.light }}>
                <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
                    {<Chip
                        sx={{
                            height: '48px',
                            alignItems: 'center',
                            borderRadius: '27px',
                            transition: 'all .2s ease-in-out',
                            //borderColor: theme.palette.grey[200],
                            border: "none",
                            color: theme.palette.grey[600],


                            // backgroundColor: theme.palette.grey[100],
                            '&[aria-controls="menu-list-grow"], &:hover': {
                                borderColor: theme.palette.primary.main,
                                background: `${theme.palette.grey[50]}!important`,
                                color: theme.palette.grey[600],
                                '& svg': {
                                    stroke: theme.palette.primary.light
                                }
                            },
                            '& .MuiChip-label': {
                                fontSize: 14,
                                p: 1,
                                pl: 2,

                            }
                        }}
                        icon={
                            <CustomAvatar size={"sm"}
                                src={userInfo.avatar && userInfo.avatar["path"] ? `${hostAddress}/${userInfo.avatar["path"]}` : DefaultAvatar}
                                sx={{
                                    //  ...theme.typography.mediumAvatar,
                                    margin: '8px 0 8px 8px !important',
                                    cursor: 'pointer',
                                    width: theme.spacing(5),
                                    height: theme.spacing(5)

                                }}
                                aria-label={"profile picture"}
                                aria-haspopup="true"
                                color="inherit"
                            >{userInfo??userInfo["fullname"].substring(0, 1)}</CustomAvatar>
                        }
                        label={userInfo["fullname"]}
                        variant="outlined"
                        // ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                    // onClick={handleToggle}

                    />
                    }
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Box sx={{ marginRight: 4 }} ><IconButton onClick={handleClose}><IconX /></IconButton></Box>
                </Box>
            </Box>
            <BrowserView>
                <PerfectScrollbar
                    component="div"
                    style={{
                        height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
                        paddingLeft: '16px',
                        paddingRight: '16px'
                    }}
                >
                    <MenuList />
                    {/*<MenuCard/>*/}
                </PerfectScrollbar>
            </BrowserView>
            <MobileView>
                <Box sx={{ px: 2 }}>
                    <MenuList />
                    {/*<MenuCard/>*/}
                </Box>
            </MobileView>
        </>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <div id="drawer-container" style={{ position: "relative" }}>

            <Drawer

                //  container={container}
                //variant={matchUpMd ? 'persistent' : 'temporary'}
                transitionDuration={{ enter: 100, exit: matchUpMd ? 10 : 500 }}
                sx={{
                    '& .MuiDrawer-paper': {

                        width: matchUpMd ? "40%" : "100%",
                        marginRight: matchUpMd ? rlPadding : "0px", // Margin to align it within the page’s content area
                        borderRadius: '5px', // Optional: rounded corners for style
                        boxShadow: 3, // Optional: shadow for depth effect
                        transition: 'transform 0.1s ease', // Smooth transition
                        transform: !matchUpMd ? 'translateX(0%)' : 'translateX(20%)', // Partially visible when closing
                    },
                }}

                anchor="right"
                open={visible}
                onClose={handleClose}


            >
                {drawer}
            </Drawer>

        </div>
    );
};

Sidebar.propTypes = {
    drawerOpen: PropTypes.bool,
    drawerToggle: PropTypes.func,
    window: PropTypes.object
};

export default Sidebar;