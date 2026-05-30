import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import {
    Button,
    Box,
    Stack,
    Typography,
    IconButton,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    useTheme,
    CircularProgress,
} from "@mui/material";
import { IconChevronLeft } from "@tabler/icons-react";
import api from '@/components/api/api'
import dataHandler from '@/components/api/dataHandler'

// تعریف اینترفیس برای داده‌ها
interface SportItem {
    id: number;
    title: string;
    [key: string]: any; // برای سایر فیلدهای احتمالی
}

interface SportSelection {
    sport_parent_id: number | null;
    sport_parent_title: string | null;
    sport_field_id: number | null;
    sport_field_title: string | null;
}

interface SportSelectorProps {
    onChange: (sport: SportSelection) => void;
}

const SportSelector: React.FC<SportSelectorProps> = ({ onChange }) => {
    const theme = useTheme();
    const [sportList, setSportList] = useState<SportItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [fieldParentId, setFieldParentId] = useState<number | null>(0);
    const [selectedParent, setSelectedParent] = useState<{ id: number | null; title: string | null }>({
        id: null,
        title: null,
    });

    const [finalSelection, setFinalSelection] = useState<SportSelection>({
        sport_parent_id: null,
        sport_parent_title: null,
        sport_field_id: null,
        sport_field_title: null,
    });

    const getData = () => {
        // 1. اصلاح تبدیل به رشته (استفاده از ?? به جای || تا 0 حذف نشود)
        const parentIdString = String(fieldParentId ?? "0");
        const body = {
            title: "",
            field_id: "",
            field_parent_id: parentIdString
        }
        const result = dataHandler(
            api.listSports(body),
            "get",
            ""
        );

        console.log(api.listSports(parentIdString))
        try {
            result((data: any, status: boolean) => {
                if (!status || !data) return;

                // 2. مستقیماً دیتا را ست کنید یا اگر شرطی می‌گذارید 0 را هم در نظر بگیرید
                // بر اساس منطق شما: اگر ریشه (0 یا null) بود، یا هر مقداری داشت، لیست را آپدیت کن
                if (data.result) {
                    setSportList(data.result as SportItem[]);
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // 3. اصلاح شرط: چک کنید که مقدار null یا undefined نباشد (0 قبول است)
        if (fieldParentId !== null && fieldParentId !== undefined) {
            getData();
        }
    }, [fieldParentId]); // اگر selectedParent هم روی لیست اثر دارد، آن را بگذارید، در غیر این صورت حذف کنید
    /* useEffect(() => {
         if (selectedParent.id !== null && selectedParent.id !== 0) {
             getData();
         }
     }, [selectedParent]);*/

    const handleItemClick = (item: SportItem) => {
        if (selectedParent.id === null || selectedParent.id === 0) {
            setFieldParentId(item.sport_field_id)
         
            // مرحله اول: انتخاب والد
            setSelectedParent({ id: item.sport_field_id, title: item.field_title });
            setFinalSelection((prev) => ({
                ...prev,
                sport_parent_id: item.sport_field_id,
                sport_parent_title: item.field_title,
                sport_field_id: null,
                sport_field_title: null,
            }));
        } else {
            // مرحله دوم: انتخاب فرزند
            const newSelection: SportSelection = {
                ...finalSelection,
                sport_field_id: item.sport_field_id,
                sport_field_title: item.field_title,
            };
            setFinalSelection(newSelection);
            onChange(newSelection);
            
        }
    };

    const handleGoBack = () => {
         setFieldParentId(0)
        setSelectedParent({ id: 0, title: "0" });
        setFinalSelection((prev) => ({
            ...prev,
            sport_field_id: null,
            sport_field_title: null,
        }));

        getData();
    };

    return (
        <Stack sx={{ p: 2, height: '100%', justifyContent: 'flex-start', direction: 'rtl' }}>

            {/* هدر: نمایش مسیر انتخاب یا دکمه بازگشت */}
            {selectedParent.id !== null && selectedParent.id !== 0 ? (
                <Box sx={{ width: '100%', mb: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<IconChevronLeft size={18} />}
                        onClick={handleGoBack}
                        sx={{
                            width: '100%',
                            textAlign: 'right',
                            justifyContent: 'flex-start',
                            flexDirection: 'row-reverse', // برای RTL: آیکون در چپ، متن در راست
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            بازگشت به لیست رشته‌ها
                        </Typography>
                    </Button>

                    <Divider sx={{ my: 1 }} />

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            textAlign: 'right',
                            mr: 1,
                            fontWeight: 'bold',
                        }}
                    >
                        زیرمجموعه‌های: {selectedParent.title}
                    </Typography>
                </Box>
            ) : (
                <Typography
                    variant="h6"
                    sx={{
                        textAlign: 'right',
                        mb: 2,
                        mr: 1,
                        fontWeight: 'bold',
                    }}
                >
                    انتخاب رشته ورزشی
                </Typography>
            )}

            {/* لیست آیتم‌ها */}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <List sx={{ width: '100%', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', p: 0 }}>
                    {sportList.length === 0 ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                            <Typography color="text.secondary">رشته‌ای یافت نشد</Typography>
                        </Box>
                    ) : (
                        sportList.map((item: any) => {
                          
                            return (<>
                                <ListItem
                                    key={item.id}
                                    button
                                    onClick={() => handleItemClick(item)}
                                    sx={{
                                        flexDirection: 'row-reverse', // RTL: متن راست، آیکون چپ
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        px: 2,
                                        py: 1.5,
                                        borderBottom: '1px solid',
                                        borderColor: 'divider',
                                        '&:hover': {
                                            bgcolor: 'action.hover',
                                        },
                                        // هایلایت آیتم انتخاب شده (فرزند)
                                        ...(finalSelection.sport_field_id === item.id ? {
                                            bgcolor: 'primary.light',
                                            color: 'primary.contrastText',
                                            fontWeight: 'bold',
                                        } : {}),

                                        // هایلایت آیتم انتخاب شده (والد) - اگر هنوز فرزند انتخاب نشده باشد
                                        ...(finalSelection.sport_parent_id === item.id && finalSelection.sport_field_id === null ? {
                                            bgcolor: 'action.selected',
                                            fontWeight: 'medium',
                                        } : {}),
                                    }}
                                >
                                    <ListItemText
                                        primary={item.field_title}
                                        primaryTypographyProps={{
                                            textAlign: 'right',
                                            fontWeight: 500
                                        }}
                                    />

                                    <ListItemIcon sx={{ minWidth: 'auto', ml: 2, mr: 0 }}>
                                        {/* نمایش فلش یا تیک بر اساس وضعیت */}
                                        <IconChevronLeft
                                            size={16}
                                            color={
                                                finalSelection.sport_field_id === item.id
                                                    ? theme.palette.primary.main
                                                    : theme.palette.grey[500]
                                            }
                                        />
                                    </ListItemIcon>
                                </ListItem>
                            </>)
                        })
                    )}
                </List>
            )}
        </Stack>
    );
};

export default SportSelector