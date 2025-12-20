import PropTypes from 'prop-types';
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery, IconButton,Chip } from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';
//taqbler icon
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

// ==============================|| SIDEBAR DRAWER ||============================== //
interface SidebarProps {
  window?: any;
  rlPadding?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ window, rlPadding }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const visible = useSelector((state: any) => state.sidebarMenu.visible);
  const [userInfo, setUserInfo] = React.useState<any>({ fullname: 'کاربر', avatar: null });

  const handleClose = () => dispatch(hideMenu());

  const drawer = (
    <>
      <Box sx={{ display: 'flex', p: 2, background: theme.palette.secondary.light, direction: 'rtl', alignItems: 'center' }}>
        <Chip
          sx={{ height: 48, borderRadius: 27, fontSize: 14 }}
          icon={
            <CustomAvatar
              size="sm"
              src={userInfo.avatar ? `${hostAddress}/${userInfo.avatar.path}` : DefaultAvatar}
              aria-label="profile picture"
            >
              {userInfo.fullname[0]}
            </CustomAvatar>
          }
          label={userInfo.fullname}
          variant="outlined"
        />
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={handleClose}>
          <IconX />
        </IconButton>
      </Box>

      <BrowserView>
        <PerfectScrollbar style={{ height: matchUpMd ? 'calc(100vh - 88px)' : 'calc(100vh - 56px)', padding: '0 16px' }}>
          <MenuList />
        </PerfectScrollbar>
      </BrowserView>

      <MobileView>
        <Box sx={{ px: 2 }}>
          <MenuList />
        </Box>
      </MobileView>
    </>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <div id="drawer-container" style={{ position: 'relative' }}>
      <Drawer
        container={container}
        transitionDuration={{ enter: 100, exit: matchUpMd ? 10 : 500 }}
        sx={{
          '& .MuiDrawer-paper': {
            width: matchUpMd ? '40%' : '100%',
            marginRight: matchUpMd ? rlPadding : 0,
            borderRadius: 5,
            boxShadow: 3
          }
        }}
        anchor="right"
        open={visible}
        onClose={handleClose}
      >
        {drawer}
      </Drawer>
    </div>
  );
};



export default Sidebar;