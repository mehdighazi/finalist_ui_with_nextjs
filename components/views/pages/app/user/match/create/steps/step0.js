import * as React from "react";
import {useState} from "react";
//ui-material
import {
    Box,
    Divider,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    //Rating,
    Stack,
    Typography,
    useTheme
} from "@mui/material";

//project import
import "../style.css"
import {styled} from "@mui/material/styles";
import teamPng from 'assets/images/screen/team.png'
import defaultLogo from 'assets/images/screen/defaultlogo.png'
import {hostAddress} from '@/components/api/api'
import CustomRating from "ui-component/rating";
//DataHandling
import Avatar from "ui-component/extended/Avatar";
//--------------------------------------|Step 1|---------------------------------------------------
const CustomBox = styled(Box)(({theme}) => ({
    minWidth: "100%", marginTop: 1,

    paddingLeft: "0%", alignItems: "center", justifyContent: "center",


    "&.MuiBox-root input": {
        borderRadius: 5,
        minWidth: "100%",
        border: "solid 2px #e2e2e2",
        fontFamily: "numberfarsi",
        padding: 5,
        paddingRight: 10,
        color: theme.palette.secondary.dark


    }
    //background:`${theme.palette.grey[200]}!important`,


}));
const TeamBox = ({title, logo, color, rating}) => {
    return (<>
        <Box sx={{
            align: 'center',
            justifyContent: "center",
            //minHeight: "100hv",
            display: 'flex',
            alignItems: 'flex-start'
        }}>
            <Stack sx={{
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Avatar size='sm' src={logo}/>
                <Typography align="center" fontSize={12}>
                    {title}
                </Typography>
                <CustomRating size="small" name="read-only" value={rating} readOnly/>
            </Stack>
        </Box>
    </>)

}

//-----------------------------------------------------------------------


const Step0 = (props) => {

    const theme = useTheme();
    const [selectedValue, setSelectedValue] = useState(1)


    function handleChange(event) {
        setSelectedValue(event.target.value);
        const teamid = event.target.value.split("_")
        props.onChange({
            name: "host_team_id",
            value: teamid[1]
        })
    }

    const rateHost = 0;
    const logoHost = "";


    return (<>
        <Box sx={{minWidth: "100%"}}>
            {<CustomBox>
                {props.userTeam.length != 0 ?
                    <>
                        <Typography variant={"h5"} align={"right"}>یکی از تیم ها را انتخاب کنید</Typography>
                        <Divider sx={{mt: 1}}/>

                        <FormControl
                            sx={{
                                direction: "rtl", width: "100%", mt: 1, ml: 2,

                            }}
                            component="fieldset">

                            <RadioGroup
                                name="radio-buttons-group"
                                value={selectedValue}
                                onChange={(e) => handleChange(e)}
                                sx={{p: 0}}
                            >
                                {
                                    props.userTeam.map((item) => (
                                        <FormControlLabel
                                            value={`_${item["team_id"]}`}
                                            control={<Radio/>}
                                            label={<TeamBox
                                                rating={!rateHost ? 0 : rateHost}
                                                logo={item.logo ?`${hostAddress}/${item.logo.logo_path}` : logoHost}
                                                title={item["team_name"]}

                                            />}
                                            sx={{
                                                backgroundColor: selectedValue === `_${item["team_id"]}` ? "lightblue" : theme.palette.grey[100],
                                                borderRadius: "8px",
                                                padding: "8px",
                                                pt:1,
                                            }}
                                        />
                                    ))

                                }


                            </RadioGroup>
                        </FormControl>
                    </> ://user dont have any team
                    <Box sx={{p: 5}}>
                        <img src={teamPng} style={{width: "225px", height: "auto"}}/>
                        <Typography variant="h5" sx={{color: theme.palette.grey[500]}}>
                            تیم نداری؟از <a href={"#"}> اینجا </a> یه تیم ایجاد کن
                        </Typography>
                    </Box>}

            </CustomBox>}
        </Box>
    </>)
}
export default Step0