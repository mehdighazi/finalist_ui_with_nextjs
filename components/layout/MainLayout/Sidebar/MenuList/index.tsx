'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
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

import { menuItems } from '@/components/menu-items';

/* ============================== */
/* Types */
/* ============================== */

// تایپ پایه برای منو آیتم‌ها
interface BaseMenuItem {
  id: string;
  title: string;
  caption?: string;
  icon?: React.ElementType;
  target?: boolean;
  external?: boolean;
}

// تایپ برای آیتم ساده
interface ItemMenuItem extends BaseMenuItem {
  type: 'item';
  url: string;
}

// تایپ برای گروه تودرتو
interface CollapseMenuItem extends BaseMenuItem {
  type: 'collapse';
  children: MenuItemType[];
}

// تایپ برای گروه اصلی
interface GroupMenuItem extends BaseMenuItem {
  type: 'group';
  children: MenuItemType[];
}

// یونیون تایپ برای همه موارد
type MenuItemType = ItemMenuItem | CollapseMenuItem | GroupMenuItem;

// بررسی می‌کنیم که menuItems واقعاً چه ساختاری دارد
// اگر structure متفاوت است، این تایپ‌ها را اصلاح کنید

/* ============================== */
/* Components */
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
  const theme = useTheme();
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
          '&:hover': { backgroundColor: theme.palette.grey[200] },
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
    <>
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
    </>
  );
};

/* ============================== */
/* MenuList Component */
/* ============================== */

const MenuList: React.FC = () => {
  // اضافه کردن type assertion برای رفع خطا
  const items = (menuItems as { items: MenuItemType[] }).items || [];
  
  return (
    <>
      {items.map((item) => item.type === 'group' && (
        <NavGroup key={item.id} item={item as GroupMenuItem} />
      ))}
    </>
  );
};

export default MenuList;