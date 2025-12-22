// @/components/themes/index.js
'use client';
import { createTheme } from '@mui/material/styles';
import colors from '@/components/assets/colors/themeColors';
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

// یک theme ثابت بدون پارامتر
export const defaultTheme = () => {
    const color = colors;

    const themeOption = {
        colors: color,
        heading: color.grey300,
        paper: color.paper,
        backgroundDefault: color.grey100,
        background: color.paper,
        darkTextPrimary: color.primaryMain,
        darkTextSecondary: color.grey600,
        textDark: color.secondaryDark,
        menuSelected: color.secondaryDark,
        menuSelectedBack: color.secondaryLight,
        divider: color.grey200
    };

    const themeOptions = {
      

        direction: 'ltr',
        palette: themePalette(themeOption),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
        typography: themeTypography(themeOption)
    };

    const theme = createTheme(themeOptions);
    theme.components = componentStyleOverrides(themeOption);

    return theme;
};

// نگه‌داری نسخه قدیمی برای backward compatibility
export const theme = () => defaultTheme();

export default defaultTheme;