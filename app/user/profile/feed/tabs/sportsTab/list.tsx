'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation'; // استفاده از هوک استاندارد نکست‌جی‌اس برای جلوگیری از خطای SSR
import { useTheme } from '@mui/material/styles';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
} from '@mui/material';
import { FiberManualRecord } from '@mui/icons-material';
import { IconChevronLeft, IconPlus, IconMinus } from '@tabler/icons-react';
import api from '@/components/api/api';
import dataHandler from '@/components/api/dataHandler';

import {
  IconActivityHeartbeat,
  IconHomeBolt,
  IconKey,
  IconMedal,
  IconPennant2,
  IconUserExclamation,
  IconUsers,
} from "@tabler/icons-react";

/* ============================== */
/* Types & Interfaces */
/* ============================== */

interface BaseMenuItem {
  id: string;
  title: string;
  caption?: string;
  icon?: React.ElementType;
  target?: boolean;
  external?: boolean;
}

interface ItemMenuItem extends BaseMenuItem {
  type: 'item';
  url: string;
  logo?: string;
}

interface CollapseMenuItem extends BaseMenuItem {
  type: 'collapse';
  children: MenuItemType[];
}

interface GroupMenuItem extends BaseMenuItem {
  type: 'group';
  children: MenuItemType[];
}

type MenuItemType = ItemMenuItem | CollapseMenuItem | GroupMenuItem;

// تایپ داده‌های ورودی از API کامپوننت ورزشی
interface ApiTeamItem {
  team_id: string | number;
  team_name: string;
  logo?: string;
  sport?: {
    field_title?: string;
  };
}

interface ApiResponseData {
  teams: ApiTeamItem[];
}

/* ============================== */
/* Constants & Icons */
/* ============================== */
const icons = {
  IconKey,
  IconMedal,
  IconUsers,
  IconUserExclamation,
  IconPennant2,
  IconHomeBolt,
  IconActivityHeartbeat
};

/* ============================== */
/* Inner Components */
/* ============================== */

const NavItem: React.FC<{ item: ItemMenuItem; level: number }> = ({ item, level }) => {
  const theme = useTheme();
  const Icon = item.icon;
  const itemIcon = Icon ? <Icon stroke={1.5} size="1.3rem" /> : <FiberManualRecord fontSize={level > 0 ? 'inherit' : 'medium'} />;
  const itemTarget = item.target ? '_blank' : '_self';

  return (
    <ListItemButton
      component={NextLink}
      href={item.url ?? '#'}
      target={itemTarget}
      sx={{
        pl: `${level * 24}px`,
        minWidth: '100%',
        mb: 0.5,
        display: 'flex',
        alignItems: 'flex-start',
        '&:hover': { backgroundColor: theme.palette.grey[200] },
      }}
    >
      <ListItemIcon sx={{ minWidth: Icon ? 36 : 18 }}>{itemIcon}</ListItemIcon>
      <ListItemText
        primary={<Typography align="right">{item.title}</Typography>}
        secondary={
          item.caption && (
            <Typography align="right" variant="caption" display="block">
              {item.caption}
            </Typography>
          )
        }
      />
      <IconChevronLeft stroke={1.5} size="1rem" style={{ margin: 'auto 0' }} />
    </ListItemButton>
  );
};

const NavCollapse: React.FC<{ item: CollapseMenuItem; level: number }> = ({ item, level }) => {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;

  const handleClick = () => setOpen(!open);

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{
          pl: `${level * 24}px`,
          mb: 0.5,
          display: 'flex',
          alignItems: 'flex-start',
          '&:hover': { backgroundColor: 'grey.200' },
        }}
      >
        <ListItemIcon sx={{ minWidth: Icon ? 36 : 18 }}>{Icon && <Icon stroke={1.5} size="1.3rem" />}</ListItemIcon>
        <ListItemText
          primary={<Typography align="right">{item.title}</Typography>}
          secondary={
            item.caption && (
              <Typography align="right" variant="caption" display="block">
                {item.caption}
              </Typography>
            )
          }
        />
        {open ? <IconMinus stroke={1.5} size="1rem" /> : <IconPlus stroke={1.5} size="1rem" />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.children?.map((child) =>
            child.type === 'collapse' ? (
              <NavCollapse key={child.id} item={child as CollapseMenuItem} level={level + 1} />
            ) : (
              <NavItem key={child.id} item={child as ItemMenuItem} level={level + 1} />
            )
          )}
        </List>
      </Collapse>
    </>
  );
};

const NavGroup: React.FC<{ item: GroupMenuItem }> = ({ item }) => {
  const theme = useTheme();
  return (
    <List
      subheader={
        item.title && (
          <Typography variant="caption" sx={{ ...theme.typography.body1 }} display="block" gutterBottom>
            {item.title}
            {item.caption && (
              <Typography variant="caption" sx={{ ...theme.typography.caption }} display="block" gutterBottom>
                {item.caption}
              </Typography>
            )}
          </Typography>
        )
      }
    >
      {item.children?.map((menu) =>
        menu.type === 'collapse' ? (
          <NavCollapse key={menu.id} item={menu as CollapseMenuItem} level={1} />
        ) : (
          <NavItem key={menu.id} item={menu as ItemMenuItem} level={1} />
        )
      )}
    </List>
  );
};

/* ============================== */
/* Main MenuList Component */
/* ============================== */

const MenuList: React.FC = () => {
  const searchParams = useSearchParams();
  const [menuData, setMenuData] = useState<GroupMenuItem | null>(null);

  const transformData = (apiData: ApiResponseData): GroupMenuItem => {
    // گروه‌بندی تیم‌ها بر اساس نام رشته ورزشی
    const groupedSports = apiData.teams.reduce<Record<string, ApiTeamItem[]>>((acc, team) => {
      const sportTitle = team.sport?.field_title || "نامشخص";
      if (!acc[sportTitle]) acc[sportTitle] = [];
      acc[sportTitle].push(team);
      return acc;
    }, {});

    return {
      id: 'user',
      title: '',
      type: 'group',
      icon: icons.IconUsers,
      children: Object.keys(groupedSports).map((sportTitle): CollapseMenuItem => ({
        id: sportTitle,
        title: sportTitle,
        type: 'collapse',
        icon: icons.IconUsers,
        children: groupedSports[sportTitle].map((team): ItemMenuItem => ({
          id: String(team.team_id),
          title: team.team_name,
          type: 'item',
          url: `/app/team/profile?tid=${team.team_id}`,
          target: true,
          logo: team.logo
        }))
      }))
    };
  };

  const getData = async (uid: string | null) => {
    if (!uid) return;

    const result = dataHandler(api.listUserSportTeam({ uid }), "get", "");
    try {
      result(async function (data: { result: ApiResponseData }, status: boolean) {
        if (status && data?.result?.teams?.length > 0) {
          setMenuData(transformData(data.result));
        }
      });
    } catch (error) {
      console.error("Failed to fetch sidebar menu items:", error);
    }
  };

  useEffect(() => {
    const uid = searchParams.get('uid');
    getData(uid);
  }, [searchParams]);

  if (!menuData) return null; // جلوگیری از رندر تا زمان لود و تبدیل داده‌ها

  return <NavGroup item={menuData} />;
};

export default MenuList;