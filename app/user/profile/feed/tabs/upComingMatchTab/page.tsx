"use client"
import * as React from "react";

//ui-material
import {Box, Divider, Grid, Switch, useTheme} from "@mui/material";

//project import
import List from './list/list'



const UpComingMatch: React.FC = () => {


    return (<>
        <Box sx={{p: 0}}>
            <List/>
        </Box>
    </>)

}
export default UpComingMatch