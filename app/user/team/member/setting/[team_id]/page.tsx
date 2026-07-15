'use client';
import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// در نکست‌جی‌اس نسخه جدید (App Router) پارامترها با useParams گرفته می‌شوند:
import { useRouter, useParams } from "next/navigation";
import {
    Box, Chip, IconButton, Paper, Stack, Tooltip, TextField,
    List, ListItem, Divider, ListItemText, ListItemAvatar, Typography, Autocomplete, CircularProgress,
    useTheme
} from "@mui/material";
import { Directions, HowToReg } from "@mui/icons-material";
import { IconX, IconCircleCheck, IconCheck, IconUserPlus } from "@tabler/icons-react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

// project imports
import { TeamBox } from "@/components/ui-component/utilities/MatchCardContent";
import IconText from '@/components/ui-component/utilities/IconText';
import DialogBox from "@/components/ui-component/utilities/Dialog";
import dataHandler from '@/components/api/dataHandler';
import api from '@/components/api/api';
import teamPng from "@/components/assets/images/screen/team.png";
import { showAlert } from "@/components/store/slices/alertSlice";
import CustomAvatar from '@/components/ui-component/extended/Avatar';
import { createDateLetter, createDateStr } from '@/components/utils/Lib';
import { hostAddress } from "@/components/api/api";
import DefaultAvatar from "@/components/assets/images/screen/default-avatar.jpg";
import { MainCardWrapper } from "@/components/ui-component/cards/MainCardWrapper";
import UserListSkeleton from '@/components/ui-component/cards/Skeleton/UserList';
import { textAlign } from "@mui/system";

//------------------------------------| Interfaces & Types |---------

interface UserAvatar {
    path: string;
}

interface User {
    user_id: string | number;
    first_name: string;
    last_name: string;
    avatar?: UserAvatar | null;
}

interface MemberItem {
    team_member_id: string | number;
    type: string;
    createdAt: string;
    user: User;
}

interface TeamInfo {
    team_name: string;
    logo?: { logo_path: string } | null;
    members: MemberItem[];
}

interface ListItemsProps {
    data: MemberItem[];
    team_id: string | undefined;
}

interface UserSearchAutocompleteProps {
    onChange: (user: User) => void;
    update: boolean;
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DialogContentProps {
    onChange: (value: boolean) => void;
}

//------------------------------------| Style |---------
const CustomBox = styled(Box)(({ theme }) => ({
    minWidth: "100%",
    marginTop: 5,
    padding: 10,
    minHeight: "150px",
    direction: "rtl",
    "&.MuiBox-root input": {
        fontFamily: "numberfarsi",
        lineHeight: "150%",
        color: theme.palette.secondary.dark
    }
}));

// استایل فرضی برای باکس‌ها که در کد شما جا افتاده بود
const boxStyle = {
    width: "100%",
    backgroundColor: "#e2e2e2",
    borderRadius: 2,
    p: 2,
    mt: 2,
    textAlign: 'right',
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
};


//--------------------------------------------| Components |---------
function ListItems({ data, team_id }: ListItemsProps) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [memberId, setMemberId] = useState<string | number | undefined>();

    const dialogOpenHandler = (member_id: string | number) => {
        setMemberId(member_id);
        setDialogOpen(true);
    };

    const dialogHandler = (event: boolean) => {
        if (event === false) {
            setDialogOpen(false);
        } else {
            if (memberId) removeMemberOnclick(memberId);
            setDialogOpen(false);
        }
    };

    const DialogContent = ({ onChange }: DialogContentProps) => (
        <Stack spacing={3} sx={{ p: 3 }}>
            <Typography variant="h5" align="right">
                شما در حال حذف اعضا تیم هستید. آیا ادامه میدهید؟
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button color="error" variant="outlined" onClick={() => onChange(false)}>
                    <span>انصراف</span>
                </Button>
                <Button onClick={() => onChange(true)} color="success" variant="contained">
                    <span>بله </span>
                </Button>
            </Stack>
        </Stack>
    );

    const removeMemberOnclick = (member_id: string | number) => {
        const formData = {
            member_id: member_id,
            team_id: team_id
        };

        const result = dataHandler(api.memberRemove(), "post", formData);
        try {
            result(async function (data: any, status: boolean) {
                dispatch(showAlert({
                    message: status ? data.message : (data.response?.data?.message || "خطا در ارسال اطلاعات"),
                    type: status ? "success" : "error"
                }));
            });
        } catch (error) {
            dispatch(showAlert({
                message: "خطایی رخ داده است",
                type: 'error'
            }));
        }
    };

   
    return (
        <>
            <DialogBox
                size="md"
                title="حذف عضو"
                onChange={(event: boolean) => setDialogOpen(event)}
                open={dialogOpen}
                content={<DialogContent onChange={(e) => dialogHandler(e)} />}
            />
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {data && data.length > 0 ? data.map((item) => (
                    <React.Fragment key={item.team_member_id}>
                        <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <ListItemAvatar>
                                <CustomAvatar
                                    alt="profile_avatar"
                                    src={item.user.avatar ? `${hostAddress}/${item.user.avatar["path"]}` : ""}
                                />
                            </ListItemAvatar>

                            <ListItemText
                                sx={{ textAlign: 'right', fontSize: 14 }}
                                primary={`${item.user.first_name} ${item.user.last_name}`}
                                secondary={
                                    <Typography
                                        fontSize={10}
                                        align="right"
                                        component="span"
                                        variant="subtitle1"
                                        sx={{
                                            color: theme.palette.grey[400],
                                            display: 'inline',
                                            fontStyle: 'italic',
                                        }}
                                    >
                                        عضویت از {createDateStr(createDateLetter(item.createdAt))}
                                    </Typography>
                                }
                            />

                            <Box sx={{ mx: 1.5 }}>
                                {item.type === 'member' ? (
                                    <Tooltip title={<span>تایید شده</span>}>
                                        <IconButton color="success" edge="start" aria-label="approved" onClick={() => handleDelete(item)}>
                                            <IconCheck color='green' size={16} />
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <Tooltip title={<span>در انتظار تایید</span>}>
                                        <IconButton sx={{ background: theme.palette.grey[100] }} color="success" edge="start" aria-label="pending" onClick={() => handleDelete(item)}>
                                            <IconCheck color='gray' size={16} />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </Box>

                            <Box sx={{ ml: 1 }}>
                                <IconButton
                                    sx={{
                                        backgroundColor: theme.palette.primary.light,
                                        transition: 'background-color 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: theme.palette.primary.main,
                                        },
                                    }}
                                    color="secondary"
                                    edge="start"
                                    aria-label="remove"
                                    onClick={() => dialogOpenHandler(item.team_member_id)}
                                >
                                    <IconX size={16} />
                                </IconButton>
                            </Box>
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                )) : <UserListSkeleton data={undefined} />}
            </List>
        </>
    );
}

const UserSearchAutocomplete = ({ onChange, update, setUpdate }: UserSearchAutocompleteProps) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [options, setOptions] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const theme = useTheme();

    // when parent toggles `update`, clear input and options
    useEffect(() => {
        setInputValue('');
        setOptions([]);
    }, [update]);

    const handleSearch = async (value: string) => {
        setInputValue(value);

        if (value.length >= 2) {
            setLoading(true);
            const result = dataHandler(api.getUserInfoAll({ param: value }), "get", "");

            try {
                result(async function (data: any, status: boolean) {
                    if (data && data.result) {
                        setOptions(data.result);
                    }
                });
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        } else {
            setOptions([]);
        }
    };

    const handleSelect = (event: React.SyntheticEvent, selectedUser: User | string | null) => {
        if (selectedUser && typeof selectedUser !== 'string') {
            onChange(selectedUser);
        }
    };

    return (
        <Autocomplete<User, false, false, true>
            freeSolo
            filterOptions={(x) => x}
            options={options}
            loading={loading}
            getOptionLabel={(option) => typeof option === 'string' ? option : `${option.first_name} ${option.last_name}`}
            onInputChange={(event, newInputValue) => {
                handleSearch(newInputValue);
            }}
            onChange={handleSelect}
            renderOption={(props, option) => (
                <ListItem {...props} key={option.user_id}>
                    <ListItemAvatar>
                        <CustomAvatar
                            size="sm"
                            src={option.avatar ? `${hostAddress}/${option.avatar?.path}` : ""}
                            alt={`${option.first_name} ${option.last_name}`}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography fontSize={14} color={theme.palette.grey[600]}>
                                {`${option.first_name} ${option.last_name}`}
                            </Typography>
                        }
                    />
                </ListItem>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    sx={{
                        padding: 1,
                        height: '3em',
                        background: 'transparent!important',
                        '& .MuiInputBase-root': {
                            background: 'transparent!important',
                        },
                        fontSize: '1rem',
                        '& input': {
                            background: 'transparent!important',
                            border: 0,
                            padding: 1,
                            fontFamily: 'orginalfont',
                            '&::placeholder': {
                                fontSize: '0.8em',
                                color: theme.palette.grey[400],
                                opacity: 1,
                            }
                        },
                    }}
                    placeholder="نام،نام خانوادگی،شناسه کاربری..."
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress size={14} /> : <IconCircleCheck size={14} />}
                                {params.InputProps.endAdornment}
                            </>
                        )
                    }}
                />
            )}
        />
    );
};

const MainDialogContent = ({ onChange }: DialogContentProps) => {
    return (
        <Stack sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ p: 2 }}>
                در صورت ثبت امکان اضافه کردن عضو تا 72 ساعت آینده مقدور نخواهد بود. ادامه میدهید؟
            </Typography>
            <Stack direction="row" spacing={2}>
                <Button color="error" variant="outlined" onClick={() => onChange(false)}>
                    <span>انصراف</span>
                </Button>
                <Button onClick={() => onChange(true)} color="success" variant="contained">
                    <span>بله </span>
                </Button>
            </Stack>
        </Stack>
    );
};

//--------------------------------------------| MembersSetting Component |-------------------
const MembersSetting = () => {
    const [userinfo, setUserInfo] = useState<any>(null);
    const [showAll, setShowAll] = useState<boolean>(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const theme = useTheme();

    const IconColor = theme.palette.grey[400];
    const TextColor = theme.palette.grey[600];

    // ۱. دریافت پارامترها به روش کاملاً کلاینتی و استاندارد Next.js
    const params = useParams();
    // بسته به اینکه اسم فولدر شما در روت‌ها [teamId] است یا [teamid] این مقدار را تنظیم کنید:
    const teamid = params?.team_id as string | undefined;

    const [teaminfo, setTeamInfo] = useState<TeamInfo | null>(null);
    const [verifyMemberList, setVerifyMemberList] = useState<TeamInfo | null>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | number | null>(null);
    const [update, setUpdate] = useState<boolean>(false);

    const dialogHandler = (event: boolean) => {
        if (event === false) {
            setDialogOpen(false);
        } else {
            sendData();
            setDialogOpen(false);
        }
    };

    const getData = () => {
        const result = dataHandler(api.getUserInfo({ uid: '', first_name: "", last_name: "" }), "get", "");
        try {
            result(async function (data: any, status: boolean) {
                if (status) {
                    setUserInfo(data.result);
                } else {
                    router.push("/splash");
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    const getTeamData = () => {
        if (!teamid) return;
        const result = dataHandler(api.teamInfo(teamid), "get", "");

        try {
            result(async function (data: any, status: boolean) {
                if (data && data.result) {
                    setTeamInfo(data.result);
                    setVerifyMemberList(data.result);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!userinfo) getData();
    }, []);

    useEffect(() => {

        if (teamid) getTeamData();
    }, [teamid, update]);

    const sendData = () => {
        if (!userId) {
            dispatch(showAlert({
                message: "کاربری انتخاب نشده است",
                type: 'error'
            }));
            return;
        }

        if (!teamid) {
            dispatch(showAlert({
                message: "شناسه تیم نامعتبر است",
                type: 'error'
            }));
            return;
        }

        const toSend = [{ user_id: userId }];
        const formData = {
            team_id: teamid,
            members: toSend
        };

        // ارسال شناسه تیم به عنوان ورودی متد (اگر api ورودی می‌گیرد)
        const result = dataHandler(api.memberInvite(), "post", formData);

        try {
            result(async function (data: any, status: any) {
                if (status === 100 || status === true) {
                    setUpdate(prev => !prev);
                    setUserId(null);
                }
                dispatch(showAlert({
                    message: status ? data.message : (data.response?.data?.message || "خطا در ارسال اطلاعات"),
                    type: status ? "success" : "error"
                }));
            });
        } catch (error) {
            dispatch(showAlert({
                message: "خطایی رخ داده است",
                type: 'error'
            }));
        }
    };

    return (
        <Box sx={{mb:10}}>
           
                <DialogBox
                    size="md"
                    title="ثبت اطلاعات"
                    onChange={(event: boolean) => setDialogOpen(event)}
                    open={dialogOpen}
                    content={<MainDialogContent onChange={(e) => dialogHandler(e)} />}
                />

                {teaminfo && verifyMemberList ? (
                    <CustomBox>
                        <Paper>
                            <MainCardWrapper
                                border={false}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                }}
                            >
                                <TeamBox
                                    title={teaminfo.team_name}
                                    logo={teaminfo.logo ? `${hostAddress}/${teaminfo.logo.logo_path}` : DefaultAvatar}
                                />
                            </MainCardWrapper>
                        </Paper>
                        <Box sx={boxStyle}>

                            <IconText textPaddingTop={0.5} fontSize={12} icon={<HowToReg />} color={TextColor} text="مدیریت اعضا" />
                        </Box>
                        {/* استک اصلی برای بخش لیست اعضا و دکمه‌های بیشتر/کمتر */}
                        <Stack sx={{ maxWidth: "100%", direction: "rtl" }} spacing={0}>
                            <ListItems
                                team_id={teamid}
                                data={showAll ? verifyMemberList.members : verifyMemberList.members.slice(0, 2)}
                            />

                            {verifyMemberList.members.length > 2 && (
                                <Box sx={{ mt: 0, display: "flex", justifyContent: "center" }}>
                                    {!showAll ? (
                                        <Button
                                            variant="text"
                                            sx={{ color: theme.palette.grey[600], fontWeight: 500, fontSize: 12 }}
                                            onClick={() => setShowAll(true)}
                                        >
                                            <span>مشاهده بیشتر</span>
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="text"
                                            sx={{ color: theme.palette.grey[600], fontWeight: 500, fontSize: 12 }}
                                            onClick={() => setShowAll(false)}
                                        >
                                            <span>مشاهده کمتر</span>
                                        </Button>
                                    )}
                                </Box>
                            )}
                        </Stack>

                        {/* باکس جستجو و افزودن کاملاً مستقل از استک بالا با یک فاصله مشخص (مثلاً mt: 2) */}
                        <Paper sx={{ display: "block", width: "100%", p: 0, mt: 0 }}>
                            <Stack spacing={3}>
                                <UserSearchAutocomplete
                                    update={update}
                                    setUpdate={setUpdate}
                                    onChange={(user) => setUserId(user.user_id)}
                                />

                                <Box sx={{ p: 1 }}>
                                    <Button
                                        fullWidth
                                        sx={{ border: "1px dashed", borderColor: theme.palette.secondary.main, p: 1, borderRadius: 2 }}
                                        onClick={() => setDialogOpen(true)}
                                    >
                                        <Chip
                                            sx={{
                                                background: "none",
                                                mr: 1,
                                                "& .MuiChip-label": { ml: 2, pr: 0 },
                                                "& .MuiChip-icon": { mb: "4px" }
                                            }}
                                            icon={<IconUserPlus size={20} />}
                                            size="small"
                                            label={<Typography sx={{ fontWeight: 500, mt: 1 }} variant="h5">افزودن</Typography>}
                                        />
                                    </Button>
                                </Box>
                            </Stack>
                        </Paper>

                    </CustomBox>
                ) : (
                    <Box sx={{ p: 5, textAlign: 'center' }}>
                        <img src={teamPng.src || teamPng} style={{ width: "225px", height: "auto" }} alt="No Team" />
                        <Typography variant="h5" sx={{ color: theme.palette.grey[500], mt: 2 }}>
                            تیم نداری؟ از <a href="#"> اینجا </a> یه تیم ایجاد کن
                        </Typography>
                    </Box>
                )}
            
        </Box>
    );
};

export default MembersSetting;