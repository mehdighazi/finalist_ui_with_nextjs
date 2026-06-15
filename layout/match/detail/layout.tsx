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
}
//------------------------------------------------
interface BottomSheetContentProps {
    onChange: (value: boolean) => void; // تابعی که یک مقدار Boolean می‌گیرد
    guestTeamName: string;
    hostTeamName: string;
}

const BottomSheetContent: React.FC<BottomSheetContentProps> = ({
    onChange,
    guestTeamName,
    hostTeamName
}) => {
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
        </>
    );
};
//---------------------------------------------------------


export default function MatchDetailLayout({ children }: RootLayoutProps) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [teamInfo, setTeamInfo] = useState<{ team_id: string; team_name: string } | null>(null);
    // هندل کردن تغییر شهر و آپدیت URL برای SSR
    interface MatchRequestBody {
        // برای مثال:
        teamId: number;
        // description?: string;
        [key: string]: any;
    }

    const sendData = (body: MatchRequestBody): void => {
        // نکته: در کد شما از formData استفاده شده بود، 
        // اگر منظورتان همان body ورودی است، نام را اصلاح کنید.
        const result = dataHandler(api.createMatchRequest(""), "post", body);

        try {
            // تایپ‌دهی به پارامترهای کالبک
            result(async (data: any, status: boolean) => {
                console.log(data)

                if (status) {
                    dispatch(showAlert({
                        message: 'عملیات با موفقیت انجام شد',
                        type: 'success'
                    }));

                } else {
                    dispatch(showAlert({
                        message: "خطایی در سرور رخ داده است",
                        type: 'error'
                    }));
                    // استفاده از Optional Chaining برای جلوگیری از کرش کردن در صورت نبود پیام
                    const errorMessage = data?.response?.data?.message || ""

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
        dispatch(
            showBottomSheet({
                title: 'تنظیمات کاربری',
                ptSX: '10%',
                renderContent: () => (
                    <BottomSheetContent hostTeamName="تهران" guestTeamName="بارسا" onChange={() => sendData({ teamId: 10 })} />
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
