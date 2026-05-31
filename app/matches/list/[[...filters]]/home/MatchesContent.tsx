
import * as React from "react";
import Link from "next/link";

// ui-material
import {
    Box,
    Divider,
    Grid,
} from "@mui/material";

// project imports
import Transition from "@/components/ui-component/utilities/extended/Transitions";
import { MatchFullCardContent } from "@/components/ui-component/utilities/MatchCardContent";
import { hostAddress } from "@/components/api/api";
import { persiandate } from "@/components/utils/Lib";

// types
interface MatchesContentProps {
    filters?: string;
    searchQuery?: string;
    sportFieldId?: string;
    cityId?: string;
    page: number;
}


export const dynamic = 'force-dynamic';

export default async function MatchesContent({
    filters,
    searchQuery,
    sportFieldId,
    cityId,
    page = 1,
}: MatchesContentProps) {
   

    // این لاگ در کنسول مرورگر دیده می‌شود

    // ساخت body برای API
    const Allparam = {
        page_size: 10,
        page_index: page,
        param: filters || "",
        sport_field_id: sportFieldId || "",
        match_city_id: cityId ? Number(cityId) : "",
        query: searchQuery || ""
    };
    const HOST = process.env.NEXT_PUBLIC_HOST_API_URL ?? '';
    const PORT = process.env.NEXT_PUBLIC_HOST_PORT
        ? `:${process.env.NEXT_PUBLIC_HOST_PORT}`
        : '';

    const DOMAIN = `${HOST}${PORT}/api/app/`;
    // دریافت آدرس API از environment variable
    // const domain = `${process.env.NEXT_PUBLIC_API_URL}:3957/api/matches/list`;
    const apiUrl = `${DOMAIN}match/list?match_city_id=${Allparam.match_city_id}&query=${Allparam.query}&page_index=${Allparam.page_index}&page_size=${Allparam.page_size}&param=&sport_field_id=${Allparam.sport_field_id}`
    // فراخوانی مستقیم fetch در کامپوننت
    let matches = [];

 
  

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            //   body: JSON.stringify(body),
            // مهم برای SSR - جلوگیری از کش کردن
            cache: 'no-store',
        });


        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        matches = result?.result?.data || [];

                

   

    // اگر مسابقه‌ای وجود نداشت
   if (matches.length === 0) {
        return (
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <p>هیچ مسابقه‌ای با این فیلترها یافت نشد</p>
            </Box>
        );
    }

    // رندر مسابقات
    return (
        <>
        
          
            {matches.map((item: any) => (
                <Grid item xs={12} key={item.match_id}>
                   
                            <Link
                                href={`/matches/detail/${item.match_id}/${item.host_team_id}/${encodeURIComponent(item.host_team.team_name)}`}
                                style={{ textDecoration: "none" }}
                            >
                                <Box sx={{ p: 1 }}>
                                   
                                    <MatchFullCardContent
                                        confirmRequest="-1"
                                        createDate={item.createdAt}
                                        viwer={item.viewer_count ?? "0"}
                                        matchSportField={item.match_sport.field_title}
                                        matchType={item.match_type}
                                        hostTeamName={item.host_team.team_name}
                                        logoHost={`${HOST}${PORT}/${item?.host_team?.logo?.logo_path}`}
                                        rateHost={2}
                                        dateMatch={persiandate(item.match_date)[1]}
                                        timeMatch={item.match_time}
                                        location={`${item.province_match.province_title}/${item.city_match.city_title}`}
                                    />
                                </Box>
                            </Link>
                        
                    <Divider />
                </Grid>
            ))}
            </>
      
    );
}  