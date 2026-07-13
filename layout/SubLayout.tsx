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
 
    const ignoreAuth =
    pathname === '/matches/list/all' ||
    pathname.startsWith('/matches/detail/') ||
    pathname === '/register';
    useEffect(() => {
        const tokenLocal = localStorage.getItem("token");
        if (!tokenLocal && !ignoreAuth) {
           console.log(pathname)
            router.replace('/');
        }
    }, [ ignoreAuth, router]);

    useEffect(() => {
        if (searchParams.get('p') === 'exit') {
            router.replace('/');
        }
    }, [searchParams, router]);
    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);
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


                    {/* Header */}
                    <AppBar
                        position="static"
                        elevation={0}

                    >
                        {(token || ignoreAuth) && (
                            <Toolbar>
                                {<Header />}
                            </Toolbar>
                        )}
                    </AppBar>

                    {/* Sidebar*/}
                    {token &&
                     (
                        <Sidebar
                            rlPadding={rlPadding}
                        //  userInfo={userinfo}
                        />
                    )}


                    {/* Breadcrumb */}
                    {token && !ignoreAuth && (
                        <Breadcrumbs
                            separator={IconChevronRight}
                            navigation={BreadcrumbsItems}
                            icon
                            title
                            rightAlign
                        />)}


                    {/* Page content */}
                    <Box sx={{
                        textAlign: "center", mb: -1,
                        backgroundColor: theme.palette.grey[200],


                    }}>

                        {children}

                    </Box>
                </Box>
            </Box>
        </Providers>

    );
}
