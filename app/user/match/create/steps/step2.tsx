import * as React from "react";
import { useDispatch } from "react-redux";

import { Box, Paper, Stack, Typography, useTheme, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AccessTime, CalendarMonth, PinDrop, Comment } from "@mui/icons-material";
import { hostAddress } from "@/components/api/api";
import { TeamBox } from "@/components/ui-component/utilities/MatchCardContent";
import { MainCardWrapper } from "@/components/ui-component/cards/MainCardWrapper";
import IconText from "@/components/ui-component/utilities/IconText";

// Type definitions
interface FormData {
    match_time: string | null;
    match_date: string | null;
    match_local_date: string | null;
    host_team_id: number | string | null;
    match_province_id: number | string | null;
    match_city_id: number | string | null;
    description: string | null;
    match_location_address: string | null;
    match_type: number;
}

interface Team {
  team_name: string;
  logo?: {
    logo_path: string;
  };
}

interface Step2Props {
  formData: FormData | null;
  teamLocation: string;
  selectedTeam: Team | null;
}

// Styled component
const CustomBox = styled(Paper)(({ theme }) => ({
  minWidth: "100%",
  marginTop: 0,
  padding: 10,
  marginBottom: 40
}));

// SectionBox component with proper typing
interface SectionBoxProps {
  children: React.ReactNode;
}

const SectionBox: React.FC<SectionBoxProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "stretch",
        backgroundColor: theme.palette.grey[100],
        borderRadius: 1,
        boxShadow: theme.shadows[1],
        overflow: "hidden",
        mt: 2
      }}
    >
      {/* Vertical colored bar */}
      <Box
        sx={{
          width: "5px",
          background: theme.palette.primary.main
        }}
      />

      {/* Main content */}
      <Box sx={{ flex: 1, p: 2, textAlign: "left" }}>
        {children}
      </Box>
    </Paper>
  );
};

const Step2: React.FC<Step2Props> = ({ formData, teamLocation, selectedTeam }) => {
  const theme = useTheme();
  const IconColor = theme.palette.grey[400];
  const TextColor = theme.palette.grey[600];

  if (!formData) {
    return <Typography variant="h5">چیزی اینجا نیست!</Typography>;
  }

  return (
    <CustomBox>
      <Stack sx={{ mb: 2 }} spacing={3}>
        {/* Team Section */}
        <MainCardWrapper border={false}>
          <TeamBox
            title={selectedTeam?.team_name ?? ""}
            logo={selectedTeam?.logo ? `${hostAddress}/${selectedTeam.logo.logo_path}` : ""}
          />
        </MainCardWrapper>

        {/* Date Section */}
        <SectionBox>
          <IconText
            textPaddingTop={0.5}
            fontSize={12}
            icon={<CalendarMonth sx={{ color: IconColor }} />}
            color={TextColor}
            text={"تاریخ برگزاری"}
          />
          <Typography variant="h6" color={TextColor} fontWeight={500} mt={1}>
            <span className="numfarsi-s1">{formData.match_local_date}</span>
         
            <span className="numfarsi-s1">{/*formData.match_local_date[0]*/}</span>
          </Typography>
        </SectionBox>

        {/* Time Section */}
        <SectionBox>
         
            <IconText
              fontSize={12}
              icon={<AccessTime sx={{ color: IconColor }} />}
              color={TextColor}
              text={"زمان برگزاری"}
            />
          
          <Typography variant="h6" color="primary" fontWeight={500} mt={1}>
            <span className="numfarsi-s1">{formData.match_time}</span>
          </Typography>
        </SectionBox>

        {/* Address Section */}
        <SectionBox>
         
            <IconText
              textPaddingTop={0.5}
              fontSize={12}
              icon={<PinDrop sx={{ color: IconColor }} />}
              color={TextColor}
              text={"آدرس محل برگزاری"}
            />
         
          <Typography variant="h6" color="primary" textAlign={'left'} fontWeight={500} mt={1}>
            <span className="numfarsi-s1">{`${teamLocation}/${formData.match_location_address}`}</span>
          </Typography>
        </SectionBox>

        {/* Description Section */}
        <SectionBox>
         
            <IconText
              textPaddingTop={0.5}
              fontSize={12}
              icon={<Comment sx={{ color: IconColor }} />}
              color={TextColor}
              text={"توضیحات"}
            />
         
          <Typography variant="h6" color="primary" textAlign={'left'} fontWeight={500} mt={1}>
            <span className="numfarsi-s1">{formData.description}</span>
          </Typography>
        </SectionBox>
      </Stack>
    </CustomBox>
  );
};

export default Step2;