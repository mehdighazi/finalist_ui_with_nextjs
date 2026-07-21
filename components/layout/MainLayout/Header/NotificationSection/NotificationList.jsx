
import * as React from 'react'
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
    List,
    ListItem,

    ListItemText,

    Typography
} from '@mui/material';

import { createDateLetter, createDateStr } from '@/components/utils/Lib'

// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    padding: 16,
    direction: 'rtl',
    textAlign: 'right',
    '&:hover': {
        background: theme.palette.primary.light
    },
    '& .MuiListItem-root': {
        padding: 0
    }
}));

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationList = ({ data }) => {
    const theme = useTheme();
    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 330,
                py: 0,
                borderRadius: '10px',
                [theme.breakpoints.down('md')]: {
                    maxWidth: 300
                },
                '& .MuiListItemSecondaryAction-root': {
                    top: 22
                },
                '& .MuiDivider-root': {
                    my: 0
                },
                '& .list-container': {
                    pl: 7
                }
            }}
        >
            {
                data.map((item) => (
                    <ListItemWrapper>
                        <ListItem alignItems="right">

                            <ListItemText primary={<Typography textAlign={'right'} fontSize={12}>
                                {item.title}
                            </Typography>} secondary={<Typography color={theme.palette.primary[100]} fontSize={10}>
                                {createDateStr(createDateLetter(item.createDate))}</Typography>
                            } />

                        </ListItem>

                    </ListItemWrapper>
                ))

            }



        </List>
    );
};

export default NotificationList;
