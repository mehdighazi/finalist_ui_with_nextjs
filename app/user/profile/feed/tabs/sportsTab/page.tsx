"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
// ui-material
import { Box, Typography, useTheme } from "@mui/material";
// tabler icon
import {
    IconActivityHeartbeat,
    IconHomeBolt,
    IconKey,
    IconMedal,
    IconPennant2,
    IconUserExclamation,
    IconUsers,
} from "@tabler/icons-react";
// project import
import api from '@/components/api/api';
import dataHandler from '@/components/api/dataHandler';
import ListTeams from "./list";

// ----------------------------------------------------------------------

interface TeamMember {
    team_member_id: number;
    user_id: number;
    role: string;
    join_date: string;
    team_id: number;
    status: number;
    seen: boolean;
    banned: boolean;
    type: string;
    createdAt: string;
    updatedAt: string;
}

interface TeamLogo {
    logo_path: string;
    logo_owner: number;
    status: number;
}

interface SportInfo {
    sport_field_id: number;
    field_title: string;
    field_icon: string | null;
}

interface TeamItem {
    team_id: number;
    team_name: string;
    sport_field_id: number;
    sport: SportInfo;
    logo: TeamLogo | null;
    team_members: TeamMember;
}

// ساختار دقیق دیتای درونی فیلد result
interface SportsDataInner {
    user_id: number;
    first_name: string;
    last_name: string;
    teams: TeamItem[];
}

// تایپ استیت اصلی کامپوننت که شامل کپسولِ result است
interface SportsDataResponse {
    state: number;
    result: SportsDataInner;
    message: string;
}

// کست کردن کامپوننت فرزند به any جهت دور زدن باگ IntrinsicAttributes و عدم پذیرش پروپِ data
const ListTeamsAny = ListTeams as React.ComponentType<any>;

const icons = {
    IconKey,
    IconMedal,
    IconUsers,
    IconUserExclamation,
    IconPennant2,
    IconHomeBolt,
    IconActivityHeartbeat
};

// ----------------------------------------------------------------------

const SportsTab: React.FC = () => {
    const searchParams = useSearchParams();
    const theme = useTheme();

    // تغییر تایپ استیت به ساختار پاسخ کامل دیتابیس
    const [data, setData] = React.useState<SportsDataResponse | null>(null);

    const getData = React.useCallback(async (uid: string | null) => {
        const result = dataHandler(api.listUserSportTeam({ uid: uid || "" }), "get", "");
        
        try {
            result(async function (res: any, status: boolean) {
                console.log(res);
                // بررسی وجود دیتا و پر بودن آرایه تیم‌ها
                if (status && res?.result?.teams?.length > 0) {
                    setData(res); // ذخیره کل آبجکت پاسخ دیتابیس برای در دسترس بودن فیلد .result
                }
            });
        } catch (error) {
            console.error("خطا در دریافت لیست تیم‌های ورزشی:", error);
        }
    }, []);

    React.useEffect(() => {
        const uid = searchParams.get('uid');
        getData(uid);
    }, [searchParams, getData]);

    return (
        <Box sx={{ p: 1, minHeight: 450 }}>
            {data ? (
                // استفاده از کامپوننت کست‌شده برای پذیرفتن بی‌قید و شرط دیتای پاس داده شده
                <ListTeamsAny data={data} />
            ) : (
                <Box sx={{ p: 5 }}>
                    <Typography component="p" fontSize={12} sx={{ color: theme.palette.grey[400] }}>
                        <i>
                            ورزش های شما در صورت عضویت در تیم های ورزشی اینجا نمایش داده می شود
                        </i>
                    </Typography>
                    <Typography fontSize={12} sx={{ color: theme.palette.grey[400], mt: 1 }}>
                        <i>
                            تیم نداری؟ از <a href={'team/create?pg=sprt'}> اینجا </a> یه تیم ایجاد کن
                        </i>
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default SportsTab;