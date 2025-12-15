import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { FormHelperText,FormControl, Avatar, Box, ButtonBase, Card, Grid, InputAdornment, OutlinedInput, Popper, TextField, MenuItem } from '@mui/material';

// third-party
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';

// project imports
import Transitions from 'ui-component/extended/Transitions';

// assets
import { IconAdjustmentsHorizontal, IconSearch, IconX } from '@tabler/icons-react';
import { padding, shouldForwardProp } from '@mui/system';


const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: "100%",
    marginLeft: 0,
    borderRadius: 1,
    background: 'transparent !important',
    border: 0,
    padding: 15,
    fontFamily: "orginalfont", width: "100%",
    color: theme.palette.grey[400],
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'blue', // رنگ دلخواه زمان فوکوس
    },
    '& .MuiOutlinedInput-notchedOutline': {
        //borderColor: 'blue', // رنگ پیش‌فرض
    },
    '& .MuiOutlinedInput-root':
    {

        border: 0,
        padding: 15
    },

    '& .Mui-focused fieldset': {
        border: 0,
    },
    [theme.breakpoints.down('lg')]: {
        minWidth: "100%"
    },
    [theme.breakpoints.down('md')]: {
        minWidth: '100%',
        marginLeft: 0,
    },

}));





// ==============================|| SEARCH INPUT ||============================== //

export const CustomTextField = ({color, onClick,errorText,boxPadding, fontFamily, placeHolder, onChange, endIcon, startIcon, readOnly, value, height, fontSize }) => {
    const theme = useTheme();

    const onChangeHandler = (e) => {
        onChange(e.target.value); // مقدار جدید را ارسال کن
    };

    return (
        <FormControl fullWidth >
            <OutlineInputStyle
                onClick={onClick}
                //id="forminputs"
                readOnly={readOnly}
                value={value}
                onChange={onChangeHandler}
                sx={{
                    padding: boxPadding ?? 1,
                    height: height ?? '3em',
                    fontSize: fontSize, // این برای متن اصلی اینپوت
                    '& input': {
                        background: 'transparent!important',
                        border: 0,
                        color:color?? theme.palette.text,
                        padding: padding ?? 0.5,
                        fontFamily: fontFamily ? `${fontFamily}!important` : 'orginalfont',
                        '&::placeholder': {
                            fontSize: '0.8em', // سایز کوچیکتر برای placeholder
                            color: theme.palette.grey[400], // مثلا خاکستری تر
                            opacity: 1, // اگر بخوای کاملاً مشخص باشه
                        }
                    },
                }}
                placeholder={placeHolder}
                endAdornment={startIcon ? (
                    <InputAdornment position="start">
                        <ButtonBase sx={{ borderRadius: '12px' }}>
                            {startIcon}
                        </ButtonBase>
                    </InputAdornment>
                ) : null}
                startAdornment={
                    endIcon ? (
                        <InputAdornment position="start">
                            <ButtonBase sx={{ borderRadius: '12px' }}>
                                {endIcon}
                            </ButtonBase>
                        </InputAdornment>
                    ) : null
                }
                aria-describedby="فیلد"
                inputProps={{ 'aria-label': 'weight', readOnly: readOnly ?? false }}
            />
            {errorText && (
        <FormHelperText sx={{color:"red",fontSize:10}} id="team-identifier-error">
          <span>{errorText}</span> 
        </FormHelperText>
    )}
        </FormControl>


    );

}