"use client"
import * as React from "react";
//ui-material
import { Box, Paper, Stack, Typography, useTheme, Divider, alpha } from "@mui/material";
import { AccessTime, Festival, PlaylistAddCircle } from "@mui/icons-material";
//table icon
import { IconX, IconCircleCheckFilled, IconMapPin, IconUsersGroup, IconId, IconCategory } from '@tabler/icons-react'
//project import
//import "../style.css"
import { styled } from "@mui/material/styles";
import CustomLoadingButton from '@/components/ui-component/utilities/CustomLoadingButton'
import IconText from "@/components/ui-component/utilities/IconText";
//--------------------------------------|Step 1|---------------------------------------------------


// تعریف اینترفیس برای داده‌های فرم
interface Step1Props {
    formData: {
        team_name: string | null;
        team_identifier: string | null;
        province_title: string | null;
        city_title: string | null;
        sport_field_title: string | null;
        is_womens: number | boolean;
    };
}

// استایل سفارشی برای باکس‌های هر بخش (جایگزین SectionBox اگر تعریف نشده باشد)
const SectionBox = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:last-child': {
        borderBottom: 'none'
    }
}));

const Step1: React.FC<Step1Props> = ({ formData }) => {
    const theme = useTheme();

    // تعریف رنگ‌ها بر اساس تم
    const TextColor = theme.palette.text.secondary;
    const IconColor = theme.palette.primary.main;

    return (
        <Box sx={{ width: '100%', p: 1, textAlign: "right" }}>

            <Box sx={{
                mb: 4,
                p: 2,
                background: alpha(theme.palette.primary.main, 0.05),
                borderRadius: 0,
                borderRight: `6px solid ${theme.palette.primary.main}`,
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
                direction: "rtl"
            }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                    <IconCircleCheckFilled size={24} color={theme.palette.success.main} />
                    <Typography textAlign={"right"} variant="h6" fontWeight="800" color="primary.dark">
                        بازبینی و تأیید نهایی
                    </Typography>
                </Stack>
                <Typography textAlign={"right"} variant="body2" color="text.secondary" sx={{ pr: 4 }}>
                    لطفاً صحت اطلاعات وارد شده برای تیم خود را بررسی کنید. در صورت نیاز به تغییر، به مرحله قبل بازگردید.
                </Typography>
            </Box>
            <Stack spacing={2}>

                {/* نام تیم */}
                <SectionBox>

                    <IconText
                        fontSize={12}
                        textPaddingTop={0.6}
                        text="نام تیم"
                        color={TextColor}
                        icon={<IconUsersGroup size={18} color={IconColor} />}
                    />

                    <Typography variant="h5" color="primary" fontWeight={600} mt={0.5}>
                        {formData.team_name || "وارد نشده"}
                    </Typography>
                </SectionBox>


                <SectionBox>

                    <IconText
                        textPaddingTop={0.6}
                        fontSize={12}
                        text="نام کاربری (ID)"
                        color={TextColor}
                        icon={<IconId size={18} color={IconColor} />}
                    />


                    <Typography fontSize={16} color="primary" fontWeight={600} mt={0.5}>
                        @{formData.team_identifier || "---"}
                    </Typography>
                </SectionBox>

                <SectionBox>

                    <IconText
                        textPaddingTop={0.6}
                        fontSize={12}
                        text="استان / شهر"
                        color={TextColor}
                        icon={<IconMapPin size={18} color={IconColor} />}
                    />

                    <Typography fontSize={14} color="text.primary" fontWeight={500} mt={0.5}>
                        {formData.province_title && formData.city_title
                            ? `${formData.province_title} ، ${formData.city_title}`
                            : "انتخاب نشده"}
                    </Typography>
                </SectionBox>

                {/* رشته ورزشی */}
                <SectionBox>

                    <IconText
                        // textPaddingTop={0.2} 
                        fontSize={12}
                        text="رشته ورزشی"
                        color={TextColor}
                        icon={<IconCategory size={18} color={IconColor} />}
                    />

                    <Typography fontSize={14} color="text.primary" fontWeight={500} mt={0.5}>
                        {formData.sport_field_title || "انتخاب نشده"}
                    </Typography>
                </SectionBox>

                {/* جنسیت تیم */}
                <SectionBox>
                    <IconText
                        textPaddingTop={0.2}
                        fontSize={12}
                        text="جنسیت تیم"
                        color={TextColor}
                        icon={<IconCategory size={18} color={IconColor} />}
                    />
                    <Box sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        mt: 1,
                        px: 2, py: 0.5,
                        borderRadius: 10,
                        bgcolor: formData.is_womens ? alpha('#e91e63', 0.1) : alpha('#1976d2', 0.1),
                        color: formData.is_womens ? '#e91e63' : '#1976d2'
                    }}>
                        <Typography fontSize={14} fontWeight={550}>
                            {formData.is_womens ? "تیم بانوان " : "تیم آقایان "}
                        </Typography>
                    </Box>
                </SectionBox>

            </Stack>
        </Box>
    );
};

export default Step1;