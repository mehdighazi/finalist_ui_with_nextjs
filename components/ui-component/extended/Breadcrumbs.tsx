"use client";
import { ReactNode, useEffect, useState } from 'react';

// material-ui
import { useTheme, Theme } from '@mui/material/styles';
import { Box, Card, Divider, Grid, Typography, Link } from '@mui/material';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import { SxProps } from '@mui/material/styles';

// project imports
import config from '@/components/config';
import { gridSpacing } from '@/components/store/constant';

// assets
import { IconTallymark1,IconSlash } from '@tabler/icons-react';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import HomeIcon from '@mui/icons-material/Home';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';

// Types
interface NavigationItem {
  type: string;
  title?: string;
  url?: string;
  icon?: any;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  id?: string;
}

interface NavigationObject {
  items?: NavigationItem[];
}

interface BreadcrumbsProps {
  card?: boolean;
  divider?: boolean;
  icon?: boolean;
  icons?: boolean;
  maxItems?: number;
  navigation?: NavigationObject;
  rightAlign?: boolean;
  separator?: React.ElementType;
  title?: boolean;
  titleBottom?: boolean;
  [key: string]: any;
}

// ==============================|| BREADCRUMBS ||============================== //

const Breadcrumbs = ({
  card,
  divider,
  icon,
  icons,
  maxItems,
  navigation,
  rightAlign,
  separator,
  title,
  titleBottom,
  ...others
}: BreadcrumbsProps) => {
  const theme = useTheme();
  
  const linkSX: SxProps<Theme> = {
    display: 'flex',
   // color: 'secondary.dark',
    textDecoration: 'none',
    alignContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.light,
    '&:hover': {
      textDecoration: 'none'
    }
  };

  const iconStyle: React.CSSProperties = {
    marginRight: theme.spacing(0.75),
    marginTop: `-${theme.spacing(0.25)}`,
    width: '1rem',
    height: '1rem',
    color: theme.palette.grey[200]
  };

  const [main, setMain] = useState<NavigationItem | null>(null);
  const [item, setItem] = useState<NavigationItem | null>(null);
  const [parent, setParent] = useState<NavigationItem | null>(null);

  // set active item state
  const getCollapse = (menu: NavigationItem) => {
    if (menu.children) {
      menu.children.filter((collapse) => {
        if (collapse.type && collapse.type === 'collapse') {
          getCollapse(collapse);
          if (document.location.pathname === config.basename + collapse.url) {
            setMain(collapse);
            console.log(collapse.url);
            if (document.location.pathname.startsWith(config.basename + '/app/team/profile')) {
              const url = new URL(window.location.href);
              const tid = url.searchParams.get('tid');
             
            }
          }
        } else if (collapse.type && collapse.type === 'item') {
          if ((config.basename + collapse.url) && document.location.pathname.startsWith(config.basename + collapse.url)) {
            setMain(menu);
            setItem(collapse);
          } else {
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
  const separatorIcon = separator ? (
    <IconSlash stroke={1.5} size="1rem" />
  ) : (
    <IconSlash stroke={1.5} size="1rem" />
  );

  let mainContent: ReactNode;
  let itemContent: ReactNode;
  let breadcrumbContent = <Typography />;
  let itemTitle = '';
  let CollapseIcon: any;
  let ItemIcon: any;

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
    itemTitle = item.title || '';

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
  }

  if (
    (item && item.breadcrumbs !== false) ||
    (main && main.breadcrumbs !== false)
  ) {
    breadcrumbContent = (
      <Card
        sx={{
          borderRadius: 0,
          marginBottom: 1,
          // border: card === false ? 'none' : '1px solid',
          // borderColor: theme.palette.primary[] + 75,
          background: card === false ? 'transparent' : theme.palette.primary.light
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
                  {!item ? main?.title : item?.title}
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
                <Typography component={Link} href="/" color={theme.palette.primary.main} variant="subtitle1" sx={linkSX}>
                  {icon && <HomeIcon sx={{ ...iconStyle, mr: 0 }} />}
                  {!icon && 'Dashboard'}
                </Typography>
                {mainContent}
                {itemContent ?? ""}
              </MuiBreadcrumbs>
            </Grid>
            {title && titleBottom && (
              <Grid item>
                <Typography sx={{ color: theme.palette.primary.main }} variant="h3">
                  {item?.title}
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

export default Breadcrumbs;