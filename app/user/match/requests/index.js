import * as React from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
//ui-material
import { Box, styled, Chip, Divider, Stack, Typography, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
//------------------------------| Tabler Icon |--------------------------
import { IconArticle, IconCopy, IconPhoneCall } from "@tabler/icons-react";
//project import
//------------------------------Requestes for play------------------------
import dataHandler from '@/components/api/dataHandler';
import api from '@/components/api/api';
import CustomList from "./customList";
import { showAlert } from "@/components/store/slices/alertSlice";
import { hideBUTTOMSheet, showBUTTOMSheet } from "store/bottomSheetReducer";
import DetailMatch from 'views/pages/app/matchs/detail'
import IconText from '@/components/ui-component/utilities/IconText'
const BoxWrapper = styled(Box)(({ theme }) => ({
    // backgroundColor: theme.palette.grey[100],
    //boxShadow:theme.shadows[1],
    border: '1px solid',
    borderColor: theme.palette.primary[100],
    padding: 15,
    maxHeight: 450,
    overflow: 'scroll',
    paddingBottom: 15,
    borderRadius: 10,
    minHeight: 300,

}));
const DialogContent = ({ onChange, data }) => {
    const [requesterInfo, setrequesterInfo] = React.useState({
        requesterMobile: "XXXXXXXXX",
        requesterFullName: "XXXXXXXXX",
    });
    const dispatch = useDispatch()

    function sendData() {
        //send data to server
       
        const { guest_team_id, match_request_id, host_team_id, creator_user_id, requester_team_id, team_id, match_id } = data
        const formData = {
            guest_team_id: guest_team_id,
            host_team_id: host_team_id,
            match_request_id: match_request_id,
            match_id: match_id,
            requester_team_creator_userid: creator_user_id
        }

        const result = dataHandler(api.confirmRequest(1), "post", data);
        try {
            result(async function (data, status) {
                if (status) {
                    setrequesterInfo({

                        requesterMobile: data.result["requesterMobie"],
                        requesterFullName: data.result["requesterFullName"]
                    });
                }

                dispatch(showAlert(status ? data["message"] : data.response.data["message"],
                    status ? "success" : "error"))

            })
        } catch (error) {
            dispatch(showAlert("خطایی رخ داده",
                "error"))
        }

    }

    return (
        <>
            <Stack sx={{ p: 3 }}>
                <Typography variant={"h5"} fontWeight={500} component={"p"}>
                    پس از تایید درخواست به این مسابقه اطلاعات سرپرست تیم مقابل به جهت هماهنگی نمایش داده خواهد شد.دقت
                    فرمایید شما تنها می توانید سه درخواست را تایید کنید.ادامه می دهید؟
                </Typography>
                <Typography variant={"h5"} sx={{ mt: 3 }}>

                    <Chip
                        deleteIcon={<IconCopy />}
                        variant={"filled"}
                        onDelete={() => console.log("")}
                        sx={{
                            px: 1,
                            background: "none",
                            mr: 0,
                            mt: 2,
                            "& .MuiChip-label": {
                                ml: 2,
                                pr: 0
                            }
                            , "& .MuiChip-icon ": {
                                mb: "4px",

                            },
                            "& .MuiChip-deleteIcon": {
                                mr: "-20px",

                            }
                        }}
                        icon={<IconPhoneCall size={20} />}
                        label={<Typography sx={{ fontWeight: 500, mt: 1 }}   variant={"h5"}><b>
                            {`شماره تماس:`}{requesterInfo.requesterMobile}</b>

                        </Typography>}
                    />
                </Typography>
                <Stack direction={"row"} spacing={2}>
                    <Button color={"error"} variant={"outlined"}
                        onClick={() => onChange(false)}><span>انصراف</span></Button>
                    <Button color={"success"} variant={"contained"}
                        onClick={() => sendData()}><span>بله </span></Button>

                </Stack>
            </Stack>
        </>
    )
}
const Requestes = () => {
    const dispatch = useDispatch()
    const { match_id, team_id } = useParams()
    const theme = useTheme()
    // const [bottomSheetOpen, setBottomSheetOpen] = React.useState(false);
    const [detailMatch, setDetailMatch] = React.useState()
    const [requestList, setRequestList] = React.useState([])
    const IconColor = theme.palette.grey[400]
    const TextColor = theme.palette.grey[600]
    const customListHandler = (body) => {

        const data = {
            guest_team_id: body.requester_team_id,
            host_team_id: team_id,
            match_request_id: body.match_request_id,
            match_id: match_id,
            requester_team_creator_userid: body.creator_user_id
        }

        dispatch(showBUTTOMSheet(<DialogContent data={data}
            onChange={(e) => dialogHandler(e)} />, "درخواست بازی", "25%"))
    }
    const dialogHandler = (event) => {
        if (event === false)
            dispatch(hideBUTTOMSheet())
    }
    const getData = (body) => {
        const { match_id, team_id } = body
        const resultList = dataHandler(api.matchRequestList(team_id, match_id), "get", "");
        try {
            resultList(async function (data, status) {

                setRequestList(data.result)

            })
        } catch (error) {
            //error handle here
        }
        const resultDetail = dataHandler(api.detailMatch(match_id), "get", "");
        try {
            resultDetail(async function (data, status) {
                setDetailMatch(data.result)


            })
        } catch (error) {
            //error handle here
        }
    }
    React.useEffect(() => {
        getData({ match_id: match_id, team_id: team_id })
        // setRequesterInfo(requsetInfo)


    }, [match_id])
    return (
        <>


            <Stack sx={{ p: 1, mb: 3, pb: 10 }} spacing={1}>
                <DetailMatch callRequestPage={true} />

                <Typography align={"right"} sx={{ fontWeight: 500, px: 1 }} variant={"h5"}>
                    <IconText text_pt={0} fontSize={12} icon={<IconArticle size={20} color={IconColor} />} color={TextColor} text={<Typography sx={{ fontWeight: 500 }} variant={"h5"}>لیست درخواست ها
                        <Typography variant={"subtitle2"} align={"center"}
                            sx={{ color: theme.palette.grey[400] }}>{
                                requestList ? `(${requestList.length}درخواست)` : "بدون درخواست"
                            }</Typography></Typography>} />
                </Typography>
                <Divider />
                {requestList.length > 0 ?
                    <Box sx={{ p: 3 }}>
                        <BoxWrapper>

                            <CustomList
                                onChange={(body) => customListHandler(body)}
                                data={requestList} />

                        </BoxWrapper>
                    </Box> : <Box sx={{ p: 3 }}> <Typography variant={"h5"}>در خواستی ارسال نشده</Typography></Box>
                }

            </Stack>

        </>
    )

}
export default Requestes;