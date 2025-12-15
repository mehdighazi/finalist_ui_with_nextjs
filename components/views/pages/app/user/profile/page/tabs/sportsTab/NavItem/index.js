import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    IconButton,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';

// project imports
import { MENU_OPEN, SET_MENU } from 'store/actions';
import CustomAvatar from 'ui-component/extended/Avatar'
import {hostAddress} from 'api/api'
import DefaultAvatar from 'assets/images/screen/default-avatar.jpg'
// assets
import { FiberManualRecord } from '@mui/icons-material';
import { IconChevronLeft } from "@tabler/icons-react";




const NavItem = ({ item, level }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.sidebarMenu);
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

    const Icon = item.icon;
    const itemIcon = item?.icon ? (
        <Icon stroke={1.5} size="1.3rem" />
    ) : (
        <FiberManualRecord

            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );

    let itemTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps = {
        component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />)
    };
    if (item?.external) {
        listItemProps = { component: 'a', href: item.url, target: itemTarget };
    }

    const itemHandler = (id) => {
        dispatch({ type: MENU_OPEN, id });
        if (matchesSM) dispatch({ type: SET_MENU, opened: false });
    };


    return (
        <ListItemButton
            {...listItemProps}
            disabled={item.disabled}
            sx={{

                "&:hover": {
                    "-webkit-transition": " all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);",
                    " -ms-transition": "background-color  150ms linear",
                    transition: "all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)",
                    backgroundColor: theme.palette.grey[200],

                },
                minWidth: "100%",
                borderRadius: `${customization.borderRadius}px`,
                mb: 1,
                alignItems: 'flex-end',
                display: "flex",
                // backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                py: level > 1 ? 1 : 1.25,
                // pl: `${level * 24}px`
            }}
            // selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
            onClick={() => itemHandler(item.id)}
        >
            <Box sx={{ minWidth: "100%", display: "flex", borderRadius: 2, p: 0 }} direction="row">

                <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>
                  { 
                   <CustomAvatar size={"sm"}
                        src={item.logo?.logo_path ? `${hostAddress}/${item.logo.logo_path}` : DefaultAvatar}
                        sx={{
                            //  ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer',
                            width: theme.spacing(3),
                            height: theme.spacing(3)

                        }}
                        aria-label={"profile picture"}
                        aria-haspopup="true"
                        color="inherit"
                    >{item["title"].substring(0, 1)}</CustomAvatar>
                  }  
                </ListItemIcon>
                <ListItemText
                    sx={{ pt: 0.5 }}
                    primary={
                        <Typography align={"right"}
                        
                            // variant={customization.isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'}
                            color="inherit">
                            {item.title}
                        </Typography>
                    }
                    secondary={
                        item.caption && (
                            <Typography align={"right"} variant="caption" sx={{ ...theme.typography.subMenuCaption }}
                                display="block" gutterBottom>
                                {item.caption}
                            </Typography>
                        )
                    }
                />



                <IconChevronLeft stroke={1.5} size="1rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />



            </Box>
        </ListItemButton>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number
};

export default NavItem;
