/*import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

//ui-material
import {
  Button,
  Box,
  Divider,
  Grid,
  Stack,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ArrowBack } from "@mui/icons-material";
import { Home, Settings, Person } from "@mui/icons-material";
//Tabler icon
import {
  IconFilter,
  IconX,
  IconAdjustmentsHorizontal,
  IconAdjustments,
  IconChevronLeft,
  IconChevronDown,
  IconPlayerRecord,
  IconCircleFilled,
} from "@tabler/icons-react";

//swipe item
import { useSwipeable } from "react-swipeable";
//motion div
import { motion } from "framer-motion";
//project import
import { showBUTTOMSheet } from "store/bottomSheetReducer";
import Transition from "@/components/ui-component/extended/Transitions";
import api from '@/components/api/api';
import dataHandler from '@/components/api/dataHandler';
import { SportIcons } from "icons/sportIcons";

const BottomSheetContent = () => {
  const theme = useTheme();
  const [loadedItems, setLoadedItems] = useState([]);
  const [sportList, setSportList] = useState([]);
  const [fieldParentId, setFeildParentId] = useState(0);
  const [fieldSelectTitle, setFieldSelectTitle] = useState(null);

  const getData = () => {
    const body = {
      field_parent_id: fieldParentId,
      title: "",
      field_id: "",
    };

    const result = dataHandler(api.listSports(body), "get", "");

    try {
      result(async function (data, status) {
        if (status) setSportList(data.result);
      });
    } catch (error) {
      //error handle here
    }
  };
  React.useEffect(() => {
    getData("");
    setLoadedItems([]);
  }, [fieldParentId]);
  React.useEffect(() => {
    if (sportList) {
      sportList.forEach((item, index) => {
        setTimeout(() => {
          setLoadedItems((prev) => [...prev, item]);
        }, index * 200);
      });
    }
  }, [sportList]);
  const listItemOnclickHandler = (field_id, title) => {
    setFieldSelectTitle(title);
    setFeildParentId(field_id);
  };

  return (
    <Stack sx={{ p: 2 }}>
      {fieldParentId !== 0 ? (
        <Button
          sx={{
            p: 1,
            width: "100%",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "6px",
            borderRadius: 3,
          }}
          //   onClick={() => selectItem(item.id)}
          variant="contained"
          color="primary"
        >
          <IconChevronDown sx={{ order: 2 }} /> {/* آیکون در چپ قرار می‌گیرد }
          <Typography fontSize={12} sx={{ order: 1 }}>
            {fieldSelectTitle}
          </Typography>
          <IconButton
            sx={{ color: theme.palette.grey[50], order: 3 }}
            size="small"
            onClick={() => setFeildParentId(0)}
          >
            <IconX size={16} />
          </IconButton>
        </Button>
      ) : (
        <></>
      )}
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {loadedItems.map((item, index) => {
          const IconComponent = SportIcons[item.field_icon]; // اینجا باید داخل map باشه
          return (
            <Transition type={"fade"} in={true} key={index}>
              <ListItem
                onClick={() =>
                  listItemOnclickHandler(item.sport_field_id, item.field_title)
                }
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                  borderBottom: "1px solid #e0e0e0",
                  "&:hover": {
                    borderRadius: 5,
                    backgroundColor: theme.palette.primary[100], // تغییر رنگ پس‌زمینه هنگام هاور
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {IconComponent ? (
                    <IconComponent />
                  ) : (
                    <>
                      <IconCircleFilled size={12} />
                    </>
                  )}{" "}
                  {/* نمایش آیکن داینامیک }
                  <ListItemText sx={{ px: 1 }} primary={item.field_title} />
                </Box>

                <IconButton edge="end" aria-label="arrow-back">
                  <IconChevronLeft />
                </IconButton>
              </ListItem>
            </Transition>
          );
        })}
      </List>
    </Stack>
  );
};

//-------------------------------------------| Filter Section |---------------------------------
const SportFiltersSection = ({ onChange }) => {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const containerRef = React.useRef(null);
  const [selectedItem, setSelectedItem] = useState(null); // فقط یک دکمه انتخاب شود
  const [filtersMark, setFiltersMark] = useState([
    {
      sport_field_id: 2,
      title: "فوتبال سالنی",
      start_icon: <IconFilter size={16} />,
      end_icon: <IconX size={16} />,
    },
    {
      sport_field_id: 3,
      title: "فوتبال چمنی",
      start_icon: <IconFilter size={16} />,
      end_icon: <IconX size={16} />,
    },
    {
      sport_field_id: 4,
      title: "والیبال",
      start_icon: <IconFilter size={16} />,
      end_icon: <IconX size={16} />,
    },
    {
      sport_field_id: 5,
      title: "تنیس",
      start_icon: <IconFilter size={16} />,
      end_icon: <IconX size={16} />,
    },
  ]);

  const totalItems = filtersMark.length;
  const visibleItems = 3; // تعداد آیتم‌های قابل نمایش
  const itemWidth = 135; // عرض هر آیتم
  const maxIndex = totalItems - visibleItems; // حداکثر مقدار ایندکس

  const nextSlide = () => {
    setIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
  });
  // حذف آیتم با کلیک روی endIcon
  const removeItem = (sport_field_id) => {
    //onChange("-1")
    // setFiltersMark((prev) => prev.filter((item) => item.sport_field_id !== sport_field_id));
  };
  const selectItem = (sport_field_id) => {
    //if selected item and sport field id is equal
    if (sport_field_id !== selectedItem) {
      setSelectedItem((prev) =>
        prev === sport_field_id ? null : sport_field_id
      );
      onChange(sport_field_id);
    } else{ setSelectedItem("")
      onChange("")};
  };
  const sportButtonOnclick = () => {
    dispatch(showBUTTOMSheet(<BottomSheetContent />, "ورزش ها", ""));
  };
const theme=useTheme();
  return (
    <Stack direction={"row-reverse"} spacing={1} sx={{ p: 0 }}>
      <Button
        sx={{
          p: 1,
          width: `${itemWidth}px`,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "6px",
          height: 44,
        }}
        endIcon={<IconAdjustments />} // آیکون سمت راست
        variant="outlined"
        color="primary"
        onClick={sportButtonOnclick}
      >
        <Typography fontSize={12}>ورزش ها</Typography>
      </Button>
      <Box
        {...handlers}
       // ref={containerRef}
        sx={{
           width: `${(visibleItems) * (itemWidth+8)}px`,
        
          overflow: "hidden",
          // border: "2px solid black",
          display: "flex-item",
          alignItems: "center",
       //  justifyContent: "flex-start",
          position: "relative",
        }}
      >
        <motion.div
          style={{
            display: "flex",
            gap: "10px",
            width: `${totalItems * (itemWidth + 10)}px`,
            cursor: "grab",
          }}
          drag="x"
          dragConstraints={{
            left: -(maxIndex * (itemWidth + 10)),
            right: 0,
          }}
          animate={{ x: -index * (itemWidth + 10) }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {filtersMark.map((item, i) => (
            <Button
              key={i}
              sx={{
                p: 1,
                width: `${itemWidth}px`,
                flexShrink: 0,
                display: "flex",
                alignItems: "right",
                justifyContent: "flex-end", // آیکون شروع در ابتدای دکمه قرار گیرد
                gap: "6px", // فاصله بین آیکون و متن
               // backgroundColor:
                // selectedItem === item.sport_field_id ? "#1976D2" : "white", // تغییر رنگ فقط برای دکمه‌ی انتخاب‌شده
                color:
                  selectedItem === item.sport_field_id ? theme.palette.secondary.main : theme.palette.primary.main,
                borderColor:
                  selectedItem === item.sport_field_id ? theme.palette.secondary.main : theme.palette.primary.main,
              }}
              startIcon={item.start_icon}
              onClick={() => selectItem(item.sport_field_id, item)}
              variant="outlined"
              color="primary"
            >
              <Typography fontSize={11}>{item.title}</Typography>
              {
                <IconButton size="small" sx={{
                  color:
                  selectedItem === item.sport_field_id ? theme.palette.secondary.main : theme.palette.primary.main,
                borderColor:
                  selectedItem === item.sport_field_id ? theme.palette.secondary.main : theme.palette.primary.main,

                }} >
                  <IconX size={16} />
                </IconButton>
              }
            </Button>
          ))}
        </motion.div>
      </Box>
    </Stack>
  );
};
export default SportFiltersSection;*/
