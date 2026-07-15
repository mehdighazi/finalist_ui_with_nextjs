import {Paper,Button, Box, Typography, CircularProgress, ListItem, ListItemText, Grid, List, Theme, Stack } from '@mui/material';
import { TeamBox } from '@/components/ui-component/utilities/MatchCardContent';
import { createDateStr, persiandate } from "@/components/utils/Lib";
import MainCard from '@/components/ui-component/cards/MainCard';

interface MatchDetailHeaderProps {
    hostLogo: string;
    hostTeamName: string;
    matchDate: string;
    matchTime: string;
    province: string;
    city: string;
}

export default function MatchDetailHeader({
    hostLogo,
    hostTeamName,
    matchDate,
    matchTime,
    province,
    city,
}: MatchDetailHeaderProps) {
  
    return (
        <Box
            sx={{
                borderRadius: 3,
                p: 3,
                background:
                    "linear-gradient(135deg,#1976d2 0%,#42a5f5 100%)",
                color: "#fff",
            }}
        >
            <Stack spacing={2} alignItems="center">
                <TeamBox
                    logo={hostLogo}
                    title={hostTeamName}
                    AvatarSize="lg"
                />

                <Typography
                    variant="h6"
                    textAlign="center"
                    fontWeight={600}
                >
                    در انتظار حریف
                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                    flexWrap="wrap"
                    justifyContent="center"
                >
                    <Typography variant="body2">
                        📅 { ( matchDate) }
                    </Typography>

                    <Typography variant="body2">
                        ⏰ {matchTime}
                    </Typography>
                </Stack>

                <Typography
                    variant="body2"
                    textAlign="center"
                >
                    📍 {province} / {city}
                </Typography>
            </Stack>
        </Box>
    );
}