// assets
import { IconBrandChrome, IconHelp, IconSquareRoundedPlus } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp, IconSquareRoundedPlus };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'home',
    type: 'group',
    children: [
        {
            id: 'profile',
            title: 'پروفایل',
            type: 'collapse',
            url: '/app/user/profile',
            icon: icons.IconBrandChrome,
            children: [
                {
                    id: 'profileEdit',
                    title: 'ویرایش',
                    type: 'item',
                    url: '/app/user/profile/edit',
                    icon: icons.IconBrandChrome,

                },
                {
                    id: 'teamCreate',
                    title: 'ساختن تیم',
                    type: 'item',
                    url: '/app/user/team/create',
                    icon: icons.IconBrandChrome,

                }
            ]
            // breadcrumbs: false
        },
        {
            id: 'team',
            title: 'پروفایل تیم',
            type: 'collapse',
            url: '/app/team/profile',
            icon: icons.IconBrandChrome,
            children: [
                {
                    id: 'editMember',
                    title: 'ویرایش اعضای تیم',
                    type: 'collapse',
                    url: '/app/user/team/member/edit',
                    icon: icons.IconBrandChrome,
                    children: [
                        {
                            id: 'editMemberList',
                            title: 'لیست اعضا',
                            type: 'item',
                            url: '/app/user/team/member/edit/list',
                        }
                    ]

                },
                {
                    id: 'editProfile',
                    title: 'ویرایش پروفایل تیم',
                    type: 'collapse',
                    url: '/app/team/profile/edit',
                    

                }

            ]
        }
        ,

        {
            id: 'match',
            title: 'مسابقات',
            type: 'collapse',
            url: '/app/match/list',
            icon: icons.IconBrandChrome,
            children: [
                {
                    id: 'createMatch',
                    title: 'ایجاد مسابقه',
                    type: 'item',
                    url: '/app/user/match/create',
                    icon: icons.IconBrandChrome,

                },
                {
                    id: 'detailMatch',
                    title: 'جزییات مسابقه',
                    type: 'item',
                    url: '/app/match/detail',
                    icon: icons.IconBrandChrome,

                }
            ]
        }


    ]
};

export default other;
