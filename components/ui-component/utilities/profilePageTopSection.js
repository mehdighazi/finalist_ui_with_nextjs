import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
//ui-material
import { Button, ButtonGroup, Chip, Divider, Grid, Stack, Typography, useTheme, Paper, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import MainCard from "ui-component/cards/MainCard_pre";
//tabler icon
import { IconHeart, IconPlus, IconUserCheck } from "@tabler/icons-react"
//project import

import { hostAddress } from 'api/api'
import AnimatedButton from 'ui-component/extended/AnimateButton'
import CustomAvatar from 'ui-component/extended/Avatar'
import DefaultAvatar from 'assets/images/screen/default-avatar.jpg'
import BOTTOMSheet from 'views/utilities/BottomSheet'
//import Content from './addContent'
import { GetFileButtonWithCrop, Fileuploader } from 'views/utilities/uploadfile'
import { showAlert } from "store/alertReducer";
import { showBUTTOMSheet, hideBUTTOMSheet } from "store/bottomSheetReducer";
import ProfileSkeleton from 'ui-component/cards/Skeleton/profile'
import api from 'api/api'
import dataHandler from 'api/dataHandler'

const CardWrapper = styled(MainCard)(({ theme }) => ({
    border: "1px solid",
    borderColor: theme.palette.grey[100],
    color: "#fff",
    overflow: "hidden",
    position: "relative",
    zIndex: 0,
    height:{xs:155,sm:155,lg:150},
}));

/**
 * Unified TopSection for Team & User
 * @param type => "team" | "user"
 */
const TopSectionUnified = ({ type, info, id, about }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [file, setFile] = React.useState(null);
    const [imageSrc, setImageSrc] = React.useState(null);

    const selectFileHandler = (file) => {
        const blobUrl = URL.createObjectURL(file);
        setImageSrc(blobUrl);
        setFile(file);
    };

    const followToggle = () => {
        console.log({
            followed_id: id,
            followed_type: type,
        })
        const result = dataHandler(api.followToggle(), "post", {
            followed_id: id,
            followed_type: type,
        });

        try {
            result(async (data, status) => {
                if (status) dispatch(showAlert("عملیات موفقیت آمیز", "success"));
                else dispatch(showAlert(data.response.data.message, "error"));
            });
        } catch (error) {
            dispatch(showAlert("خطایی رخ داده", "error"));
        }
    };

    React.useEffect(() => {
        if (file) {
            dispatch(
                showBUTTOMSheet(
                    <Content
                        image={imageSrc}
                        onChange={() => dispatch(hideBUTTOMSheet())}
                        file={file}
                    />, "ارسال تصویر", "")
            );
        }
    }, [file]);

    if (!info) return null;

    const avatarSrc =
        type === "team"
            ? info?.team_info?.logo?.logo_path
                ? `${hostAddress}/${info.team_info.logo.logo_path}`
                : DefaultAvatar
            : info.avatar?.path
                ? `${hostAddress}/${info.avatar.path}`
                : DefaultAvatar;

    const displayName = type === "team" ? info.team_info.team_name : info.fullname;
    const followers = info.totalFollowers || 0;
    const bio = about || (type === "team" ? info.team_info.about : info.bio);

    return (
        <CardWrapper>
            <Grid container sx={{ direction: "rtl", maxWidth: "100%" }}>
                <Grid xs={8} lg={9} item>
                    <Stack direction="row" spacing={1}>
                        <Chip
                            sx={{
                                height: "48px",
                                alignItems: "center",
                                borderRadius: "27px",
                                border: "none",
                                color: theme.palette.grey[600],
                                "&:hover": {
                                    background: `${theme.palette.grey[50]}!important`,
                                },
                                "& .MuiChip-label": {
                                    fontSize: 14,
                                    p: 1,
                                    pl: 2,
                                },
                            }}
                            icon={
                                <CustomAvatar
                                    size="sm"
                                    outline
                                    color="#4A90E2"
                                    src={avatarSrc}
                                    sx={{
                                        margin: "8px 0 8px 8px !important",
                                        cursor: "pointer",
                                        width: theme.spacing(7),
                                        height: theme.spacing(7),
                                    }}
                                >
                                    {displayName.substring(0, 1)}
                                </CustomAvatar>
                            }
                            label={displayName}
                            variant="outlined"
                        />
                    </Stack>
                </Grid>

                <Grid xs={4} lg={3} item>

                    <Stack
                        sx={{ mb: 2, float: 'left', ml: 1.2 }}
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={1}>
                        <Stack sx={{ justifyContent: "center", p: 0.5 }}
                            spacing={0}
                        >
                            <Typography sx={{ color: theme.palette.grey[400] }} align={"center"}
                                fontSize={10}>دنبال
                                کننده</Typography>
                            <Typography sx={{ color: theme.palette.grey[400] }} className={"numfarsi-s1"} align={"center"} fontSize={10}
                                variant={"h6"}>{followers}</Typography>
                        </Stack>
                        <Stack sx={{ justifyContent: "center", p: 0.5 }}
                            spacing={0}
                        >
                            <Typography sx={{ color: theme.palette.grey[400] }} align={"center"}
                                fontSize={10}> امتیاز</Typography>
                            <Typography sx={{ color: theme.palette.grey[400] }} className={"numfarsi-s1"} align={"center"} fontSize={10}
                                variant={"h6"}>{'0'}</Typography>
                        </Stack>

                    </Stack>
                </Grid>


            </Grid>

            {/* Bio */}
            <Grid container sx={{ direction: "rtl" }}>
                <Grid item xs={12}>
                    <Box textAlign={"right"} sx={{ minHeight: 30 }}>
                        <Typography fontSize={12} sx={{ color: theme.palette.grey[400], pt: 1 }}>
                            {bio || ""}
                        </Typography>
                    </Box>
                </Grid>

                {/* Follow Button */}
                <Grid xs={12}>
                    <Box sx={{ position: "relative" }}>
                        <ButtonGroup sx={{ float: "left" }}>
                            <AnimatedButton>
                                <Button
                                    variant={!info.isFollowing ? "contained" : "outlined"}
                                    onClick={followToggle}
                                    sx={{
                                        fontSize: 8,
                                        //p:2,
                                        height: 33,
                                        width: 130,
                                        color: !info.isFollowing
                                            ? theme.palette.common.white
                                            : theme.palette.primary.main,
                                        borderColor: info.isFollowing ? theme.palette.primary.main : "transparent",
                                    }}
                                >
                                    <Chip
                                        icon={<IconPlus size={14} />}
                                        size="small"
                                        label={!info.isFollowing ? "دنبال کردن" : "دنبال شده"}
                                        sx={{
                                            backgroundColor: "transparent !important",
                                            "& .MuiChip-label": {
                                                color: !info.isFollowing
                                                    ? theme.palette.grey[200]
                                                    : theme.palette.primary.main,
                                            },
                                            border: "none",
                                            boxShadow: "none",
                                        }}
                                    />
                                </Button>
                            </AnimatedButton>
                        </ButtonGroup>
                    </Box>
                </Grid>
            </Grid>
        </CardWrapper>
    );
};

export default TopSectionUnified;

// ------------------- HOW TO USE -------------------
// For TEAM page:
// <TopSectionUnified type="team" info={teamInfo} id={queryParams.get('tid')} />

// For USER page:
// <TopSectionUnified type="user" info={userInfo} id={userID} />
