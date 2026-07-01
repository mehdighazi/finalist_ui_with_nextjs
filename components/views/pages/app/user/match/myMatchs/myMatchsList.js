import * as React from "react";
import { useState } from "react";
//ui-material
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  Avatar,
  Grid,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";



//project import
//-------------------Tabler
import CustomCard from "@/components/ui-component/cards/CustomCard";
import MatchCardPlaceHolder from '@/components/ui-component/cards/Skeleton/matchCardPlaceHolder'
import NotFoundPlaceHolder from '@/components/ui-component/NotFound'
import {
  MatchListCardContent,
  MatchFullCardContent,
} from "@/components/ui-component/utilities/MatchCardContent";
import Logo1 from "@/components/assets//images/test/t1.png";
import dataHandler from '@/components/api/dataHandler';
import api from '@/components/api/api';
import  {hostAddress} from '@/components/api/api';;
import { persiandate } from "@/components/utils/Lib";
function AvatarWithLabel({ name, avatar }) {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Avatar sx={{ width: 20, height: 20 }} alt={name} src={avatar} />
      <Typography fontSize={"0.8rem"} fontWeight={500}>
        {name}
      </Typography>
    </Box>
  );
}

const MatchList = ({ teamId, hostCheck }) => {
  const [matchList, setMatchList] = useState(null);
  const [param, setParam] = useState("");
  const theme = useTheme();
  const fontSize = 12

  const [notFound, setNotFound] = useState(false)

  const getData = (body) => {
    const Api_ = hostCheck
      ? api.hostmatchList(3, teamId, param, "")
      : api.guestMatchRequest(3, teamId, param, "");
    const result = dataHandler(Api_, "get", "");

    try {
      result(async function (data, status) {

        setMatchList(hostCheck ? data.result.data : data.result);
        setTimeout(() => setNotFound(true), 5000)

      });
    } catch (error) {
      //error handle here
    }
  };
  React.useEffect(() => {
    //recieve match list
    setMatchList(null);
    getData("");
  }, [teamId, hostCheck]);
  return (
    <>

      {
        <Box sx={{ p: 1, width: "100%", maxWidth: 600, bgcolor: "background.paper", border: "1px solid #ddd", borderRadius: 1 }}>
          {/* سرستون */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 2,
              py: 1,
              color: "grey.600",
              bgcolor: "grey.200",
              borderBottom: "1px solid #ccc",
            }}
          >
            <Typography fontSize={fontSize} sx={{ flex: 1 }}>
              تیم ها
            </Typography>
            <Typography fontSize={fontSize} sx={{ flex: 1, textAlign: "center" }}>
              زمان/تاریخ
            </Typography>
            <Typography fontSize={fontSize} sx={{ flex: 1, textAlign: "center" }}>
              محل برگزاری
            </Typography>
            <Typography fontSize={fontSize} sx={{ flex: 1, textAlign: "center" }}>
              تعداد درخواست
            </Typography>
          </Box>

          {/* لیست بازی‌ها */}
          <List disablePadding>

            {hostCheck &&
              matchList &&
              matchList.teams &&
              matchList.teams.length > 0 ? (
              matchList.teams[0].host_matches.map((item, id) => (


                <Link
                  sx={{
                    textDecoration: "none",
                    "&:hover": {
                      //backgroundColor: "primary.dark", // Changes color on hover
                      color: "secondary.main", // Changes text color on hover
                      cursor: "pointer",
                      textDecoration: "none",
                    },
                  }}
                  href={`/app/user/match/requests/${item["match_id"]}/${teamId}`}
                >
                  <React.Fragment key={item.id}>
                    <ListItem alignItems="flex-start" sx={{ px: 2 }}>
                      {/* ستون اول: تیم‌ها */}
                      <ListItemText
                        primary={
                          <Box textAlign="right">
                            <Typography variant="body2" ><AvatarWithLabel name={matchList.teams[0]["team_name"]}
                              avatar={matchList?.teams?.[0]?.logo?.logo_path
                                ? `${hostAddress}/${matchList.teams[0].logo.logo_path}`
                                : ""}
                            /></Typography>
                            <Typography variant="body2" sx={{ mt: 0.5 }} ><AvatarWithLabel
                              name={item.guest_team ? item.guest_team.team_name : "-"}
                              avatar={item.guest_team?.logo?.logo_path
                                ? `${api.hostname}${item.guest_team.logo.logo_path}`
                                : ""}
                            /></Typography>
                          </Box>
                        }
                        sx={{ flex: 1, direction: "rtl" }}
                      />

                      {/* ستون دوم: تاریخ */}
                      <ListItemText
                        primary={<span><Typography fontSize={"0.7rem"} variant="h6">{persiandate(item["match_date"])[1]}</Typography>
                          <Typography variant="h6" fontSize={"0.7rem"}>{item["match_time"]}</Typography></span>}
                        sx={{ flex: 1, textAlign: "center", pt: 0.5 }}
                      />

                      {/* ستون سوم: محل برگزاری */}
                      <ListItemText
                        primary={<Typography variant="h6">{`${item.province_match["province_title"]}/${item.city_match["city_title"]}`}</Typography>}
                        sx={{ flex: 1, textAlign: "center", pt: 1 }}
                      />
                      {/* ستون چهارم: تعداد درخواست */}
                      <ListItemText
                        primary={<Typography variant="h6">{item["total_requests"]}</Typography>}
                        sx={{ flex: 1, textAlign: "center", pt: 1 }}
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                  
                </Link>



                //------------------Guest Send Request to match list
              ))
            ) : !hostCheck && Array.isArray(matchList) ? (
              matchList.map((item) => (
                <>

                  {

                    //item.request_match.host_team.team_name


                    <Link
                      sx={{
                        textDecoration: "none",
                        "&:hover": {
                          //  backgroundColor: "primary.dark", // Changes color on hover
                          color: "secondary.main", // Changes text color on hover
                          cursor: "pointer",
                          textDecoration: "none",
                        },
                      }}
                    //  href={`/site/app/user/match/requests/${item["match_id"]}/${teamId}`}
                    >
                      <React.Fragment key={item.id}>
                        <ListItem alignItems="flex-start" sx={{ px: 2 }}>
                          {/* ستون اول: تیم‌ها */}
                          <ListItemText
                            primary={
                              <Box textAlign="right">
                                <Typography variant="body2" ><AvatarWithLabel name={item.request_match.host_team["team_name"]}
                                  avatar={item?.request_match?.host_team?.team_name?.[0]}
                                /></Typography>

                                <Typography variant="body2" sx={{ mt: 0.5 }} ><AvatarWithLabel
                                  name={item.request_match.guest_team ? item.request_match.guest_team.team_name : "-"}
                                  avatar={item?.request_match?.guest_team?.logo?.logo_path
                                    ? `${api.hostname}${item.request_match.guest_team.logo.logo_path}`
                                    : undefined}
                                /></Typography>
                              </Box>
                            }
                            sx={{ flex: 1, direction: "rtl" }}
                          />

                          {/* ستون دوم: تاریخ */}
                          <ListItemText
                            primary={<span><Typography fontSize={"0.7rem"} variant="h6">{persiandate(item.request_match["match_date"])[1]}</Typography>
                              <Typography variant="h6" fontSize={"0.7rem"}>{item.request_match["match_time"]}</Typography></span>}
                            sx={{ flex: 1, textAlign: "center", pt: 0.5 }}
                          />

                          {/* ستون سوم: محل برگزاری */}
                          <ListItemText
                            primary={<Typography variant="h6">{`${item.request_match.province_match["province_title"]}/${item.request_match.city_match["city_title"]}`}</Typography>}
                            sx={{ flex: 1, textAlign: "center", pt: 1 }}
                          />
                          {/* ستون چهارم: تعداد درخواست */}
                          <ListItemText
                            primary={<Typography variant="h6">{``}</Typography>}
                            sx={{ flex: 1, textAlign: "center", pt: 1 }}
                          />
                        </ListItem>
                        <Divider component="li" />
                      </React.Fragment>
                      {/*<CustomCard
                    sx={{ p: 0 }}
                    content={

                      <MatchFullCardContent
                        confirmRequest={item["status"]}
                        requestNumber={item.request_match["total_requests"]}
                        createDate={item.request_match["createdAt"]}
                        viwer={"25K"}
                        hostTeamName={item.request_match.host_team["team_name"]}
                        logoHost={`${hostAddress}/${item.request_match.host_team.logo["logo_path"]}`}
                        rateHost={2}
                        guestTeamName={item.request_match.guest_team.team_name}
                        //rateGuest={3}
                        logoGuest={`${api.hostname}${item.request_match.guest_team.logo["logo_path"]}`}
                        matchType={item.request_match["match_type"]}
                        dateMatch={
                          persiandate(item.request_match["match_date"])[1]
                        }
                        timeMatch={item.request_match["match_time"]}
                        location={`${item.request_match.province_match["province_title"]}/${item.request_match.city_match["city_title"]}`}
                      />

                    }
                  />*/}
                    </Link>


                  }
                </>
              ))
            ) : (
              !notFound ? <MatchCardPlaceHolder /> : <NotFoundPlaceHolder />
            )}
          </List>
        </Box>
      }

    </>
  );
};
export default MatchList;
//-------------------------------------------------

