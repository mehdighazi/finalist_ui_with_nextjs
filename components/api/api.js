const port = process.env.REACT_APP_HOST_PORT
    ? `:${process.env.REACT_APP_HOST_PORT}`
    : "";
const domain = `${process.env.REACT_APP_HOST_API_URL}${port}/api/app/`;
export const hostAddress = `${process.env.REACT_APP_HOST_API_URL}${port}`
const ApiAdmin =
{
    hostname: `${process.env.REACT_APP_HOST_API_URL}${port}`,
    getUserInfo: (body) => {
        const { uid, first_name, last_name } = body
        const accesskey = `token=${localStorage.getItem("token")}`
        console.log(`${domain}user/info?uid=${uid}&first_name=${first_name}&last_name=${last_name}&${accesskey}`)
        return `${domain}user/info?uid=${uid}&first_name=${first_name}&last_name=${last_name}&${accesskey}`
    },
    getUserInfoAll: (body) => {

        const { param } = body

        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}user/info/all?param=${param}&${accesskey}`
    },

    loginUser: (body) => {

        return `${domain}user/login`
    },

    createUser: (body) => {

        return `${domain}user/create`
    },
    followToggle: () => {
       
        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}user/follow?${accesskey}`

    },
    sendVerifyCode: (body) => {

        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}user/sendverifycode?${accesskey}`

    },
    getUserProfileInfo: () => {

        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}user/profile?${accesskey}`
    },
    createTeam: (usertoken) => {
        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}team/create?userid=${usertoken}&${accesskey}`
    },
    listUserTeam: (usertoken) => {
        const accesskey = `token=${localStorage.getItem("token")}`

        return `${domain}team/user/list?userid=${usertoken}&${accesskey}`
    },
    listUserSportTeam: (body) => {
        const {uid}=body
       
        const accesskey = `token=${localStorage.getItem("token")}`
         console.log(`${domain}team/sport/user/list?uid=${uid}&${accesskey}`)
        return `${domain}team/sport/user/list?uid=${uid}&${accesskey}`
    },
    listTeamMember: (body) => {
        const { team_id, team_name,type } = body
        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}team/member/list?type=${type}&team_id=${team_id}&team_name=${team_name}&${accesskey}`
    },
    createMatch: (usertoken) => {
        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}match/create?userid=${usertoken}&${accesskey}`
    },
    createMatchRequest: (usertoken) => {
        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}match/request/create?userid=${usertoken}&${accesskey}`
    },
    getMatchRequesterInfo: (match_request_id) => {
        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}match/requester/info?match_request_id=${match_request_id}&${accesskey}`
    },
    listMatch: (body) => {
        const { match_city_id, usertoken, teamid, param, hostuserid, guestuserid, page_index, page_size, status, sport_field_id, query } = body
        const accesskey = `token=${localStorage.getItem("token")}`
        const linkApi = `${domain}match/list?match_city_id=${match_city_id ?? ""}&query=${query}&page_index=${page_index}&page_size=${page_size}&team_id=${teamid}&param=${param ?? ""}&guest_user_id=${guestuserid ?? ""}&host_user_id=${hostuserid ?? ""}&userid=${usertoken ?? ""}&${accesskey}&status=${status ?? 'active'}&sport_field_id=${sport_field_id}`
        console.log(linkApi)
        return linkApi

    },
    listUserTeamsMatch: (body) => {
        const { page_index, page_size, status, sport_field_id } = body
        const accesskey = `token=${localStorage.getItem("token")}`
        const linkApi = `${domain}match/userteams/get/list?page_index=${page_index}&page_size=${page_size}&status=${status}&${accesskey}`

        return linkApi

    },
    detailMatch: (matchid) => {
        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}match/detail?match_id=${matchid}&${accesskey}`
    },
    guestMatchRequest: (usertoken, teamid, accept) => {
        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}match/request/send/list?accept=${accept}&team_id=${teamid}&userid=${usertoken}&${accesskey}`
    },
    memberInvite: (usertoken, teamid, accept) => {
        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}member/invite?accept=${accept}&&user_id=${usertoken}&${accesskey}`
    },
    memberRemove: () => {
        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}member/remove?${accesskey}`
    },

    teamInfo: (teamid) => {
        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}team/info?team_id=${teamid}&${accesskey}`
    },
    teamProfile: (teamid) => {
        const accesskey = `token=${localStorage.getItem("token")}`
        console.log(`${domain}team/profile?team_id=${teamid}&${accesskey}`)
        return `${domain}team/profile?team_id=${teamid}&${accesskey}`
    },
    teamUpdate: (teamid) => {
        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}team/update?${accesskey}`
    },
    teamIdentifierChecking: (parametr) => {
        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}team/check/identifier?team_identifier=${parametr}&${accesskey}`
    },
    matchRequestList: (teamid, matchid) => {
        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}match/request/get/list?match_id=${matchid}&team_id=${teamid}&${accesskey}`
    },
    matchsOfTeam: (body) => {
        const { team_id, status, page_size, page_index } = body
        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}match/team/list?${accesskey}&team_id=${team_id}&status=${status ?? 'active'}&page_size=${page_size}&page_index=${page_index}`

    },
    hostmatchList: (usertoken, teamid) => {
        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}match/created/list?team_id=${teamid}&userid=${usertoken}&${accesskey}`
    },
    confirmRequest: (usertoken) => {
        const accesskey = `token=${localStorage.getItem("token")}`

        return `${domain}match/request/accept?userid=${usertoken}&${accesskey}`
    },
    createContent: () => {
        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}user/content/add?${accesskey}`
    },
    listContent: (uid, team_id, owner_type) => {
        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}user/content/list?uid=${uid}&owner_type=${owner_type}&team_id=${team_id}&${accesskey}`
    },
    likeContent: () => {
        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}user/like?${accesskey}`
    },
    createComment: () => {
        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}user/comment?${accesskey}`

    },
    listComment: (content_id) => {
        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}comment/list?${accesskey}&content_id=${content_id}`

    },
    listSports: (body) => {
        const { title, field_id, field_parent_id } = body
        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}sport/list?${accesskey}&title=${title}&
            &field_id=${field_id}&field_parent_id=${field_parent_id}`

    },
    listInvitedUser: () => {
        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}team/user/invite/list?${accesskey}`
    },
    acceptInvite: () => {
        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}member/invite/accept?${accesskey}`
    },
    notificationList: (status, page) => {
        const accesskey = `token=${localStorage.getItem("token")}`
        return `${domain}notification/list?page=${page}&status=${status}&${accesskey}&page_index=1&page_size=20`
    },

    notificationDelete: (notification_id) => {
        const accesskey = `token=${localStorage.getItem("token")}`


        return `${domain}notification/delete?notification_id=${notification_id}&${accesskey}`
    },
    userUpdate: () => {
        const accesskey = `token=${localStorage.getItem("token")}`


        return `${domain}user/update?${accesskey}`
    },

    checkUserName: (username) => {
        const accesskey = `token=${localStorage.getItem("token")}`


        return `${domain}user/check/username?${accesskey}&username=${username}`
    },
    provinceWithCityList: (province_id) => {
        const accesskey = `token=${localStorage.getItem("token")}`

        return `${domain}province/list?${accesskey}&province_id=${province_id}`

    },
    //------------------------------------UPLOAD FILE
    fileUpload: (section_id) => {
        const accesskey = `token=${localStorage.getItem("token")}`

        return `${domain}file/upload?section_id=${section_id}&${accesskey}`
    },


}
//
export default ApiAdmin;