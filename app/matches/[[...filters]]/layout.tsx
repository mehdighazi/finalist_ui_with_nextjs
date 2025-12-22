"use client"
import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

// ui-material
import {
    Button,
    Box,
    Divider,
    Grid,
    Link,
    Stack,
    useTheme,
    Typography
} from "@mui/material";

import { IconMapPin } from "@tabler/icons-react";

// project imports
import SearchBar from "@/components/ui-component/SearchBar";
import Transition from "@/components/ui-component/extended/Transitions";
import {MatchFullCardContent} from "@/components/ui-component/utilities/MatchCardContent";

import TotalIncomeCard from "@/components/ui-component/cards/Skeleton/TotalIncomeCard";

import ProvinceCitySelector from "@/components/ui-component/utilities/ProvinceCitySelector";
import dataHandler from "@/components/api/dataHandler";
import api, { hostAddress } from "@/components/api/api";
import { persiandate } from "@/components/utils/Lib";
// redux
import type { AppDispatch } from '@/components/store';
import { hideBottomSheet, showBottomSheet } from '@/components/store/slices/bottomSheetSlice'
import FiltersSection from "@/components/ui-component/filters/filters";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------

interface City {
    city_id: number;
    city_title: string;
}

interface MatchItem {
    match_id: number;
    host_team_id: number;
    host_team_name: string;
    createdAt: string;
    viewer_count?: number;
    match_type: string;
    match_date: string;
    match_time: string;

    match_sport: {
        field_title: string;
    };

    host_team: {
        team_name: string;
        logo: {
            logo_path: string;
        };
    };

    province_match: {
        province_title: string;
    };

    city_match: {
        city_title: string;
    };
}

// ------------------------------------------------------------------

const ListMatchs: React.FC = () => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [param, setParam] = useState<string>("");
    const [query, setQuery] = useState<string>("");
    const [sportFieldId, setSportFieldId] = useState<string>("");

    const [cityValue, setCityValue] = useState<City | null>(null);

    const [matchList, setMatchList] = useState<MatchItem[]>([]);
    const [loadedItems, setLoadedItems] = useState<MatchItem[]>([]);

    // ------------------------------------------------------------------
    // Load city from localStorage
    // ------------------------------------------------------------------
    useEffect(() => {
        const cityId = localStorage.getItem("city_id");
        const cityTitle = localStorage.getItem("city_title");

        if (cityId && cityTitle) {
            setCityValue({
                city_id: Number(cityId),
                city_title: cityTitle
            });
        }
    }, []);

    // ------------------------------------------------------------------
    // Fetch data
    // ------------------------------------------------------------------
    const getData = (): void => {
        const body = {
            page_size: 10,
            page_index: 1,
            param,
            sport_field_id: sportFieldId,
            match_city_id: cityValue?.city_id,
            query
        };

        const result = dataHandler(api.listMatch(body), "get", "");

        try {
            result((data: any, status: boolean) => {
                setLoadedItems([]);
                if (status) {
                    setMatchList(data.result.data as MatchItem[]);
                }
            });
        } catch (error) {
            // handle error
        }
    };

    // ------------------------------------------------------------------
    // Animate list loading
    // ------------------------------------------------------------------
    useEffect(() => {
        matchList.forEach((item, index) => {
            setTimeout(() => {
                setLoadedItems((prev) => [...prev, item]);
            }, index * 100);
        });
    }, [matchList]);

    // ------------------------------------------------------------------
    // Refetch on filters change
    // ------------------------------------------------------------------
    useEffect(() => {
        getData();
    }, [sportFieldId, query, cityValue]);

    // ------------------------------------------------------------------
    // Handlers
    // ------------------------------------------------------------------
    const handleLocationOnchange = (e: City): void => {
        setCityValue(e);
        dispatch(hideBottomSheet());
        localStorage.setItem("city_id", String(e.city_id));
        localStorage.setItem("city_title", e.city_title);
    };

    // ------------------------------------------------------------------
    // Render
    // ------------------------------------------------------------------
    return (
        <>
            {/* Filter Section */}
            <Box sx={{ px: 1, pt: 1, width: "100%" }}>
                <Stack spacing={1}>
                    <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
                        <SearchBar onChange={(e: string) => setQuery(e)} />
                        <Button
                            endIcon={<IconMapPin color={theme.palette.grey[400]} />}
                            onClick={() =>
                                dispatch(
                                    dispatch(
                                        showBottomSheet({
                                            title: 'انتخاب شهر',
                                            renderContent: () => (
                                                <ProvinceCitySelector
                                                    onChange={(e) => handleLocationOnchange(e)}
                                                />
                                            )
                                        })
                                    )
                        
                        )
              }
                        variant="outlined"
                        sx={{
                            flexShrink: 0,
                            border: "1px solid",
                            borderColor: theme.palette.grey[400],
                            borderRadius: 3,
                            py: 1.6,
                            px: 2
                        }}
            >
                        <Typography>
                            {cityValue ? cityValue.city_title : "شهر"}
                        </Typography>
                    </Button>
            </Box>

            <FiltersSection onChange={(e: string) => setSportFieldId(e)} />
        </Stack >
      </Box >

      <Divider sx={{ mt: 1 }} />

      <Box sx={{ mb: 10 }}>
        <Grid container>
          {loadedItems.length ? (
            loadedItems.map((item, index) => (
              <Grid xs={12} key={item.match_id}>
                <Transition type="fade" in>
                  <Transition type="grow" in>
                    <Link
                      href={`detail/${item.match_id}/${item.host_team_id}/${item.host_team_name}`}
                      sx={{ textDecoration: "none" }}
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
            ))
          ) : (
            <TotalIncomeCard />
          )}
        </Grid>
      </Box>
    </>
  );
};

export default ListMatchs;
