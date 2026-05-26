import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//ui-material
import { Box, Fade, Paper, Stack, useMediaQuery, useTheme } from "@mui/material";

//project import
import { rlPadding } from 'store/constant';
import TeamList from './teamlist'
import dataHandler from "api/dataHandler";
import api from "api/api";
//==================================Create Match
//Custom DatePicker

const Invite = () => {
    const [userTeam, setUserTeam] = useState([])
    const [userinfo, setUserInfo] = useState(null)
    const navigate = useNavigate()
    const getData = (body) => {
        const result = dataHandler(api.getUserInfo({ uid: '' }), "get", "");
        try {
            result(async function (data, status) {


                if (status) {
                    setUserInfo(data.result)

                }

                 else navigate("/splash")
            })
        } catch (error) {
            //error handle here

        }
    }
    React.useEffect(() => {

        if (!userinfo)
            getData()

    }, [])
    const getTeamData = () => {

        const result = dataHandler(api.listUserTeam(), "get", "");

        try {
            result(async function (data, status) {
                setUserTeam(data.result)


            })
        } catch (error) {
            // console.log(error)
        }
    }
    React.useEffect(() => {

        getTeamData()

    }, [])

    return (<>
       {<TeamList userTeam={userTeam} />}


    </>)
}
export default Invite