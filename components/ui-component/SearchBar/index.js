import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Card, Grid, InputAdornment, OutlinedInput, Popper,TextField,MenuItem } from '@mui/material';

// third-party
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';

// project imports
import Transitions from 'ui-component/extended/Transitions';

// assets
import { IconAdjustmentsHorizontal, IconSearch, IconX } from '@tabler/icons-react';
import { shouldForwardProp } from '@mui/system';


const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: "100%",
    marginLeft: 0,
    borderRadius:3,
    background: 'transparent !important',
    border: `none`,
    '& .MuiOutlinedInput-root':
    {
        border: 0
    },
    '& input': {
        background: 'transparent !important',
        border:0,
        color:theme.palette.text
       // paddingLeft: '4px !important'
    },
    '& .Mui-focused fieldset':{
        border:0,
    },
    [theme.breakpoints.down('lg')]: {
        minWidth: "100%"
    },
    [theme.breakpoints.down('md')]: {
        minWidth: '100%',
        marginLeft: 0,
    },
    
}));




// ==============================|| SEARCH INPUT - MOBILE||============================== //

const MobileSearch = ({ value, setValue, popupState }) => {
    const theme = useTheme();

    return (
        <OutlineInputStyle
            id="input-search-header"
            sx={{fontFamily:"orginalfont",width:"100%",color:theme.palette.grey[300] }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"جستجوی تیم "}
            startAdornment={
                <InputAdornment position="start">
                 <ButtonBase> <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[300]}  /></ButtonBase>  
                </InputAdornment>
            }
           
            aria-describedby="search-helper-text"
            inputProps={{ 'aria-label': 'weight' }}
        />
    );
};

MobileSearch.propTypes = {
    value: PropTypes.string,
    setValue: PropTypes.func,
    popupState: PopupState
};

// ==============================|| SEARCH INPUT ||============================== //

const SearchSection = ({onChange}) => {
    const theme = useTheme();
    const [value, setValue] = useState('');
    const [catValue,setCatValue]=useState(0);

    return (
        <>
           
           {
             <Box sx={{width:"100%"}}>
                <OutlineInputStyle
                    id="input-search-header"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    sx={{fontFamily:"orginalfont",width:"100%",color:theme.palette.grey[400],borderRadius:3 }}
                    placeholder="...جستجوی تیم،مسابقه،محل برگزاری"
                    startAdornment={
                        <InputAdornment  position="start">
                            <ButtonBase onClick={()=>onChange(value)} sx={{ borderRadius: '12px' }}>
                            <IconSearch sx={{bgcolor:theme.palette.grey[500]}}  stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                            </ButtonBase>

                        </InputAdornment>
                    }

                    aria-describedby="search-helper-text"
                    inputProps={{ 'aria-label': 'weight' }}
                />
            </Box>
            }
        </>
    );
};

export default SearchSection;
