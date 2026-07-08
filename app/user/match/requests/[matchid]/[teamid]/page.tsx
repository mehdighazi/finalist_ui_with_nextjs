"use client";

import * as React from "react";

import { useParams, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";

// ui-material
import {
    Box,
    styled,
    Chip,
    Divider,
    Stack,
    Typography,
    useTheme
} from "@mui/material";
import Button from "@mui/material/Button";

// tabler icons
import {
    IconArticle,
    IconCopy,
    IconPhoneCall
} from "@tabler/icons-react";

// project
import dataHandler from "@/components/api/dataHandler";
import api, { hostAddress } from "@/components/api/api";
import CustomList from "./customList";
import { showAlert } from "@/components/store/slices/alertSlice";
import {
    hideBottomSheet,
    showBottomSheet
} from "@/components/store/slices/bottomSheetSlice";

import IconText from "@/components/ui-component/utilities/IconText";
import MatchDetailHeader from "@/components/ui-component/utilities/matchDetailHeader";

const BoxWrapper = styled(Box)(({ theme }) => ({
    border: "1px solid",
    borderColor: theme.palette.primary.light,
    padding: 15,
    maxHeight: 450,
    overflow: "scroll",
    paddingBottom: 15,
    borderRadius: 10,
    minHeight: 300
}));
interface HomeProps {
    params: Promise<{ filters?: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface DialogData {
    guest_team_id: number | string;
    host_team_id: number | string;
    match_request_id: number;
    match_id: number | string;
    requester_team_creator_userid: number;
}

interface DialogContentProps {
    data: DialogData;
    onChange: (value: boolean) => void;
}
interface TeamLogo {
    logo_path: string;
}
interface RequesterMatchTeam {
    logo?: TeamLogo | null;
    team_name: string;
    creator_user_id: number;
    team_id: number;
}

interface RequestItem {
    match_request_id: number;
    accepted: boolean;
    requested_at: string;
    requester_match_team: RequesterMatchTeam;

}

interface RouteParams {
    match_id: string;
    team_id: string;
}

const DialogContent: React.FC<DialogContentProps> = ({
    onChange,
    data
}) => {
    const dispatch = useDispatch();

    const [requesterInfo, setRequesterInfo] = React.useState({
        requesterMobile: "XXXXXXXXX",
        requesterFullName: "XXXXXXXXX"
    });

    const sendData = () => {
        const result = dataHandler(
            api.confirmRequest(),
            "post",
            data
        );

        try {
            result((response: any, status: boolean) => {
                if (status) {
                    setRequesterInfo({
                        requesterMobile:
                            response.result.requesterMobie,
                        requesterFullName:
                            response.result.requesterFullName
                    });
                }

                dispatch(showAlert({
                    message: status ? response.message : (response.response?.data?.message || "خطا در ارسال اطلاعات"),
                    type: status ? "success" : "error"
                }));
            });
        } catch {
            dispatch(showAlert({
                message: "خطایی رخ داده است",
                type: 'error'
            }));
        }
    };

    return (
        <Stack sx={{ p: 3 }}>
            <Typography
                variant="h5"
                fontWeight={500}
                component="p"
            >
                پس از تایید درخواست به این مسابقه اطلاعات سرپرست تیم
                مقابل به جهت هماهنگی نمایش داده خواهد شد. دقت فرمایید
                شما تنها می‌توانید سه درخواست را تایید کنید. ادامه
                می‌دهید؟
            </Typography>


            <Stack direction="row" spacing={2}>
                <Button
                    color="error"
                    variant="outlined"
                    onClick={() => onChange(false)}
                >
                    <span>انصراف</span>
                </Button>

                <Button
                    color="success"
                    variant="contained"
                    onClick={sendData}
                >
                    <span>بله</span>
                </Button>
            </Stack>
        </Stack>
    );
};

export default function Requestes() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const params = useParams();
    const searchParams = useSearchParams();

    const match_id = params.matchid as string;
    const team_id = params.teamid as string;

    console.log({ match_id, team_id });

    const [detailMatch, setDetailMatch] =
        React.useState<any>(null);

    const [requestList, setRequestList] =
        React.useState<RequestItem[]>([]);

    const IconColor = theme.palette.grey[400];
    const TextColor = theme.palette.grey[600];

    const dialogHandler = (event: boolean) => {
        if (!event) {
            dispatch(hideBottomSheet());
        }
    };

    const customListHandler = (body: RequestItem) => {
        const data: DialogData = {
            guest_team_id: body.requester_match_team.team_id,
            host_team_id: 'team_id'!,
            match_request_id: body.match_request_id,
            match_id: 'match_id'!,
            requester_team_creator_userid:
                body.requester_match_team.creator_user_id
        };

        dispatch(
            showBottomSheet({
                title: 'تایید درخواست',
                ptSX: '30%',
                renderContent: () => (
                    <DialogContent
                        data={data}
                        onChange={dialogHandler}
                    />
                ),
            })

        );
    };

    const getData = ({
        match_id,
        team_id
    }: {
        match_id: string;
        team_id: string;
    }) => {
        const resultList = dataHandler(
            api.matchRequestList(team_id, match_id),
            "get",
            ""
        );

        try {
            resultList((response: any) => {
                setRequestList(response.result);
            });
        } catch { }

        const resultDetail = dataHandler(
            api.detailMatch(match_id),
            "get",
            ""
        );

        try {
            resultDetail((response: any) => {
                setDetailMatch(response.result);
            });
        } catch { }
    };

    React.useEffect(() => {
        if (match_id && team_id) {
            getData({
                match_id,
                team_id
            });
        }
    }, [match_id, team_id]);

    return (
        <Stack sx={{ p: 1, mb: 3, pb: 10 }} spacing={1}>
            {detailMatch && (
                <MatchDetailHeader
                    hostLogo={`${hostAddress}/${detailMatch.host_team?.logo?.logo_path ?? ""}`}
                    hostTeamName={detailMatch.host_team?.team_name ?? ""}
                    matchDate={detailMatch.match_date ?? ""}
                    matchTime={detailMatch.match_time ?? ""}
                    province={detailMatch.province_match?.province_title ?? ""}
                    city={detailMatch.city_match?.city_title ?? ""}
                />
            )}
           
                <IconText
                    textPaddingTop={0}
                    fontSize={12}
                    icon={
                        <IconArticle
                            size={20}
                            color={IconColor}
                        />
                    }
                    color={TextColor}
                    text={
                        <Typography
                       
                            variant="h5"
                            sx={{ fontWeight: 500 }}
                        >
                            لیست درخواست‌ها

                            <Typography
                                variant="subtitle2"
                                align="center"
                                sx={{
                                    color:
                                        theme.palette.grey[400]
                                }}
                            >
                                {requestList.length > 0
                                    ? `(${requestList.length} درخواست)`
                                    : "بدون درخواست"}
                            </Typography>
                        </Typography>
                    }
                />
           

            <Divider />

            {requestList.length > 0 ? (
                <Box sx={{ p: 3 }}>
                    <BoxWrapper>
                        {<CustomList
                            //  data={[]}
                            data={requestList}
                            onChange={customListHandler}
                        />}
                    </BoxWrapper>
                </Box>
            ) : (
                <Box sx={{ p: 3 }}>
                    <Typography variant="h5">
                        درخواستی ارسال نشده است.
                    </Typography>
                </Box>
            )}
        </Stack>
    );
};

