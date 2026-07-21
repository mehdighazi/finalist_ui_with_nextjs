'use client';

import * as React from "react";
import { useRouter, useSearchParams } from 'next/navigation';
// ui-material
import { AppBar, Box, Chip, Divider, Grid, Tab, Tabs, Typography, useMediaQuery } from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
// tabler icon
import { IconList, IconOlympics } from '@tabler/icons-react';
// project import
import dataHandler from '@/components/api/dataHandler';
import api from '@/components/api/api';
import TopSectionUnified from "@/components/ui-component/utilities/profilePageTopSection";
import { hostAddress } from '@/components/api/api';
import UpcomingMatchContet from './tabs/upComingMatchTab/page';
import SportTabContet from './tabs/sportsTab/page';
//--------------------------------------| Types |--------------------------------------

interface TabItem {
    label: string;
    icon: React.ElementType;
}

interface TeamInfo {
    team_name: string;
    about?: string;
    logo?: {
        logo_path?: string;
    };
}

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

interface InfoProps {
    team_info?: TeamInfo;
    fullname?: string;
    bio?: string;
    avatar?: any; // برای سازگاری کامل با خروجی ریسپانس API و کامپوننت فرزند
    totalFollowers?: number;
    isFollowing?: boolean;
}

// کست کردن تایپ کامپوننت به صورت any در خارج از رندر برای حل خطای ساختار پروپ‌ها و جلوگیری از غیب شدن محتوا
const TopSectionUnifiedAny = TopSectionUnified as React.ComponentType<any>;

//--------------------------------------| Tab List |--------------------------------------

const TabsList: TabItem[] = [
    {
        label: "مسابقات",
        icon: IconList
    },
    {
        label: "تیم ها",
        icon: IconOlympics
    }
];

//--------------------------------------| Style |-----------------------------------------
const BoxWrapped = styled(Box)(() => ({
    minWidth: "100%",
    marginTop: 8,
    borderRadius: 3,
    paddingLeft: "0%",
    padding: 0.5,
}));

const TabWrapped = styled(Tab)(() => ({
    fontSize: 12,
    p: 0,
    minHeight: 50,
}));

//--------------------------------------| TabPanel Component |----------------------------
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0 }}>
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

//--------------------------------------| Main Component |--------------------------------
const Profile: React.FC = () => {
    const theme = useTheme();
    const router = useRouter();
    const searchParams = useSearchParams(); 

    const [value, setValue] = React.useState<number>(0);
    const [, setStartGet] = React.useState<boolean>(false);
    const [userInfo, setUserInfo] = React.useState<InfoProps | undefined>(undefined);
    
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    const getData = () => {
           const uidParam = searchParams.get('uid');
        const result = dataHandler(api.getUserInfo({ uid: uidParam||"", first_name: "", last_name: "" }), "get", "");

        try {
            result(async function (data: any, status: boolean) {
             
                if (status && data?.result) {
                    setUserInfo({
                        fullname: data.result["fullname"],
                        avatar: data.result["avatar"],
                        bio: data.result["bio"],
                        isFollowing: data.result.isFollowing,
                        totalFollowers: data.result.totalFollowers
                    });
                }
                else {
                    localStorage.removeItem("userInfo");
                    localStorage.removeItem("token");
                    setUserInfo(undefined);
                    router.push("/404");
                }
            });
        } catch (error) {
            console.error("خطا در دریافت اطلاعات کاربر:", error);
        }
    };
    React.useEffect(() => {
        if(!userInfo)
            getData();
    })

    React.useEffect(() => {
        
        const stParam = searchParams.get('st');
        const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

        // اگر وضعیت پروفایل تغییر کرد (مثلاً از شخصی به عمومی)، ایندکس تب‌ها را به صفر ریست کن
       
       // setUserId(uidParam);

        if (stParam === 'login') {
           // setStartGet(true);
        }

       

    }, [searchParams]);

    const tabsHandleOnChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // فیلتر کردن داینامیک لیست تب‌ها بر اساس وجود یا عدم وجود userID (حذف مسابقات در حالت پروفایل مهمان)
    const activeTabs = TabsList.filter((_, index) => !(index === 0));

    return (
        <>
            <Box sx={{ p: 1, minHeight: "100vh" }}>
                <Grid container spacing={2}>
                    <Grid xs={12} lg={12} item>
                        <TopSectionUnifiedAny
                            type="user"
                            info={userInfo}
                        //    id={userID || ""}
                            hostAddress={hostAddress}
                        />
                    </Grid>
                    
                    <Grid xs={12} lg={12} item>
                        <Box sx={{ width: "100%", direction: "rtl", mt: 1 }}>
                            <AppBar 
                                position="static"
                                sx={{
                                    boxShadow: 0, 
                                    direction: "rtl",
                                    width: "100%", 
                                    fontSize: 12,
                                    borderRadius: 2,
                                    background: "none"
                                }}
                            >
                                <Tabs
                                    value={value}
                                    onChange={tabsHandleOnChange}
                                    indicatorColor="secondary"
                                    textColor="inherit"
                                    variant={matchDownMd ? "fullWidth" : "standard"}
                                    aria-label="profile tabs"
                                >
                                    {TabsList.map((item, index) => {
                                        const Icon = item.icon;
                                        return (
                                            <TabWrapped
                                                key={item.label}
                                                label={
                                                    <span style={{ paddingRight: "1px" }}>
                                                        <Chip
                                                            variant="filled"
                                                            sx={{
                                                                background: "none",
                                                                color: theme.palette.primary.main,
                                                                m: 0,
                                                                p: 0,
                                                                "& .MuiChip-label": { ml: 0, pr: 0 },
                                                                "& .MuiChip-icon": { color: theme.palette.primary.main }
                                                            }}
                                                            icon={!matchDownMd ? <Icon stroke={1.5} size="1.3rem" /> : undefined}
                                                            size="small"
                                                            label={item.label}
                                                        />
                                                    </span>
                                                }
                                                {...a11yProps(index)}
                                            />
                                        );
                                    })}
                                </Tabs>
                            </AppBar>
                        </Box>
                        <Divider />
                        
                        <BoxWrapped>
                            {/* سناریو اول: کاربر وارد حساب خود شده و تمام تب‌ها در دسترس هستند */}
                            {userInfo && (
                                <>
                                    <TabPanel value={value} index={0} dir={theme.direction}>
                                        <Box sx={{ mt: 0 }}>
                                            { <UpcomingMatchContet/> }
                                        
                                        </Box>
                                    </TabPanel>
                                    
                                    <TabPanel value={value} index={1} dir={theme.direction}>
                                        <Box sx={{ mt: 1 }}>
                                            { <SportTabContet/> }
                                          
                                        </Box>
                                    </TabPanel>
                                </>
                            )}
                            
                            {/* سناریو دوم: مشاهده پروفایل عمومی (تب مسابقات مخفی است و ورزش‌ها ایندکس 0 می‌شود) 
                            {userInfo && (
                                <TabPanel value={value} index={0} dir={theme.direction}>
                                    <Box sx={{ mt: 1 }}>
                                        { <SportsTabContent/> }
                                        <Typography>محتوای تب ورزش‌های پروفایل عمومی</Typography>
                                    </Box>
                                </TabPanel>
                            )}*/}
                        </BoxWrapped>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Profile;