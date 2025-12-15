import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//ui-material
import {
    Box, Chip, IconButton, InputBase, Paper, Stack, Tooltip, TextField,
    List, ListItem, Divider, ListItemText, ListItemAvatar, Typography, Autocomplete, CircularProgress,
    useMediaQuery, useTheme, ListItemSecondaryAction, Accordion, AccordionSummary, AccordionDetails
} from "@mui/material";
import { HowToReg } from "@mui/icons-material";
//table icon
import { IconX, IconChevronCompactDown, IconCircleCheck, IconCheck, IconSearch } from "@tabler/icons-react";
//project import
import { TeamBox } from "views/utilities/MatchCardContent";
import Avatar from 'ui-component/extended/Avatar';
import { styled } from "@mui/material/styles";
import IconText from 'views/utilities/IconText'
import MainCard from 'ui-component/cards/MainCard_pre';
import Button from "@mui/material/Button";
import { IconEdit, IconUserPlus } from "@tabler/icons-react";
import DialogBox from "views/utilities/Dialog";
import dataHandler from "api/dataHandler";
import api from "api/api";
import teamPng from "assets/images/screen/team.png";
import { showAlert } from "store/alertReducer";
import CustomAvatar from 'ui-component/extended/Avatar'
import { createDateLetter, createDateStr } from 'utils/Lib'
import { hostAddress } from "api/api";
import DefaultAvatar from "assets/images/screen/default-avatar.jpg";
import { MainCardWrapper } from "ui-component/cards/MainCardWrapper";

import UserListSkeleton from 'ui-component/cards/Skeleton/UserList'

//------------------------------------| function |-------------------

//------------------------------------|Style-------------------------
const CustomBox = styled(Box)(({ theme }) => ({
    minWidth: "100%",
    marginTop: 5,
    padding: 10,
    minHeight: "150px",
    direction: "rtl",
    "&.MuiBox-root input":
    {
        fontFamily: "numberfarsi",

        lineHeight: "150%",
        color: theme.palette.secondary.dark


    }
}));

//--------------------------------------------| Components |---------
function ListItems({ data, team_id }) {
    const theme = useTheme();
    const dispatch = useDispatch()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [memberId, setMemberId] = useState()
    const dialogOpenHandler = (member_id) => {
        setMemberId(member_id)
        setDialogOpen(true)

    }

    const dilogHandler = (event, member_id) => {
        if (event === false)//dont accept dialog question
        {
            setDialogOpen(false)
        } else {

            //accept dialpg question
            removeMemberOnclick(memberId)
            setDialogOpen(false)
        }

    }
    const DialogContent = ({ onChange }) =>
    (<Stack sx={{ p: 3 }}>
        <Typography variant={"h5"} sx={{ p: 2 }}>
            شما در حال حذف اعضا تیم هستید.آیا ادامه میدهید؟
        </Typography>
        <Stack direction={"row"} spacing={2}>
            <Button color={"error"} variant={"outlined"}
                onClick={() => onChange(false)}><span>انصراف</span></Button>
            <Button onClick={() => onChange(true)} color={"success"}
                variant={"contained"}><span>بله </span></Button>

        </Stack>
    </Stack>)
    const removeMemberOnclick = (member_id) => {

        const formData = {
            member_id: member_id,
            team_id: team_id
        };

        const result = dataHandler(api.memberRemove(), "post", formData);
        try {
            result(async function (data, status) {

                dispatch(showAlert(status ? data["message"] : data.response.data["message"],
                    status ? "success" : "error"))
            });
        } catch (error) {
            dispatch(showAlert("خطایی رخ داده", "error"));
        }

    }
    return (<>
        <DialogBox title={"ثبت اطلاعات"} onChange={(event) => setDialogOpen(event)}
            open={dialogOpen} content={<DialogContent onChange={(e) => dilogHandler(e)} />} />
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {data && data.length > 0 ? data.map((item) => (
                <>

                    <ListItem
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',

                        }}
                    >
                        {/* آواتار سمت راست (به‌خاطر row-reverse) */}
                        <ListItemAvatar>
                            <CustomAvatar
                                alt="profile_avatar"
                                src={item.user.avatar ? `${hostAddress}/${item.user.avatar["path"]}` : ""}
                            />
                        </ListItemAvatar>

                        {/* متن */}
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


                        {/**ایکن چک برای مشخص کردن تایید یا عدم تایید */}
                        <Box sx={{ mx: 1.5 }}>
                            {item.type === 'member' ?
                                <Tooltip title={<span>تایید شده</span>}>
                                    <IconButton sx={{
                                    }} color="success" edge="start" aria-label="delete" onClick={() => handleDelete(item)}>
                                        <IconCheck color='green' size={16} />
                                    </IconButton>
                                </Tooltip> :
                                <Tooltip title={<span>در انتظار تایید</span>}>
                                    <IconButton sx={{
                                        background: theme.palette.grey[100]

                                    }} color="success" edge="start" aria-label="delete" onClick={() => handleDelete(item)}>
                                        <IconCheck color='gray' size={16} />
                                    </IconButton>
                                </Tooltip>
                            }
                        </Box>
                        {/* آیکن ضربدر سمت چپ (در ظاهر RTL) */}
                        <Box sx={{ ml: 1 }}>
                            <IconButton sx={{
                                backgroundColor: theme.palette.primary[100], // رنگ پس‌زمینه
                                transition: 'background-color 0.3s ease', // مدت زمان: 0.5s، تأخیر: 0.2s
                                // color: 'white',                    // رنگ آیکن داخل دکمه
                                '&:hover': {
                                    backgroundColor: theme.palette.secondary.main, // رنگ هنگام هاور
                                },
                            }} color={"secondary.main"} edge="start" aria-label="remove" onClick={() => dialogOpenHandler(item.team_member_id)}>
                                <IconX size={16} />
                            </IconButton>
                        </Box>
                    </ListItem>
                    <Divider />
                </>
            )) : <UserListSkeleton />}
        </List>
    </>
    );
}
const UserSearchAutocomplete = ({ onChange, update, setUpdate }) => {
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const handleSearch = async (value) => {
        setInputValue(value);

        if (value.length >= 2) {
            setLoading(true);
            const result = dataHandler(api.getUserInfoAll({ param: value }), "get", "");

            try {
                result(async function (data, status) {

                    setOptions(data.result)



                })
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
        } else {
            setOptions([]);
        }
    };

    const handleSelect = (event, selectedUser) => {
        if (selectedUser) {
            onChange(selectedUser)
            // استفاده از کاربر انتخاب‌شده
        }
    };


    return (

        <Autocomplete
            freeSolo
            filterOptions={(x) => x}
            // value={inputValue} // اضافه شد
            options={options}
            loading={loading}
            getOptionLabel={(option) =>
                `${option.first_name} ${option.last_name}`
            }
            onInputChange={(event, newInputValue) => {
                handleSearch(newInputValue);
            }}
            onChange={handleSelect}
            renderOption={(props, option) => (
                <ListItem {...props} key={option.user_id}>
                    {<ListItemAvatar>
                        <CustomAvatar
                            size="sm"
                            src={option.avatar ? `${hostAddress}/${option.avatar?.path}` : ""}
                            alt={`${option.first_name} ${option.last_name}`}
                        />
                    </ListItemAvatar>}
                    <ListItemText
                        primary={
                            <Typography fontSize={14} color={theme.palette.grey[600]}>
                                {`${option.first_name} ${option.last_name}`}</Typography>

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
                        '& .MuiInputBase-root':
                        {

                            background: 'transparent!important',
                        },
                        fontSize: '1rem', // این برای متن اصلی اینپوت
                        '& input': {
                            background: 'transparent!important',
                            border: 0,
                            color: theme.palette.text,
                            padding: 1,
                            fontFamily: 'orginalfont',
                            '&::placeholder': {
                                fontSize: '0.8em', // سایز کوچیکتر برای placeholder
                                color: theme.palette.grey[400], // مثلا خاکستری تر
                                opacity: 1, // اگر بخوای کاملاً مشخص باشه
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
const DialogContent = ({ onChange }) => {
    return (
        <>
            <Stack sx={{ p: 3 }}>
                <Typography variant={"h5"} sx={{ p: 2 }}>
                    در صورت ثبت امکان اضافه کردن عضو تا 72 ساعت آینده مقدور نخواهد بود. ادامه میدهید؟
                </Typography>
                <Stack direction={"row"} spacing={2}>
                    <Button color={"error"} variant={"outlined"}
                        onClick={() => onChange(false)}><span>انصراف</span></Button>
                    <Button onClick={() => onChange(true)} color={"success"}
                        variant={"contained"}><span>بله </span></Button>

                </Stack>
            </Stack>
        </>
    )
}
//--------------------------------------------| add member |-------------------
const MembersList = (props) => {
    const [userinfo, setUserInfo] = useState(null)
    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const theme = useTheme();
    const { teamid } = useParams();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const [changed, setChange] = useState(true)
    const [teaminfo, setTeamInfo] = useState(null)
    const [verifyMemberList, setVerifyMemberList] = useState([])
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [mobiles, setMobiles] = useState([])

    const [userId, setUserId] = useState(null)
    const [update, setUpdate] = useState(false)
    const [inputs, setInputs] = useState([
        { id: 1, mobile: "", disabled: true },
    ]);
    const IconColor = theme.palette.grey[400]
    const TextColor = theme.palette.grey[600]
    const boxStyle = {
        p: 2,
        //pr: 6,
        border: `1px solid ${theme.palette.grey[200]}`,
        height: "auto",
        width: "100%",
        mt: 2,
        borderRadius: 2,
        // background: theme.palette.grey[100]

    }
    //-----------------------| Event Handler |-----------------------------------
    const handleInputChange = (id, value) => {

        const mobile = value
        setInputs((prevInputs) =>
            prevInputs.map((input) =>
                input.id === id ? { ...input, mobile } : input
            )
        );

    };

    const dilogHandler = (event) => {
        if (event === false)//dont accept dialog question
        {
            setDialogOpen(false)
        } else {

            //accept dialpg question
            sendData()
            setDialogOpen(false)
        }

    }
    //-----------------------| Data Handler |------------------------------------
    const getData = (body) => {


        const result = dataHandler(api.getUserInfo({ uid: '' }), "get", "");
        try {
            result(async function (data, status) {

                if (status) {
                    setUserInfo(data.result)

                }

                else navigate("/splash")
            })
        } catch (error) {
            //error handle here

        }
    }
    React.useEffect(() => {

        if (!userinfo)
            getData()

    }, [])
    const getTeamData = () => {
        const result = dataHandler(api.teamInfo(teamid), "get", "");

        try {
            result(async function (data, status) {
                setTeamInfo(data.result)
                setVerifyMemberList(data.result)



            })
        } catch (error) {
            console.log(error)
        }
    }


    const sendData = () => {
        let valid = true;
        const toSend = [{ user_id: userId }];



        if (toSend.length === 0) {
            dispatch(showAlert("اطلاعات معتبر نمی باشد", "error"));
            return;
        }

        const formData = {
            team_id: teamid,
            members: toSend
        };

        const result = dataHandler(api.memberInvite(3), "post", formData);

        try {
            result(async function (data, status) {
                if (status === 100)
                    setUpdate(true)
                dispatch(showAlert(status ? data["message"] : data.response.data["message"],
                    status ? "success" : "error"))
            });
        } catch (error) {
            dispatch(showAlert("خطایی رخ داده", "error"));
        }
    };

    React.useEffect(() => {

        if (!teaminfo)
            getTeamData()

    }, [inputs])

    return (<>
        <Box sx={{ mb: 10 }}>

            <DialogBox title={"ثبت اطلاعات"} onChange={(event) => setDialogOpen(event)}
                open={dialogOpen} content={<DialogContent onChange={(e) => dilogHandler(e)} />} />
            {teaminfo ?
                <CustomBox>
                    <Paper >
                        {<MainCardWrapper
                            border={false}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                //  background: theme.palette.grey[100]
                            }} >

                            <TeamBox title={teaminfo.team_name}
                                logo={teaminfo.logo ? `${hostAddress}/${teaminfo.logo.logo_path}` : DefaultAvatar}>
                            </TeamBox>


                        </MainCardWrapper>}
                    </Paper>
                    <Stack sx={{ maxWidth: "100%", p: 1 }}>
                        <Typography align={"right"} sx={{ fontWeight: 200, mt: 1, color: IconColor }}>
                            <IconText text_pt={0.5} fontSize={12} icon={<HowToReg />} color={TextColor} text={"مدیریت اعضا"} />
                        </Typography>
                        <Box sx={boxStyle}>
                            <Typography align={"right"} sx={{ fontWeight: 200, mt: 1, color: IconColor }}>
                                <IconText text_pt={0.5} fontSize={12} icon={<HowToReg />} color={TextColor} text={"مدیریت اعضا"} />
                            </Typography>

                            {/* اگر showAll true بود کل لیست، اگر false بود فقط 3 نفر */}
                            <ListItems
                                team_id={teamid}
                                data={showAll ? verifyMemberList.members : verifyMemberList.members.slice(0, 2)}
                            />

                            {/* دکمه‌ها */}
                            {verifyMemberList.members.length > 2 && (
                                <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>

                                    {!showAll ? (
                                        <Button
                                            variant="text"
                                            sx={{
                                                color: theme.palette.grey[400],
                                                fontWeight: 500,
                                                fontSize: 12
                                            }}
                                            onClick={() => setShowAll(true)}
                                        >
                                            <span>مشاهده بیشتر</span>
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="text"
                                            sx={{
                                                color: theme.palette.grey[400],
                                                fontWeight: 500,
                                                fontSize: 12
                                            }}
                                            onClick={() => setShowAll(false)}
                                        >
                                            <span>مشاهده کمتر</span>
                                        </Button>
                                    )}

                                </Box>
                            )}
                        </Box>

                        <Box sx={boxStyle}>
                            <Stack spacing={3}>

                                {

                                    /*  <SearchField
                                          index={index}
                                          disabled={input.disabled}
                                          onChange={(e) => handleInputChange(0, e)} />*/
                                    <UserSearchAutocomplete update={update} setUpdate={setUpdate} onChange={(e) => console(e.user_id)} />

                                }
                                <Box sx={{ p: 1 }}>
                                    <Button
                                        fullWidth
                                        sx={{ border: "1px dashed", borderColor: theme.palette.secondary.main, p: 1, borderRadius: 2 }}
                                        onClick={() => sendData()}>
                                        <Chip
                                            sx={{
                                                background: "none",
                                                mr: 1,
                                                "& .MuiChip-label": {
                                                    ml: 2,
                                                    pr: 0
                                                }
                                                , "& .MuiChip-icon ": {
                                                    mb: "4px",

                                                }
                                            }}
                                            icon={<IconUserPlus size={20} />}
                                            size="small"
                                            label={<Typography sx={{ fontWeight: 500, mt: 1 }} variant={"h5"}>افزودن
                                            </Typography>}
                                        />

                                    </Button>
                                </Box>

                            </Stack>
                        </Box>
                    </Stack>

                </CustomBox> : <Box sx={{ p: 5 }}>
                    <img src={teamPng} style={{ width: "225px", height: "auto" }} />
                    <Typography variant="h5" sx={{ color: theme.palette.grey[500] }}>
                        تیم نداری؟از <a href={"#"}> اینجا </a> یه تیم ایجاد کن
                    </Typography>
                </Box>}
        </Box>

    </>)

}
export default MembersList