import * as React from "react";
//ui-material
//tabler icon
import {
    IconActivityHeartbeat,
    IconHomeBolt,
    IconKey,
    IconMedal,
    IconPennant2,
    IconUserExclamation,
    IconUsers
} from "@tabler/icons-react"
//project import

//project import
import  api from '@/components/api/api';
import dataHandler from '@/components/api/dataHandler'
import MemberList from './ListItem'
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

const MemberTab = () => {
    const [data, setData] = React.useState([])
    const [teamId, setTeamId] = React.useState(null)
    const queryParams = new URLSearchParams(location.search);


    React.useEffect(() => {
        setTeamId(queryParams.get('tid'))
        getData({team_id:teamId,team_name:"",type:"member"})

    }, [teamId])
    const getData = async (body) => {
        const result = dataHandler(api.listTeamMember(body), "get", "");
        try {
            result(async function (data, status) {


                if (status)
                     setTimeout(() => {
                 setData(data.result)
                }, 500);


            })
        } catch (error) {
            //error handle here

        }
    }
    return (<>
        {/*<NavGroup item={data??[]}/>*/}
        <MemberList data={data}/>
    </>)

}
export default MemberTab