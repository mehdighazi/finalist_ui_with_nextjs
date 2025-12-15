import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box,Card, CardContent, CardHeader, Divider, Typography,Grid,Stack,Chip,Rating } from '@mui/material';
//project import



//------------------------------------------------Match Card
const headerSX = {
    '& .MuiCardHeader-action': { mr: 0 }
};
const MatchCard = forwardRef(
    (
        {
            border = true,
            boxShadow,
            children,
            content = true,
            contentClass = '',
            contentSX = {},
            darkTitle,
            secondary,
            shadow,
          
            sx = {},
            title,
            city,
            dateMatch,
            timeMatch,
            matchid,
            hostTeam,
            guestTeam,
            logoHost,
            logoGuest,
            location,
            rateGuest,
            rateHost,
            ...others
        },
        ref
    ) => {
        const theme = useTheme();

        return (
            <Card
                ref={ref}
                {...others}
                sx={{

                    //m:1,
                    //border:'1px solid #e2e2e2',
                    // boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                  // background: rgb(221,222,228);
                    //background:  theme.palette.grey[200],
                  //  background: 'radial-gradient(circle, rgba(238,238,238,1) 0%, rgba(230,231,231,1) 49%, rgba(228,228,228,0.9136029411764706) 100%);',
                    //borderColor: theme.palette.success.light + 25,
                    ':hover': {
                        boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit',
                      //  transition: ".4s, background-position 0s",
                      //  background: 'radial-gradient(circle, rgba(238,238,238,1) 0%, rgba(230,231,231,1) 49%, rgba(228,228,228,0.9136029411764706) 100%);',
                    },
                    ...sx
                }}
            >
               
           
                {/* card content */}
                {content && (
                    <CardContent sx={contentSX} className={contentClass}>
                        {content}
                    </CardContent>
                )}
            
            </Card>
        );
    }
);

MatchCard.propTypes = {
    border: PropTypes.bool,
    boxShadow: PropTypes.bool,
    children: PropTypes.node,
    content: PropTypes.bool,
    contentClass: PropTypes.string,
    contentSX: PropTypes.object,
    darkTitle: PropTypes.bool,
    secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
    shadow: PropTypes.string,
    sx: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};



export default MatchCard