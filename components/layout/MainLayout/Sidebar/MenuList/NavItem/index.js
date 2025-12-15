
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
// material-ui
import {useTheme} from '@mui/material/styles';
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
import {MENU_OPEN, SET_MENU} from '@/components/store/actions';

// assets
import {FiberManualRecord} from '@mui/icons-material';
import {IconChevronLeft} from "@tabler/icons-react";


// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({item, level}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.sidebarMenu);
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

    const Icon = item.icon;
    const itemIcon = item?.icon ? (
        <Icon stroke={1.5} size="1.3rem"/>
    ) : (
        <FiberManualRecord
            sx={{
               // width: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
                //height: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );

    let itemTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps = {
        component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget}/>)
    };
    if (item?.external) {
        listItemProps = {component: 'a', href: item.url, target: itemTarget};
    }

    const itemHandler = (id) => {
        dispatch({type: MENU_OPEN, id});
        if (matchesSM) dispatch({type: SET_MENU, opened: false});
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
                minWidth:"100%",
                borderRadius: `${customization.borderRadius}px`,
                mb: 0.5,
                alignItems: 'flex-end',
                display: "flex",
              // backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
              //  py: level > 1 ? 1 : 1.25,
               // pl: `${level * 24}px`
            }}
        //    selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
           // onClick={() => itemHandler(item.id)}
        >
            <Box  sx={{minWidth:"100%",display:"flex",borderRadius:2,p:0.1}} direction="row">

                <ListItemIcon sx={{my: 'auto', minWidth: !item?.icon ? 18 : 36}}>{itemIcon}</ListItemIcon>
                <ListItemText
                    sx={{pt:0.1}}
                    primary={
                        <Typography align={"right"}
                                   // variant={customization.isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'}
                                    color="inherit">
                            {item.title}
                        </Typography>
                    }
                    secondary={
                        item.caption && (
                            <Typography align={"right"} variant="caption" sx={{...theme.typography.subMenuCaption}}
                                        display="block" gutterBottom>
                                {item.caption}
                            </Typography>
                        )
                    }
                />



                        <IconChevronLeft stroke={1.5} size="1rem" style={{ marginTop: 'auto', marginBottom: 'auto' }}/>




                {/*
    {item.chip && (
                    <Chip
                        color={item.chip.color}
                        variant={item.chip.variant}
                        size={item.chip.size}
                        label={item.chip.label}
                        avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                    />
                )}
    */}
            </Box>
        </ListItemButton>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number
};

export default NavItem;
