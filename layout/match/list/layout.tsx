"use client"
import React, { ReactNode, useEffect, useState } from "react";
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
    const [selectedCity, setSelectedCity] = useState<string>(
        searchParams.get('city_title') || 'انتخاب شهر'
    );

    useEffect(() => {
        setSelectedCity(searchParams.get('city_title') || 'انتخاب شهر');
    }, [searchParams]);

    // هندل کردن تغییر شهر و آپدیت URL برای SSR
    const handleLocationOnchange = (city: City): void => {
        dispatch(hideBottomSheet());

        // ذخیره در LocalStorage برای مراجعات بعدی
        localStorage.setItem("city_id", String(city.city_id));
        localStorage.setItem("city_title", city.city_title);
        setSelectedCity(city.city_title);

        // آپدیت کردن URL بدون ریلود صفحه (Next.js Navigation)
        const params = new URLSearchParams(searchParams.toString());
        params.set('city_id', String(city.city_id));
        params.set('city_title', city.city_title);
        const query = params.toString();
        router.push(query ? `${pathname}?${query}` : pathname);
    };

    // هندل کردن جستجو
    const handleSearch = (query: string) => {
        console.log("Search query:", query); // این لاگ در کنسول مرورگر دیده می‌شود
        const params = new URLSearchParams(searchParams.toString());
        if (query) {
            params.set('q', query);
        } else {
            params.delete('q');
        }
        const queryString = params.toString();
        console.log("new search params:", queryString);
        router.push(queryString ? `${pathname}?${queryString}` : pathname);
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
                               
                                dispatch(
                                    showBottomSheet({
                                        title: 'انتخاب شهر',
                                        renderContent: () => (
                                            <ProvinceCitySelector
                                                onChange={(e) => handleLocationOnchange(e as City)}
                                            />
                                        )
                                    })
                                )
                                
                            }
                        >
                            {/* نمایش نام شهر از URL یا پیش‌فرض */}

                           <span>{selectedCity}</span> 
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
