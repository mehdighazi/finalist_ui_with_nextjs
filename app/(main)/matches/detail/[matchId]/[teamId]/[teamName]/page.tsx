// app/detail/[matchId]/DetailMatchClient.tsx



import { Box, Button, Grid, List, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';


import MatchDetaiLayout from "@/layout/match/detail/layout";

//import CustomLoadingButton from '@/@/components/ui-component/utilities/CustomLoadingButton';
//import BottomSheetDialog from '@/@/components/ui-component/utilities/BottomSheet';
//import { showAlert } from '@/store/alertReducer';

//import { persiandate } from '@/utils/Lib';
//import { useDispatch } from 'react-redux';
import MatchDetail from './home/MatchesDeteilContent'


// کامپوننت BottomSheet
const BottomSheetContent: React.FC<{
  onChange: (value: boolean) => void;
  guestTeamName: string;
  hostTeamName: string;
}> = ({ onChange, guestTeamName, hostTeamName }) => {
  return (
    <Stack sx={{ p: 3 }}>
      <Typography variant="caption" component="p">
        {` شما در حال ارسال درخواست مسابقه با تیم `}
        <b>{guestTeamName}</b>
        {' به تیم '}
        <b>{hostTeamName}</b>
        {` می باشید درصورت تایید اطلاعات شما به جهت هماهنگی به سرپرست تیم حریف نمایش داده خواهد شد.ادامه میدهید؟`}
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button
          color="error"
          variant="outlined"
          onClick={() => onChange(false)}
        >
          <span>انصراف</span>
        </Button>
        <Button
          onClick={() => onChange(true)}
          color="success"
          variant="contained"
        >
          <span>بله</span>
        </Button>
      </Stack>
    </Stack>
  );
};
interface HomeProps {
  params: Promise<{
    matchId: string;
    teamId: string;
    teamName: string;
    filters?: string; // اگر نیاز دارید
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}
async function getMatchDetail(matchId: string) {
    const HOST = process.env.NEXT_PUBLIC_HOST_API_URL ?? 'http://localhost';
    const PORT = process.env.NEXT_PUBLIC_HOST_PORT ? `:${process.env.NEXT_PUBLIC_HOST_PORT}` : '';
    const DOMAIN = `${HOST}${PORT}/api/app/`;
    const apiUrl = `${DOMAIN}match/detail?match_id=${matchId}`;



    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        

        if (!response.ok) {
            console.error('HTTP Error:', response.status);
            return null;
        }

        const result = await response.json();


        // بررسی ساختارهای مختلف پاسخ
        let matchData = null;

        // ساختار 1: result.result.data
        if (result?.result?.data) {
            matchData = result.result.data;
            console.log('Found data in result.result.data');
        }
        // ساختار 2: result.data
        else if (result?.data) {
            matchData = result.data;
            console.log('Found data in result.data');
        }
        // ساختار 3: result.result
        else if (result?.result) {
            matchData = result.result;
            console.log('Found data in result.result');
        }
        // ساختار 4: خود result
        else if (result && typeof result === 'object') {
            matchData = result;
            console.log('Using result itself as data');
        }

        if (!matchData) {
            console.error('No data found in response. Response structure:', Object.keys(result));
            return null;
        }


        return matchData;

    } catch (error: any) {
        console.error('Fetch error:', error.message);
        return null;
    }
}
// فقط یک default export در این فایل
export default async function DetailMatchClient({ params, searchParams }: HomeProps) {

  const resolvedParams = await params;
  const matchId = resolvedParams.matchId;
  const matchDetail = await getMatchDetail(matchId);

  const matchDisplayData = {
    hostTeamName: matchDetail?.host_team?.team_name || matchDetail?.host_team_name || resolvedParams.teamName || 'نامشخص',
    hostTeamLogo: matchDetail?.host_team?.logo?.logo_path || matchDetail?.host_team_logo || '',
  };

  return (
    <>
     
        <MatchDetaiLayout
          hostTeamName={matchDisplayData.hostTeamName}
          hostTeamLogo={matchDisplayData.hostTeamLogo}
          matchId={resolvedParams.matchId}
          teamId={resolvedParams.teamId}
        >
          {
            <MatchDetail
              params={Promise.resolve({ slug: [resolvedParams.matchId, resolvedParams.teamId, resolvedParams.teamName] })}
              matchDetail={matchDetail}
            />
          }
        </MatchDetaiLayout>
    

      {/*!callRequestPage && (
        <Box sx={{ mb: '4rem', p: 2 }}>
          <CustomLoadingButton
            color="orange"
            inColor={theme.palette.grey[50]}
            padding={1}
            variant="contained"
            onChange={handleRequestClick}
            loading={isLoading}
          >
            <span>درخواست بازی</span>
          </CustomLoadingButton>
        </Box>
      )}

      {teamInfo && (
        <BottomSheetDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title="ارسال درخواست مسابقه"
          height="30%"
        >
          <BottomSheetContent
            hostTeamName={matchDisplayData.hostTeamName}
            guestTeamName={teamInfo.team_name}
            onChange={sendRequest}
          />
        </BottomSheetDialog>
      )*/}
    </>
  );
}