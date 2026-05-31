import * as React from "react";
import { useState,useEffect } from "react";
//ui-material
import {
  Box,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

//project import
import MatchCardPlaceHolder from 'ui-component/cards/Skeleton/matchCardPlaceHolder'
import NotFoundPlaceHolder from 'ui-component/NotFound'
import CustomCard from "ui-component/cards/CustomCard";
import {
  MatchListCardContent,
  MatchFullCardContent,
} from "@/components/ui-component/utilities/MatchCardContent";
import Logo1 from "assets/images/test/t1.png";
import dataHandler from '@/components/api/dataHandler';
import api from '@/components/api/api';
import { hostAddress } from "api/api";
import { persiandate } from "utils/Lib";
const MatchListWrapper = ({
    apiFunc,      // تابع API که دیتا میاره
    apiParams,    // پارامترهای API
    linkBuilder,  // تابعی که لینک درست می‌کنه
}) => {

    const [matchList, setMatchList] = useState(null);
    const [notFound, setNotFound] = useState(false);

    const loadData = () => {
        const Api_ = apiFunc(apiParams);
     
        const result = dataHandler(Api_, "get", "");

        try {
            result(async function (data, status) {

                console.log(data)
                if (data.result.data.length > 0) 
                    setMatchList(data.result.data);

                setTimeout(() => setNotFound(true), 5000);
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setMatchList(null);
        loadData();
    }, [JSON.stringify(apiParams)]);

    return (
        <Stack sx={{ direction: "rtl", minWidth: "100%",px:{xs:0.5,sm:0.5,lg:2} }}>
            {matchList ? (
                matchList.map((item) => (
                    <Link 
                        sx={{ 
                            textDecoration: "none", 
                            "&:hover": { cursor: "pointer" } 
                        }}
                        href={linkBuilder(item)}
                    >
                        <MatchFullCardContent
                            confirmRequest={item.status}
                            requestNumber={item.total_requests}
                            createDate={item.createdAt}
                            viwer={item.viewer_count}
                            hostTeamName={item.host_team?.team_name}
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
                            matchType={item.match_type}
                            dateMatch={persiandate(item.match_date)[1]}
                            timeMatch={item.match_time}
                            location={`${item.province_match?.province_title}/${item.city_match?.city_title}`}
                        />
                    </Link>
                ))
            ) : (
                !notFound ? <MatchCardPlaceHolder /> : <NotFoundPlaceHolder />
            )}
        </Stack>
    );
};
export default MatchListWrapper
