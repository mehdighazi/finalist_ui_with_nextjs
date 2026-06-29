import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
//Mui import
import { List, ListItem, Divider, ListItemText, ListItemAvatar, useTheme, Typography, Link } from '@mui/material';
//project import
import CustomAvatar from 'ui-component/extended/Avatar'
import { createDateLetter,createDateStr } from 'utils/Lib'
import {hostAddress}  from '@/components/api/api';
import UserListSkeleton from 'ui-component/cards/Skeleton/UserList'

export default function ListItems({ data }) {
    const theme = useTheme();

   
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {data && data.length > 0 ? data.map((item) => (
                <>

                    <ListItem sx={{
                        direction: 'rtl',
                        textDecoration: 'none',
                        '&:hover': {
                            textDecoration: 'none',
                        }
                    }}
                        component={RouterLink} to={`/app/user/profile?uid=${item.user_id}`}>

                        <ListItemAvatar>
                            <CustomAvatar alt="profile_image" src={item.avatar ? `${hostAddress}/${item.avatar["path"]}` : ""} />
                        </ListItemAvatar>
                        <ListItemText
                            sx={{ textAlign: "right", fontSize: 14 }}
                            primary={`${item.first_name} ${item.last_name}`}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        fontSize={10}
                                        align={"right"}
                                        component="span"
                                        variant="subtitle1"
                                        sx={{ color: theme.palette.grey[400], display: 'inline', fontStyle: 'italic' }}
                                    >
                                        عضویت از {createDateStr(createDateLetter(item.team_members["createdAt"]))}
                                    </Typography>

                                </React.Fragment>
                            }
                        />
                    </ListItem>

                    <Divider variant="inset" component="li" />
                </>
            )) : <UserListSkeleton />}
        </List>
    );
}
