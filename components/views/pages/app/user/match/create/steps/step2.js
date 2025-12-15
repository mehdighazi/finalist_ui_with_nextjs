import * as React from "react";
import { useDispatch } from "react-redux";

import { Box, Paper, Stack, Typography, useTheme, Button } from "@mui/material";

import { styled } from "@mui/material/styles";
import { AccessTime, CalendarMonth, PinDrop,Comment } from "@mui/icons-material";
import { hostAddress } from "api/api";
import { TeamBox } from "views/utilities/MatchCardContent";
import { MainCardWrapper } from "ui-component/cards/MainCardWrapper";
import MainCard from "ui-component/cards/MainCard_pre";
import IconText from "views/utilities/IconText";
import "../style.css";



const CustomBox = styled(Paper)(({ theme }) => ({
  minWidth: "100%",
  marginTop: 0,
  padding: 10,
 // background: theme.palette.grey[50],
 marginBottom:40
}));

// حالا این SectionBox درست شده
const SectionBox = ({ children }) => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "stretch", // نوار کل ارتفاع محتوا رو بگیره
        backgroundColor: theme.palette.grey[100],
        borderRadius: 2,
        boxShadow: theme.shadows[0.5],
        overflow: "hidden", // نوار قشنگ بچسبه
        mt: 2
      }}
    >
      {/* نوار عمودی رنگی */}
      <Box
        sx={{
          width: "5px",
          background: theme.palette.orange.main
        }}
      />

      {/* محتوای اصلی */}
      <Box sx={{ flex: 1, p: 2, textAlign: "left" }}>
        {children}
      </Box>
    </Paper>
  );
};

const Step2 = ({ formData, teamLocation, selectedTeam }) => {
  const theme = useTheme();
  const IconColor = theme.palette.grey[400];
  const TextColor = theme.palette.grey[600];

  if (!formData) {
    return <Typography variant="h5">چیزی اینجا نیست!</Typography>;
  }

  return (
    
      <CustomBox>
        <Stack sx={{mb:2}} spacing={3}>

          {/* تیم */}
          <MainCardWrapper border={false}>
            <TeamBox
             title={selectedTeam?selectedTeam.team_name:""}
              logo={selectedTeam&&selectedTeam.logo ? `${hostAddress}/${selectedTeam.logo.logo_path}` : ""}
            />
          </MainCardWrapper>

          {/* تاریخ */}
          <SectionBox>
            <Typography variant="h5" color="primary" textAlign={'right'} fontWeight={500} mt={0}>
              <IconText
                text_pt={0.5}
                fontSize={12}
                icon={<CalendarMonth sx={{ color: IconColor }} />}
                color={TextColor}
                text={"تاریخ برگزاری"}
              />
            </Typography>
            <Typography variant="h6"  color={TextColor} fontWeight={500} mt={1}>
              <span className="numfarsi-s1">{formData.match_local_date[1]}</span>
              {" - "}
              <span className="numfarsi-s1">{formData.match_local_date[0]}</span>
            </Typography>
          </SectionBox>

          {/* زمان */}
          <SectionBox>
            <Typography textAlign={'right'} fontWeight={500} mt={0}>
              <IconText
                fontSize={12}
                icon={<AccessTime sx={{ color: IconColor }} />}
                color={TextColor}
                text={"زمان برگزاری"}
              />
            </Typography>
            <Typography variant="h6" color="primary" fontWeight={500} mt={1}>
              <span className="numfarsi-s1">{formData.match_time}</span>
            </Typography>
          </SectionBox>

          {/* آدرس */}
          <SectionBox>
            <Typography variant="h6" color="primary" textAlign={'right'} fontWeight={500} mt={0}>
              <IconText
                text_pt={0.5}
                fontSize={12}
                icon={<PinDrop sx={{ color: IconColor }} />}
                color={TextColor}
                text={"آدرس محل برگزاری"}
              />
            </Typography>
            <Typography variant="h6" color="primary" textAlign={'left'} fontWeight={500} mt={1}>
             <span className="numfarsi-s1">{`${teamLocation}/${formData.match_location_address}`}</span> 

            </Typography>
          </SectionBox>
          <SectionBox>
            <Typography variant="h6" color="primary" textAlign={'right'} fontWeight={500} mt={0}>
              <IconText
                text_pt={0.5}
                fontSize={12}
                icon={<Comment sx={{ color: IconColor }} />}
                color={TextColor}
                text={"توضیحات"}
              />
            </Typography>
            <Typography variant="h6" color="primary" textAlign={'left'} fontWeight={500} mt={1}>
             <span className="numfarsi-s1">{formData.description}</span>  

            </Typography>
          </SectionBox>

        </Stack>
      </CustomBox>
    
  );
};

export default Step2;
