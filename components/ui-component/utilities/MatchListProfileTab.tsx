import * as React from "react";
import { useState, useEffect } from "react";

// ui-material
import { Link, Stack } from "@mui/material";

// project import
import MatchCardPlaceHolder from '@/components/ui-component/cards/Skeleton/matchCardPlaceHolder';
import NotFoundPlaceHolder from '@/components/ui-component/NotFound';
import { MatchFullCardContent } from "@/components/ui-component/utilities/MatchCardContent";
import dataHandler from '@/components/api/dataHandler';
import { hostAddress } from '@/components/api/api';
import { persiandate } from "@/components/utils/Lib";

// ۱. تعریف ساختار برای تیم‌ها و فایل لوگو
interface TeamLogo {
  logo_path?: string;
}

interface Team {
  team_name?: string;
  logo?: TeamLogo;
}

interface LocationDetail {
  province_title?: string;
  city_title?: string;
}

// ۲. اینترفیس اصلی برای آیتم‌های مسابقه (Match Item)
interface MatchItem {
  id: string | number;
  status: string ;
  total_requests: number;
  createdAt: string;
  viewer_count: number;
  host_team?: Team;
  guest_team?: Team;
  match_type: "casual" | "official";
  match_date: string;
  match_time: string;
  user_team_role: string;
  province_match?: LocationDetail;
  city_match?: LocationDetail;
 confirmRequest?: "accepted" | "pending" | "-1";
}

// ۳. تعریف تایپ برای کامپوننت پراپس (Component Props)
interface MatchListWrapperProps {
  apiFunc: (params: any) => any;
  apiParams: any;
  linkBuilder: (item: MatchItem) => string;
}

const MatchListWrapper: React.FC<MatchListWrapperProps> = ({
  apiFunc,
  apiParams,
  linkBuilder,
}) => {
  const [matchList, setMatchList] = useState<MatchItem[] | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);

  const loadData = () => {
    const Api_ = apiFunc(apiParams);
   
    const result = dataHandler(Api_, "get", "");
console.log(Api_)
    try {
      result(async function (data: any, status: any) {
       
        if (data?.result?.data?.length > 0) {
          setMatchList(data.result.data);
        }
        // اگر دیتا خالی بود یا لود نشد، بعد از ۵ ثانیه وضعیت عدم یافتن فعال می‌شود
        setTimeout(() => setNotFound(true), 5000);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setMatchList(null);
    setNotFound(false); // ریست کردن وضعیت عدم یافتن هنگام تغییر پارامترها
    loadData();
  }, [JSON.stringify(apiParams)]);

  return (
    <Stack spacing={1} sx={{ direction: "rtl", minWidth: "100%", px: { xs: 0.5, sm: 0.5, lg: 2 } }}>
      {matchList ? (
        matchList.map((item) => {
          console.log(item)
          return(
          <Link
            key={item.id} // اضافه کردن کلید یکتا برای رندر بهینه در ری‌اکت
            sx={{
              textDecoration: "none",
              "&:hover": { cursor: "pointer", textDecoration: "none" },
            }}
            href={linkBuilder(item)}
          >
           
            <MatchFullCardContent
             user_team_role={item.user_team_role}
              confirmRequest={item.confirmRequest}
              requestNumber={item.total_requests}
              createDate={item.createdAt}
              viwer={item.viewer_count}
             hostTeamName={item.host_team?.team_name ?? ""}
              logoHost={
                item.host_team?.logo?.logo_path
                  ? `${hostAddress}${item.host_team.logo.logo_path}`
                  : ""
              }
              guestTeamName={item.guest_team?.team_name}
              logoGuest={
                item.guest_team?.logo?.logo_path
                  ? `${hostAddress}${item.guest_team.logo.logo_path}`
                  : ""
              }
              matchType={item.match_type??""}
              dateMatch={persiandate(item.match_date)[1]}
              timeMatch={item.match_time}
              location={`${item.province_match?.province_title || ''}/${item.city_match?.city_title || ''}`}
            />
          </Link>
        )})
      ) : !notFound ? (
        <MatchCardPlaceHolder />
      ) : (
        <NotFoundPlaceHolder />
      )}
    </Stack>
  );
};

export default MatchListWrapper;