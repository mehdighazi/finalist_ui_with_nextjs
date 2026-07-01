import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';
import './assets/css/directionRTL.css'

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import api from '@/components/api/api';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { disableLogs } from '@/components/utils/logControl';


// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);

    if (process.env.NODE_ENV === 'production') {//disable logs in production

        disableLogs();
    }

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
