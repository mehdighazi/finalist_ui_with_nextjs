import * as React from "react";
import { useSearchParams } from 'next/navigation';
// ui-material
// tabler icon
import {
    IconActivityHeartbeat,
    IconHomeBolt,
    IconKey,
    IconMedal,
    IconPennant2,
    IconUserExclamation,
    IconUsers
} from "@tabler/icons-react";
// project imports
import api from '@/components/api/api';
import dataHandler from '@/components/api/dataHandler';
import MemberList from './ListItem';

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
    const [data, setData] = React.useState([]);
    const queryParams = useSearchParams();
    
    // Extract the tid directly from query parameters
    const teamId = queryParams.get('tid');

    const getData = ( () => {

        if (!teamId) return; // Prevent API call if there is no teamId

        const result = dataHandler(api.listTeamMember({ team_id: teamId, team_name: "", type: "member" }), "get", "");
        console.log(api.listTeamMember({ team_id: teamId, team_name: "", type: "member" }));
        try {
            result(async function (resData:any, status:any) {
                if (status) {
                    setTimeout(() => {
                        setData(resData.result);
                    }, 500);
                }
            });
        } catch (error) {
            console.error("Failed to fetch team members:", error);
        }
    });

    React.useEffect(() => {
        getData();
    }, []);

    return (
        <>
            {/* <NavGroup item={data ?? []}/> */}
            <MemberList data={data} />
        </>
    );
};

export default MemberTab;