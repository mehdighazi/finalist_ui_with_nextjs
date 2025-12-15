import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ProtectedRoute from './ProtectedRoute'; // مسیر صحیح رو تنظیم کن
import { Navigate, useNavigate, useLocation } from 'react-router-dom';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// sample page routing

//Sport app
//-------------login

//-----------------------------------------------app
const ListMatchs = Loadable(lazy(() => import('views/pages/app/matchs/list')));
const DetailMatchs = Loadable(lazy(() => import('views/pages/app/matchs/detail')));
const RequestsMatch = Loadable(lazy(() => import('views/pages/app/user/match/requests')));
const CreateMatch = Loadable(lazy(() => import('views/pages/app/user/match/create')));
const Matchs = Loadable(lazy(() => import('views/pages/app/matchs')));
const DetailTeam = Loadable(lazy(() => import('views/pages/app/team/detail')));
const App = Loadable(lazy(() => import('views/pages/app')));
const User = Loadable(lazy(() => import('views/pages/app/user')));
const UserMatchs = Loadable(lazy(() => import('views/pages/app/user/match')));
const UserMatchList = Loadable(lazy(() => import('views/pages/app/user/profile/page/tabs/currentMatchTab/list')));
const UserTeam = Loadable(lazy(() => import('views/pages/app/user/team')));
const UserProfile = Loadable(lazy(() => import('views/pages/app/user/profile/page')));
const UserProfileEdit = Loadable(lazy(() => import('views/pages/app/user/profile/edit')));
const MyMatchs = Loadable(lazy(() => import('views/pages/app/user/match/myMatchs')));
const TeamProfile = Loadable(lazy(() => import('views/pages/app/team/profile/page')));
const TeamProfileEdit = Loadable(lazy(() => import('views/pages/app/team/profile/edit')));
const CreateTeam = Loadable(lazy(() => import('views/pages/app/user/team/create')));
const TeamMember = Loadable(lazy(() => import('views/pages/app/user/team/member')));
const EditList = Loadable(lazy(() => import('views/pages/app/user/team/member/edit/list')));
const EditMember = Loadable(lazy(() => import('views/pages/app/user/team/member/edit')));
const InvitedUserList = Loadable(lazy(() => import('views/pages/app/user/profile/inviteList')));
const NotificationList = Loadable(lazy(() => import('views/pages/app/user/profile/notification')));

// ==============================|| MAIN ROUTING ||============================== //


const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            
            path: '/app',
            element:
             
                    <App />,
            children:
                [
                    {
                        path: 'user',
                        element: <User />,
                        children: [
                            {
                                path: 'profile',
                                element: <UserProfile />,


                            },
                            {
                                path: 'profile/edit',
                                element: <UserProfileEdit />
                            },

                            {
                                path: 'profile/invited',
                                element: <InvitedUserList />
                            },
                            {
                                path: 'profile/notification',
                                element: <NotificationList />
                            },
                            {
                                path: 'match',
                                element: <UserMatchs />,
                                children: [
                                    {

                                        path: 'create',
                                        element: <CreateMatch />,
                                    },
                                    {
                                        path: 'requests/:match_id/:team_id',
                                        element: <RequestsMatch />,

                                    },
                                    {

                                        path: 'mymatchs',
                                        element: <MyMatchs />,
                                    },

                                ]
                            },
                            {
                                path: 'team',
                                element: <UserTeam />,
                                children: [
                                    {

                                        path: 'create',
                                        element: <CreateTeam />,
                                    },

                                    {
                                        path: 'member',
                                        element: <TeamMember />,
                                        children: [
                                            {

                                                path: 'edit',
                                                element: <EditMember />,

                                            }, {

                                                path: 'edit/list/:teamid',
                                                element: <EditList />,

                                            }
                                        ]
                                    }
                                ]
                            }
                        ]


                    },
                    {
                        path: 'match',
                        element: <Matchs />,
                        children:
                            [
                                {
                                    path: 'list',
                                    element: <ListMatchs />,

                                },

                                {
                                    path: 'detail/:match_id/:htid/:htname',
                                    element: <DetailMatchs />,

                                },
                                {
                                    path: 'requests',
                                    element: <RequestsMatch />,

                                },

                            ]
                    },
                    {
                        path: 'team',

                        children: [
                            {
                                path: 'detail',
                                element: <DetailTeam />
                            },
                            {
                                path: 'profile',
                                element: <TeamProfile />
                            },
                            {

                                path: 'profile/edit',
                                element: <TeamProfileEdit />,
                            },

                        ]
                    }

                ]
        }


    ]
};

export default MainRoutes;
