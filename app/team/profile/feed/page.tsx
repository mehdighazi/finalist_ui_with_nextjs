"use client";

import * as React from "react";
import { useRouter, useSearchParams } from 'next/navigation';
// ui-material
import { AppBar, Box, Chip, Divider, Grid, Tab, Tabs, Typography, useMediaQuery, useTheme } from "@mui/material";
// tabler icon
import { IconList, IconOlympics, TablerIcon } from '@tabler/icons-react';
// project import
import TopSection from './topSection';
import MemberTabContent from './tabs/memberTab';
import UpComingMacthContent from "./tabs/upComingMatchTab";
import ContentTabContent from './tabs/contentTab';
import { styled } from "@mui/material/styles";
import dataHandler from '@/components/api/dataHandler';
import api from '@/components/api/api';

// ----------------------------------------------------------------------

interface TabItem {
    label: string;
    icon: TablerIcon;
}

const TabsList: TabItem[] = [
    {
        label: "مسابقات ",
        icon: IconList
    },
    {
        label: "اعضا",
        icon: IconOlympics
    }
];

// ----------------------------------------------------------------------

const BoxWrapped = styled(Box)(({ theme }) => ({
    minWidth: "100%",
    marginTop: 8,
    borderRadius: 3,
    padding: 0.5,
    marginBottom: 20,
}));

const TabWrapped = styled(Tab)(({ theme }) => ({
    fontSize: 12,
    p: 0,
    minHeight: 50,
    '&:hover': {
        cursor: 'pointer',
        color: theme.palette.primary.main,
    },
}));

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
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
};

const a11yProps = (index: number) => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
};

// ----------------------------------------------------------------------

const Profile: React.FC = () => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    const [value, setValue] = React.useState<number>(0);
    const [teamInfo, setTeamInfo] = React.useState<any>(null);
    const [teamID, setTeamId] = React.useState<string>("");
    const searchParams = useSearchParams();
    const tid = searchParams.get('tid') || "";
    const getData = () => {

        if (!tid) return;
        const result = dataHandler(api.teamProfile(tid), "get", "");
      
        try {
            result(async function (data: any, status: boolean) {
                if (status && data?.result) {
                    setTeamInfo(data.result);
                }
            });
        } catch (error) {
            console.error("خطا در دریافت پروفایل تیم:", error);
        }
    }

    // اجرای ریکوئست پس از مشخص شدن تیم‌آیدی
    React.useEffect(() => {
        if (!teamInfo) {
            getData();

        }
    }, []);

    const tabsHandleOnChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ p: 1, minHeight: "100vh" }}>
                <Grid container spacing={2}>
                    <Grid xs={12} lg={12} item>

                        <TopSection teamInfo={teamInfo} />
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
                                    {TabsList.map((item, i) => {
                                        const Icon = item.icon;

                                        return (
                                            <TabWrapped
                                                key={i}
                                                label={
                                                    <span style={{ paddingRight: "1px" }}>
                                                        <Chip
                                                            variant="filled"
                                                            sx={{
                                                                background: "none",
                                                                color: theme.palette.primary.main,
                                                                m: 0,
                                                                p: 0,
                                                                cursor: 'pointer',
                                                                '&:hover': {
                                                                    color: theme.palette.primary.main,
                                                                },
                                                                "& .MuiChip-label": {
                                                                    ml: 0,
                                                                    pr: 0,
                                                                },
                                                                "& .MuiChip-icon": {
                                                                    color: theme.palette.primary.main
                                                                }
                                                            }}
                                                            icon={!matchDownMd ? <Icon stroke={1.5} size="1.3rem" /> : undefined}
                                                            size="small"
                                                            label={item.label}
                                                        />
                                                    </span>
                                                }
                                                {...a11yProps(i)}
                                            />
                                        );
                                    })}
                                </Tabs>
                            </AppBar>
                        </Box>

                        <Divider />

                        <BoxWrapped>
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                <Box sx={{ mt: 0 }}>
                                    {<UpComingMacthContent /> }
                                </Box>
                            </TabPanel>

                            <TabPanel value={value} index={1} dir={theme.direction}>
                                <Box sx={{ mt: 1 }}>
                                   
                                    {<MemberTabContent /> }
                                </Box>
                            </TabPanel>

                            <TabPanel value={value} index={2} dir={theme.direction}>
                                <Box sx={{ mt: 0 }}>
                                    {/* <ContentTabContent /> */}
                                </Box>
                            </TabPanel>

                            <TabPanel value={value} index={3} dir={theme.direction}>
                                <Box sx={{ mt: 0 }}>
                                    <Typography variant="h6">افتخارات</Typography>
                                </Box>
                            </TabPanel>
                        </BoxWrapped>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Profile;