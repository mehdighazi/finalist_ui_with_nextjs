import * as React from "react";
import { useState } from "react";

//-------------------Tabler

import MatchListWrapper from "views/utilities/MatchListProfileTab";


import api from "api/api";


const MatchList = () => {
    const queryParams = new URLSearchParams(location.search); // Extract query params
    const [teamId, setTeamId] = useState(queryParams.get('tid'))
    
    return (
        <>
            <MatchListWrapper
                apiFunc={api.matchsOfTeam}
                apiParams={{
                    team_id: teamId,
                    page_size: 10,
                    page_index: 1,
                    status: "host_accepted"
                }}
                linkBuilder={(item) => `/app/user/match/requests/${item.match_id}/${teamId}`}
            />

        </>
    )
}
export default MatchList