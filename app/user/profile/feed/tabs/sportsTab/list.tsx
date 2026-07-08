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
  Chip, Grid
} from '@mui/material';
import { FiberManualRecord } from '@mui/icons-material';
import { IconChevronLeft, IconPlus, IconMinus } from '@tabler/icons-react';
import api from '@/components/api/api';
import dataHandler from '@/components/api/dataHandler';
import {TeamCard} from '@/components/ui-component/utilities/TeamCardProfilePage';

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


// ۱. تعریف پروپ ورودی
interface ListTeamsProps {
  data: {
    user_id: number;
    first_name: string;
    last_name: string;
    teams: any[]; // یا تایپ دقیق‌تری که قبلاً نوشتیم
  };
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


/* ============================== */
/* Main MenuList Component */
/* ============================== */

const ListTeams: React.FC<ListTeamsProps> = ({ data }) => {
  const searchParams = useSearchParams();



const userTeams = data?.result?.teams || [];
 console.log(userTeams)

  return (
    <Box sx={{ mt: 2, px: 0.5 }}>
    <Grid container sx={{direction:"rtl"
    }} spacing={2} >
      {userTeams.length > 0 ? (
        userTeams.map((team: any) => (
          <Grid item xs={12} sm={6} md={4} key={team.team_id}>
            <TeamCard team={team} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Box sx={{ py: 4, textAlign: 'center', color: 'text.secondary' }}>
            <Typography variant="body1">شما هنوز در هیچ تیمی عضو نیستید.</Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  </Box>
  )
};

export default ListTeams;