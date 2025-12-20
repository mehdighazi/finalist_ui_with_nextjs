'use client';
import React, { ReactNode } from "react";
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from '@/components/store';
import defaultTheme from '@/components/themes';
import { createTheme,ThemeProvider, CssBaseline, StyledEngineProvider } from '@mui/material';

interface ProvidersProps {
  children: ReactNode;
}
const testTheme = createTheme({
  direction: 'rtl',
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
});

export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
   
        <InnerProviders>{children}</InnerProviders>
      
    </Provider>
  );
}

// کامپوننت داخلی که بعد از Provider قرار می‌گیرد
function InnerProviders({ children }: { children: ReactNode }) {
  const customization = useSelector((state: RootState) => state.sidebarMenu);
  
  return (
    <ThemeProvider theme={defaultTheme()}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}