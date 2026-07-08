
//project import

import MatchListWrapper from '@/components/ui-component/utilities/MatchListProfileTab'
import api from '@/components/api/api';

const MatchList = ({ teamId, hostCheck }) => {
  return (
    <>
      <MatchListWrapper
        apiFunc={api.matchAllOfTeamList}
        apiParams={{
          page_size: 10,
          page_index: 1,
          status: "host_accepted",
          team_id: "",
        }}
       linkBuilder={(item)=>`/matches/detail/${item.match_id}/${item.host_team_id}/${encodeURIComponent(item.host_team.team_name)}`}
      />
    </>
  )
}
export default MatchList;
