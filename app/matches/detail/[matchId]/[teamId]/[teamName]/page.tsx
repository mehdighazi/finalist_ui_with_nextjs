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
// فقط یک default export در این فایل
export default async function DetailMatchClient({ params, searchParams }: HomeProps) {

  const resolvedParams = await params;


  return (
    <>
      <Box sx={{ p: 1.5 }}>
        <MatchDetaiLayout>
          {<MatchDetail params={Promise.resolve({ slug: [resolvedParams.matchId, resolvedParams.teamId, resolvedParams.teamName] })} />}
        </MatchDetaiLayout>
      </Box>

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