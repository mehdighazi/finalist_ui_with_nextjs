import * as React from "react";
import { useState } from "react";
//ui-material
import {
  Box,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

//project import
import MatchCardPlaceHolder from 'ui-component/cards/Skeleton/matchCardPlaceHolder'
import NotFoundPlaceHolder from 'ui-component/NotFound'
import CustomCard from "ui-component/cards/CustomCard";
import MatchListWrapper from 'views/utilities/MatchListProfileTab'
import {
  MatchListCardContent,
  MatchFullCardContent,
} from "views/utilities/MatchCardContent";
import Logo1 from "assets/images/test/t1.png";
import dataHandler from "api/dataHandler";
import api from "api/api";
import { hostAddress } from "api/api";
import { persiandate } from "utils/Lib";

const MatchList = ({ teamId, hostCheck }) => {
  return (
    <>
      <MatchListWrapper
        apiFunc={api.listUserTeamsMatch}
        apiParams={{
          page_size: 10,
          page_index: 1,
          status: "host_accepted"
        }}
       linkBuilder={()=>"#"}
      />
    </>
  )
}
export default MatchList;
