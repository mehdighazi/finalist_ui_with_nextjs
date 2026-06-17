'use client'
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//ui-material
import {
  Toolbar, AppBar, Tabs, Tab, Paper, Box, Typography, Divider, FormControl, InputLabel,
  ListItemIcon, Select, MenuItem, ListItemText, ListItemAvatar, useTheme
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person'
import { styled } from '@mui/material/styles';
//tabler icon
import {
  IconUser, IconUserCheck, IconCircleCheckFilled, IconX

} from "@tabler/icons-react";
//project import
import MyMatchList from "./myMatchsList";
import IconText from '@/components/ui-component/utilities/IconText'
import { hostAddress } from "@/components/api/api";
import dataHandler from '@/components/api/dataHandler';
import CustomAvatar from "@/components/ui-component/extended/Avatar";
import NotFoundPlaceHolder from '@/components/ui-component/NotFound'
import api from '@/components/api/api';
//-----------------------------------| List Box |---------------------------------------
function IconSelectBox({ onChange }) {
  const [value, setValue] = React.useState('');
  const [teams, setTeams] = React.useState(null)
  const theme = useTheme();
  const IconColor = theme.palette.grey[400];
  const TextColor = theme.palette.grey[600];
  //-----------------------| Data Handler |------------------------------------
  const getData = () => {
    const result = dataHandler(api.listUserTeam(), "get", "");

    try {
      result(async function (data, status) {
        setTeams(data.result)
      })
    } catch (error) {
      //  console.log(error)
    }
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  };


  const selectedOption = teams && teams.find((opt) => opt.team_id === Number(value));

  React.useEffect(() => {
    getData();

  }, [])
  React.useEffect(() => {

    onChange(selectedOption && selectedOption.team_id)

  }, [selectedOption])
  return (
    <Box sx={{ p: 1, direction: 'rtl', }}>
      <Typography textAlign={'right'} fontWeight={500} mt={0}>
        <IconText text_pt={0.6} fontSize={12} text={"انتخاب تیم"} color={TextColor} icon={<IconUser color={IconColor} />} />
      </Typography>




      <FormControl fullWidth>

        <Select
          labelId="icon-select-label"
          id="icon-select"
          value={value}

          onChange={handleChange}
          renderValue={() =>
            selectedOption ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {selectedOption.icon}
                <span style={{ fontSize: '0.775rem' }}>{selectedOption.team_name}</span>
              </Box>
            ) : 'انتخاب کنید'
          }
        >
          {teams && teams.map((option) => (
            <MenuItem key={option.team_id} value={option.team_id}>
              <ListItemAvatar>
                <CustomAvatar
                  src={
                    option?.logo?.logo_path
                      ? `${hostAddress}/${option.logo.logo_path}`
                      : undefined
                  }
                >
                  {!option?.logo?.logo_path && option?.team_name?.[0]}
                </CustomAvatar>
              </ListItemAvatar>

              <ListItemText sx={{ fontSize: '0.775rem' }} primary={option.team_name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    </Box>
  );
}
//-----------------------------------------------------------------------
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const Index = () => {
  const [value, setValue] = React.useState(0);
  const [teamId, setTeamId] = React.useState(null)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <IconSelectBox onChange={(e) => setTeamId(e)} />

      <AppBar position="static" sx={{
        backgroundColor: 'transparent',
        boxShadow: 0,
        direction: "rtl",
        width: "100%",
        fontSize: 12,
        p: 0,
        borderRadius: 2,
        background: "none"
      }} elevation={1}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>

          <Tabs variant="fullWidth" indicatorColor="secondary" value={value} onChange={handleChange} textColor="primary">
            <Tab sx={{ fontSize: 12 }} label={<span>میزبان</span>} />
            <Tab sx={{ fontSize: 12 }} label={<span>میهمان</span>} />
            <Tab sx={{ fontSize: 12 }} label={<span>تاریخچه</span>} />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Divider />
      <TabPanel value={value} index={0}>
        {<MyMatchList teamId={teamId} hostCheck={true} />}
      </TabPanel>
      <TabPanel value={value} index={1}>
       {/**<MyMatchList teamId={teamId} hostCheck={false} /> */} 
      </TabPanel>
      <TabPanel value={value} index={2}>
        <NotFoundPlaceHolder />
      </TabPanel>
    </>
  );
}
export default Index