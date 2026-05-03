// components/ui-component/cards/MainCard.tsx
import * as React from "react";
import PropTypes from "prop-types";
import { forwardRef } from "react";

// material-ui - بدون استفاده از styled یا useTheme
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// ==============================|| CUSTOM MAIN CARD ||============================== //

interface MainCardProps {
  border?: boolean;
  boxShadow?: boolean;
  headerSX?: any;
  children?: React.ReactNode;
  content?: boolean;
  contentClass?: string;
  contentSX?: any;
  darkTitle?: boolean;
  subTitle?: string;
  secondary?: React.ReactNode;
  shadow?: string;
  sx?: any;
  title?: string | React.ReactNode;
  actions?: React.ReactNode;
  [key: string]: any;
}

const MainCard = forwardRef<HTMLDivElement, MainCardProps>(
  (
    {
      border = true,
      boxShadow = false,
      headerSX = {},
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle = false,
      subTitle,
      secondary,
      shadow,
      sx = {},
      title,
      actions,
      ...others
    },
    ref
  ) => {
    // استایل‌های ثابت بدون استفاده از theme
    const defaultStyles = {
      border: border ? '1px solid #e0e0e0' : 'none',
      borderRadius: '8px',
      backgroundColor: '#ffffff',
      overflow: 'hidden' as const,
      ...(boxShadow && shadow ? { boxShadow: shadow } : boxShadow ? { 
        boxShadow: '0 2px 14px 0 rgba(32, 40, 45, 0.08)' 
      } : {}),
      '& .MuiCardContent-root:last-child': {
        paddingBottom: 0
      },
      '&:hover': boxShadow ? {
        boxShadow: '0 8px 24px 0 rgba(32, 40, 45, 0.12)'
      } : {},
      ...sx
    };

    const headerStyles = {
      padding: '16px',
      backgroundColor: '#f8f9fa',
      ...headerSX
    };

    const contentStyles = {
      padding: '16px',
      ...contentSX
    };

    return (
      <Card
        ref={ref}
        {...others}
        sx={defaultStyles}
      >
        {/* card header and action */}
        {title && (
          <CardHeader
            sx={headerStyles}
            title={
              <Box>
                <Typography 
                  component="div" 
                  variant="h6" 
                  sx={{ 
                    color: darkTitle ? '#1a202c' : '#374151',
                    fontWeight: 600 
                  }}
                >
                  {title}
                </Typography>
                {subTitle && (
                  <Typography
                    variant="caption"
                    component="div"
                    sx={{
                      color: '#9ca3af',
                      textAlign: 'right',
                      marginTop: '4px'
                    }}
                  >
                    {subTitle}
                  </Typography>
                )}
              </Box>
            }
            action={secondary}
          />
        )}

        {/* content */}
        {content ? (
          <CardContent 
            sx={contentStyles} 
            className={contentClass}
          >
            {children}
          </CardContent>
        ) : (
          children
        )}

        {/* actions */}
        {actions && (
          <>
            <Divider />
            <CardActions sx={{ padding: '8px' }}>
              {actions}
            </CardActions>
          </>
        )}
      </Card>
    );
  }
);

MainCard.displayName = 'MainCard';

MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  children: PropTypes.node,
  content: PropTypes.bool,
  contentClass: PropTypes.string,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  secondary: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.object
  ]),
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]),
  subTitle: PropTypes.string,
  actions: PropTypes.node,
};

export default MainCard;