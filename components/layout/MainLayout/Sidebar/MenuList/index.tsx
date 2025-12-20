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

interface MenuItemType {
  id: string;
  type: 'group' | 'collapse' | 'item';
  title: string;
  caption?: string;
  url?: string;
  icon?: React.ElementType;
  children?: MenuItemType[];
  target?: boolean;
  external?: boolean;
}

/* ============================== */
/* Components */
/* ============================== */

const NavItem: React.FC<{ item: MenuItemType; level: number }> = ({ item, level }) => {
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

const NavCollapse: React.FC<{ item: MenuItemType; level: number }> = ({ item, level }) => {
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
              <NavCollapse key={child.id} item={child} level={level + 1} />
            ) : (
              <NavItem key={child.id} item={child} level={level + 1} />
            )
          )}
        </List>
      </Collapse>
    </>
  );
};

const NavGroup: React.FC<{ item: MenuItemType }> = ({ item }) => {
  const theme = useTheme();
  return (
    <>
      <List
        subheader={
          item.title && (
            <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
              {item.title}
              {item.caption && (
                <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {item.children?.map((menu) =>
          menu.type === 'collapse' ? (
            <NavCollapse key={menu.id} item={menu} level={1} />
          ) : (
            <NavItem key={menu.id} item={menu} level={1} />
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
  return (
    <>
      {menuItems.items.map((item) => item.type === 'group' && <NavGroup key={item.id} item={item} />)}
    </>
  );
};

export default MenuList;
