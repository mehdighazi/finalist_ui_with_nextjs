import * as React from "react";
import PropTypes from 'prop-types';
//ui-material
import {Box, Divider, Grid, Paper, Switch, Typography, useTheme} from "@mui/material";

//project import
import MatchsList from "./matchsList";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 0}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const TeamMatchList = () => {
    const [teamID, setTeamID] = React.useState(null)
    const [checked, setChecked] = React.useState(true)


    function handleSwitchChange() {
        setChecked(!checked)
    }



    const theme = useTheme()
    return (<>

        <Box sx={{background: 'background.paper', width: "100%", direction: "rtl"}}>
       
            {
                <MatchsList hostCheck={checked} teamId={teamID ?? -1}/>
                /* checked?<HostMatchs teamId={teamID}/>:<GuestMatchts teamId={teamID}/>*/
            }

        </Box>

    </>)

}
export default TeamMatchList