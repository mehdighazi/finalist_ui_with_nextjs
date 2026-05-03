"use client"
import React, { ReactNode } from "react";
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
/* ============================== */

interface RootLayoutProps {
    children: ReactNode;
}

// ------------------------------------------------------------------

export default function MatchListLayout({ children }: RootLayoutProps) {
    const dispatch = useDispatch();
    const theme = useTheme();

    
    const [sportFieldId, setSportFieldId] = useState<string>("");

    const [cityValue, setCityValue] = useState<City | null>(null);

    

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
      {/**--------------------------Content page----------------- */}
      {children}

     
    </>
  );
};


