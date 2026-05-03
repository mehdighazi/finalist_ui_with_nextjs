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
} from "@mui/material";

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
  matchSportField?:string;
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
      <Stack alignItems="center">
        <Avatar size={AvatarSize} src={logo || DefaultLogo} />
        <Typography fontSize={12}>{title}</Typography>
        <CustomRating
          value={rating}
          size="small"
          readOnly
          sx={{ "& .MuiRating-icon": { fontSize: 16 } }}
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
        <Typography fontSize={10}  color={colors.primary100}>
          {date}
        </Typography>
      )}

      {requestNumber !== undefined && (
        <Typography fontSize={10}  color={"#e2e2e2"}>
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
                sx={{ background: "none" }}
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

