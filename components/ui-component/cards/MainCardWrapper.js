import { styled } from '@mui/material';
import MainCard from './MainCard_pre';
// constant
const headerSX = {
    '& .MuiCardHeader-action': { mr: 0 }
};
export  const MainCardWrapper = styled(MainCard)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: 150,
    padding: 2,
    borderRadius: 3,

    // background: `linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)`,
    backgroundImage: `
      repeating-linear-gradient(
        45deg,
        rgba(223, 223, 223, 0.2),
        rgba(61, 61, 61, 0.2) 5px,
        transparent 1px,
        transparent 12px
      )!important`
}));
