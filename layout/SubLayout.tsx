'use client';
import React, { ReactNode, useEffect } from "react";
import { usePathname } from 'next/navigation';
import {
    Box,
    CssBaseline,
    AppBar,
    Toolbar,
    useMediaQuery,
    Typography,
} from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import AlertComponent from "@/components/ui-component/alert.js"
import BottomSheetComponent from "@/components/ui-component/utilities/BottomSheet"
import DialogComponent from "@/components/ui-component/utilities/Dialog"
import Breadcrumbs from "@/components/ui-component/extended/Breadcrumbs";
import Header from "@/components/layout/MainLayout/Header";
import Sidebar from "@/components/layout/MainLayout/Sidebar";
import { BreadcrumbsItems } from "@/components/menu-items";
import { rlPadding } from "@/components/store/constant";
import useWindowDimensions from "@/components/utils/getScreenDimension";
import Providers from "@/provider/provider";
import { IconChevronRight } from "@tabler/icons-react";
import { UserInfo } from "@/types/user"
import { useRouter, useSearchParams } from 'next/navigation';
import api from "@/components/api/api";
import dataHandler from '@/components/api/dataHandler';


/* ============================== */

interface RootLayoutProps {
    children: ReactNode;
}

/* ============================== */


export default function SubLayout({ children }: RootLayoutProps) {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
    const pathname = usePathname();
    const [token, setToken] = React.useState<string | null>(null);
    const { height } = useWindowDimensions();
    const router = useRouter();
    const searchParams = useSearchParams();
   

    const normalizedPathname = pathname?.replace(/^\/(fa|en)\//, '/') || '';
    const isMeaningfulUserInfo = (value: any): value is UserInfo => {
        if (!value || typeof value !== 'object') return false;

        const fullname = typeof value.fullname === 'string' ? value.fullname.trim() : '';
        const id = typeof value.id === 'string' ? value.id.trim() : '';
        const mobile = typeof value.mobile === 'string' ? value.mobile.trim() : '';

        return Boolean(id || mobile || (fullname && fullname !== 'کاربر'));
    };

    const [userInfo, setUserInfo] = React.useState<UserInfo | null>(() => {
        try {
            const storedUserInfo = localStorage.getItem('userInfo');
            const parsedUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
            return isMeaningfulUserInfo(parsedUserInfo) ? parsedUserInfo : null;
        } catch (error) {
            return null;
        }
    });
    const [hasNotification, setHasNotification] = React.useState(false);
    const [notificationCount, setNotificationCount] = React.useState(0);
    const ignoreAuth =
        normalizedPathname === '/matches/list/all' ||
        normalizedPathname.startsWith('/matches/detail') ||
        normalizedPathname === '/register';
     
    useEffect(() => {
        const tokenLocal = localStorage.getItem("token");
        console.log(tokenLocal, ignoreAuth, "tokenLocal, ignoreAuth");
        if (!tokenLocal && !ignoreAuth) {
          
          //  router.replace('/');
        }
    }, [ ignoreAuth, router]);

    useEffect(() => {
        if (searchParams.get('p') === 'exit') {
            router.replace('/');
        }
    }, [searchParams, router]);
    useEffect(() => {
        setToken(localStorage.getItem("token"));

        try {
            const storedUserInfo = localStorage.getItem('userInfo');
            if (storedUserInfo) {
                const parsedUserInfo = JSON.parse(storedUserInfo);
                setUserInfo(isMeaningfulUserInfo(parsedUserInfo) ? parsedUserInfo : null);
            } else {
                setUserInfo(null);
            }
        } catch (error) {
            console.error('Failed to load userInfo from localStorage', error);
            setUserInfo(null);
        }
    }, []);

    useEffect(() => {
        if (!token && !ignoreAuth) {
            setHasNotification(false);
            setNotificationCount(0);
            return;
        }

        if (!userInfo) {
            setHasNotification(false);
            setNotificationCount(0);
            return;
        }

        const result = dataHandler(api.notificationList('sent', 0), 'get', '');

        result((data: any, status: boolean) => {
            const notificationData = Array.isArray(data?.result?.data) ? data.result.data : [];
            const totalRecords = Number(data?.result?.total_records ?? 0);

            if (status && (notificationData.length > 0 || totalRecords > 0)) {
                setHasNotification(true);
                setNotificationCount(notificationData.length || totalRecords);
            } else {
                setHasNotification(false);
                setNotificationCount(0);
            }
        });
    }, [token, ignoreAuth, userInfo]);

    return (
        <Providers>

            <Box
                sx={{
                    display: "flex",
                    px: matchDownMd ? 0 : rlPadding,
                    height: "100%",

                }}
            >

                <CssBaseline />

                <Box sx={{ width: "100%", height }}>
                    {/* Global utilities
                     
                         */}
                    <AlertComponent />
                    <BottomSheetComponent />
                    <DialogComponent/>


                    {/* Header */}
                    <AppBar
                        position="static"
                        elevation={0}

                    >
                        {(token || ignoreAuth) && (
                            <Toolbar>
                                {<Header userInfo={userInfo} hasNotification={hasNotification} notificationCount={notificationCount} />}
                            </Toolbar>
                        )}
                    </AppBar>

                    {/* Sidebar*/}
                    {token &&
                     (
                        <Sidebar
                            rlPadding={rlPadding}
                            userInfo={userInfo}
                            hasNotification={hasNotification}
                            notificationCount={notificationCount}
                        />
                    )}


                    {/* Breadcrumb */}
                    {/*token && !ignoreAuth && (
                        <Breadcrumbs
                            separator={IconChevronRight}
                            navigation={BreadcrumbsItems}
                            icon
                            title
                            rightAlign
                        />)*/}


                    {/* Page content */}
                    <Box sx={{
                        textAlign: "center",
                        mb: -1,
                        pb: "100px",
                        backgroundColor: theme.palette.grey[200],


                    }}>

                        {children}

                    </Box>
                </Box>
            </Box>
        </Providers>

    );
}
