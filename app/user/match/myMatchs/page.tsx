"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Avatar, Toolbar, Chip, Tabs, Tab, Paper, Box, Typography, Divider, FormControl, InputLabel,
  SelectChangeEvent, ListItemIcon, Select, MenuItem, ListItemText, ListItemAvatar, useTheme, Container, Stack, ToggleButtonGroup, ToggleButton
} from "@mui/material";
// کامپوننت‌های فرضی شما برای رندر کردن کارت‌های مسابقات
// این‌ها رو باید بر اساس ساختار دیتای خودت بسازی
import UpcomingList from "./upcoming_list";
import HistoryList from "./history_list";
import { hostAddress } from "@/components/api/api";
import dataHandler from '@/components/api/dataHandler';
import api from '@/components/api/api';
//------------------------| Select Team listBox |----------------------------------
//-----------------------------------| List Box |---------------------------------------


// نکته: اگر این کامپوننت‌ها تایپ ندارند، موقتاً به صورت any یا کامپوننت ساده ایمپورت می‌شوند
// این قطعات در کد شما استفاده شده بودند:
// import IconText from "@/components/ui-component/IconText"; 
// import { IconUser } from "@tabler/icons-react";
// import CustomAvatar from "@/components/ui-component/CustomAvatar";

// ۱. تعریف اینترفیس برای ساختار دیتای هر تیم (بر اساس دیتای بک‌اند شما)
interface TeamLogo {
  logo_path?: string;
}

interface TeamOption {
  team_id: number;
  team_name: string;
  logo?: TeamLogo;
  icon?: React.ReactNode; // اگر فیلد لوکال یا آیکون خاصی دارد
}

// ۲. تعریف اینترفیس برای پروپس کامپوننت
interface IconSelectBoxProps {
  onChange: (teamId: number | undefined) => void;
}

export function TeamSelectListBox({ onChange }: IconSelectBoxProps) {
  const [value, setValue] = useState<string>('');
  const [teams, setTeams] = useState<TeamOption[] | null>(null);

  const theme = useTheme();
  const IconColor = theme.palette.grey[400];
  const TextColor = theme.palette.grey[600];

  // دریافت دیتای لیست تیم‌های کاربر
  const getData = () => {
    const result = dataHandler(api.listUserTeam(""), "get", "");

    try {
      result(async function (data: any, status: number) {
        if (data && data.result) {
          setTeams(data.result);
        }
      });
    } catch (error) {
      console.error("خطا در دریافت لیست تیم‌ها:", error);
    }
  };

  // تایپ هندلر رویداد تغییر سلکت باکس در MUI
  const handleChange = (event: SelectChangeEvent<string>) => {
    setValue(event.target.value);
  };

  // پیدا کردن تیم انتخاب شده از روی ID
  const selectedOption = teams && teams.find((opt) => opt.team_id === Number(value));

  // هوک لود اولیه دیتا
  useEffect(() => {
    getData();
  }, []);


  // ارسال وضعیت به کامپوننت مادر هنگام تغییر تیم انتخاب شده
  useEffect(() => {
    if (onChange) {
      onChange(selectedOption ? selectedOption.team_id : undefined);
    }
    // حذف مکرر selectedOption از دپندنسی برای جلوگیری از لگ یا رندرهای چندباره؛ 
    // بهتر است فقط به فیلد مقدار (value) حساس باشد.
  }, [value]);

  return (
    <Box sx={{ p: 0, direction: 'rtl', width: "100%" }}>
      <Typography textAlign='right' fontWeight={500} mt={0} sx={{ mb: 1 }}>
        {/* این بخش را با کامپوننت‌های خودتان هماهنگ کنید، برای بیلد بدون ارور موقتاً متن عادی قرار گرفت */}
        <span style={{ color: TextColor, fontSize: '12px' }}>انتخاب تیم</span>
      </Typography>

      <FormControl fullWidth size="small">
        <Select
          labelId="icon-select-label"
          id="icon-select"
          value={value}
          onChange={handleChange}
          displayEmpty
          renderValue={(selected) => {
            // اگر مقداری انتخاب نشده بود
            if (!selected) {
              return <span style={{ color: theme.palette.text.secondary, fontSize: '0.775rem' }}>انتخاب کنید</span>;
            }

            return selectedOption ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {selectedOption.icon}
                <span style={{ fontSize: '0.775rem' }}>{selectedOption.team_name}</span>
              </Box>
            ) : null;
          }}
        >
          {teams && teams.map((option) => (
            <MenuItem key={option.team_id} value={option.team_id.toString()}>
              <ListItemAvatar sx={{ minWidth: 35 }}>
                {/* از آواتار استاندارد MUI استفاده شد، اگر CustomAvatar داری جایگزین کن */}
                <Avatar
                  src={option?.logo?.logo_path ? `${hostAddress}/${option.logo.logo_path}` : undefined}
                  sx={{ width: 24, height: 24, fontSize: '0.75rem' }}
                >
                  {!option?.logo?.logo_path && option?.team_name?.[0]}
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={option.team_name}
                primaryTypographyProps={{ style: { fontSize: '0.775rem', textAlign: 'right' } }}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
//---------------------------------------------------------------------------------
function MyMatchesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // خواندن فیلترها از URL با مقادیر پیش‌فرض
  const currentTab = searchParams.get("tab") || "upcoming";
  const currentRole = searchParams.get("role") || "all";
  const currentResult = searchParams.get("result") || "all";

  // تابع سراسری برای آپدیت تمیز URL Query Params
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" && key !== "role") {
      params.delete(key); // برای تمیز ماندن URL، مقادیر all حذف می‌شوند
    } else {
      params.set(key, value);
    }
    // در صورت جابه‌جایی بین تب‌های اصلی، فیلتر نتیجه بازی قبلی پاک شود
    if (key === "tab" && value === "upcoming") {
      params.delete("result");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* هدر صفحه */}
      <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom>
        مسابقات من
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        مدیریت و مشاهده بازی‌های پیش‌رو و تاریخچه مسابقات تیم شما
      </Typography>
      {/*انتخاب تیم */}
      <Stack spacing={2}>
        <TeamSelectListBox onChange={(teamId) => updateFilter("teamId", teamId?.toString() || "")} />
        <Box sx={{ width: { xs: "100%", sm: "auto", mt: 4 } }}>
          <Typography variant="subtitle2" textAlign="right" sx={{ mb: 1, color: "text.secondary" }}>
            نقش تیم شما:
          </Typography>
          <ToggleButtonGroup
            value={currentRole}
            exclusive
            onChange={(_, newValue) => newValue && updateFilter("role", newValue)}
            size="small"
            fullWidth
          >
            <ToggleButton value="all"><span>همه</span></ToggleButton>
            <ToggleButton value="host"><span>میزبان</span></ToggleButton>
            <ToggleButton value="guest"><span>میهمان</span></ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* لایه اول: تب‌های اصلی (MUI Tabs) */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs
            value={currentTab}
            onChange={(_, newValue) => updateFilter("tab", newValue)}
            aria-label="وضعیت مسابقات"
            variant="fullWidth"
          >
            <Tab label={<span>تاریخچه بازی‌ها</span>} value="history" id="tab-history" />
            <Tab label={<span>مسابقات پیش رو</span>}
              value="upcoming" id="tab-upcoming" />

          </Tabs>
        </Box>
      </Stack>     

        {/* لایه سوم: نتایج (فقط در تب تاریخچه نمایش داده می‌شود) */}
        {currentTab === "history" && (
          <Box sx={{ mt: 5 }}>

            <Stack direction="row" spacing={1}>
              {[
                { label: "همه", value: "all" },
                { label: "بردها", value: "win", color: "success" as const },
                { label: "مساوی‌ها", value: "draw", color: "warning" as const },
                { label: "باخت‌ها", value: "lose", color: "error" as const },
              ].map((item) => (
                <Chip
                  key={item.value}
                  label={item.label}
                  clickable
                  color={currentResult === item.value ? (item.color || "primary") : "default"}
                  variant={currentResult === item.value ? "filled" : "outlined"}
                  onClick={() => updateFilter("result", item.value)}
                />
              ))}
            </Stack>
          </Box>
        )}
     
      <Divider sx={{ mb: 4 }} />

      {/* بخش نمایش لیست نهایی بر اساس فیلترها */}
      <Box sx={{ minHeight: "200px" }}>
        {currentTab === "upcoming" ? (
          <UpcomingList role={currentRole} />
        ) : (
          <>
            {/** <HistoryList role={currentRole} result={currentResult} />*/}
          </>
        )}
      </Box>
    </Container>
  );
}

// چون از searchParams استفاده شده، کل پیج را در Suspense می‌پیچیم تا Next ارور کمپرشن ندهد.
export default function MyMatchesPage() {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <MyMatchesContent />
    </Suspense>
  );
}