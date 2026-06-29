import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

//ui-material
import {
    Box, Stack, TextField, Typography, useTheme, CircularProgress,
    Checkbox, FormControlLabel, FormHelperText, FormControl
} from "@mui/material";

//tabler icon
import { IconX, IconCircleCheckFilled, IconMapPin, IconUsersGroup, IconId, IconCategory } from '@tabler/icons-react'
//project import
import "../style.css"
import ProvinceCitySelector from '@/components/ui-component/utilities/ProvinceCitySelector'
import SportSelector from "@/components/ui-component/utilities/SportSelector";
import { styled } from "@mui/material/styles";
import { CustomTextField } from '@/components/ui-component/utilities/inputs'
import IconText from '@/components/ui-component/utilities/IconText'
import { showBottomSheet, hideBottomSheet } from "@/components/store/slices/bottomSheetSlice";
import  api from '@/components/api/api';
import dataHandler from '@/components/api/dataHandler'
//--------------------------------------|Step 1|---------------------------------------------------
const CustomBox = styled(Stack)(({ theme }) => ({
    minWidth: "100%",
    marginTop: 5,

    paddingLeft: "0%",
    minHeight: "150px",
    direction: "rtl",



    //background:`${theme.palette.grey[200]}!important`,


}));
const formconstrolStyle = {
    direction: "rtl", minWidth: "100%",
    border: "1px solid #e2e2e2 ", borderStyle: "dashed", pt: 2, mt: 1,
}

const Step0 = (props) => {
    //--------------------| Define Section-----------------------------------
    const [usernameChecking, setUsernameChecking] = useState(false);
    const [usernameExists, setUsernameExists] = useState(null); // true/false/null
    const theme = useTheme();
    const [province_City_Title, setprovince_City_Title] = useState("")
    const [sport, setSport] = useState("")
    const [valueValidity, setValueValidity] = useState("")
    const IconColor = theme.palette.grey[400]
    const TextColor = theme.palette.grey[600]
    const dispatch = useDispatch();
    const [teamIdentifier, setTeamIdentifier] = useState("");
    const debounceRef = useRef(null);
       //-------------------------| Use Effect |-----------------------------
    useEffect(() => {
        if (!teamIdentifier || teamIdentifier.length < 3) return;

        setUsernameChecking(true);
        setUsernameExists(null); // reset

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(async () => {
            try {
                const result = await new Promise((resolve, reject) => {
                    dataHandler(api.teamIdentifierChecking(teamIdentifier), "get", "")(
                        (data, status) => {
                            console.log(data)
                            if (status && data.result.valid) {
                                resolve(true); // available
                            } else {
                                resolve(false); // taken
                            }
                        }
                    );
                });

                setUsernameExists(!result); // اگر true باشه یعنی موجوده => نباید بپذیریمش
            } catch (error) {
                console.error("Username check failed", error);
            } finally {
                setUsernameChecking(false);
            }
        }, 600); // delay

        return () => clearTimeout(debounceRef.current);
    }, [teamIdentifier]);

 

    //-------------------------|Return Component |-------------------------------
    return (<>
        <Box sx={{ minWidth: "100%" }}>
            {props.userinfo ?
                <CustomBox>
                    <Typography align={"right"} sx={{ fontWeight: 200, mt: 1, color: IconColor }}>
                        <IconText text_pt={0.5} fontSize={12} icon={<IconCategory />} color={TextColor} text={" رشته ورزشی"} />
                    </Typography>

                    <CustomTextField

                        onClick={() => dispatch(showBUTTOMSheet(<SportSelector
                            onChange={(e) => {
                                props.onChange({
                                    name: "sport_field_id",
                                    value: e.sport_field_id
                                })
                                props.onChange({
                                    name: "sport_field_title",
                                    value: e.sport_select_title
                                })
                                setSport(e.sport_parent_title + "/" + e.sport_select_title);
                                dispatch(hideBUTTOMSheet())
                            }} />, "انتخاب رشته ورزشی", ""))}
                        value={sport}
                        readOnly={true}
                        fontSize={14}
                        placeHolder={"برای انتخاب رشته ورزشی تیم اینجا کلیک کنید"}
                        fullWidth


                        variant="filled"
                    />
                    <Typography align={"right"} sx={{ fontWeight: 200, mt: 1, color: IconColor }}>
                        <IconText text_pt={0.5} fontSize={12} icon={<IconUsersGroup />} color={TextColor} text={"نام تیم "} />
                    </Typography>
                    <CustomTextField
                        errorText={"لطفا از نام های متعارف استفاده نمایید"}
                        fontSize={14}
                        placeHolder={"نام تیم را به فارسی وارد کنید"}
                        onChange={(e) => props.onChange({ name: "team_name", value: e })}
                        value={props.formData["team_name"]}
                    />
                    <Typography align={"right"} sx={{ fontWeight: 200, mt: 1, color: IconColor }}>
                        <IconText text_pt={0.5} fontSize={12} icon={<IconId />} color={TextColor} text={" نام کاربری تیم "} />
                    </Typography>

                    <CustomTextField
                        startIcon={usernameChecking ? <CircularProgress size={20} /> :
                            usernameExists === true ? <IconCircleCheckFilled color='green' /> :
                                usernameExists === false? <IconX color="red" /> : null}
                        fontSize={14}
                        placeHolder={"نام کاربری را وارد کنید"}
                        fullWidth
                        name="team_identifier"
                        id="team_identifier"
                        value={teamIdentifier}
                        onChange={(e) => {
                            const value = e;
                            const valid = /^[a-zA-Z0-9]*$/.test(value);
                            setValueValidity(valid ? "" : "فقط حروف انگلیسی و اعداد مجاز است");
                               console.log(e)
                           if (valid) {
                             
                                setTeamIdentifier(value);
                                props.onChange({
                                    name: "team_identifier",
                                    value
                                });
                            }
                        }}
                        errorText={valueValidity}
                    />
                    <Typography align={"right"} sx={{ fontWeight: 200, mt: 1, color: IconColor }}>
                        <IconText text_pt={0.5} fontSize={12} icon={<IconMapPin />} color={TextColor} text={"انتخاب استان/شهر"} />
                    </Typography>
                    <CustomTextField
                        onClick={() => dispatch(showBUTTOMSheet(<ProvinceCitySelector
                            onChange={(e) => {
                                props.onChange({
                                    name: "city_id",
                                    value: e.city_id
                                })
                                props.onChange({
                                    name: "province_id",
                                    value: e.province_id

                                })
                                props.onChange({
                                    name: "city_title",
                                    value: e.city_title
                                })
                                props.onChange({
                                    name: "province_title",
                                    value: e.province_title

                                })
                                setprovince_City_Title(e.province_title + "/" + e.city_title);
                                dispatch(hideBUTTOMSheet())
                            }} />, "انتخاب شهر", ""))}

                        readOnly={true}
                        fontSize={14}
                        placeHolder={"برای انتخاب استان و شهر اینجا کلیک کنید"}
                        fullWidth
                        value={province_City_Title}
                        // onChange={(e) => textFliedChangeHandler(e,teamName)}
                        // onChange={(e) => changeHandler({ name: "team_identifier", value: e })}
                        variant="filled"


                    />

                    <Box sx={{ position: 'relative', textAlign: 'right', py: 1, border: '1px solid #e2e2e2', mt: 1, borderRadius: 5 }}>
                        <FormControl >
                            <FormControlLabel
                                sx={{ mr: -0.5 }}
                                control={
                                    <Checkbox
                                        checked={props.formData["is_womens"] || false}
                                        onChange={(e) =>
                                            props.onChange({
                                                name: "is_womens",
                                                value: e.target.checked
                                            })
                                        }
                                    />
                                }
                                label="تیم بانوان می باشد"
                            />
                            <FormHelperText sx={{ color: "red", fontSize: 10 }} id="team-identifier-error">
                                <span>{"چنانچه تیم بانوان می باشید حتما این گزینه را فعال کنید"}</span>
                            </FormHelperText>
                        </FormControl>
                    </Box>




                </CustomBox> :
                <Box sx={{ p: 5 }}>
                    No Data
                </Box>
            }
        </Box>
    </>)
}
export default Step0