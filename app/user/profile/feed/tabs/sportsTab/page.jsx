"use client"
import * as React from "react";
//ui-material
import { Box, Typography, useTheme } from "@mui/material";
//tabler icon
import {
    IconActivityHeartbeat,
    IconHomeBolt,
    IconKey,
    IconMedal,
    IconPennant2,
    IconUserExclamation,
    IconUsers,

} from "@tabler/icons-react"
//project import
//import NavGroup from './NavGroup/group'
//project import
import  api from '@/components/api/api';
import dataHandler from '@/components/api/dataHandler'

// constant
const icons = {
    IconKey,
    IconMedal,
    IconUsers,
    IconUserExclamation,
    IconPennant2,
    IconHomeBolt,
    IconActivityHeartbeat
};


const SportsTab = () => {
    const [data, setDate] = React.useState(null)
    const [userId, setUserId] = React.useState(null)
    const queryParams = new URLSearchParams(location.search);
    const theme = useTheme();
   const transformData = (data) => {

    // گروه‌بندی تیم‌ها بر اساس ورزش
    const groupedSports = data.teams.reduce((acc, team) => {
        const sportTitle = team.sport?.field_title || "نامشخص";
        if (!acc[sportTitle]) acc[sportTitle] = [];
        acc[sportTitle].push(team);
        return acc;
    }, {});

    return {
        id: 'user',
        title: '',
        type: 'group',
        url: '',
        icon: icons.IconUsers,
        children: Object.keys(groupedSports).map(sportTitle => ({
            id: sportTitle,
            title: sportTitle,
            type: 'collapse',
            icon: icons.IconUsers,
            children: groupedSports[sportTitle].map(team => ({
                title: team.team_name,
                type: 'item',
                url: `/app/team/profile?tid=${team.team_id}`,
                target: true,
                logo: team.logo
            }))
        }))
    };
};


    React.useEffect(() => {
        // setUserId(queryParams.get('uid'))
       
        getData(queryParams.get('uid'))

    }, [])
    const getData = async (uid) => {

        const result = dataHandler(api.listUserSportTeam({ uid: uid }), "get", "");
        try {
            result(async function (data, status) {
                console.log(data)
                if (data.result.teams.length > 0)
                    setDate(transformData(data.result))
            })
        } catch (error) {
            //error handle here

        }
    }
    return (<>
        <Box sx={{ p: 1, minHeight: 450 }}>
            {
                data ?
                   <></>
                    :
                    <Box sx={{ p: 5 }}>
                        <Typography variant='p' fontSize={12} sx={{ color: theme.palette.grey[400] }}>
                            <i>
                                ورزش های شما در صورت عضویت در تیم های ورزشی اینجا نمایش داده می شود
                            </i>
                        </Typography>
                        <Typography fontSize={12} sx={{ color: theme.palette.grey[400] }}>
                            <i>تیم نداری؟از <a href={'team/create?pg=sprt'}> اینجا </a> یه تیم ایجاد کن
                            </i>
                        </Typography>
                    </Box>
            }
        </Box>
    </>)

}
export default SportsTab