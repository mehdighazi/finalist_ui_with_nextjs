// material-ui
import { styled } from '@mui/material/styles';

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper1 = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  minHeight: '100vh',
  display: 'flex',                // ← مرکزچین افقی و عمودی
  justifyContent: 'center',       // ← افقی
  alignItems: 'center',           // ← عمودی
  background: 'linear-gradient(135deg,rgb(72, 182, 100), #7873f5)',
  zIndex: 0,

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(10px)',
    zIndex: 1,
    background:
      'linear-gradient(135deg, rgba(255,110,196,0.3), rgba(120,115,245,0.3))',
  },
}));


export default AuthWrapper1;
