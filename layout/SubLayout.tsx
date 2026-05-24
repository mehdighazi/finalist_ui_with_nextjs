'use client';
import React, { ReactNode } from "react";
import {
    Box,
    CssBaseline,
    AppBar,
    Toolbar,
    useMediaQuery,
    Typography,
} from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import AlertComponent from  "@/components/ui-component/alert.js"
import BottomSheetComponent from  "@/components/ui-component/bottomSheet"
import Breadcrumbs from "@/components/ui-component/extended/Breadcrumbs";
import Header from "@/components/layout/MainLayout/Header";
import Sidebar from "@/components/layout/MainLayout/Sidebar";
import { BreadcrumbsItems } from "@/components/menu-items";
import { rlPadding } from "@/components/store/constant";
import useWindowDimensions from "@/components/utils/getScreenDimension";
import Providers from "@/provider/provider";
import { IconChevronRight } from "@tabler/icons-react";
import { UserInfo } from "@/types/user"

/* ============================== */

interface RootLayoutProps {
    children: ReactNode;
}

/* ============================== */

export default function SubLayout({ children }: RootLayoutProps) {
    const theme= useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
     
     const [userinfo, setUserInfo] = React.useState<UserInfo | null>(null);
    const { height } = useWindowDimensions();

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
                         <BottomSheetComponent/>
                        

                    {/* Header */}
                    <AppBar
                        position="static"
                        elevation={0}
                       
                    >
                        <Toolbar>
                            {<Header  />}
                        </Toolbar>
                    </AppBar>

                    {/* Sidebar*/} 
                        <Sidebar
                        
                            rlPadding={rlPadding}
                          //  userInfo={userinfo}
                        />
                       

                    {/* Breadcrumb */}
                        <Breadcrumbs
                            separator={IconChevronRight}
                            navigation={BreadcrumbsItems}
                            icon
                            title
                            rightAlign
                        />
                        

                    {/* Page content */}
                    <Box sx={{ textAlign: "center", mb: -1,
                    backgroundColor:theme.palette.grey[200],
            
                    
                     }}>
                   
                        {children}
                    </Box>
                </Box>
            </Box>
        </Providers>

    );
}
