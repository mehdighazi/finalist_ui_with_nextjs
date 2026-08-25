import React from 'react';
import {
  Avatar,
  Chip,
  Divider,
  Stack,
  Typography,
  Box
} from '@mui/material';

import {
  IconCalendar,
  IconMapPin
} from '@tabler/icons-react';

import MainCard from '@/components/ui-component/cards/MainCard';

interface Team {
  team_id: number;
  team_name: string;
  logo?: any;
}

interface Match {
  match_id: number;
  match_time?: string;
  match_date?: string;

  match_type?: string;
  match_location_address?: string;

  host_team?: Team;
  guest_team?: Team | null;

  match_sport?: {
    sport_field_id: number;
    field_title: string;
  };

  city_match?: {
    city_id: number;
    city_title: string;
  };

  province_match?: {
    province_id: number;
    province_title: string;
  };
}

interface UpcomingMatchCardProps {
  match: Match;
}

export const UpcomingMatchCard: React.FC<UpcomingMatchCardProps> = ({
  match
}) => {
 const HOST = process.env.NEXT_PUBLIC_HOST_API_URL ?? '';
    const PORT = process.env.NEXT_PUBLIC_HOST_PORT
        ? `:${process.env.NEXT_PUBLIC_HOST_PORT}`
        : '';

  const hostTeam = match?.host_team?.team_name;
  const guestTeam = match?.guest_team?.team_name;

  return (
    <MainCard
      border
      contentSX={{ p: 1.5 }}
      sx={{
        width: 260,
        minWidth: 260,

        transition: '0.3s',

        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.12)'
        }
      }}
    >

      <Stack spacing={1.2}>

        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >

          <Chip
            size="small"
            color={
              match?.match_type === 'official'
                ? 'primary'
                : 'error'
            }
            label={
              match?.match_type === 'official'
                ? 'دوستانه'
                : 'رسمی'
            }
          />

          <Typography
            variant="caption"
            color="text.secondary"
            noWrap
          >
            <span>
              {match?.match_sport?.field_title || 'نامشخص'}
            </span>
          </Typography>

        </Stack>


        {/* Teams */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >

          {/* Host */}
          <Stack
            alignItems="center"
            spacing={0.5}
            sx={{
              width: 85,
              minWidth: 85
            }}
          >

            <Avatar
          
              src={`${HOST}${PORT}/${match?.host_team?.logo?.logo_path||""}`}
              sx={{
                width: 40,
                height: 40
              }}
            >
             <Typography sx={{p:1}}>{hostTeam?.charAt(0)}</Typography>
            </Avatar>

            <Typography
              variant="caption"
              fontWeight={600}
              textAlign="center"
              noWrap
              sx={{
                width: '100%'
              }}
            >
              <span>
                {hostTeam || 'تیم میزبان'}
              </span>
            </Typography>

          </Stack>


          {/* VS */}
          <Typography
            variant="caption"
            fontWeight={700}
            color="text.secondary"
          >
            <span>VS</span>
          </Typography>


          {/* Guest */}
          <Stack
            alignItems="center"
            spacing={0.5}
            sx={{
              width: 85,
              minWidth: 85
            }}
          >

            <Avatar
             src={`${HOST}${PORT}/${match?.guest_team?.logo?.logo_path||""}`}
             
              sx={{
                width: 40,
                height: 40
              }}
            >
           <Typography sx={{p:1}}> {guestTeam?.charAt(0)}</Typography>
            </Avatar>

            <Typography
              variant="caption"
              fontWeight={600}
              textAlign="center"
              noWrap
              sx={{
                width: '100%'
              }}
            >
              <span>
                {guestTeam || 'در انتظار حریف'}
              </span>
            </Typography>

          </Stack>

        </Stack>


        <Divider />


        {/* Date & Time */}
        <Stack
          direction="row"
          spacing={0.7}
          alignItems="center"
        >

          <IconCalendar size={15} />

          <Typography
            variant="caption"
            color="text.secondary"
          >
            <span>
              {match?.match_date
                ? new Date(match?.match_date).toLocaleDateString('fa-IR')
                : 'تاریخ نامشخص'
              }

              {' - '}

              {match?.match_time?.substring(0, 5) || '--:--'}
            </span>
          </Typography>

        </Stack>



        {/* Location */}
        <Box sx={{pb:1}}>
        {match?.match_location_address && (
          <Stack
            direction="row"
            spacing={0.7}
            alignItems="center"
          >

            <IconMapPin size={15} />

            <Typography
              variant="caption"
              color="text.secondary"
              noWrap
              sx={{
                maxWidth: 210
              }}
            >
              <span>
                {match?.match_location_address}
              </span>
            </Typography>

          </Stack>
        )}
        </Box>

      </Stack>

    </MainCard>
  );
};
export default UpcomingMatchCard;