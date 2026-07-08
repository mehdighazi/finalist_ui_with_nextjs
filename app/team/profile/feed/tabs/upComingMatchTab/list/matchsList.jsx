"use client"
import * as React from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
//-------------------Tabler

import MatchListWrapper from "@/components/ui-component/utilities/MatchListProfileTab";


import api from '@/components/api/api';


const MatchList = () => {
    const searchParams = useSearchParams();
    const teamId=searchParams.get('tid');

    return (
        <>
            <MatchListWrapper
                 apiFunc={api.matchAllOfTeamList}
                apiParams={{
                    team_id: teamId,
                    page_size: 10,
                    page_index: 1,
                    status: "host_accepted"
                }}
                linkBuilder={(item) => `#`}
            />

        </>
    )
}
export default MatchList