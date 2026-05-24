"use client"
import React, { ReactNode, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// ui-material
import {
    Button,
    Box,
    Stack,
    useTheme,
} from "@mui/material";

import { IconMapPin } from "@tabler/icons-react";

// project imports
import SearchBar from "@/components/ui-component/SearchBar";
import ProvinceCitySelector from "@/components/ui-component/utilities/ProvinceCitySelector";
import { showBottomSheet, hideBottomSheet } from '@/components/store/slices/bottomSheetSlice';

interface City {
    city_id: number;
    city_title: string;
}

interface RootLayoutProps {
    children: ReactNode;
}

export default function MatchListLayout({ children }: RootLayoutProps) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // هندل کردن تغییر شهر و آپدیت URL برای SSR
    const handleLocationOnchange = (city: City): void => {
        dispatch(hideBottomSheet());

        // ذخیره در LocalStorage برای مراجعات بعدی
        localStorage.setItem("city_id", String(city.city_id));
        localStorage.setItem("city_title", city.city_title);

        // آپدیت کردن URL بدون ریلود صفحه (Next.js Navigation)
        const params = new URLSearchParams(searchParams.toString());
        params.set('city_id', String(city.city_id));
        router.push(`${pathname}?${params.toString()}`);
    };

    // هندل کردن جستجو
    const handleSearch = (query: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (query) {
            params.set('q', query);
        } else {
            params.delete('q');
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <Box sx={{ width: "100%" }}>
            {/* بخش فیلترها و جستجو */}
            <Box sx={{ px: 1, pt: 1, width: "100%", position: 'sticky', top: 0, zIndex: 10, bgcolor: 'background.paper' }}>
                <Stack spacing={1}>
                    <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
                        <SearchBar onChange={handleSearch} />
                        <Button
                            variant="outlined"
                            sx={{
                                flexShrink: 0,
                                borderColor: theme.palette.grey[300],
                                color: theme.palette.text.primary
                            }}
                            endIcon={<IconMapPin size="20" color={theme.palette.grey[500]} />}
                            onClick={() =>
                                console.log("Continue...")
                               /* dispatch(
                                    showBottomSheet({
                                        title: 'انتخاب شهر',
                                        renderContent: () => (
                                            <ProvinceCitySelector
                                                onChange={(e) => handleLocationOnchange(e as City)}
                                            />
                                        )
                                    })
                                )*/
                                
                            }
                        >
                            {/* نمایش نام شهر از URL یا پیش‌فرض */}

                           <span>{searchParams.get('city_title') || 'انتخاب شهر'}</span> 
                        </Button>
                    </Box>
                </Stack>
            </Box>

            {/* نمایش محتوای اصلی (MatchesContent) که از سرور می‌آید */}
            <Box sx={{ mt: 2 }}>
                {children}
            </Box>
        </Box>
    );
}
