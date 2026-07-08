import * as React from "react";
import { useDispatch } from "react-redux";
// ui-material
import { Button, Divider, Grid, Stack, Typography, useTheme, Box, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import MainCard from "@/components/ui-component/cards/MainCard_pre";
// tabler icon
import { IconPlus, IconCheck } from "@tabler/icons-react";
// project import
import { hostAddress } from '@/components/api/api';
import AnimatedButton from '@/components/ui-component/extended/AnimateButton';
import CustomAvatar from '@/components/ui-component/extended/Avatar';
import DefaultAvatar from '@/components/assets/images/screen/default-avatar.jpg';
//import Content from './addContent'; 
import { showAlert } from "@/components/store/slices/alertSlice";
import { showBottomSheet, hideBottomSheet } from "@/components/store/slices/bottomSheetSlice";
import api from '@/components/api/api';
import dataHandler from '@/components/api/dataHandler';

interface TeamInfo {
    team_name: string;
    about?: string;
    logo?: {
        logo_path?: string;
    };
}

interface UserInfo {
    fullname: string;
    bio?: string;
    avatar?: {
        path?: string;
    };
}

interface InfoProps {
    team_info?: TeamInfo;
    fullname?: string;
    bio?: string;
    avatar?: {
        path?: string;
    };
    totalFollowers?: number;
    isFollowing?: boolean;
    rate?:number
}

interface TopSectionUnifiedProps {
    type: "team" | "user";
    info: InfoProps | null | undefined;
    id: string | number;
    about?: string;
    hostAddress?: string; // <-- اینجا اضافه شود
}

// استایل مدرن‌تر برای کارت اصلی (تخت، تمیز و مینیمال با لبه‌های نرم)
// تعریف پروپ‌های کامپوننت کاستومایز شده
const CardWrapper = styled(MainCard)<{ children?: React.ReactNode }>(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    background: theme.palette.background.paper,
    borderRadius: "16px",
    overflow: "hidden",
    position: "relative",
    zIndex: 0,
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
    padding: theme.spacing(2.5),
}));

const TopSectionUnified: React.FC<TopSectionUnifiedProps> = ({ type, info, id, about }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [file, setFile] = React.useState<File | null>(null);
    const [imageSrc, setImageSrc] = React.useState<string | null>(null);

    const selectFileHandler = (selectedFile: File) => {
        const blobUrl = URL.createObjectURL(selectedFile);
        setImageSrc(blobUrl);
        setFile(selectedFile);
    };

    const followToggle = () => {
        const result = dataHandler(api.followToggle(), "post", {
            followed_id: id,
            followed_type: type,
        });

        try {
            result(async (data: any, status: boolean) => {
                if (status) {
                    dispatch(showAlert({
                        message: status ? data.message : (data.response?.data?.message || "خطا در ارسال اطلاعات"),
                        type: status ? "success" : "error"
                    }));
                } else {
                    dispatch(showAlert(data?.response?.data?.message || "خطایی رخ داد"));
                }
            });
        } catch (error) {
            dispatch(showAlert({
                message: "خطایی رخ داده است",
                type: 'error'
            }));
        }
    };
    {/**بخش ارسال محتوا فعلا لازم نیست */ }
    {/** 
    React.useEffect(() => {
        if (file && imageSrc) {
            dispatch(
                showBottomSheet(
                    <Content
                        image={imageSrc}
                        onChange={() => dispatch(hideBottomSheet())}
                        file={file}
                    />, 
                    "ارسال تصویر", 
                    ""
                )
            );
        }
    }, [file, imageSrc, dispatch]);
    */}

    if (!info) return null;

    const avatarSrc =
        type === "team"
            ? info?.team_info?.logo?.logo_path
                ? `${hostAddress}${info.team_info.logo.logo_path}`
                : DefaultAvatar
            : info?.avatar?.path
                ? `${hostAddress}${info.avatar.path}`
                : DefaultAvatar;

    const displayName = type === "team" ? info?.team_info?.team_name || "" : info?.fullname || "";
    const followers = info?.totalFollowers || 0;
    const bio = about || (type === "team" ? info?.team_info?.about : info?.bio);
    const isFollowing = info?.isFollowing;
    const rate=info.rate||0

    return (
        <CardWrapper>
           
            {/* بخش بالایی: اطلاعات کاربر و آمار */}
            <Grid container spacing={2} sx={{ direction: "rtl", alignItems: "center" }}>

                {/* آواتار و نام */}
                <Grid item xs={12} sm={7} md={8}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{ position: "relative" }}>
                            <CustomAvatar
                                size="md"
                                outline
                                color={theme.palette.primary.main}
                                 src={avatarSrc}
                                sx={{
                                    width: 64,
                                    height: 64,
                                    cursor: "pointer",
                                    transition: "transform 0.2s",
                                    "&:hover": { transform: "scale(1.05)" }
                                }}
                            >
                                {displayName ? displayName.substring(0, 1) : ""}
                            </CustomAvatar>
                        </Box>
                        <Stack sx={{pr:1}} spacing={0.5}>
                            <Typography variant="h4" textAlign={"right"} sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                               { displayName}
                            </Typography>
                            {bio && (
                                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, lineBreak: "anywhere" }}>
                                    {bio}
                                </Typography>
                            )}
                        </Stack>
                    </Stack>
                </Grid>

                {/* بخش آمار (دنبال کننده و امتیاز) */}
                <Grid item xs={12} sm={5} md={4}>
                    <Stack
                        direction="row"
                        justifyContent={{ xs: "flex-start", sm: "flex-end" }}
                        divider={<Divider orientation="vertical" flexItem sx={{ mx: 2, my: 0.5 }} />}
                        spacing={2}
                    >
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="h6" className="numfarsi-s1" sx={{ fontWeight: 800, color: theme.palette.text.primary }}>
                                {followers}
                            </Typography>
                            <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
                                دنبال‌کننده
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="h6" className="numfarsi-s1" sx={{ fontWeight: 800, color: theme.palette.text.primary }}>
                              {rate||"0"}
                            </Typography>
                            <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
                                امتیاز
                            </Typography>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>

            {/* بخش پایینی: دکمه‌های اکشن */}
            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-start", direction: "rtl" }}>
                <AnimatedButton>
                    <Button
                        variant={!isFollowing ? "contained" : "outlined"}
                        color="primary"
                        onClick={followToggle}
                        startIcon={!isFollowing ? <IconPlus size={16} /> : <IconCheck size={16} />}
                        sx={{
                            borderRadius: "10px",
                            px: 4,
                            py: 1,
                          
                            fontSize: "0.75rem",
                            boxShadow: !isFollowing ? theme.shadows[2] : "none",
                            textTransform: "none",
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                                transform: "translateY(-1px)",
                            }
                        }}
                    >
                       <Box sx={{mr:1}}> {!isFollowing ? "دنبال کردن" : "دنبال شده"}</Box>
                    </Button>
                </AnimatedButton>
            </Box>
        </CardWrapper>
    );
};


export default TopSectionUnified;