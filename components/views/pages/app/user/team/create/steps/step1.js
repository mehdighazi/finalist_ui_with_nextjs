import * as React from "react";
//ui-material
import { Box, Paper, Stack, Typography, useTheme,Divider } from "@mui/material";
import { AccessTime, Festival, PlaylistAddCircle } from "@mui/icons-material";
//table icon
import { IconX, IconCircleCheckFilled, IconMapPin, IconUsersGroup, IconId, IconCategory } from '@tabler/icons-react'
//project import
import "../style.css"
import { styled } from "@mui/material/styles";
import CustomLoadingButton from '@/components/ui-component/utilities/CustomLoadingButton'
import IconText from '@/components/ui-component/utilities/IconText'
//--------------------------------------|Step 1|---------------------------------------------------


const Step__ = (props) => {

  const theme = useTheme();
  return (<>
    <Box sx={{ minWidth: "100%" }}>
      {formData ?
        <CustomBox>

          <Stack sx={{ minWidth: "100%", mt: 2 }} spacing={1}>
            <Stack direction="row" spacing={1} sx={{ direction: "rtl" }}>
              <PlaylistAddCircle color={"secondary"} />
              <Typography
                variant={"h6"} sx={{ pt: 0.5 }}
              >
                نام تیم
              </Typography>
            </Stack>

            <Typography variant={"h4"} sx={{ direction: "rtl", fontWeight: 500 }} color={"primary"}>
              {formData["team_name"]}
            </Typography>
            <Typography variant={"h4"} sx={{ direction: "rtl", fontWeight: 500 }} color={"primary"}>
              {formData["team_identifier"]}
            </Typography>

           <Divider/>
            <Stack direction="row" spacing={1} sx={{ direction: "rtl" }}>
              <AccessTime color={"secondary"} fontSize="small" />
              <Typography
                variant={"h6"} align='right' sx={{ pt: 0.0 }}
              >
                فلید ورزشی
              </Typography>
            </Stack>
            <Typography sx={{ direction: "ltr", fontWeight: 500 }} variant={"h4"} color={"primary"}>
              {formData["sport_field_title"]}
            </Typography>
            <Divider/>
            <Stack direction="row" spacing={1} sx={{ direction: "rtl" }}>
              <Festival color={"secondary"} />
              <Typography
                variant={"h6"} align='right' sx={{ pt: 0.5 }}
              >
                استان/شهر
              </Typography>


            </Stack>
            <Typography sx={{ direction: "ltr", fontWeight: 500 }} variant={"h4"} color={"primary"}>
              {`${formData["province_title"]}/${formData["city_title"]}`}
            </Typography>

          </Stack>

        </CustomBox> :
        <h4>چیزی اینجا نیست!</h4>
      }
    </Box>
  </>)
}

const CustomBox = styled(Paper)(({ theme }) => ({
  minWidth: "100%",
  marginTop: 1,
  padding: 10,
 // background: theme.palette.grey[100],
  marginBottom: 40
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


const Step1 = ({ formData, teamLocation, selectedTeam }) => {
  const theme = useTheme();
  const IconColor = theme.palette.grey[400];
  const TextColor = theme.palette.grey[600];
  //const dispatch = useDispatch();
  if (!formData) {
    return <Typography variant="h5">چیزی اینجا نیست!</Typography>;
  }

  return (

    <CustomBox>
      <Stack spacing={3}>




        {/* نام تیم */}
        <SectionBox>
          <Typography variant="h5" color="primary" textAlign={'right'} fontWeight={500} mt={0}>
            <IconText fontSize={12} text_pt={0.6} text={"نام تیم "} color={TextColor} icon={<IconUsersGroup color={IconColor} />} />

          </Typography>
          <Typography variant="h5" color="primary" fontWeight={500} mt={1}>
            {formData["team_name"]}
          </Typography>
        </SectionBox>

        {/* شناسه تیم */}
        <SectionBox>
          <Typography textAlign={'right'} fontWeight={500} mt={0}>
            <IconText text_pt={0.6} fontSize={12} text={"نام کاربری"} color={TextColor} icon={<IconId color={IconColor} />} />
          </Typography>
          <Typography fontSize={16} color="primary" fontWeight={500} mt={1}>
            {formData["team_identifier"]}
          </Typography>
        </SectionBox>

        {/* استان شهر */}
        <SectionBox>
          <Typography variant="h5" color="primary" textAlign={'right'} fontWeight={500} mt={0}>
            <IconText text_pt={0.6} fontSize={12} text={" استان/شهر"} color={TextColor} icon={<IconMapPin color={IconColor} />} />
          </Typography>
          <Typography fontSize={14} color="primary" textAlign={'left'} fontWeight={500} mt={1}>
            {`${formData["province_title"]}/${formData["city_title"]}`}

          </Typography>
        </SectionBox>
        <SectionBox>
          <Typography variant="h5" color="primary" textAlign={'right'} fontWeight={500} mt={0}>
            <IconText text_pt={0.6} fontSize={12} text={" رشته ورزشی"} color={TextColor} icon={<IconCategory color={IconColor} />} />
          </Typography>
          <Typography fontSize={14} color="primary" textAlign={'left'} fontWeight={500} mt={1}>
            {formData["sport_field_title"]}

          </Typography>
        </SectionBox>
        <SectionBox>
          <Typography variant="h5" color="primary" textAlign={'right'} fontWeight={500} mt={0}>
            <IconText text_pt={0.6} fontSize={12} text={" جنسیت تیم "} color={TextColor} icon={<IconCategory color={IconColor} />} />
          </Typography>
          <Typography fontSize={14} color="primary" textAlign={'left'} fontWeight={500} mt={1}>
            {formData["is_womens"] ? "بانوان" : "آقایان"}

          </Typography>
        </SectionBox>

      </Stack>
    </CustomBox>

  );
};
export default Step1