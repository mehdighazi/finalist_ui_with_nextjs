// assets
import {IconPower,IconHeadset,IconUser,IconMail,IconKey, IconMedal,IconUsers,IconUserExclamation,IconExclamationCircleFilled,IconPennant2,IconHomeBolt,IconActivityHeartbeat,IconHelp} from '@tabler/icons-react';

// constant
const icons = {
    IconKey,
    IconMedal,
    IconUsers,
    IconUserExclamation,
    IconPennant2,
    IconHomeBolt,
    IconActivityHeartbeat,
    IconMail,
    IconUser,IconExclamationCircleFilled,IconHeadset,IconPower,
    IconHelp
};


// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {

    id: 'app',
    title: '',
    caption: ' ',
    type: 'group',
   // icon: icons.IconMedal,
    children: [
        {
            id: 'user',
            title: 'تنظیمات کاربری',
            type: 'collapse',
            url: '',
            icon: icons.IconUser,
            children: [
                {
                    id: 'create',
                    title: 'پروفایل',
                    type: 'item',
                    url: '/app/user/profile',
                    target: true,
                  //  icon: icons.IconUserExclamation,
                },
                {
                    id: 'create',
                    title: 'ویرایش حساب کابری',
                    type: 'item',
                    url: '/app/user/profile/edit',
                    target: true,
                  //  icon: icons.IconUserExclamation,
                },
                {
                    id: 'invited',
                    title: 'دعوت نامه های عضویت',
                    type: 'item',
                    url: '/app/user/profile/invited',
                    target: true,
                   // icon: icons.IconUserExclamation,
                }

            ]
        },
        {
            id: 'userMatch',
            title: 'مسابقات',
            type: 'collapse',
            url: '',
            icon: icons.IconPennant2,
            children: [
                {
                    id: 'list',
                    title: 'تالار مسابقات',
                    type: 'item',
                    url: '/app/match/list',
                    target: true,
                  //  icon:icons.IconHomeBolt  ,

                },
                {
                    id: 'active',
                    title: 'مسابقات من',
                    type: 'item',
                    url: '/app/user/match/mymatchs',
                    target: true,
                  //  icon:icons.IconActivityHeartbeat,
                },
                {
                    id: 'create',
                    title: 'ایجاد مسابقه',
                    type: 'item',
                    url: '/app/user/match/create',
                    target: true
                },
                {
                    id: 'history',
                    title: 'تاریخچه مسابقات',
                    type: 'item',
                    url: '/app/user/match/history',
                    target: true
                }
            ]
        },
        {
            id: 'team',
            title: 'تیم',
            type: 'collapse',
            url: '',
            icon: icons.IconUsers,
            children: [
                {
                    id: 'create',
                    title: 'ایجاد تیم',
                    type: 'item',
                    url: '/app/user/team/create',
                    target: true,
                   // icon: icons.IconMedal,
                },
                {
                    id: 'edit',
                    title: 'ویرایش اعضا',
                    type: 'item',
                    url: '/app/user/team/member/edit',
                    target: true
                },

                {
                    id: 'history',
                    title: 'نتایج',
                    type: 'item',
                    url: '/app/user/team/member',
                    target: true
                },

            ]
        },
        {
            id: 'message',
            title: 'پیام ها',
            type: 'item',
            url: '/app/user/profile/notification',
            icon: icons.IconMail,

        },
        {
            id: 'terms',
            title: 'قوانین و مقررات',
            type: 'item',
            url: '/other/terms',
            icon: icons.IconExclamationCircleFilled,

        }, 
        
        {
            id: 'support',
            title: 'راهنما',
            type: 'item',
            url: '/other/guide',
            icon: icons.IconHelp,

        },
        {
            id: 'support',
            title: 'پشتیبانی',
            type: 'item',
            url: '/app/support',
            icon: icons.IconHeadset,

        },

        {
            id: 'exit',
            title: 'خروج',
            type: 'item',
            url: '/user/login?p=exit',
            icon: icons.IconPower,

        },



    ]
};

export default pages;
