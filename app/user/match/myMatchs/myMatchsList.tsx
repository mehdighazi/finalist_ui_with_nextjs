"use client";

import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  Avatar,
  Link,
  Typography,
  Chip
} from "@mui/material";

// پروژکت ایمپورت‌ها
import MatchCardPlaceHolder from '@/components/ui-component/cards/Skeleton/matchCardPlaceHolder';
import NotFoundPlaceHolder from '@/components/ui-component/NotFound';
import dataHandler from '@/components/api/dataHandler';
import api from '@/components/api/api';
import { hostAddress } from '@/components/api/api';
import { persiandate } from "@/components/utils/Lib";

function AvatarWithLabel({ name, avatar }) {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Avatar sx={{ width: 20, height: 20 }} alt={name} src={avatar} />
      <Typography fontSize="0.8rem" fontWeight={500}>
        {name}
      </Typography>
    </Box>
  );
}

// کامپوننت حالا Props فیلترها را از کامپوننت مادر (MUI Tabs) دریافت می‌کند
interface MatchListProps {
  teamId: string;
  tab: string;     // "upcoming" یا "history"
  role: string;    // "all" یا "host" یا "guest"
  result?: string; // "all" یا "win" یا "lose" یا "draw"
  sub_status?: string; // وضعیت فرعی (مثلاً "confirmed", "pending", "rejected")
}

const MatchList = ({ teamId, tab, role, result = "all", sub_status }: MatchListProps) => {
  const [matchList, setMatchList] = useState<any[] | null>(null);
  const [notFound, setNotFound] = useState(false);
  const fontSize = 12;
  console.log({ teamId })
  const getData = () => {
    setMatchList(null);
    setNotFound(false);

    // ۱. مشخص کردن اکشن بر اساس نقش (میزبان یا میهمان)
    // نکته: برای حالت role === "all" باید با بک‌اند هماهنگ کنید که یک API جامع بدهد، 
    // یا به صورت پیش‌فرض یکی از آن‌ها را صدا بزنید. در اینجا فرض را بر تفکیک می‌گذاریم.
    const isHost = role === "host" || role === "all";
    console.log({ isHost })
    // ۲. ارسال پارامترهای فیلتر (وضعیت زمان بازی و نتیجه) به عنوان کوئری به API
    // شما باید این پارامترها (tab و result) را به متد ای‌پ‌آی خود منتقل کنید تا بک‌بند دیتای فیلتر شده بدهد
    /* const Api_ = isHost
       ? api.hostmatchList(3, teamId, `?status=${tab}&result=${result}`, "")
       : api.guestMatchRequest(3, teamId, `?status=${tab}&result=${result}`);*/
    const userToken = ""
    const query = "";
    const param = ""
    const Api_ = api.matchTeamList(teamId, userToken, tab, sub_status, role)
    const handler = dataHandler(Api_, "get", "");

    console.log("API URL:", Api_); // برای دیباگ کردن آدرس API
    try {
      handler(async function (data: any, status: any) {
        console.log("API Response:", data.result); // برای دیباگ کردن پاسخ API
        if (data && data.result) {
          // با ساختار جدید بک‌اندر، دیتای هاست و گست کاملاً یکسان و در data.result.data قرار دارد
          let normalizedData =role==="host" ? data.result.data || [] : data.result || [];
          console.log("API Response:", normalizedData);
          setMatchList(normalizedData);
        } else {
          setMatchList([]);
        }
      });
    } catch (error) {
      setMatchList([]);
    }
  };

  // هر زمان هرکدام از فیلترها عوض شد، دیتا دوباره واکشی می‌شود
  useEffect(() => {
    getData();
    console.log({ teamId, tab, role, result })
    // تایمر ۵ ثانیه‌ای برای نمایش عدم یافتن مسابقه
    const timer = setTimeout(() => setNotFound(true), 5000);
    return () => clearTimeout(timer);
  }, [teamId, tab, role, result, sub_status]);

  // تابع کمکی برای تشخیص رنگ و متن وضعیت نتیجه (بر اساس بیزینس اپ شما)
  const renderResultBadge = (itemResult: string) => {
    if (tab !== "history") return null;
    const config: Record<string, { label: string; color: "success" | "error" | "warning" }> = {
      win: { label: "برد", color: "success" },
      lose: { label: "باخت", color: "error" },
      draw: { label: "مساوی", color: "warning" },
    };
    const current = config[itemResult];
    return current ? <Chip label={current.label} color={current.color} size="small" variant="flat" sx={{ fontSize: '0.65rem', height: 20 }} /> : null;
  };

  return (
    <Box sx={{ p: 1, width: "100%", bgcolor: "background.paper", border: "1px solid #ddd", borderRadius: 1, direction: 'rtl' }}>
      {/* سرستون مسابقات */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 2,
          py: 1,
          color: "grey.600",
          bgcolor: "grey.200",
          borderBottom: "1px solid #ccc",
        }}
      >
        <Typography fontSize={fontSize} sx={{ flex: 1.5, textAlign: "right" }}>تیم‌ها</Typography>
        <Typography fontSize={fontSize} sx={{ flex: 1, textAlign: "center" }}>زمان/تاریخ</Typography>
        <Typography fontSize={fontSize} sx={{ flex: 1, textAlign: "center" }}>محل برگزاری</Typography>
        {tab === "upcoming" ? (
          <Typography fontSize={fontSize} sx={{ flex: 1, textAlign: "center" }}>تعداد درخواست</Typography>
        ) : (
          <Typography fontSize={fontSize} sx={{ flex: 1, textAlign: "center" }}>نتیجه</Typography>
        )}
      </Box>

      {/* لیست اصلی مسابقات */}
      <List disablePadding>
        {matchList && matchList.length > 0 ? (
          matchList.map((item, id) => {
            // یکسان‌سازی دسترسی به فیلدهای شیء مسابقه (چه در حالت هاست چه گست)
            const matchData = item.request_match ? item.request_match : item;
            const hostTeamName = matchData.host_team?.team_name || "تیم میزبان";
            const guestTeamName = matchData.guest_team?.team_name || "-";

            return (
              <React.Fragment key={matchData.match_id || id}>
                <Link
                  href={`/app/user/match/requests/${matchData.match_id}/${teamId}`}
                  sx={{
                    textDecoration: "none", // حذف آندرلاین خود لینک
                    "&:hover": {
                      color: "secondary.main",
                      cursor: "pointer",
                      textDecoration: "none", // حذف آندرلاین خود لینک
                      "& *": { textDecoration: "none !important" } // حذف آندرلاین تمام تگ‌های متنی داخلی
                    },
                  }}
                >
                  <ListItem alignItems="flex-start" sx={{ px: 2, py: 1.5 }}>
                    {/* ستون اول: تیم‌ها */}
                    <Box sx={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <AvatarWithLabel
                        name={hostTeamName}
                        avatar={matchData.host_team?.logo?.logo_path ? `${hostAddress}/${matchData.host_team.logo.logo_path}` : ""}
                      />
                      <AvatarWithLabel
                        name={guestTeamName}
                        avatar={matchData.guest_team?.logo?.logo_path ? `${api.hostname}${matchData.guest_team.logo.logo_path}` : ""}
                      />
                    </Box>

                    {/* ستون دوم: تاریخ و ساعت */}
                    <ListItemText
                      primary={
                        <Box sx={{ textAlign: "center",pt:1 }}>
                          <Typography fontSize="0.75rem" fontWeight="bold">
                            {persiandate(matchData.match_date)?.[1] || matchData.match_date}
                          </Typography>
                          <Typography fontSize="0.7rem" color="text.secondary">
                            {matchData.match_time}
                          </Typography>
                        </Box>
                      }
                      sx={{ flex: 1, m: 0 }}
                    />

                    {/* ستون سوم: محل برگزاری */}
                    <ListItemText
                      primary={
                        <Typography component={"div"} variant="body2" sx={{pt:1, textAlign: "center", fontSize: '0.75rem' }}>
                          {matchData.province_match?.province_title && matchData.city_match?.city_title
                            ? `${matchData.province_match.province_title} / ${matchData.city_match.city_title}`
                            : "نامشخص"}
                        </Typography>
                      }
                      sx={{ flex: 1, m: 0 }}
                    />

                    {/* ستون چهارم: تعداد درخواست (برای بازی‌های آینده) یا نشان نتیجه (برای تاریخچه) */}
                    <Box sx={{pt:1, flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {tab === "upcoming" ? (
                        <Typography variant="body2" fontWeight="bold">
                          {matchData.total_requests || 0}
                        </Typography>
                      ) : (
                        // فیلد تمپلیت فرضی برای نتیجه بازی از سمت دیتابیس (مثلاً matchData.your_team_result)
                        renderResultBadge(matchData.your_team_result || "win")
                      )}
                    </Box>
                  </ListItem>
                </Link>
                <Divider component="li" />
              </React.Fragment>
            );
          })
        ) : !notFound ? (
          <MatchCardPlaceHolder />
        ) : (
          <NotFoundPlaceHolder />
        )}
      </List>
    </Box>
  );
};

export default MatchList;