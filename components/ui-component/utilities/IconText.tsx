"use client";
import React from 'react';
import { Stack, Box, Typography, Badge, useTheme } from '@mui/material';

interface IconTextProps {
  text: string | number;
  icon: React.ReactNode;
  textNumber?: boolean;
  fontSize?: number | string;
  color?: string;
  textPaddingTop?: number;
  iconPaddingTop?: number;
  iconRight?: boolean;
  spacing?: number;
}

const IconText: React.FC<IconTextProps> = ({
  text,
  icon,
  textNumber = false,
  fontSize = 14,
  color,
  textPaddingTop = 0.2,
  iconPaddingTop = 0.2,
  iconRight = false,
  spacing = 0.5,
}) => {
  const theme = useTheme();

  // آماده‌سازی محتوای داخل تکست با کلاس فونت فارسی در صورت نیاز
  const renderText = (
    <Typography
      fontSize={fontSize}
      fontWeight={500}
      className={textNumber ? "numfarsi-s1" : ""}
      sx={{
        color: color ?? theme.palette.grey[400],
        pt: textPaddingTop,
      }}
      align="right"
    >
      <span className={textNumber ? "numfarsi-s1" : ""}>{text}</span>
    </Typography>
  );

  return (
    // جهت کامپوننت بر اساس iconRight تغییر می‌کند تا چینش آیکون و بج درست باشد
    <Stack 
      direction={iconRight ? "row" : "row-reverse"} 
      spacing={spacing} 
      alignItems="center"
    >
      {icon && (
        <Box sx={{ pt: iconPaddingTop }}>
          <Badge
            badgeContent={renderText}
            // می‌توانید موقعیت بج را با anchorOrigin تنظیم کنید
            anchorOrigin={{
              vertical: 'top',
              horizontal: iconRight ? 'left' : 'right',
            }}
            sx={{
              '& .MuiBadge-badge': {
                position: 'relative',
                transform: 'none',
                backgroundColor: 'transparent', // حذف رنگ پس‌زمینه پیش‌فرض بج
                padding: 0,
                height: 'auto',
                minWidth: 'auto',
              }
            }}
          >
            {icon}
          </Badge>
        </Box>
      )}

      {/* اگر آیکون وجود نداشته باشد، متن به تنهایی رندر می‌شود */}
      {!icon && renderText}
    </Stack>
  );
};

export default IconText;