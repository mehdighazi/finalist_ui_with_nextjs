import * as React from "react";
import Link from "next/link";

// ui-material
import {
    Box,
    Divider,
    Grid,
} from "@mui/material";

// project imports
import Transition from "@/components/ui-component/extended/Transitions";
import { MatchFullCardContent } from "@/components/ui-component/utilities/MatchCardContent";
import TotalIncomeCard from "@/components/ui-component/cards/Skeleton/TotalIncomeCard";
import {dataHandlerWithFetch} from "@/components/api/dataHandler";
import api from "@/components/api/api.server";
import { hostAddress } from "@/components/api/api";
import { persiandate } from "@/components/utils/Lib";
//-----------------------------------------
const data= [ {
                "match_id": 22,
                "sport_field_id": 2,
                "host_team_id": 21,
                "guest_team_id": null,
                "match_time": "23:56:00",
                "match_date": "2025-12-16T20:30:00.000Z",
                "contract_uploaded": false,
                "match_result": null,
                "match_winner_team_id": null,
                "match_province_id": 7,
                "match_city_id": 1,
                "match_type": "casual",
                "match_location_address": "خیابان شهید منتظری",
                "match_location_lat": null,
                "match_location_lng": null,
                "description": "توضیحات اضافی",
                "total_requests": 0,
                "host_points": 0,
                "guest_points": 0,
                "status": "active",
                "seen": false,
                "banned": false,
                "createdAt": "2025-12-07T11:33:58.000Z",
                "updatedAt": "2025-12-07T11:33:58.000Z",
                "viewer_count": 0,
                "host_team": {
                    "team_id": 21,
                    "team_name": "پرسپولیس ایران",
                    "logo": {
                        "logo_path": "/TEAM_MEDIA/LOGO/1.png",
                        "logo_owner": 1,
                        "status": 1
                    }
                },
                "guest_team": null,
                "city_match": {
                    "city_id": 1,
                    "city_title": "تهران"
                },
                "province_match": {
                    "province_id": 7,
                    "province_title": "تهران"
                },
                "match_sport": {
                    "sport_field_id": 2,
                    "field_title": "فوتبال سالنی"
                }
            }]
//----------------------------------------

// types
interface MatchesContentProps {
    filters?: string;
    searchQuery?: string;
    sportFieldId?: string;
    cityId?: string;
    page: number;
}

export default async function MatchesContent({
    filters,
    searchQuery,
    sportFieldId,
    cityId,
    page = 1,
}: MatchesContentProps) {
    
        // ساخت body برای API
        const body = {
            page_size: 10,
            page_index: page,
            param: filters || "",
            sport_field_id: sportFieldId || "",
            match_city_id: cityId ? Number(cityId) : "",
            query: searchQuery || ""
        };

        // فراخوانی API در سرور
        const result =await  dataHandlerWithFetch(api.listMatch({}), "get", "");
    
        /*if (!result || !result.result || !result.result.data) {
            return (
                <Box sx={{ p: 2, textAlign: 'center' }}>
                    <p>هیچ داده‌ای یافت نشد</p>
                </Box>
            );
        }*/

       // const matches = result.result.data;

       /* if (matches.length === 0) {
            return (
                <Box sx={{ p: 2, textAlign: 'center' }}>
                    <p>هیچ مسابقه‌ای با این فیلترها یافت نشد</p>
                </Box>
            );
        }*/

        return (
            <Grid container spacing={2}>
                {data.map((item: any) => (
                    <Grid item xs={12} key={item.match_id}>
                        <Transition type="fade" in>
                            <Transition type="grow" in>
                                <Link
                                    href={`/detail/${item.match_id}/${item.host_team_id}/${item.host_team_name}`}
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
                                            logoHost={`${hostAddress}/${item.host_team.logo.logo_path}`}
                                            rateHost={2}
                                            dateMatch={persiandate(item.match_date)[1]}
                                            timeMatch={item.match_time}
                                            location={`${item.province_match.province_title}/${item.city_match.city_title}`}
                                        />
                                    </Box>
                                </Link>
                            </Transition>
                        </Transition>
                        <Divider />
                    </Grid>
                ))}
            </Grid>
        );
   
}