"use client"; // ۱. اصلاح این لاین (فاصله به جای خط تیره)

import { styled } from '@mui/material/styles';
import MainCard from './MainCard_pre';

// ۲. تعریف یک Interface برای پراپ‌هایی که به این کامپوننت می‌فرستی
interface MainCardWrapperProps {
    border?: boolean;
    children?: React.ReactNode;
    sx?: any; // یا تایپ دقیق‌تر MUI
}

// ۳. پاس دادن Interface به متد styled
export const MainCardWrapper = styled(MainCard)<MainCardWrapperProps>(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: 150,
    padding: theme.spacing(2), // بهتر است از theme.spacing استفاده کنی
    borderRadius: theme.shape.borderRadius  ||1.5, // یا عدد ثابت ۳

    backgroundImage: `
      repeating-linear-gradient(
        45deg,
        rgba(223, 223, 223, 0.2),
        rgba(61, 61, 61, 0.2) 5px,
        transparent 1px,
        transparent 12px
      )!important`
}));

