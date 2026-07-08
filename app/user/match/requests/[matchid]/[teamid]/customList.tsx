"use client";

import * as React from "react";
import { useState } from "react";

// ui-material
import {
    Box,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    Typography,
    useTheme
} from "@mui/material";

// project import
import Avatar from "@/components/ui-component/extended/Avatar";
import { IconEye } from "@tabler/icons-react";
import {
    createDateLetter,
    createDateStr
} from "@/components/utils/Lib";
import CustomRating from "@/components/ui-component/rating";
import { hostAddress } from "@/components/api/api";
import dataHandler from "@/components/api/dataHandler";
import api from "@/components/api/api";

interface TeamLogo {
    logo_path: string;
}

interface RequesterMatchTeam {
    logo?: TeamLogo | null;
    team_name: string;
    creator_user_id: number;
    team_id: number;
}

export interface MatchRequestItem {
    match_request_id: string;
    accepted: boolean;
    requested_at: string;
    requester_match_team: RequesterMatchTeam;
}

interface CustomListProps {
    data: MatchRequestItem[];
    onChange?: (data: MatchRequestItem) => void;
}

const CustomList: React.FC<CustomListProps> = ({
    data,
    onChange
}) => {
    const theme = useTheme();

    const [requesterMobiles, setRequesterMobiles] = useState<
        Record<string, string>
    >({});

    const getInfo = (matchRequestId: string): void => {
        const result = dataHandler(
            api.getMatchRequesterInfo(matchRequestId),
            "get",
            ""
        );

        try {
            result((response: any) => {
                setRequesterMobiles((prev) => ({
                    ...prev,
                    [matchRequestId]:
                        response.result.requesterMobile,
                }));
            });
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <List
            sx={{
                width: "100%",
                "& .MuiListItem-root": {
                    textAlign: "right !important"
                }
            }}
        >
            {data?.map((item) => (
                <Box
                    key={item.match_request_id}
                    onClick={() => onChange?.(item)}
                    sx={{
                        borderRadius: 1,
                        mt: 1,
                        border: "1px solid",
                        borderColor: theme.palette.grey[100],
                        backgroundColor: item.accepted
                            ? theme.palette.success.light
                            : theme.palette.secondary.light,
                        cursor: "pointer",
                        "&:hover": {
                            WebkitTransition:
                                "all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)",
                            msTransition:
                                "background-color 150ms linear",
                            transition:
                                "all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)"
                        }
                    }}
                >
                    <ListItem alignItems="center">
                        <ListItemAvatar>
                            <Stack
                                sx={{
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <Avatar
                                    size="sm"
                                    src={
                                        item.requester_match_team.logo
                                            ? `${hostAddress}/${item.requester_match_team.logo.logo_path}`
                                            : ""
                                    }
                                />

                                <CustomRating rate={0} />
                            </Stack>
                        </ListItemAvatar>

                        <ListItemText
                            sx={{
                                float: "right",
                                direction: "rtl !important"
                            }}
                            primary={
                                <Typography
                                    component="div"
                                    align="right"
                                    color="text.primary"
                                    sx={{
                                        display: "inline",
                                        direction: "rtl"
                                    }}
                                >
                                    <Link
                                        href={`/team/profile/feed?tid=${item.requester_match_team.team_id}  `}
                                        underline="none"
                                        onClick={(e) => e.stopPropagation()}
                                        sx={{

                                            fontWeight: 600,
                                            textDecoration: "none",
                                            "&:hover": {
                                                color: "primary.dark",
                                                textDecoration: "none",
                                            },
                                        }}

                                    >
                                        {
                                            item.requester_match_team
                                                .team_name
                                        }
                                    </Link>
                                </Typography>
                            }
                            secondary={
                                <Typography
                                    component="span"
                                    align="right"
                                    fontSize="0.6rem"
                                    color={
                                        theme.palette.primary.light
                                    }
                                    sx={{
                                        display: "inline",
                                        mx: 0.2
                                    }}
                                >
                                    {createDateStr(
                                        createDateLetter(
                                            item.requested_at
                                        )
                                    )}
                                </Typography>
                            }
                        />

                        <Box sx={{ display: "flex" }}>
                            <Stack
                                spacing={1}
                                direction="row"
                            >
                                <Typography
                                    fontSize="0.8rem"
                                    sx={{ pt: 0.7,mx:1 }}
                                >
                                    شماره تلفن سرپرست:
                                </Typography>

                                <Typography
                                    fontSize="0.8rem"
                                    fontFamily="numberfarsi"
                                    sx={{ pt: 0.7,m:1 }}
                                >
                                    {requesterMobiles[item.match_request_id] ??
                                        "XXXXXXXXXXXX"}
                                </Typography>

                                <IconButton
                                    disabled={!item.accepted}
                                    sx={{ p: 0 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        console.log(
                                            item.match_request_id
                                        );
                                        getInfo(item.match_request_id)
                                    }}
                                >
                                    <IconEye />
                                </IconButton>
                            </Stack>
                        </Box>
                    </ListItem>
                </Box>
            ))}
        </List>
    );
};

export default CustomList;