"use client";
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';


// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Card, Divider, Grid, Typography, Link } from '@mui/material';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

// project imports
import config from '@/components/config';
import { gridSpacing } from '@/components/store/constant';

// assets
import { IconTallymark1 } from '@tabler/icons-react';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import HomeIcon from '@mui/icons-material/Home';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';



// ==============================|| BREADCRUMBS ||============================== //

const Breadcrumbs = ({ card, divider, icon, icons, maxItems, navigation, rightAlign, separator, title, titleBottom, ...others }) => {
    const theme = useTheme();
    const linkSX = {
        display: 'flex',
        color: 'secondary.dark',
        textDecoration: 'none',
        alignContent: 'center',
        alignItems: 'center',
        color: theme.palette.primary.light,
        '&:hover': {
            textDecoration: 'none'
        }
    };
    const iconStyle = {
        marginRight: theme.spacing(0.75),
        marginTop: `-${theme.spacing(0.25)}`,
        width: '1rem',
        height: '1rem',
        color: theme.palette.grey[200]
    };

    const [main, setMain] = useState(null);
    const [item, setItem] = useState(null);
    const [parent, setParent] = useState(null)


    // set active item state
    const getCollapse = (menu) => {
        if (menu.children) {
            menu.children.filter((collapse) => {
              
                if (collapse.type && collapse.type === 'collapse') {
                    getCollapse(collapse);
                    if (document.location.pathname === config.basename + collapse.url) {
                        setMain(collapse)
                        console.log(collapse.url)
                        if (document.location.pathname.startsWith(config.basename + '/app/team/profile')) {
                            const url = new URL(window.location.href);
                            const tid = url.searchParams.get('tid');
                            console.log(tid); // خروجی: "1"


                        }
                        }

                    } else if (collapse.type && collapse.type === 'item') {
                        
                        if ((config.basename + collapse.url) && document.location.pathname.startsWith(config.basename + collapse.url)) {

                            setMain(menu);
                            setItem(collapse);
                        }
                        else {

                            if (parent && document.location.pathname === config.basename + parent.url) {
                                //   setMain(menu);
                                // setItem(collapse);
                                // setItem(parent);
                                //console.log(document.location.pathname, config.basename + parent.url)
                            }

                        }
                    }
                    return false;
                });
        }
    };

    useEffect(() => {
        navigation?.items?.map((menu) => {
            if (menu.type && menu.type === 'group') {
                getCollapse(menu);

            }
            return false;
        });
    });

    // item separator
    const SeparatorIcon = separator;
    const separatorIcon = separator ? <SeparatorIcon stroke={1.5} size="1rem" /> : <IconTallymark1 stroke={1.5} size="1rem" />;

    let mainContent;
    let itemContent;
    let breadcrumbContent = <Typography />;
    let itemTitle = '';
    let CollapseIcon;
    let ItemIcon;

    // collapse item
    if (main && main.type === 'collapse') {

        CollapseIcon = main.icon ? main.icon : AccountTreeTwoToneIcon;
        mainContent = (
            <Link sx={linkSX} href={`${config.basename}${main.url}`} variant="subtitle1">
                {icons && <CollapseIcon style={iconStyle} />}
                {main.title}
            </Link>
        );
    }

    // items
    if (item && item.type === 'item') {
        itemTitle = item.title;

        ItemIcon = item.icon ? item.icon : AccountTreeTwoToneIcon;
        itemContent = (
            <Typography
                variant="subtitle1"
                sx={{
                    display: 'flex',
                    textDecoration: 'none',
                    alignContent: 'center',
                    alignItems: 'center',
                    color: theme.palette.primary.main
                }}
            >
                {icons && <ItemIcon style={iconStyle} />}
                {itemTitle}
            </Typography>
        );

        // main




    }
    if ((item && item.breadcrumbs !== false) || main && main.breadcrumbs !== false) {

        breadcrumbContent = (
            <Card
                sx={{
                    borderRadius: 0,
                    marginBottom: 1,
                    // border: card === false ? 'none' : '1px solid',
                    // borderColor: theme.palette.primary[] + 75,
                    background: card === false ? 'transparent' : theme.palette.primary[200]
                }}
                {...others}
            >
                <Box sx={{ p: 2, pl: card === false ? 0 : 2 }}>
                    <Grid
                        container
                        direction={rightAlign ? 'row' : 'column'}
                        justifyContent={rightAlign ? 'space-between' : 'flex-start'}
                        alignItems={rightAlign ? 'center' : 'flex-start'}
                        spacing={1}
                    >
                        {title && !titleBottom && (
                            <Grid item>
                                <Typography variant="h5" sx={{ fontWeight: 300, color: theme.palette.primary.main }}>
                                    {!item ? main.title : item.title}
                                </Typography>
                            </Grid>
                        )}
                        <Grid item>
                            <MuiBreadcrumbs
                                sx={{ '& .MuiBreadcrumbs-separator': { width: 16, ml: 1.25, mr: 1.25 } }}
                                aria-label="breadcrumb"
                                maxItems={maxItems || 8}
                                separator={separatorIcon}
                            >
                                <Typography component={Link} to="/" color={theme.palette.primary.main} variant="subtitle1" sx={linkSX}>
                                    {/*icons && <HomeTwoToneIcon sx={iconStyle} />*/}
                                    {icon && <HomeIcon sx={{ ...iconStyle, mr: 0 }} />}
                                    {!icon && 'Dashboard'}
                                </Typography>
                                {mainContent}
                                {itemContent ?? ""}
                            </MuiBreadcrumbs>
                        </Grid>
                        {title && titleBottom && (
                            <Grid item>
                                <Typography sx={{ color: theme.palette.primary.main }} variant="h3" >
                                    {item.title}
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </Box>
                {card === false && divider !== false && <Divider sx={{ borderColor: theme.palette.primary.main, mb: gridSpacing }} />}
            </Card>
        );
    }

    return breadcrumbContent;
};

Breadcrumbs.propTypes = {
    card: PropTypes.bool,
    divider: PropTypes.bool,
    icon: PropTypes.bool,
    icons: PropTypes.bool,
    maxItems: PropTypes.number,
    navigation: PropTypes.object,
    rightAlign: PropTypes.bool,
    separator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    title: PropTypes.bool,
    titleBottom: PropTypes.bool
};

export default Breadcrumbs;
