'use client'
import * as React from "react";
import { useState } from "react";
import { useRouter } from 'next/navigation';
//ui-material
import { Box, Fade, Paper, Stack, useMediaQuery, useTheme } from "@mui/material";
import ListTeams from '@/components/ui-component/utilities/selectTeamNew'
//project import
import { rlPadding } from '@/components/store/constant';
import TeamList from './teamlist'
import dataHandler from '@/components/api/dataHandler';
import api from '@/components/api/api';
//==================================Create Match
//Custom DatePicker

const Invite = () => {
    const [userTeam, setUserTeam] = useState([])
    const [userinfo, setUserInfo] = useState(null)
   const router = useRouter();
    const getData = (body) => {
        const result = dataHandler(api.getUserInfo({ uid: '' }), "get", "");
        try {
            result(async function (data, status) {


                if (status) {
                    setUserInfo(data.result)

                }

                 else router.push("/splash")
            })
        } catch (error) {
            //error handle here

        }
    }
    React.useEffect(() => {

        if (!userinfo)
            getData()

    }, [])
     React.useEffect(() => {
        document.title = "لیست تیم ها | فینالیست";
    }, []);
     const selectedHandler=(e)=>
    {
     
        const {value,name}=e
        router.push(`memberslist/${value}`)

    }
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
     <ListTeams onChange={(e)=>selectedHandler(e)} userTeam={userTeam??[]}/>
       


    </>)
}
export default Invite