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
    Typography,
    Theme,
    Grid,
} from "@mui/material";

import { IconMapPin } from "@tabler/icons-react";

// project imports


import { showBottomSheet, hideBottomSheet } from '@/components/store/slices/bottomSheetSlice';
import CustomLoadingButton from "@/components/ui-component/utilities/CustomLoadingButton";
import { showAlert } from "@/components/store/slices/alertSlice";
import api from "@/components/api/api"
import dataHandler from "@/components/api/dataHandler";


interface City {
    city_id: number;
    city_title: string;
}

interface RootLayoutProps {
    children: ReactNode;
    hostTeamName: string;
    hostTeamLogo?: string;
    hostTeamId?: string;
    matchId?: string;
    teamId?: string;
}
//------------------------------------------------
interface BottomSheetContentProps {
    onChange: (value: boolean) => void; // تابعی که یک مقدار Boolean می‌گیرد
    guestTeamName: string;
    hostTeamName: string;
    guestTeamLogo?: string;
    hostTeamLogo?: string;
}

const BottomSheetContent: React.FC<BottomSheetContentProps> = ({
    onChange,
    guestTeamName,
    hostTeamName,
    guestTeamLogo,
    hostTeamLogo
}) => {
    const guestInitials = guestTeamName ? guestTeamName.slice(0, 2) : '';
    const hostInitials = hostTeamName ? hostTeamName.slice(0, 2) : '';
 const HOST = process.env.NEXT_PUBLIC_HOST_API_URL ?? '';
    const PORT = process.env.NEXT_PUBLIC_HOST_PORT
        ? `:${process.env.NEXT_PUBLIC_HOST_PORT}`
        : '';
    return (
        <>
            <Stack sx={{ p: 3 }}>
                <Typography variant={"caption"} component={"p"}>
                    {` شما در حال ارسال درخواست مسابقه با تیم `}
                    <b>{guestTeamName}</b>
                    {' به تیم '}
                    <b>{hostTeamName}</b>
                    {` می باشید درصورت تایید اطلاعات شما به جهت هماهنگی به سرپرست تیم حریف نمایش داده خواهد شد. ادامه میدهید؟`}
                </Typography>

               
                <Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
                    <Button
                        color={"error"}
                        variant={"outlined"}
                        onClick={() => onChange(false)}
                    >
                        <span>انصراف</span>
                    </Button>
                    <Button
                        onClick={() => onChange(true)}
                        color={"success"}
                        variant={"contained"}
                    >
                        <span>بله</span>
                    </Button>
                </Stack>
            </Stack>
             <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ mt: 2 }}>
                    <Stack alignItems="center">
                        <Box>
                            <Box component="img" src={`${HOST}${PORT}/${guestTeamLogo || undefined}`} alt={guestTeamName} sx={{ width: 56, height: 56, borderRadius: '8px', objectFit: 'cover', bgcolor: 'grey.100' }} />
                        </Box>
                        <Typography variant="caption" sx={{ mt: 0.5 }}>{guestTeamName}</Typography>
                    </Stack>

                    <Box sx={{ mx: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ width: 96, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                            <Box sx={{ position: 'relative', width: 72, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Box sx={{ position: 'absolute', left: 0, right: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {/* static faint arrow path as background */}
                                    <svg width="64" height="20" viewBox="0 0 64 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 10h48" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M38 4l8 6-8 6" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Box>

                                <Box sx={{
                                    width: 28,
                                    height: 28,
                                    color: 'primary.main',
                                    transformOrigin: 'center',
                                    '@keyframes slideFromLeft': {
                                        '0%': { transform: 'translateX(-28px) scale(0.9)', opacity: 0 },
                                        '50%': { transform: 'translateX(8px) scale(1)', opacity: 1 },
                                        '100%': { transform: 'translateX(44px) scale(0.9)', opacity: 0 }
                                    },
                                    animation: 'slideFromLeft 1000ms ease-in-out infinite'
                                }}>
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Stack alignItems="center">
                        <Box>
                            <Box component="img" src={`${HOST}${PORT}/${hostTeamLogo || undefined}`} alt={hostTeamName} sx={{ width: 56, height: 56, borderRadius: '8px', objectFit: 'cover', bgcolor: 'grey.100' }} />
                        </Box>
                        <Typography variant="caption" sx={{ mt: 0.5 }}>{hostTeamName}</Typography>
                    </Stack>
                </Stack>

        </>
    );
};
//---------------------------------------------------------

const safeDecode = (val?: string): string | undefined => {
    if (!val) return val;
    try {
        return decodeURIComponent(val);
    } catch (e) {
        return val;
    }
};


export default function MatchDetailLayout({ children, hostTeamName, hostTeamLogo, teamId,matchId }: RootLayoutProps) {
    const dispatch = useDispatch();
   

    const [dialogOpen, setDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [teamInfo, setTeamInfo] = useState<{ team_id: string; team_name: string } | null>(null);
    // هندل کردن تغییر شهر و آپدیت URL برای SSR
    interface MatchRequestBody {
        // برای مثال:
        team_id: string;
        match_id:string;
        // description?: string;
        [key: string]: any;
    }

    const sendData = (body: MatchRequestBody): void => {
        // نکته: در کد شما از formData استفاده شده بود، 
        // اگر منظورتان همان body ورودی است، نام را اصلاح کنید.
        const result = dataHandler(api.createMatchRequest(""), "post", body);
console.log(body)
        try {
            // تایپ‌دهی به پارامترهای کالبک
            result(async (data: any, status: boolean) => {
             console.log(status)
                if (status) {
                    dispatch(showAlert({
                        message: 'عملیات با موفقیت انجام شد',
                        type: 'success'
                    }));

                } else {
                    dispatch(showAlert({
                        message:  data?.response?.data?.message || "خطایی رخ داده",
                        type: 'error'
                    }));
                    // استفاده از Optional Chaining برای جلوگیری از کرش کردن در صورت نبود پیام
                   

                }
            });
        } catch (error) {
            // در TS، متغیر error معمولاً از نوع unknown است
            dispatch(showAlert({
                message: "خطایی در سرور رخ داده است",
                type: 'error'
            }));
        }
    };
    const handleRequestClick = () => {
        const storedRaw = localStorage.getItem("team_info");
        let storedInfo: any = null;
        try {
            storedInfo = storedRaw ? JSON.parse(storedRaw) : null;
        } catch (e) {
            storedInfo = null;
        }

        dispatch(
            showBottomSheet({
                title: 'ارسال درخواست مسابقه',
                ptSX: '20%',
                renderContent: () => (
                    <BottomSheetContent
                        hostTeamName={safeDecode(hostTeamName) || ""}
                        hostTeamLogo={safeDecode(hostTeamLogo) || undefined}
                        guestTeamName={storedInfo?.team_name || storedInfo?.teamName || ""}
                        guestTeamLogo={storedInfo?.team_logo || storedInfo?.logo}
                        onChange={() => sendData({ 
                            team_id: storedInfo?.team_id,
                            match_id:matchId

                         })}
                    />
                ),
            })
        );
        // if (!teamInfo) {
        /*  dispatch(showAlert({
              message: 'عملیات با موفقیت انجام شد',
              type: 'success'
          }));*/

        // return;
        //}
        setDialogOpen(true);
    }

    return (
        <Stack sx={{ width: "100%" }}>
            {children}
            {
                <Stack spacing={1}>
                    <CustomLoadingButton
                    padding={1.5}
                        fullWidth
                        size="large"
                     
                        variant="contained"
                        onChange={handleRequestClick}
                        loading={isLoading}
                    >
                        <span>ارسال پیشنهاد مسابقه</span>
                    </CustomLoadingButton>

                    <Typography
                        variant="caption"
                        textAlign="center"
                        color="text.secondary"
                    >
                        <span>
                            با ارسال پیشنهاد، درخواست شما برای تیم میزبان ارسال می‌شود
                        </span>
                    </Typography>
                </Stack>
            }

        </Stack>
    );
}
