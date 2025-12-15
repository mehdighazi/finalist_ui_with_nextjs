// src/providers/Providers.tsx
'use client';
import React, { ReactNode } from "react";
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from '@/components/store';
import themes from '@/components/themes';
import { ThemeProvider, CssBaseline, StyledEngineProvider } from '@mui/material';

interface ProvidersProps {
  children: ReactNode;
}

// کامپوننت داخلی که بعد از Provider می‌تواند useSelector داشته باشد
const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  const customization = useSelector((state: RootState) => state.sidebarMenu);
  return (
    <ThemeProvider theme={themes(customization)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeWrapper>{children}</ThemeWrapper>
      </StyledEngineProvider>
    </Provider>
  );
}
