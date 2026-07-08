'use client';

import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

// redux
import type { AppDispatch } from '@/components/store';
import { showMenu } from '@/components/store/slices/sidebarMenuSlice';

// MUI
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  ButtonBase,
  Typography,
  Button
} from '@mui/material';

// project
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import SiteLogo from './siteLogo';
import LogoComponent from '@/components/ui-component/Logo';

// assets
import { IconMenu2 } from '@tabler/icons-react';

// types
import type { UserInfo } from '@/types/user';


/* ============================== */
/* Types */
/* ============================== */

interface HeaderProps {
  handleLeftDrawerToggle?: () => void;
  userInfo?: UserInfo | null;
}

/* ============================== */
/* Component */
/* ============================== */

const Header: React.FC<HeaderProps> = ({
  handleLeftDrawerToggle,
  userInfo
}) => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const logoimg = '/images/logo.png';

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {/* Logo */}
      <Box component="span" sx={{ display: 'block' }}>
       {/* <SiteLogo /> */}
       {<LogoComponent width="50" height="50" />}
        <Typography fontSize={14}>فینالیست</Typography>
      </Box>

      {/* Right side */}
      {!userInfo ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            marginLeft: 'auto'
          }}
        >
          {/*<NotificationSection />*/}

          <ButtonBase sx={{ borderRadius: 0, overflow: 'hidden', m: 0.5 }}>
            <Avatar
              variant="rounded"
              sx={{
                ...theme.typography.body1,
                ...theme.typography.body2,
                transition: 'all .2s ease-in-out',
                background: theme.palette.grey[600],
                color: theme.palette.grey[400],
                '&:hover': {
                  background: theme.palette.grey[500],
                  color: theme.palette.grey[200]
                }
              }}
              onClick={() => dispatch(showMenu())}
            >
              <IconMenu2 stroke={1.5} size="1.3rem" />
            </Avatar>
          </ButtonBase>
        </Box>
      ) : (
        <Button
          variant="outlined"
          sx={{
            marginLeft: 'auto',
            borderColor: theme.palette.secondary.main,
            color: theme.palette.secondary.main,
            fontSize: 12,
            borderRadius: 2,
            px: 2,
            py: 0.7,
            '&:hover': {
              borderColor: theme.palette.secondary.main,
              color: theme.palette.secondary.main,
              background: 'rgba(199, 199, 199, 0.08)'
            }
          }}
          onClick={() => router.push('/user/login')}
        >
         <span>ورود/ثبت نام</span> 
        </Button>
      )}
    </Box>
  );
};

export default Header;
