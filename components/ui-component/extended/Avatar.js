import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import MuiAvatar from '@mui/material/Avatar';

// ==============================|| AVATAR ||============================== //
 
const Avatar = ({ color, outline, size, borderColor, borderWidth = 2,gradient, sx, ...others }) => {
    const theme = useTheme();

    const colorSX = color && !outline && { 
        color: theme.palette.background.paper, 
        bgcolor: `${color}.main` 
    };
      const gradientSX = gradient && {
        position: "relative",
        zIndex: 1,
        "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            padding: `${borderWidth}px`,
            borderRadius: "50%",
            background: gradient,
            WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            zIndex: -1
        }
    };

    const outlineSX = outline && {
        color: color ? `${color}.main` : `primary.main`,
        bgcolor: theme.palette.background.paper,
        border: '2px solid',
        borderColor: color ? `${color}` : `secondary.main`,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'
    };

    const customBorderSX = borderColor && {
        border: `${borderWidth}px solid ${borderColor}`
    };

    let sizeSX = {};
    switch (size) {
        case 'badge': sizeSX = { width: theme.spacing(3.5), height: theme.spacing(3.5) }; break;
        case 'xs': sizeSX = { width: theme.spacing(4.25), height: theme.spacing(4.25) }; break;
        case 'sm': sizeSX = { width: theme.spacing(5), height: theme.spacing(5) }; break;
        case 'md': sizeSX = { width: theme.spacing(7.5), height: theme.spacing(7.5) }; break;
        case 'lg': sizeSX = { width: theme.spacing(9), height: theme.spacing(9) }; break;
        case 'xl': sizeSX = { width: theme.spacing(10.25), height: theme.spacing(10.25) }; break;
        default: sizeSX = {};
    }

    return (
        <MuiAvatar 
            sx={{ 
                ...gradientSX,
                ...colorSX, 
                ...outlineSX, 
                ...customBorderSX, 
                ...sizeSX, 
                ...sx 
            }} 
            {...others} 
        />
    );
};


Avatar.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    outline: PropTypes.bool,
    size: PropTypes.string,
    sx: PropTypes.object
};

export default Avatar;
