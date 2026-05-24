"use client";
import * as React from 'react';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Stack';
import LinearProgress from "@mui/material/LinearProgress";
import { Fade, useTheme } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { hideAlert } from "@/components/store/slices/alertSlice"; // تابع مخفی کردن alert


export default function AlertBox() {
    const { message, type, visible } = useSelector((state) => state.alert);

    const dispatch = useDispatch();
    const [timeOver, setTimeOver] = useState(false)
    React.useEffect(() => {
        // Set a timeout to hide the alert after 1 second

        if (visible) {
            setTimeout(() => {
                dispatch(hideAlert());
            }, 3000);
        }



    }, [visible, dispatch]);
    if (!visible) return null; // اگر پیغامی نباشد، چیزی نمایش نمی‌دهد

    const theme = useTheme();
    return (
        <Fade in={visible} container={/*ContainerRef.current*/""}>
            <Box sx={{
                width: 'auto',
                position: "fixed", // ✅ قبلاً absolute بود
                right: 2,
                top: 50,
                px: 0,
                zIndex: 1300, // پیشنهاد: مطمئن شو رو همه چیز دیده می‌شه

            }}
                spacing={2}>
                <Box>


                    <Alert variant="filled" severity={type ?? "success"} sx={{ position: "relative", zIndex: 25 }}>
                        {message}
                        <Box sx={{ position: "absolute", bottom: 0.5, width: "92%", borderRadius: 20, left: 6.1 }}>

                        </Box>
                    </Alert>

                </Box>

            </Box>
        </Fade>
    );
}

function LinearDeterminate({ onChange }) {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    onChange(true)
                    return 100;
                }
                const diff = 100;
                return Math.min(oldProgress + diff, 100);
            });
        }, 3500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress sx={{ borderRadius: 15 }} variant="determinate" value={progress} />
        </Box>
    )
}