import React from 'react';
import { Card, CardContent, Avatar, Typography, Stack, Box, Tooltip } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { IconAccessPoint, IconTrophy, IconMedal } from '@tabler/icons-react';
import { hostAddress } from '@/components/api/api';

// استایل سفارشی برای کارت‌ها همراه با تغییر شکل کرسر به دست (pointer)
const StyledTeamCard = styled(Card)(({ theme }) => ({
  position: 'relative', // برای تنظیم موقعیت مطلق آیکون طلایی در گوشه کارت
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
  borderRadius: theme.shape.borderRadius * 2,
  cursor: 'pointer', // تبدیل کرسر موس به حالت دست هنگام هاور
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
    borderColor: theme.palette.primary.main,
  },
}));

interface TeamCardProps {
  team: {
    team_id: number;
    team_name: string;
   
      field_title: string;
  
    logo: string|null;
     
    member_role:string;
  };
}

export const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const theme = useTheme();

  // بررسی اینکه آیا کاربر سرپرست تیم است یا خیر
  const isSupervisor = team.member_role === 'supervisor';

  return (
    <StyledTeamCard elevation={0}>
      {/* نمایش آیکون مدال طلایی در گوشه بالا سمت چپ کارت (فقط در صورت سرپرست بودن) */}
      {isSupervisor && (
        <Tooltip title="سرپرست تیم" placement="top" arrow>
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              left: 12, // قرارگیری در گوشه چپ به دلیل RTL بودن متن اصلی کارت
              color: '#FFD700', // رنگ طلایی استاندارد (Gold)
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              filter: 'drop-shadow(0px 2px 4px rgba(255, 215, 0, 0.2))'
            }}
          >
            <IconMedal size={22} stroke={2} />
          </Box>
        </Tooltip>
      )}

      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          
          <Stack direction="row" spacing={2} alignItems="center">
            {/* بخش آواتار / لوگوی تیم */}
     
            <Avatar
              src={`${hostAddress}${team?.logo}`}
              alt={team.team_name}
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                backgroundColor: theme.palette.primary.light + '20',
                color: theme.palette.primary.main
              }}
            >
              <IconTrophy size={28} stroke={1.5} />
            </Avatar>

            {/* نام تیم و رشته ورزشی */}
            <Stack spacing={0.5}>
              <Typography variant="h5" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                {team.team_name}
              </Typography>
              
              <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'text.secondary' }}>
                <IconAccessPoint size={14} />
                <Typography variant="body2" sx={{ fontSize: '0.65rem' }}>
                  {team.field_title}
                </Typography>
              </Stack>
            </Stack>
          </Stack>

        </Stack>
      </CardContent>
    </StyledTeamCard>
  );
};