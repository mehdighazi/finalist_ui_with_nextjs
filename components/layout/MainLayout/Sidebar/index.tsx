import PropTypes from 'prop-types';
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery, IconButton, Chip, Badge } from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';
import { IconX } from '@tabler/icons-react'

// project imports
import MenuList from './MenuList';
import CustomAvatar from '@/components/ui-component/extended/Avatar'
import DefaultAvatar from '@/components/assets/images/screen/default-avatar.jpg'
import { styled } from "@mui/styles";
import { hideMenu } from '@/components/store/slices/sidebarMenuSlice'
import api from '@/components/api/api'
import dataHandler from '@/components/api/dataHandler'
import { hostAddress } from '@/components/api/api'
import { StaticImageData } from 'next/image';
import type { UserInfo } from '@/types/user';

// تابع کمکی برای تبدیل تصویر
const getAvatarSrc = (avatar: any): string => {
  if (!avatar) return DefaultAvatar.src;
  if (typeof avatar === 'string') return avatar;
  if (typeof avatar === 'object') {
    if (avatar.path) return `${hostAddress}/${avatar.path}`;
    if (avatar.src) return avatar.src;
  }
  return DefaultAvatar.src;
};

interface SidebarProps {
  window?: any;
  rlPadding?: string;
  userInfo?: UserInfo | null;
  hasNotification?: boolean;
  notificationCount?: number;
}

const Sidebar: React.FC<SidebarProps> = ({ window, rlPadding, userInfo, hasNotification = false, notificationCount = 0 }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const visible = useSelector((state: any) => state.sidebarMenu.visible);
  const profileUserInfo = userInfo ?? { fullname: 'کاربر', avatar: null };


  

  const handleClose = () => {
    if (!matchUpMd) {
      dispatch(hideMenu());
    }
  };

  const drawer = (
    <>
      <Box sx={{ display: 'flex', p: 2, background: theme.palette.secondary.light, direction: 'rtl', alignItems: 'center' }}>
        <Chip
          sx={{ height: 48, borderRadius: 27, fontSize: 14 }}
          icon={
           
              <CustomAvatar
                size="sm"
                src={getAvatarSrc(profileUserInfo?.avatar)}
                aria-label="profile picture"
              >
                {(profileUserInfo?.fullname || 'کاربر').charAt(0)}
              </CustomAvatar>
           
          }
          label={profileUserInfo?.fullname || 'کاربر'}
          variant="outlined"
        />
        <Box sx={{ flexGrow: 1 }} />
        {!matchUpMd && (
          <IconButton onClick={handleClose}>
            <IconX />
          </IconButton>
        )}
      </Box>

      <BrowserView>
        <PerfectScrollbar style={{ height: matchUpMd ? 'calc(100vh - 88px)' : 'calc(100vh - 56px)', padding: '0 16px' }}>
          <MenuList hasNotification={hasNotification} notificationCount={notificationCount} />
        </PerfectScrollbar>
      </BrowserView>

      <MobileView>
        <Box sx={{ px: 2 }}>
          <MenuList hasNotification={hasNotification} notificationCount={notificationCount} />
        </Box>
      </MobileView>
    </>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <div id="drawer-container" style={{ position: 'relative' }}>
      <Drawer
        anchor="right"
        variant={matchUpMd ? "permanent" : "temporary"}
        open={matchUpMd ? true : visible}
        onClose={handleClose}
        sx={{
          width: 320,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 320,
            right: 0,
            left: 'auto',
            boxSizing: 'border-box'
          }
        }}
      >
        {drawer}
      </Drawer>
    </div>
  );
};

export default Sidebar;