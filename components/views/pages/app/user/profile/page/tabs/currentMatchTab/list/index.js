import * as React from "react";
import PropTypes from 'prop-types';
//ui-material
import { useMediaQuery, Box, Divider, Grid, Paper, Switch, Typography, useTheme } from "@mui/material";

//project import
import { SelectTeamChip } from 'views/utilities/SelectTeamChip'
import MatchsList from "./matchsList";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
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

const UserMatchList = () => {
    const [teamID, setTeamID] = React.useState(null)
    const [checked, setChecked] = React.useState(false)
    const [teamName, setTeamName] = React.useState()
    const [logo, setLogo] = React.useState()

    function handleSwitchChange() {
        setChecked(!checked)
    }

    function SelectChipOnChangeHandler(value) {
        const { team_id, team_name, team_log } = value
        setTeamName(team_name)
        setTeamID(team_id)
        setLogo(team_log)

    }

    const theme = useTheme()
    return (<>

        <Box sx={{p:0.5,mb:10}}>
            <MatchsList hostCheck={checked} teamId={teamID ?? -1} />
        </Box>
    </>)

}
export default UserMatchList