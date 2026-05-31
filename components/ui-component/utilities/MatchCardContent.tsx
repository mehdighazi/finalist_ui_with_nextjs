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
        <Typography fontSize={10} color={colors.primary100}>
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
  //const theme = useTheme();

  return (
    <MainCard
      actions={<MatchActions {...props} />}
      //headerSX={headerSx(theme)}
      contentSX={{ p: 1 }}
      border
      title={props.matchType === "casual" ? "دوستانه" : "رسمی"}
      sx={{
        transition: "0.3s",
        "&:hover": { transform: "translateY(-5px)" },
      }}
    >
      <Grid container alignItems="center">
        <Grid item xs={4}>
          <TeamBox
            title={props.hostTeamName}
            logo={props.logoHost}
            rating={props.rateHost}
          />
        </Grid>

        <Grid item xs={4}>
          <Stack alignItems="center">
            <Divider>
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
                  // هدف قرار دادن ظرف متن (Label)
                  "& .MuiChip-label": {
                    paddingLeft: "4px", // کم کردن فاصله از سمت آیکون (در حالت LTR)
                    // اگر پروژه کاملاً RTL است، از paddingRight استفاده کن
                  },
                  // هدف قرار دادن خود آیکون
                  "& .MuiChip-icon": {
                    marginRight: "0", // نزدیک‌تر کردن آیکون به متن
                    marginLeft: "-10px",   // حذف فاصله اضافی سمت چپ آیکون
                  },
                }}
                label={props.location}
              />
            )}
          </Stack>
        </Grid>

        <Grid item xs={4}>
          <TeamBox
            title={props.guestTeamName || "تعیین نشده"}
            logo={props.logoGuest}
            rating={props.rateGuest}
          />
        </Grid>
      </Grid>
    </MainCard>
  );
};
//---------------------------------------------------


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




