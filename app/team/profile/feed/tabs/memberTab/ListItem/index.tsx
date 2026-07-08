import * as React from 'react';
import Link from 'next/link'; // ⚡ اصلاح شد: استفاده از لینک اختصاصی نکست‌جی‌اس
// Mui import
import { List, ListItem, Divider, ListItemText, ListItemAvatar, useTheme, Typography } from '@mui/material';
// project import
import CustomAvatar from '@/components/ui-component/extended/Avatar';
import { createDateLetter, createDateStr } from '@/components/utils/Lib';
import { hostAddress } from '@/components/api/api';
import UserListSkeleton from '@/components/ui-component/cards/Skeleton/UserList';

// تعریف ساختار داده‌ای آواتار
interface AvatarData {
    path: string;
}

// تعریف ساختار داده‌ای عضویت تیم
interface TeamMemberData {
    createdAt: string;
}

// تعریف ساختار مشخصات هر کاربر
interface UserItem {
    id?: string | number;
    user_id: string | number;
    first_name?: string;
    last_name?: string;
    avatar?: AvatarData | null;
    team_members?: TeamMemberData | null;
}

// تعریف پروپ‌های کامپوننت
interface ListItemsProps {
    data: UserItem[] | null | undefined;
}

export default function ListItems({ data }: ListItemsProps) {
    const theme = useTheme();

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {data && data.length > 0 ? (
                data.map((item) => (
                    <React.Fragment key={item.user_id || item.id}>
                        <ListItem
                            sx={{
                                direction: 'rtl',
                                textDecoration: 'none',
                                color: 'inherit',
                                '&:hover': {
                                    textDecoration: 'none',
                                }
                            }}
                            component={Link} // ⚡ اصلاح شد: متصل به کامپوننت نکست
                            href={`/app/user/profile?uid=${item.user_id}`} // ⚡ اصلاح شد: استفاده از href به جای to
                        >
                            <ListItemAvatar sx={{ ml: 2, mr: 0 }}>
                                <CustomAvatar
                                    alt="profile_image"
                                    src={item.avatar?.path ? `${hostAddress}/${item.avatar.path}` : ""}
                                />
                            </ListItemAvatar>

                            <ListItemText
                                sx={{ textAlign: "right" }}
                                primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
                                primary={`${item.first_name || ''} ${item.last_name || ''}`}
                                secondary={
                                    <Typography
                                        fontSize={10}
                                        align="right"
                                        component="span"
                                        variant="subtitle1"
                                        sx={{
                                            color: theme.palette.grey[400],
                                            display: 'inline',
                                            fontStyle: 'italic'
                                        }}
                                    >
                                        {item.team_members?.createdAt ? (
                                            <>
                                                عضویت از {createDateStr(createDateLetter(item.team_members.createdAt))}
                                            </>
                                        ) : (
                                            'تاریخ عضویت نامشخص'
                                        )}
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <Divider variant="middle" component="li" />
                    </React.Fragment>
                ))
            ) : (
                <UserListSkeleton />
            )}
        </List>
    );
}