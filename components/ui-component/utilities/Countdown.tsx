"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Paper, Grid, Stack, useTheme } from "@mui/material";

interface CountdownProps {
    targetDate: string; // مثال: 2026-12-31
    targetTime: string; // مثال: 18:30 یا 18:30:00
    title?: string;
    onComplete?: () => void;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const CountdownTimer: React.FC<CountdownProps> = ({
    targetDate,
    targetTime,
    title = "زمان باقی‌مانده",
    onComplete
}) => {
    const theme = useTheme();

    // محاسبه زمان باقی‌مانده
  const calculateTimeLeft = useCallback(() => {
    // ساخت تاریخ کامل
    const dateTime = `${targetDate}T${targetTime.length === 5 ? `${targetTime}:00` : targetTime}`;

    const difference = new Date(dateTime).getTime() - Date.now();

    if (difference <= 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60)
    };
}, [targetDate, targetTime]);
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    useEffect(() => {
        const timer = setInterval(() => {
            const calculated = calculateTimeLeft();
            setTimeLeft(calculated);

            const isFinished = Object.values(calculated).every(val => val === 0);
            if (isFinished && !isCompleted) {
                setIsCompleted(true);
                if (onComplete) onComplete();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [calculateTimeLeft, isCompleted, onComplete]);

    // آیتم‌های نمایش تایمر
    const timeBlocks = [
       
       
       
        { label: "ثانیه", value: timeLeft.seconds },
         { label: "دقیقه", value: timeLeft.minutes },
         { label: "ساعت", value: timeLeft.hours },
         { label: "روز", value: timeLeft.days },
    ];

    // فرمت دو رقمی اعداد
    const formatNumber = (num: number): string => {
        return num < 10 ? `0${num}` : `${num}`;
    };

    return (
        <Box 
            sx={{ 
                direction: "rtl", 
                py: 3, 
                px: 2, 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center" 
            }}
        >
            {title && (
                <Typography 
                    variant="h6" 
                    fontWeight="700" 
                    sx={{ mb: 2, color: theme.palette.text.primary }}
                >
                    {title}
                </Typography>
            )}

            <Grid container spacing={1.5} justifyContent="center" sx={{ maxWidth: 450 }}>
                {timeBlocks.map((block, index) => (
                    <Grid item xs={3} key={index}>
                        <Paper
                            elevation={4}
                            sx={{
                                py: 1.5,
                                px: 1,
                                borderRadius: 3,
                                textAlign: "center",
                                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
                                border: `1px solid ${theme.palette.divider}`,
                                backdropFilter: "blur(8px)",
                                transition: "all 0.3s ease-in-out",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: theme.shadows[8],
                                    borderColor: theme.palette.primary.main
                                }
                            }}
                        >
                            <Typography
                                variant="h4"
                                component="div"
                                fontWeight="800"
                                sx={{
                                    color: theme.palette.primary.main,
                                    fontFamily: "monospace", // برای ثبات سایز اعداد در انیمیشن ثانیه
                                    lineHeight: 1.2,
                                    fontSize: { xs: "1.5rem", sm: "2rem" }
                                }}
                            >
                                {formatNumber(block.value)}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontWeight: 600,
                                    mt: 0.5,
                                    display: "block"
                                }}
                            >
                                {block.label}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {isCompleted && (
                <Typography variant="body2" color="error" sx={{ mt: 2, fontWeight: "bold" }}>
                    مهلت به پایان رسیده است!
                </Typography>
            )}
        </Box>
    );
};

export default CountdownTimer;