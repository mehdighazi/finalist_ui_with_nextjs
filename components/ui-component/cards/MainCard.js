import PropTypes from 'prop-types';
import {forwardRef} from 'react';

// material-ui
import {useTheme} from '@mui/material/styles';
import {Card, CardActions, CardContent, CardHeader, Divider, Typography} from '@mui/material';
import { Stack } from '@mui/system';

// constant


// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = forwardRef(
    (
        {
            border = true,
            boxShadow,
            headerSX,
            children,
            content = true,
            contentClass = '',
            contentSX = {},
            darkTitle,
            subTitle,
            secondary,
            shadow,
            sx = {},
            title,
            actions={},
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
                    border: border ? '1px solid' : 'none',
                  //  borderColor:  theme.palette.primary.main,
                    ' & .MuiCardContent-root:last-child': {
                           p:0
                       },
                    '& :hover': {
                      //  boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
                    },
                    ...sx
                }}
            >
                {/* card header and action */}
                {title && (
                    <CardHeader
                       sx={headerSX}
                        title={<Stack>
                            <Typography>{title}</Typography> 
                              <Typography fontSize={12}  textAlign={"right"} sx={{ color: theme.palette.grey[400]}}>{subTitle??""}</Typography> 
                            </Stack> 

                        }
                        action={secondary}
                    />
                )}

                {/* content & header divider */}
              

                {/* card content */}
                {content && (
                    <CardContent sx={contentSX} className={contentClass}>
                        {children}
                    </CardContent>
                )}

                {actions?<>
                   
                    <CardActions sx={{p:1}}>{actions}</CardActions></>:<></>}

                {!content && children}
            </Card>
        );
    }
);

MainCard.propTypes = {
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

export default MainCard;
