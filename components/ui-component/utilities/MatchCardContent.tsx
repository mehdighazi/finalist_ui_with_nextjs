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


export const MatchDetailCardContent: React.FC<MatchDetailCardContentProps> = (props) => {
  const {
    title,
    city,
    province,
    dateMatch = '',
    timeMatch = '',
    matchid,
    hostTeamName = '',
    guestTeam,
    logoHost,
    logoGuest,
    location = '',
    rateGuest = 0,
    rateHost = 0,
    type = 'دوستانه',
    createDate = new Date().toString(),
    description = '',
    matchSport = '',
    matchId,
  } = props;
const createDateLetter = (date: string): Date => {
  return new Date(date);
};

const createDateStr = (date: Date): string => {
  return date.toLocaleDateString('fa-IR');
};

const headerSx = (theme: Theme, size: string): SxProps<Theme> => ({
  p: size === 'lg' ? 2 : 1,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  borderRadius: '8px 8px 0 0',
});

//const DefaultLogo = '/images/default-team-logo.png';

// ============== کامپوننت‌ها ==============
const MatchItemRow: React.FC<MatchItemRowProps> = ({ title, value, index }) => {
  return (
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
      <Typography fontWeight={400} fontSize="0.85rem" component="span">
        {title}:
      </Typography>
      <ListItemText
        sx={{ 
          textAlign: "left", 
          "& .MuiTypography-root": { fontSize: "0.80rem" } 
        }}
        primary={value}
      />
    </ListItem>
  );
};
  const theme = useTheme();
  const Create_Date = createDateLetter(createDate);
  
  // استفاده از matchId یا matchid هر کدام که موجود باشد
  const finalMatchId = matchId || matchid || '';

  const items = [
    { title: "تاریخ ایجاد", value: createDateStr(Create_Date) },
    { title: "نوع مسابقه", value: type },
    { title: "تاریخ مسابقه", value: dateMatch },
    { title: "ساعت مسابقه", value: timeMatch },
    { title: "استان شهر", value: `${province || ''}/${city || ''}` },
    { title: "آدرس محل برگزاری", value: location }
  ];

  return (
    <MainCard
      actions={false}
      contentSX={{ p: 1 }}
      headerSX={headerSx(theme, 'lg')}
      border={true}
      title={
        <Stack>
          <Typography fontSize={18} fontWeight={600} textAlign="center" variant="caption">
            جزئیات مسابقه
          </Typography>
          <Typography fontSize={12} textAlign="center" color={theme.palette.primary.light}>
            {`(${matchSport})`}
          </Typography>
          <Typography fontSize={12} textAlign="center" color={theme.palette.primary.light}>
            {`${finalMatchId}#`}
          </Typography>
        </Stack>
      }
    >
      <Grid container alignItems="center" justifyContent="center" sx={{ p: 3 }}>
        <Grid item xs={12}>
          <TeamBox
            rating={rateHost}
            logo={logoHost}
            title={hostTeamName}
           // color="green"
            AvatarSize="md"
          />
        </Grid>
        
        <Grid item xs={12}>
          <List sx={{ width: "100%", bgcolor: "background.paper", borderRadius: 2 }}>
            {items.map((item, index) => (
              <MatchItemRow 
                key={index} 
                title={item.title} 
                value={item.value} 
                index={index} 
              />
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
              {description || 'توضیحاتی وجود ندارد'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </MainCard>
  );
};


