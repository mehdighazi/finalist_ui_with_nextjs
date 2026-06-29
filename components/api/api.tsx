'use client';

import { any } from "prop-types";

/* =======================
   ENV (Next.js compatible)
======================= */

const HOST = process.env.NEXT_PUBLIC_HOST_API_URL ?? '';
const PORT = process.env.NEXT_PUBLIC_HOST_PORT
  ? `:${process.env.NEXT_PUBLIC_HOST_PORT}`
  : '';

const DOMAIN = `${HOST}${PORT}/api/app/`;

export const hostAddress = `${HOST}${PORT}`;

/* =======================
   Types
======================= */

type AnyObject = Record<string, any>;

interface ListMatchBody {
  match_city_id?: string;
  usertoken?: string;
  teamid?: string;
  param?: string;
  hostuserid?: string;
  guestuserid?: string;
  page_index?: number;
  page_size?: number;
  status?: string;
  sport_field_id?: string;
  query?: string;
}

/* =======================
   Helpers
======================= */

const getAccessKey = (): string =>
  //  `token=${localStorage.getItem('token') ?? ''}`;
  'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjExMTExIiwiaWF0IjoxNzgxNzcyNzI5LCJleHAiOjE3ODM1NzI3Mjl9.XbFvF8_BiQjpl-20nNUj2PC-MsYMVT7P5r38QRghMYA'

/* =======================
   API
======================= */

const ApiAdmin = {
  hostname: `${HOST}${PORT}`,

  getUserInfo(body: { uid: string; first_name: string; last_name: string }): string {
    const { uid, first_name, last_name } = body;
    return `${DOMAIN}user/info?uid=${uid}&first_name=${first_name}&last_name=${last_name}&${getAccessKey()}`;
  },

  getUserInfoAll(body: { param: string }): string {
    return `${DOMAIN}user/info/all?param=${body.param}&${getAccessKey()}`;
  },

  loginUser(): string {
    return `${DOMAIN}user/login`;
  },

  createUser(): string {
    return `${DOMAIN}user/create`;
  },

  followToggle(): string {
    return `${DOMAIN}user/follow?${getAccessKey()}`;
  },

  sendVerifyCode(): string {
    return `${DOMAIN}user/sendverifycode?${getAccessKey()}`;
  },

  getUserProfileInfo(): string {
    return `${DOMAIN}user/profile?${getAccessKey()}`;
  },

  createTeam(usertoken: string): string {
    return `${DOMAIN}team/create?userid=${usertoken}&${getAccessKey()}`;
  },
  memberInvite: () => {
    const accesskey = `token=${localStorage.getItem("token")}`
    return `${DOMAIN}member/invite?${accesskey}`
  },
  memberRemove: () => {
    const accesskey = `token=${localStorage.getItem("token")}`
    return `${DOMAIN}member/remove?${accesskey}`
  },
  listUserTeam(usertoken: string): string {
    return `${DOMAIN}team/user/list?userid=${usertoken}&${getAccessKey()}`;
  },

   matchTeamList: ( teamid:string | number, usertoken: string, tab: string, sub_status: string,role:string) => {
    
        return `${DOMAIN}match/team/list?status=${tab}&sub_status=${sub_status}&team_id=${teamid}&userid=${usertoken}&role=${role}&${getAccessKey()}`
    },
    guestMatchRequest: (usertoken:string, teamid:string, accept:string) => {
        const accesskey = `token=${localStorage.getItem("token")}`
        return `${DOMAIN}match/request/send/list?accept=${accept}&team_id=${teamid}&userid=${usertoken}&${accesskey}`
    },
 
  listUserSportTeam(body: { uid: string }): string {
    return `${DOMAIN}team/sport/user/list?uid=${body.uid}&${getAccessKey()}`;
  },

  listTeamMember(body: {
    team_id: string;
    team_name: string;
    type: string;
  }): string {
    const { team_id, team_name, type } = body;
    return `${DOMAIN}team/member/list?type=${type}&team_id=${team_id}&team_name=${team_name}&${getAccessKey()}`;
  },

  createMatch(usertoken: string): string {
    return `${DOMAIN}match/create?userid=${usertoken}&${getAccessKey()}`;
  },

  createMatchRequest(usertoken: string): string {
    return `${DOMAIN}match/request/create?userid=${usertoken}&${getAccessKey()}`;
  },

  getMatchRequesterInfo(match_request_id: string): string {
    return `${DOMAIN}match/requester/info?match_request_id=${match_request_id}&${getAccessKey()}`;
  },

  /*listMatch(body: ListMatchBody): string {
    const {
      match_city_id = '',
      query = '',
      page_index,
      page_size,
      teamid,
      param = '',
      guestuserid = '',
      hostuserid = '',
      usertoken = '',
      status = 'active',
      sport_field_id
    } = body;

    return `${DOMAIN}match/list?match_city_id=${match_city_id}&query=${query}&page_index=${page_index}&page_size=${page_size}&team_id=${teamid}&param=${param}&guest_user_id=${guestuserid}&host_user_id=${hostuserid}&userid=${usertoken}&status=${status}&sport_field_id=${sport_field_id}&${getAccessKey()}`;
  },*/

  detailMatch(matchid: string): string {
    return `${DOMAIN}match/detail?match_id=${matchid}&${getAccessKey()}`;
  },

  teamInfo(teamid: string): string {
    return `${DOMAIN}team/info?team_id=${teamid}&${getAccessKey()}`;
  },

  teamProfile(teamid: string): string {
    return `${DOMAIN}team/profile?team_id=${teamid}&${getAccessKey()}`;
  },

  teamUpdate(): string {
    return `${DOMAIN}team/update?${getAccessKey()}`;
  },

  teamIdentifierChecking(identifier: string): string {
    return `${DOMAIN}team/check/identifier?team_identifier=${identifier}&${getAccessKey()}`;
  },
  provinceWithCityList: (province_id: string): string => {
    const accesskey = `token=${localStorage.getItem("token")}`

    return `${DOMAIN}province/list?${accesskey}&province_id=${province_id}`

  },

  listSports: (body: any) => {
    const { title, field_id, field_parent_id } = body
    const accesskey = `token=${localStorage.getItem("token")}`
    return `${DOMAIN}sport/list?${accesskey}&title=${title}&field_id=${field_id}&field_parent_id=${field_parent_id}`

  },
  fileUpload(section_id: string): string {
    return `${DOMAIN}file/upload?section_id=${section_id}&${getAccessKey()}`;
  }
};

export default ApiAdmin;
