import * as React from 'react';
// Mui import
import { List, ListItem, Divider, ListItemText, ListItemAvatar, Typography } from '@mui/material';
// project import
import { ProfileImagePlaceholder } from '@/components/ui-component/cards/Skeleton/ImagePlaceholder';
import ImagePlaceholder from '@/components/ui-component/cards/Skeleton/ImagePlaceholder';

// در صورتی که این کامپوننت پروپ خاصی دریافت نمی‌کند، یک اینترفیس خالی یا اصطلاحاً شیء خالی برای آن در نظر می‌گیریم.
interface UserListSkeletonProps {
    data?: any; // پروپ دیتا در کامپوننت اصلی استفاده نشده اما برای سازگاری با ورودی قرار داده شد
}

export default function UserListSkeleton({ data }: UserListSkeletonProps) {
    // ایجاد یک آرایه با ۳ المان برای رندر کردن ۳ ردیف اسکلتون (لودینگ) به صورت داینامیک
    const skeletonItems = [1, 2, 3];

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {skeletonItems.map((item, index) => (
                <React.Fragment key={index}>
                    <ListItem sx={{ direction: "rtl" }}>
                        <ListItemAvatar>
                            <ProfileImagePlaceholder />
                        </ListItemAvatar>
                        
                        <ListItemText
                            sx={{ textAlign: "right" }}
                            primaryTypographyProps={{ component: 'div' }} // تغییر کامپوننت پیش‌فرض برای سازگاری با المان‌های بلاک داخل اسکلتون
                            secondaryTypographyProps={{ component: 'div' }}
                            primary={<ImagePlaceholder />}
                            secondary={
                                <Typography
                                    align="right"
                                    component="span"
                                    sx={{ display: 'block', mt: 0.5 }}
                                >
                                    <ImagePlaceholder />
                                </Typography>
                            }
                        />
                    </ListItem>
                    {/* اگر ردیف آخر نبود، خط جداکننده را رندر کن */}
                    {index < skeletonItems.length - 1 && <Divider variant="middle" component="li" />}
                </React.Fragment>
            ))}
        </List>
    );
}