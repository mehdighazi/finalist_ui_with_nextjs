// app/detail/[matchId]/DetailMatchClient.tsx



import { Box, Button, Grid, List, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';


import MatchDetaiLayout from "@/layout/match/detail/layout";

//import CustomLoadingButton from '@/views/utilities/CustomLoadingButton';
//import BottomSheetDialog from '@/views/utilities/BottomSheet';
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


  //const theme = useTheme();
  //const router = useRouter();

  //const dispatch = useDispatch();
  //const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  //const [dialogOpen, setDialogOpen] = useState(false);
  //const [teamInfo, setTeamInfo] = useState<{ team_id: string; team_name: string } | null>(null);
  //const [isLoading, setIsLoading] = useState(false);


  // دریافت اطلاعات تیم
  /* useEffect(() => {
     const loadTeamInfo = () => {
       try {
         const teamInfoStr = localStorage.getItem('team_info');
         if (teamInfoStr) {
           const jsonObj = JSON.parse(teamInfoStr);
           setTeamInfo({
             team_id: jsonObj.team_id,
             team_name: jsonObj.team_name,
           });
         }
       } catch (err) {
         console.error('Error loading team info:', err);
       }
     };
 
     loadTeamInfo();
   }, []);*/

  // ارسال درخواست
  /* const sendRequest = async (accepted: boolean) => {
     if (!accepted) {
       setDialogOpen(false);
       return;
     }
 
     if (!teamInfo) {
       dispatch(showAlert('تیم خود را انتخاب نمایید', 'error'));
       return;
     }
 
     setIsLoading(true);
     
     try {
       const result = await createMatchRequest(matchId, {
         team_id: teamInfo.team_id,
         guest_team_name: teamInfo.team_name,
       });
       
       setDialogOpen(false);
       
       if (result.success) {
         dispatch(showAlert('عملیات موفقیت آمیز', 'success'));
       } else {
         dispatch(showAlert(result.message || 'خطایی رخ داده است', 'error'));
       }
     } catch (error) {
       dispatch(showAlert('خطایی رخ داده است', 'error'));
     } finally {
       setIsLoading(false);
     }
   };
 
   const handleRequestClick = () => {
     if (!teamInfo) {
       dispatch(showAlert('تیم خود را انتخاب نمایید', 'error'));
       return;
     }
     setDialogOpen(true);
   };*/

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