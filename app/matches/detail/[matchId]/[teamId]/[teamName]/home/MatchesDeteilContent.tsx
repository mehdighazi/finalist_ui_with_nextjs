// app/matches/detail/[...slug]/page.tsx
import { notFound } from 'next/navigation';
import {Paper,Button, Box, Typography, CircularProgress, ListItem, ListItemText, Grid, List, Theme, Stack } from '@mui/material';
import { TeamBox } from '@/components/ui-component/utilities/MatchCardContent';
import { createDateStr, persiandate } from "@/components/utils/Lib";
import MainCard from '@/components/ui-component/cards/MainCard';

import { SxProps } from "@mui/material/styles"; // ✅ اضافه شد

interface PageProps {
    params: Promise<{
        slug: string[];
    }>;

}
interface MatchItemRowProps {
    title: string;
    value: string | number;
    index: number;
}
const MatchItemRow: React.FC<MatchItemRowProps> = ({ title, value, index }) => {
    return (

        <ListItem
            sx={{
                display: "flex",
                direction: "rtl",
                justifyContent: "right",
                background: index % 2 === 0 ? "#f9f9f9" : "#e6f7ff",
                borderBottom: "1px solid #ddd",
                px: 1,
                py: 1,
            }}
        >
            <Typography fontWeight={400} fontSize="0.85rem" component="span">
                {title}:
            </Typography>
            <ListItemText
                sx={{
                    textAlign: "left",
                    "& .MuiTypography-root": { fontSize: "0.80rem" }
                }}
                primary={value}
            />
        </ListItem>
    );
};

// تابع دریافت اطلاعات با دیباگ کامل
async function getMatchDetail(matchId: string) {
    const HOST = process.env.NEXT_PUBLIC_HOST_API_URL ?? 'http://localhost';
    const PORT = process.env.NEXT_PUBLIC_HOST_PORT ? `:${process.env.NEXT_PUBLIC_HOST_PORT}` : '';
    const DOMAIN = `${HOST}${PORT}/api/app/`;
    const apiUrl = `${DOMAIN}match/detail?match_id=${matchId}`;



    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);

        if (!response.ok) {
            console.error('HTTP Error:', response.status);
            return null;
        }

        const result = await response.json();


        // بررسی ساختارهای مختلف پاسخ
        let matchData = null;

        // ساختار 1: result.result.data
        if (result?.result?.data) {
            matchData = result.result.data;
            console.log('Found data in result.result.data');
        }
        // ساختار 2: result.data
        else if (result?.data) {
            matchData = result.data;
            console.log('Found data in result.data');
        }
        // ساختار 3: result.result
        else if (result?.result) {
            matchData = result.result;
            console.log('Found data in result.result');
        }
        // ساختار 4: خود result
        else if (result && typeof result === 'object') {
            matchData = result;
            console.log('Using result itself as data');
        }

        if (!matchData) {
            console.error('No data found in response. Response structure:', Object.keys(result));
            return null;
        }


        return matchData;

    } catch (error: any) {
        console.error('Fetch error:', error.message);
        return null;
    }
}

const headerSx = (size: string): SxProps<Theme> => ({
    p: size === 'lg' ? 2 : 1,
    // backgroundColor: theme.palette.primary.main,
    color: 'primary.white',
    // borderRadius: '8px 8px 0 0',
});
export default async function DetailMatchPage({ params }: PageProps) {
    const { slug } = await params;
    // استخراج matchId
    let matchId = slug?.[0];
    const HOST = process.env.NEXT_PUBLIC_HOST_API_URL ?? '';
    const PORT = process.env.NEXT_PUBLIC_HOST_PORT
        ? `:${process.env.NEXT_PUBLIC_HOST_PORT}`
        : '';

    const DOMAIN = `${HOST}${PORT}/api/app/`;
    // اگر [object Object] بود، از پارامتر دوم استفاده کن
    if (matchId === '[object Object]' && slug?.length > 1) {
        matchId = slug[1];
        console.log('Fixed [object Object] issue, new matchId:', matchId);
    }

    // اگر matchId عددی نیست، سعی کن از قسمت اول URL استخراج کنی
    if (!matchId || matchId === '[object Object]') {
        console.error('Invalid matchId:', matchId);
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h5" color="error">
                    شناسه مسابقه نامعتبر است
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    دریافت شده: {JSON.stringify(slug)}
                </Typography>
            </Box>
        );
    }



    // دریافت اطلاعات
    const matchDetail = await getMatchDetail(matchId);

    if (!matchDetail) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h5" color="error">
                    اطلاعات مسابقه یافت نشد
                </Typography>

            </Box>
        );
    }

    // تبدیل داده‌ها با بررسی وجود فیلدها
    const matchDisplayData = {
        createdAt: matchDetail.createdAt || matchDetail.created_at || new Date().toISOString(),
        match_id: matchId,
        hostTeamName: matchDetail.host_team?.team_name || matchDetail.host_team_name || 'نامشخص',
        hostLogo: matchDetail.host_team?.logo?.logo_path || matchDetail.host_team_logo || '',
        matchSportField: matchDetail.match_sport?.field_title || matchDetail.sport_field || 'فوتبال',
        matchDate: matchDetail.match_date ? (persiandate(matchDetail.match_date)?.[1] || matchDetail.match_date) : '',
        matchTime: matchDetail.match_time || '',
        matchLocation: matchDetail.match_location_address || matchDetail.location || '',
        city: matchDetail.city_match?.city_title || matchDetail.city || '',
        province: matchDetail.province_match?.province_title || matchDetail.province || '',
        description: matchDetail.description || '',
        viewer_count: matchDetail.viewer_count || 0,
    };

    const items = [
        { title: "تاریخ ایجاد", value: createDateStr(matchDisplayData.createdAt) },
        { title: "نوع مسابقه", value: "دوستانه" },
        { title: "تاریخ مسابقه", value: matchDisplayData.matchDate },
        { title: "ساعت مسابقه", value: matchDisplayData.matchTime },
        { title: "استان شهر", value: `${matchDisplayData.province || ''}/${matchDisplayData.city || ''}` },
        { title: "آدرس محل برگزاری", value: matchDisplayData.matchLocation }
    ];

    return (
        <Box sx={{ p: { xs: 1, sm: 2 } }}>
            <MainCard
            

                actions={false}
                contentSX={{ p: 1 }}
                headerSX={headerSx('lg')}
                border={true}
                title={
                    <Stack>
                        <Typography fontSize={18} fontWeight={500} textAlign="center" variant="caption">
                            {`اطلاعات مسابقه ${matchDisplayData.matchSportField}`}
                        </Typography>
                        <Typography fontSize={12} textAlign="center" color={'primary.light'}>
                            {`#${matchDisplayData.match_id}`}
                        </Typography>
                        <Typography fontSize={12} textAlign="center" color={'primary.light'}>
                            {``}
                        </Typography>
                    </Stack>
                }
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                borderRadius: 3,
                                p: 3,
                                background:
                                    "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                                color: "#fff",
                            }}
                        >
                            <Stack spacing={2} alignItems="center">
                                <TeamBox
                                    logo={`${HOST}${PORT}/${matchDisplayData.hostLogo}`}
                                    title={matchDisplayData.hostTeamName}
                                    AvatarSize="lg"
                                />

                                <Typography
                                    variant="h6"
                                    textAlign="center"
                                    fontWeight={600}
                                >
                                    <span>در انتظار حریف</span>
                                </Typography>

                                <Stack
                                    direction="row"
                                    spacing={2}
                                    flexWrap="wrap"
                                    justifyContent="center"
                                >
                                    <Typography variant="body2">
                                        <span>📅 {matchDisplayData.matchDate}</span>
                                    </Typography>

                                    <Typography variant="body2">
                                        <span>⏰ {matchDisplayData.matchTime}</span>
                                    </Typography>
                                </Stack>

                                <Typography
                                    variant="body2"
                                    textAlign="center"
                                >
                                    <span>
                                        📍 {matchDisplayData.province} / {matchDisplayData.city}
                                    </span>
                                </Typography>

                               
                               
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper
                            elevation={0}
                            sx={{
                                border: "1px solid #eee",
                                borderRadius: 3,
                                overflow: "hidden",
                            }}
                        >
                           

                            <List disablePadding>
                                {items.map((item, index) => (
                                    <MatchItemRow
                                        key={index}
                                        title={item.title}
                                        value={item.value}
                                        index={index}
                                    />
                                ))}
                            </List>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper
                            elevation={0}
                            sx={{
                                border: "1px solid #eee",
                                borderRadius: 3,
                                p: 2,
                            }}
                        >
                            <Typography
                                fontWeight={600}
                                mb={1}
                            >
                                <span>توضیحات مسابقه</span>
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    lineHeight: 2,
                                    color: "text.secondary",
                                }}
                            >
                                <span>
                                    {matchDisplayData.description ||
                                        "توضیحاتی برای این مسابقه ثبت نشده است."}
                                </span>
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>


            </MainCard>



        </Box>
    );
}