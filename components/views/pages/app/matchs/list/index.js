import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

//ui-material
import {
  Button,
  Box,
  Divider,
  Grid,
  Link,
  Stack,
  useTheme,
  IconButton,
  Typography,
  TextField
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
//table icon
import { IconMapPin } from "@tabler/icons-react";
//project import
import SearchBar from "ui-component/SearchBar";
import Transition from "ui-component/extended/Transitions";
import CustomLoadingButton from "views/utilities/CustomLoadingButton";
import { MatchListCardContent } from "views/utilities/MatchCardContent";
import TotalIncomeCard from "ui-component/cards/Skeleton/TotalIncomeCard";
import { showBUTTOMSheet, hideBUTTOMSheet } from "store/bottomSheetReducer";
import ProvinceCitySelector from 'views/utilities/ProvinceCitySelector'
import dataHandler from "api/dataHandler";
import api from "api/api";
import { persiandate } from "utils/Lib";
import IconText from "views/utilities/IconText";
//-----------------------------------------------
import FiltersSection from "./filters/filters";
import SportFiltersSection from "./filters/sports";

import { hostAddress } from 'api/api'
import { borderRadius } from "@mui/system";

//------------------------------------------------------------------------------------------

const ListMatchs = () => {
  const [param, setParam] = useState("");
  const [query, setQuery] = useState("")
  const dispatch = useDispatch();
  const [provinceValue, setProvinceValue] = useState(0);
  const [cityValue, setCityValue] = useState(0);
  const [sportFieldId, setSportFieldId] = useState("")
  const [matchList, setMatchList] = useState([]);
  const [loadedItems, setLoadedItems] = useState([]);
  const theme = useTheme();
  const getData = () => {
    const body = {
      page_size: 10,
      page_index: 1,
      param: param,
      sport_field_id: sportFieldId,
      match_city_id: cityValue.city_id,
      query: query
    };

    const result = dataHandler(api.listMatch(body), "get", "");

    try {
      result(async function (data, status) {
        console.log(data)
        setLoadedItems("")//clear  list 
        if (status) setMatchList(data.result.data);
      });
    } catch (error) {
      //error handle here
    }
  };
  const handleLocationOnchange = (e) => {
    setCityValue({
      city_id: e.city_id,
      city_title: e.city_title
    })
    dispatch(hideBUTTOMSheet())
    localStorage.setItem(
      "city_id", e.city_id,
    )
    localStorage.setItem(
      "city_title", e.city_title
    )


  }
  const citySavedIdValue = localStorage.getItem("city_id");
  if (citySavedIdValue && !cityValue) {
    setCityValue({
      city_id: citySavedIdValue,
      city_title: localStorage.getItem("city_title")
    })
  }


  React.useEffect(() => {
    matchList.forEach((item, index) => {
      setTimeout(() => {
        setLoadedItems((prev) => [...prev, item]);
      }, index * 100);
    });
  }, [matchList]);

  React.useEffect(() => {
    //recieve match list

    getData("");
  }, [sportFieldId, query, cityValue]);
  return (
    <>
      {/*filter section*/}
      <Box sx={{ px: 1, pt: 1, width: "100%" }}>

        <Stack spacing={1}>

          <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
            <SearchBar onChange={(e) => setQuery(e)} />
            <Button

              endIcon={<IconMapPin color={theme.palette.grey[400]} />}
              onClick={() => dispatch(showBUTTOMSheet(<ProvinceCitySelector
                onChange={(e) => { handleLocationOnchange(e) }} />, "انتخاب شهر", ""))}
              variant={'outlined'} sx={{ flexShrink: 0, border: "1px solid", borderColor: theme.palette.grey[400], borderRadius: 3, py: 1.6, px: 2 }}>
              <Typography>{!cityValue ? "شهر" : cityValue.city_title}</Typography>
            </Button>
          </Box>
          <Box
            sx={{
              height: "auto",
              p: 0,
              borderRadius: "2px",
              // overflow:'hidden',
              width: "100%"
            }}
          >
          </Box>
          <Box
            sx={{
              height: "auto",
              p: 0,
              borderRadius: "2px",
              width: "100%"
            }}
          >
            {<FiltersSection onChange={(e) => setSportFieldId(e)} />}
          </Box>
        </Stack>
      </Box>

      <Divider sx={{ mt: 1 }} />
      <Box sx={{ height: 'auto', mb: 10 }}>
        <Grid container >
          {/*list section*/}

          {loadedItems ? (
            loadedItems.map((item, index) => (

              <Grid xs={12} >
                <Transition type={"fade"} in={true} key={index}>
                  <Transition type={"grow"} in={true} key={index}>
                    <Link
                      sx={{
                        textDecoration: "none",
                        "&:hover": {
                          backgroundColor: "primary.dark", // Changes color on hover
                          color: "secondary.main", // Changes text color on hover
                          cursor: "pointer",
                          textDecoration: "none",
                        },
                      }}
                      href={`detail/${item.match_id}/${item.host_team_id}/${item.host_team_name}`}
                    >
                      {/*tid=hostteamId*/}
                      <Box sx={{
                        p: 1,
                        cursor: 'pointer',
                      }}>

                        <MatchListCardContent
                          confirmRequest={"-1"}
                          createDate={item["createdAt"]}
                          viwer={item.viewer_count??"0"}
                          matchSportField={item.match_sport["field_title"]}
                          matchType={item['match_type']}
                          hostTeamName={item.host_team["team_name"]}
                          logoHost={`${hostAddress}/${item.host_team.logo["logo_path"]}`}
                          rateHost={2}
                          dateMatch={persiandate(item["match_date"])[1]}
                          timeMatch={item["match_time"]}
                          location={`${item.province_match["province_title"]}/${item.city_match["city_title"]}`}
                        />
                      </Box>
                    </Link>
                  </Transition>
                </Transition>
                <Divider />
              </Grid>

            ))
          ) : (
            <><TotalIncomeCard /></>
          )}
        </Grid>
      </Box>
    </>
  );
};
export default ListMatchs;
