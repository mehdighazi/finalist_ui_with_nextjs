import * as React from "react";
import Avatar from 'ui-component/extended/Avatar';
//ui-material
import {
    Box,
    Chip,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    Rating,
    Stack,
    Typography,
    useTheme,
    styled
} from "@mui/material";
//project import
import DefaultLogo from 'assets/images/screen/defaultlogo.png'
import { createDateLetter, createDateStr } from 'utils/Lib'
import MainCard from 'ui-component/cards/MainCard';
import IconText from "./IconText";
import CustomRating from "ui-component/rating";

//Tabler icon
import { IconAlarm, IconCalendar, IconCheckbox, IconEye, IconMapPin } from "@tabler/icons-react";
import zIndex from "@mui/material/styles/zIndex";
import { height, width } from "@mui/system";
//-----------------------------------------------------

//---------------------------------------------------| Main card Wraped
export const CardWrapper = styled(MainCard)(({ theme }) => ({
    // backgroundColor: theme.palette.grey[100],
    //boxShadow:theme.shadows[1],
    border: '1px solid',
    borderColor: theme.palette.primary[100],


}));
export const BoxWrapper = styled(Box)(({ theme }) => ({



}));
export const headerSx = (theme, size = 'sm') => ({

    //background: theme.palette.primary.light,
    p: 1,
    pr: 1.5,
    textAlign: "right",
    "& .MuiCardHeader-title":
    {
        fontSize: "14px!important",
        color: theme.palette.primary.dark
    }
});
export const TeamBox = ({ title, logo, color, rating,AvatarSize }) => {
    return (<>
        <Box sx={{
            align: 'center',
            p: 1,
            justifyContent: "center",
            //minHeight: "100hv",
            display: 'flex',
            alignItems: 'flex-start'
        }}>
            <Stack sx={{
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Avatar  size={AvatarSize??'sm'} src={logo} />
                <Typography align="center" fontSize={12} fontWeight={400}>
                    {title}

                </Typography>
                {/** create custom rating  */}
                <CustomRating rate={0} size="small" name="read-only" sx={{
                    '& .MuiRating-icon': {
                        fontSize: '16px', // یا حتی کوچک‌تر مثل '12px'
                    },
                }} value={rating} readOnly />
            </Stack>
        </Box>
    </>)

}
export const MatchDetailCardContent = (props) => {
    const {
        title, city, province, dateMatch, timeMatch, matchid,
        hostTeamName, guestTeam, logoHost, logoGuest, location,
        rateGuest, rateHost, type, createDate, description, matchSport,
        matchId
    } = props;

    const MatchItemRow = ({ title, value, index }) => (
        <ListItem
            sx={{
                display: "flex",
                direction: "rtl",
                justifyContent: "right",
                background: index % 2 === 0 ? "#f9f9f9" : "#e6f7ff",
                borderBottom: "1px solid #ddd",
                px: 1,
                py: 1,
            }}
        >
            <Typography fontWeight={400} fontSize="0.85rem">{title}:</Typography>
            <ListItemText
                sx={{ textAlign: "left", "& .MuiTypography-root": { fontSize: "0.80rem" } }}
                primary={value}
            />
        </ListItem>
    );
    const theme = useTheme();
    const Create_Date = createDateLetter(createDate);

    const items = [
        {
            title: "تاریخ ایجاد",
            value: createDateStr(Create_Date)
        },

        { title: "نوع مسابقه", value: 'دوستانه' },
        { title: "تاریخ مسابقه", value: dateMatch },
        { title: "ساعت مسابقه", value: timeMatch },
        { title: "استان شهر", value: `${province}/${city}` },
        { title: "آدرس محل برگزاری", value: location }
    ];

    return (
        <CardWrapper
            actions={false}
            contentSX={{ p: 1 }}
            headerSX={headerSx(theme, 'lg')}
            border={true}
            title={<Stack><Typography fontSize={18} fontWeight={600} textAlign="center" variant="caption">جزییات مسابقه</Typography>
                <Typography fontSize={12} textAlign="center" color={theme.palette.primary.light}>{`(${matchSport})`} </Typography>
                <Typography fontSize={12} textAlign="center" color={theme.palette.primary.light}>{`${matchId}#`} </Typography>
            </Stack>}
        >
            <BoxWrapper>
                <Grid container alignItems="center" justifyContent="center" sx={{ p: 3 }}>
                    <Grid item xs={12}>
                        <TeamBox
                            rating={rateHost || 0}
                            logo={logoHost || DefaultLogo}
                            title={hostTeamName}
                            color="green"
                            AvatarSize='md'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <List sx={{ width: "100%", bgcolor: "background.paper", borderRadius: 2 }}>
                            {items.map((item, index) => (
                                <MatchItemRow key={index} {...item} index={index} />
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography fontWeight={400} fontSize="0.85rem" sx={{ float: "right", px: 2, pt: 0.5 }}>
                            توضیحات:
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ background: "#e6f7ff", borderRadius: 5, pt: 1, width: "100%", height: 100 }}>
                            <Typography
                                fontSize="0.75rem"
                                sx={{
                                    float: "right",
                                    px: 2,
                                    pr: 2,
                                    pt: 0.5,
                                    color: theme.palette.secondary.dark,
                                    minHeight: 100
                                }}
                            >
                                {description}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </BoxWrapper>
        </CardWrapper>
    );
}

export const MatchListCardContent = (props) => {
    const fontSize = 12
    const iconSize = 18
    const {
        matchSportField,
        matchType,
        title,
        city,
        dateMatch,
        timeMatch,
        matchid,
        hostTeamName,
        confirmRequest,
        logoHost,
        logoGuest,
        location,
        rateGuest,
        rateHost,
        viwer,
        createDate,
        requestNumber

    } = props
    const theme = useTheme();
    const Create_Date = createDateLetter(createDate)

    const actions =
        <Grid container sx={{ direction: "rtl" }}>
            <Grid item sm={6} xs={6}>{
                viwer ?
                    <Stack direction={"row"} sx={{ textAlign: 'center' }}>

                        <IconText iconR={true} icon={<IconEye size={14} color={theme.palette.grey[400]} />} text_pt={0} text={<Typography className={"numfarsi-s1"} fontSize={12} sx={{ mb: 0 }} color={theme.palette.grey[400]}
                            align={"right"}
                        >{viwer}</Typography>} />
                        <Typography sx={{ mb: 0, mt: 0.8 }} color={theme.palette.grey[400]} align={"right"}
                            fontSize={12} variant={"h6"}>{createDateStr(Create_Date)}</Typography>
                    </Stack>
                    : ""
            }
            </Grid>
            <Grid item sm={6} xs={6}>
                {
                    requestNumber ?
                        <Box sx={{ float: "left" }}>
                            <Chip
                                variant={"filled"}
                                sx={{
                                    background: "none", color: theme.palette.grey[400],
                                    mr: 0,
                                    "& .MuiChip-label": {
                                        ml: 0,
                                        pr: 0
                                    }
                                    , "& .MuiChip-icon ": {
                                        mb: "4px",
                                        color: theme.palette.grey[400]
                                    }
                                }}
                                // icon={<IconEye size={14}/>}
                                size="small"
                                label={<Typography fontSize={12} className={"numfarsi-s1"} variant={"h6"}
                                    sx={{ color: theme.palette.secondary.main }}
                                    align={"right"}
                                    noWrap={false}>{`${requestNumber} درخواست`}</Typography>}
                            />

                        </Box> : ""
                }
                {
                    confirmRequest && confirmRequest != "-1" ?
                        <Box sx={{ float: "left" }}>
                            <Chip
                                variant={"filled"}
                                sx={{
                                    background: "none",
                                    color: theme.palette.success.main,
                                    mr: 0,
                                    "& .MuiChip-label": {
                                        ml: 0,
                                        pr: 0
                                    }
                                    , "& .MuiChip-icon ": {
                                        mb: "4px",
                                        color: theme.palette.success.main
                                    }
                                }}
                                icon={<IconCheckbox size={14} />}
                                size="small"
                                label={"تایید شده"}
                            />

                        </Box> : confirmRequest != "-1" ?
                            <Box sx={{ float: "left" }}>
                                <Chip
                                    variant={"filled"}
                                    sx={{
                                        background: "none", color: theme.palette.grey[400],
                                        mr: 0,
                                        "& .MuiChip-label": {
                                            ml: 0,
                                            pr: 0
                                        }
                                        , "& .MuiChip-icon ": {
                                            mb: "4px",
                                            color: theme.palette.grey[400]
                                        }
                                    }}
                                    // icon={<IconCheckbox size={14}/>}
                                    size="small"
                                    label={"در انتظار تایید"}
                                />

                            </Box> : ""
                }
            </Grid>

        </Grid>


    return (
        <>

            <CardWrapper actions={actions} contentSX={{ p: 1 }} headerSX={headerSx}
                sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        backgroundColor: theme.palette.grey[50], // بک‌گراند دلخواه
                    },
                }}
                border={true} subTitle={`(${matchSportField})`} title={matchType === 'casual' ? 'دوستانه' : "رسمی"}>

                <Box sx={{ position: 'relative', zIndex: 0 }}>
                    <Grid container sx={{ direction: "rtl" }}>
                        <Grid lg={5} xs={12} item sx={{ justifyContent: "right", alignItems: "right", pl: { sm: 0, lg: 7 } }}>
                            <TeamBox
                                rating={!rateHost ? 0 : rateHost}
                                logo={!logoHost ? DefaultLogo : logoHost}
                                title={hostTeamName}
                                color={"green"}
                            />
                        </Grid>
                        <Grid lg={7} xs={12} item>
                            <Stack sx={{
                                pt: 1, pr: { xl: 0, sm: 0, md: 0, xs: 0 }, textAlign: "right", width: "100%",
                                justifyContent: "right"
                            }}>
                                <Chip
                                    sx={{
                                        justifyContent: "right",
                                        background: "none",
                                        mr: 0,
                                        mt: 1,
                                        "& .MuiChip-label": {
                                            ml: 2,
                                            pr: 0,
                                            textAlign: "right"
                                        }
                                        , "& .MuiChip-icon ": {
                                            mb: "4px",

                                        }
                                    }}
                                    icon={<IconCalendar size={iconSize} />}
                                    size="small"
                                    label={<Typography fontSize={fontSize} sx={{ color: theme.palette.secondary.dark }}
                                        align={"right"}
                                        noWrap={false}>{`${dateMatch} `}</Typography>}
                                />
                                <Chip
                                    sx={{
                                        justifyContent: "right",
                                        background: "none",
                                        mr: 0,
                                        mt: 1,
                                        "& .MuiChip-label": {
                                            ml: 2,
                                            pr: 0,
                                            textAlign: "right"
                                        }
                                        , "& .MuiChip-icon ": {
                                            mb: "4px",

                                        }
                                    }}
                                    icon={<IconAlarm size={iconSize} />}
                                    size="small"
                                    label={<Typography className={"numfarsi-s1"} fontSize={fontSize}
                                        sx={{ color: theme.palette.secondary.dark }}
                                        align={"right"}
                                        noWrap={false}>{`${timeMatch}`}</Typography>}
                                />
                                <Chip
                                    sx={{
                                        justifyContent: "right",
                                        background: "none",
                                        mr: 0,
                                        mt: 1,
                                        "& .MuiChip-label": {
                                            ml: 0,
                                            pr: 0
                                        }
                                        , "& .MuiChip-icon ": {
                                            mb: "4px",

                                        }
                                    }}
                                    icon={<IconMapPin size={iconSize} />}
                                    size="small"
                                    label={<Typography fontSize={fontSize} sx={{ color: theme.palette.secondary.dark }}
                                        align={"right"} noWrap={false}>{location}</Typography>}
                                />
                            </Stack>
                        </Grid>

                    </Grid>
                </Box>

            </CardWrapper>


        </>
    );
};
export const MatchFullCardContent = (props) => {
    const {
        title,
        city,
        dateMatch,
        timeMatch,
        matchid,
        matchType,
        hostTeamName,
        guestTeamName,
        confirmRequest,
        logoHost,
        logoGuest,
        location,
        rateGuest,
        rateHost,
        viwer,
        createDate,
        requestNumber

    } = props
    const theme = useTheme();
    const Create_Date = createDateLetter(createDate)
    const CustomChip = ({ icon, label, color }) => (
        <Chip
            variant="filled"
            sx={{
                background: "none",
                color,
                mr: 0,
                "& .MuiChip-label": { ml: 0, pr: 0 },
                "& .MuiChip-icon": { mb: "4px", color },
            }}
            icon={icon}
            size="small"
            label={label}
        />
    );
    const actions =

        <Stack direction={"row"} spacing={1} divider={<Divider orientation="vertical" flexItem />}>

            {viwer && (


                <IconText text={viwer} textNumber={true} fontSize={10} icon={<IconEye
                    color={theme.palette.grey[400]} size={14} />} />

            )}
            {/*date of create match*/}

            <Typography
                component={'div'}

                fontSize={10}
                color={theme.palette.grey[400]}
                className="numfarsi-s1"
                sx={{ textAlign: "left", p: 1 }}
            >
                {createDateStr(Create_Date)}
            </Typography>

            <Box sx={{ p: 1 }}>
                {requestNumber > 0 ?
                    <Typography fontSize={10} color={theme.palette.secondary.main} >
                        <span className="numfarsi-s1" >{requestNumber}</span>{` درخواست`}
                    </Typography>
                    :

                    <Typography
                        fontSize={10}

                        sx={{ color: theme.palette.secondary.main }}
                    >بدون درخواست </Typography>
                }
            </Box>
            <Box>
                {confirmRequest === 'accepted' ?

                    <IconText
                        text_pt={0}
                        fontSize={12}
                        icon={<IconCheckbox color={theme.palette.success.main} size={14} />}
                        text="تایید شده"
                        color={theme.palette.success.main}
                    /> : ""
                }
            </Box>

            {/*confirmRequest !== "accepted" && confirmRequest !== "-1" && (
                        <CustomChip
                            label="در انتظار تایید"
                            color={theme.palette.grey[400]}
                        />
                    )*/}


        </Stack>


    return (<>
        <CardWrapper actions={actions} contentSX={{ p: 1 }} headerSX={headerSx}
            sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    //  backgroundColor: theme.palette.grey[50], // بک‌گراند دلخواه
                },
                mt:0.8
            }}
            border={true} title={matchType === "casual" ? "دوستانه" : "رسمی"}>
            <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={4}>
                    <TeamBox
                        rating={!rateHost ? 0 : rateHost}
                        logo={!logoHost ? DefaultLogo : logoHost}
                        title={hostTeamName}
                        color={"green"}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Stack>
                        <Divider>
                            <Chip sx={{ color: theme.palette.success.main, background: "none" }} label="VS" />
                        </Divider>
                        <Stack

                            align="center"
                            component="div"

                        >
                            <Box>
                                {dateMatch ? <Chip
                                    sx={{ background: 'none' }}
                                    // icon={<IconCalendar />}
                                    size="small"
                                    label={<Typography fontFamily={"numberfarsi"} fontSize={12} >{`${dateMatch}-${timeMatch} `}</Typography>}
                                /> : ""}
                            </Box>
                            <Box>
                            {location ? <Chip
                                sx={{ background: 'none' }}
                                // icon={<IconMapPin size={20} />}
                                size="small"
                                label={<Typography fontSize={12}>{location}</Typography>}
                            /> : ""}
                            </Box>
                        </Stack>
                    </Stack>{" "}
                </Grid>
                <Grid item xs={4}>
                    <TeamBox
                        rating={!rateGuest ? 0 : rateGuest}
                        logo={!logoGuest ? DefaultLogo : logoGuest}
                        title={guestTeamName ? guestTeamName : "تعیین نشده"}
                        color={"red"}
                    />
                </Grid>
            </Grid>
        </CardWrapper>
    </>)
}
export const MYMatchFullCardContent = (props) => {
    const {
        title,
        city,
        dateMatch,
        timeMatch,
        matchid,
        matchType,
        hostTeamName,
        guestTeamName,
        confirmRequest,
        logoHost,
        logoGuest,
        location,
        rateGuest,
        rateHost,
        viwer,
        createDate,
        requestNumber

    } = props
    const theme = useTheme();
    const Create_Date = createDateLetter(createDate)
    const CustomChip = ({ icon, label, color }) => (
        <Chip
            variant="filled"
            sx={{
                background: "none",
                color,
                mr: 0,
                "& .MuiChip-label": { ml: 0, pr: 0 },
                "& .MuiChip-icon": { mb: "4px", color },
            }}
            icon={icon}
            size="small"
            label={label}
        />
    );
    const actions =

        <Stack direction={"row"} spacing={1} divider={<Divider orientation="vertical" flexItem />}>

            {viwer && (


                <IconText text={viwer} textNumber={true} fontSize={10} icon={<IconEye
                    color={theme.palette.grey[400]} size={14} />} />

            )}
            {/*date of create match*/}

            <Typography
                component={'div'}

                fontSize={10}
                color={theme.palette.grey[400]}
                className="numfarsi-s1"
                sx={{ textAlign: "left", p: 1 }}
            >
                {createDateStr(Create_Date)}
            </Typography>

            <Box sx={{ p: 1 }}>
                {requestNumber > 0 ?
                    <Typography fontSize={10} color={theme.palette.secondary.main} >
                        <span className="numfarsi-s1" >{requestNumber}</span>{` درخواست`}
                    </Typography>
                    :

                    <Typography
                        fontSize={10}

                        sx={{ color: theme.palette.secondary.main }}
                    >بدون درخواست </Typography>
                }
            </Box>
            <Box>
                {confirmRequest === 'accepted' ?

                    <IconText
                        text_pt={0}
                        fontSize={12}
                        icon={<IconCheckbox color={theme.palette.success.main} size={14} />}
                        text="تایید شده"
                        color={theme.palette.success.main}
                    /> : ""
                }
            </Box>

            {/*confirmRequest !== "accepted" && confirmRequest !== "-1" && (
                        <CustomChip
                            label="در انتظار تایید"
                            color={theme.palette.grey[400]}
                        />
                    )*/}


        </Stack>


    return (<>
        <CardWrapper actions={actions} contentSX={{ p: 1 }} headerSX={headerSx}
            sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    //  backgroundColor: theme.palette.grey[50], // بک‌گراند دلخواه
                },
            }}
            border={true} title={matchType === "casual" ? "دوستانه" : "رسمی"}>
            <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={4}>
                    <TeamBox
                        rating={!rateHost ? 0 : rateHost}
                        logo={!logoHost ? DefaultLogo : logoHost}
                        title={hostTeamName}
                        color={"green"}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Stack>
                        <Divider>
                            <Chip sx={{ color: theme.palette.success.main, background: "none" }} label="VS" />
                        </Divider>
                        <Box

                            align="center"
                            component="div"

                        >
                            {dateMatch ? <Chip
                                sx={{ background: 'none' }}
                                // icon={<IconCalendar />}
                                size="small"
                                label={<Typography fontFamily={"numberfarsi"} fontSize={12} >{`${dateMatch}-${timeMatch} `}</Typography>}
                            /> : ""}
                            {location ? <Chip
                                sx={{ background: 'none' }}
                                // icon={<IconMapPin size={20} />}
                                size="small"
                                label={<Typography fontSize={12}>{location}</Typography>}
                            /> : ""}
                        </Box>
                    </Stack>{" "}
                </Grid>
                <Grid item xs={4}>
                    <TeamBox
                        rating={!rateGuest ? 0 : rateGuest}
                        logo={!logoGuest ? DefaultLogo : logoGuest}
                        title={guestTeamName ? guestTeamName : "تعیین نشده"}
                        color={"red"}
                    />
                </Grid>
            </Grid>
        </CardWrapper>
    </>)
}


