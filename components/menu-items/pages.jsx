// assets
import {
  IconPower,
  IconHeadset,
  IconUser,
  IconMail,
  IconKey,
  IconMedal,
  IconUsers,
  IconUserExclamation,
  IconExclamationCircleFilled,
  IconPennant2,
  IconHomeBolt,
  IconActivityHeartbeat,
  IconHelp
} from '@tabler/icons-react';

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
  IconUser,
  IconExclamationCircleFilled,
  IconHeadset,
  IconPower,
  IconHelp
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'app',
  title: '',
  caption: ' ',
  type: 'group',
  children: [
    {
      id: 'user-settings',
      title: 'تنظیمات کاربری',
      type: 'collapse',
      url: '#',
      icon: icons.IconUser,
      children: [
        {
          id: 'user-profile',
          title: 'پروفایل',
          type: 'item',
          url: '/user/profile',
          target: true
        },
        {
          id: 'user-edit',
          title: 'ویرایش حساب کابری',
          type: 'item',
          url: '/user/profile/edit',
          target: true
        },
        {
          id: 'user-invited',
          title: 'دعوت نامه های عضویت',
          type: 'item',
          url: '/app/user/profile/invited',
          target: true
        }
      ]
    },
    {
      id: 'user-match',
      title: 'مسابقات',
      type: 'collapse',
      url: '#',
      icon: icons.IconPennant2,
      children: [
        {
          id: 'match-list',
          title: 'تالار مسابقات',
          type: 'item',
          url: '/matches/list/all',
          target: true
        },
        {
          id: 'match-active',
          title: 'مسابقات من',
          type: 'item',
          url: '/user/match/mymatchs',
          target: true
        },
        {
          id: 'match-create',
          title: 'ایجاد مسابقه',
          type: 'item',
          url: '/user/match/create',
          target: true
        },
        {
          id: 'match-history',
          title: 'تاریخچه مسابقات',
          type: 'item',
          url: '/app/user/match/history',
          target: true
        }
      ]
    },
    {
      id: 'team-management',
      title: 'تیم',
      type: 'collapse',
      url: '#',
      icon: icons.IconUsers,
      children: [
        {
          id: 'team-create',
          title: 'ایجاد تیم',
          type: 'item',
          url: '/user/team/create',
          target: true
        },
        {
          id: 'team-edit',
          title: 'ویرایش اعضا',
          type: 'item',
          url: '/user/team/member/setting',
          target: true
        },
        {
          id: 'team-history',
          title: 'نتایج',
          type: 'item',
          url: '/user/team/member',
          target: true
        }
      ]
    },
    {
      id: 'messages',
      title: 'پیام ها',
      type: 'item',
      url: '/app/user/profile/notification',
      icon: icons.IconMail
    },
    {
      id: 'terms',
      title: 'قوانین و مقررات',
      type: 'item',
      url: '/other/terms',
      icon: icons.IconExclamationCircleFilled
    },
    {
      id: 'guide',
      title: 'راهنما',
      type: 'item',
      url: '/other/guide',
      icon: icons.IconHelp
    },
    {
      id: 'support',
      title: 'پشتیبانی',
      type: 'item',
      url: '/app/support',
      icon: icons.IconHeadset
    },
    {
      id: 'logout',
      title: 'خروج',
      type: 'item',
      url: '/user/login?p=exit',
      icon: icons.IconPower
    }
  ]
};

export default pages;
