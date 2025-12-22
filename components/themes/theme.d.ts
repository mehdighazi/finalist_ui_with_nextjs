// theme.d.ts
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    colors: {
      heading: string;
      paper: string;
      backgroundDefault: string;
      background: string;
      darkTextPrimary: string;
      darkTextSecondary: string;
      textDark: string;
      menuSelected: string;
      menuSelectedBack: string;
      divider: string;
    };
  }
  interface ThemeOptions {
    colors?: Partial<Theme['colors']>;
  }
}
