import { ChangeEvent, MouseEvent, ReactNode } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {
  FormControl,
  FormHelperText,
  ButtonBase,
  InputAdornment,
  OutlinedInput
} from '@mui/material';

import { shouldForwardProp } from '@mui/system';

// ==============================|| STYLED INPUT ||============================== //

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(
  ({ theme }) => ({
    width: '100%',
    borderRadius: 8,
    background: 'transparent',
    fontFamily: 'orginalfont',
    color: theme.palette.grey[600],
      border: '1px solid',
      borderColor:theme.palette.primary.dark,

    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    },

    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '1px solid blue'
    },

    '& input': {
      padding: theme.spacing(0.5),
      background: 'transparent',
      border: 0
    },

    [theme.breakpoints.down('md')]: {
      minWidth: '100%'
    }
  })
);

// ==============================|| TYPES ||============================== //

interface CustomTextFieldProps {
  value?: string;
  onChange: (value: string) => void;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;

  placeholder?: string;
  errorText?: string;
  readOnly?: boolean;

  startIcon?: ReactNode;
  endIcon?: ReactNode;

  color?: string;
  fontFamily?: string;
  height?: number | string;
  fontSize?: number | string;
  boxPadding?: number | string;
}

// ==============================|| COMPONENT ||============================== //

export const CustomTextField: React.FC<CustomTextFieldProps> = ({
  value,
  onChange,
  onClick,
  placeholder,
  errorText,
  readOnly,
  startIcon,
  endIcon,
  color,
  fontFamily,
  height,
  fontSize,
  boxPadding
}) => {
  const theme = useTheme();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <FormControl fullWidth>
      <OutlineInputStyle
        value={value}
        onChange={handleChange}
        onClick={onClick}
        readOnly={readOnly}
        placeholder={placeholder}
        sx={{
          height: height ?? '3em',
          padding: boxPadding ?? 1,
          fontSize,
          color: color ?? theme.palette.text.primary,
          fontFamily: fontFamily ?? 'orginalfont',

          '& input::placeholder': {
            fontSize: '0.8em',
            color: theme.palette.grey[400],
            opacity: 1
          }
        }}
        startAdornment={
          startIcon ? (
            <InputAdornment position="start">
              <ButtonBase sx={{ borderRadius: 2 }}>
                {startIcon}
              </ButtonBase>
            </InputAdornment>
          ) : null
        }
        endAdornment={
          endIcon ? (
            <InputAdornment position="end">
              <ButtonBase sx={{ borderRadius: 2 }}>
                {endIcon}
              </ButtonBase>
            </InputAdornment>
          ) : null
        }
        inputProps={{
          readOnly: readOnly ?? false,
          'aria-label': 'custom-text-field'
        }}
      />

      {errorText && (
        <FormHelperText sx={{ color: 'red', fontSize: 10 }}>
          {errorText}
        </FormHelperText>
      )}
    </FormControl>
  );
};
