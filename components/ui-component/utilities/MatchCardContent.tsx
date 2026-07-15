import * as React from "react";
import { ReactNode } from "react";
import Avatar from "@/components/ui-component/extended/Avatar";
import {
  Box,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  useTheme,
  styled,
  Theme, // ✅ اضافه شد
} from "@mui/material";
import { SxProps } from "@mui/material/styles"; // ✅ اضافه شد

import DefaultLogo from "@/components/assets/images/screen/defaultlogo.png";
import { createDateLetter, createDateStr } from "@/components/utils/Lib";
import MainCard from "@/components/ui-component/cards/MainCard";
import IconText from "./IconText";
import CustomRating from "@/components/ui-component/rating";

import {
  IconAlarm,
  IconCalendar,
  IconCheckbox,
  IconEye,
  IconMapPin,
  IconCircleFilled,
  IconStar
} from "@tabler/icons-react";
///--------------project import
import colors from "@/components/assets/colors/themeColors";
//------------------------------------
interface TeamBoxProps {
  title: string;
  logo?: string;
  rating?: number;
  AvatarSize?: "xs" | "sm" | "md" | "lg";
}

interface MatchBaseProps {
  matchType: "casual" | "official";
  hostTeamName: string;
  guestTeamName?: string;
  matchSportField?: string;
  logoHost?: string;
  logoGuest?: string;
  rateHost?: number;
  rateGuest?: number;
  dateMatch?: string;
  timeMatch?: string;
  location?: string;
  user_team_role?: string;
  createDate?: string;
  viwer?: number;
  requestNumber?: number;
  confirmRequest?: "accepted" | "pending" | "-1";
}
//------------------------------------------------


export const headerSx = (theme: any) => ({
  p: 1,
  textAlign: "right",
  "& .MuiCardHeader-title": {
    fontSize: "14px!important",
    color: theme.palette.primary.dark,
  },
});
//---------------------------------------------------
export const TeamBox: React.FC<TeamBoxProps> = ({
  title,
  logo,
  rating = 0,
  AvatarSize = "sm",
}) => {
  return (
    <Box sx={{ p: 1, display: "flex", justifyContent: "center" }}>
      <Stack alignItems="center" spacing={0.5}>
        <Avatar size={AvatarSize} src={logo || DefaultLogo} />
        <Typography fontSize={12}>{title}</Typography>
        <CustomRating
          rate={rating}
        // size="small"
        //  readOnly
        //  sx={{ "& .MuiRating-icon": { fontSize: 16 } }}
        />
      </Stack>
    </Box>
  );
};
//---------------------------------------------------
const MatchActions: React.FC<{
  viwer?: number;
  createDate?: string;
  requestNumber?: number;
  confirmRequest?: string;
}> = ({ viwer, createDate, requestNumber, confirmRequest }) => {
  //const theme = useTheme();
  const date = createDate ? createDateStr(createDateLetter(createDate)) : "";

  return (
    <Stack direction="row" spacing={1} divider={<Divider flexItem />}>
      {viwer && (
        <IconText

          icon={<IconEye size={14} color={colors.primary100} />}
          text={viwer}
          textNumber
          fontSize={10}
        />
      )}

      {date && (
        <Typography component={"div"} sx={{ pt: 0.5 }} fontSize={10} color={colors.primary100}>
          {date}
        </Typography>
      )}

      {requestNumber !== undefined && (

        <Typography fontSize={10} color={"#e2e2e2"}>
          {requestNumber > 0
            ? `${requestNumber} درخواست`
            : "بدون درخواست"}
        </Typography>

      )}

      {confirmRequest === "accepted" && (
        <IconText
          icon={<IconCheckbox size={14} color={""} />}
          text="تایید شده"
          fontSize={10}
          color={""}
        />
      )}
    </Stack>
  );
};
//---------------------------------------------------
export const MatchFullCardContent: React.FC<MatchBaseProps> = (props) => {
  const theme = useTheme();

  // بررسی وضعیت‌ها برای متمایز کردن تیم کاربر
  const isUserHost = props.user_team_role === "host" || props.user_team_role === "both";
  const isUserGuest = props.user_team_role === "guest" || props.user_team_role === "both";
console.log(props.user_team_role)
  return (
    <MainCard
      actions={<MatchActions {...props} />}
      contentSX={{ p: 1 }}
      border
      title={props.matchType === "casual" ? "دوستانه" : "رسمی"}
      sx={{
        transition: "0.3s",
        "&:hover": { transform: "translateY(-5px)", textDecoration: "none" },
      }}
    >
      <Grid container alignItems="center" spacing={1}>

        {/* بخش تیم میزبان */}
        <Grid item xs={4}>
          <Stack
            alignItems="center"
            spacing={1}
            sx={{
              p: 1,
              borderRadius: 2,
              // اگر تیم کاربر میزبان بود، یک بوردر ظریف متمایز و پس‌زمینه بسیار لایت می‌گیرد
             // border: isUserHost ? `1px dashed ${theme.palette.secondary.main}` : "1px solid transparent",
              backgroundColor: isUserHost ? `${theme.palette.secondary.light}10` : "transparent", // اضافه کردن آلفا (شفافیت) به رنگ لایت
            }}
          >
            <Chip
              label="میزبان"
              size="small"
              sx={{
                height: 20,
                fontSize: 10,
                alignSelf: "center",
                // اگر تیم کاربر بود، رنگ تم ثانویه؛ در غیر این صورت رنگ خاکستری ملایم
                backgroundColor: isUserHost ? theme.palette.secondary.main : theme.palette.action.selected,
                color: isUserHost ? theme.palette.secondary.contrastText : theme.palette.text.secondary,
               // border: isUserHost ? "none" : `1px solid ${theme.palette.divider}`,
                fontWeight: isUserHost ? "bold" : "normal"
              }}
            />
            <TeamBox
              title={props.hostTeamName}
              logo={props.logoHost}
              rating={props.rateHost}
            />
          </Stack>
        </Grid>

        {/* بخش وسط کارت (اطلاعات بازی) */}
        <Grid item xs={4}>
          <Stack alignItems="center">
            <Divider sx={{ width: "100%" }}>
              <Chip label="VS" sx={{ background: "none" }} />
            </Divider>

            {props.dateMatch && (
              <Chip
                sx={{ background: "none" }}
                label={`${props.dateMatch} - ${props.timeMatch}`}
              />
            )}

            {props.location && (
              <Chip
                icon={<IconMapPin size={16} />}
                sx={{
                  background: "none",
                  "& .MuiChip-label": {
                    paddingLeft: "4px",
                  },
                  "& .MuiChip-icon": {
                    marginRight: "0",
                    marginLeft: "-10px",
                  },
                }}
                label={props.location}
              />
            )}
          </Stack>
        </Grid>

        {/* بخش تیم میهمان */}
        <Grid item xs={4}>
          <Stack
            alignItems="center"
            spacing={1}
            sx={{
              p: 1,
              borderRadius: 2,
              // اگر تیم کاربر میهمان بود، متمایز می‌شود
             // border: isUserGuest ? `1px dashed ${theme.palette.secondary.main}` : "1px solid transparent",
              backgroundColor: isUserGuest ? `${theme.palette.secondary.light}10` : "transparent",
            }}
          >
            <Chip
              label="میهمان"
              size="small"
              variant={isUserGuest ? "filled" : "outlined"}
              color={isUserGuest ? "secondary" : "default"}
              sx={{ height: 20, fontSize: 10, alignSelf: "center" }}
            />
            <TeamBox
              title={props.guestTeamName || "تعیین نشده"}
              logo={props.logoGuest}
              rating={props.rateGuest}
            />
          </Stack>
        </Grid>

      </Grid>
    </MainCard>
  );
};
//---------------------------------------------------
export const WaitingOpponentCard: React.FC<MatchBaseProps> = (props) => {
 
  return (

    <MainCard
      border
      actions={<MatchActions {...props} />}
      contentSX={{ p: 2 }}
      sx={{
        transition: '0.3s',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
        }
      }}
    >
      <Stack spacing={2}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Chip
            size="small"
            color={props.matchType === 'casual' ? 'primary' : 'error'}
            label={props.matchType === 'casual' ? 'دوستانه' : 'رسمی'}
          />

          <Chip
            size="small"
            color="warning"
            label= {props.matchSportField || "نامشخص"}
          />
        </Stack>

        {/* Team Logo */}
        <Stack alignItems="center" spacing={1}>
          <Avatar
            src={props.logoHost}
            sx={{
              width: 80,
              height: 80
            }}
          />

          <Typography variant="h6">
            <span>{props.hostTeamName}</span>
          </Typography>


        </Stack>

        <Divider />

        {/* Match Info */}
        <Stack spacing={1}>
          {props.dateMatch && (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <IconCalendar size={18} />
              <Typography variant="body2">
                <span>
                  {props.dateMatch} - {props.timeMatch}
                </span>
              </Typography>
            </Stack>
          )}

          {props.location && (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <IconMapPin size={18} />
              <Typography variant="body2">
                <span>{props.location}</span>
              </Typography>
            </Stack>
          )}

          {props.rateHost && (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <IconStar size={18} />
              <Typography variant="body2">
                <span>امتیاز تیم: {props.rateHost}</span>
              </Typography>
            </Stack>
          )}
        </Stack>
      </Stack>
    </MainCard>
  );
};

// ============== تایپ‌های محلی ==============
interface MatchItemRowProps {
  title: string;
  value: string | number;
  index: number;
}

interface MatchDetailCardContentProps {
  title?: string;
  city?: string;
  province?: string;
  dateMatch?: string;
  timeMatch?: string;
  matchid?: string | number;
  matchId?: string | number;
  hostTeamName?: string;
  guestTeam?: string;
  logoHost?: string;
  logoGuest?: string;
  location?: string;
  rateGuest?: number;
  rateHost?: number;
  type?: string;
  createDate?: string;
  description?: string;
  matchSport?: string;
}

// ============== توابع کمکی ==============
// این توابع را بر اساس منطق واقعی خودتان پیاده‌سازی کنید




