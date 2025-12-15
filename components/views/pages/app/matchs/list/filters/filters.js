import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
//ui-material
import {
  Button,
  Box,
  Divider,
  Grid,
  Typography,
  IconButton,
  Stack,
  ClickAwayListener,
  Popper,
  useTheme,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { styled } from "@mui/material/styles";
//Tabler icon
import {
  IconFilter,
  IconX,
  IconAdjustmentsHorizontal,
  IconAdjustments,
  IconSortDescending,
  IconSortAscending,
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
import CustomLoadingButton from "views/utilities/CustomLoadingButton";
import { Calendar, CalendarProvider } from "zaman";
import { showBUTTOMSheet } from "store/bottomSheetReducer";
import { CustomTextField } from "views/utilities/inputs";
import PopperCalender from "views/utilities/PopperCalender";
import "./style.css";
import { persiandate } from "utils/Lib";
import Transition from "ui-component/extended/Transitions";
import dataHandler from "api/dataHandler";
import api from "api/api";
import { SportIcons } from "icons/sportIcons";
////--------------------------------------------------------|          |----------------------------------

const SportBottomSheetContent = () => {
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
          <IconChevronDown sx={{ order: 2 }} /> {/* آیکون در چپ قرار می‌گیرد */}
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
                  {/* نمایش آیکن داینامیک */}
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
//---------------------------------------------------|           |----------------------------------
const FilterBottomSheetContent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [date, setDate] = useState(null);
  const [textField, setTextField] = useState(null);
  const [value, setValue] = useState({
    startDate: "",
    endDate: "",
  });
  const handleClick = (event, textField) => {
    setTextField(textField);
    setAnchorEl(anchorEl ? null : event.currentTarget); // باز و بسته کردن منو
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  //const [calendarValue, setCalendarValue] = useState(new Date())
  return (
    <>
      <PopperCalender
        anchorEl={anchorEl}
        handleClose={handleClose}
        onChange={(e) => setValue({ [textField]: persiandate(e)[1] })}
      />
      <Box sx={{ p: 2, px: 5 }}>
        <Typography fontSize={16} variant="h5">
          انتخاب تاریخ
        </Typography>
        <Divider sx={{ m: 1 }} />
        <Grid container spacing={1} sx={{ mt: 2 }}>
          <Grid item sm={6} xs={6}>
            <Box onClick={(e) => handleClick(e, "startDate")}>
              <CustomTextField
                value={value.startDate}
                readOnly={true}
                placeHolder={"از تاریخ "}
              />
            </Box>
          </Grid>
          <Grid item sm={6} xs={6}>
            <Box onClick={(e) => handleClick(e, "endDate")}>
              <CustomTextField
                value={value.endDate}
                readOnly={true}
                placeHolder={"تا تاریخ "}
              />
            </Box>
          </Grid>
          <Grid sm={12}>
            <Box sx={{ mt: 2 }}>
              {
                <CustomLoadingButton padding={1} variant={"contained"}>
                  فیلتر کن
                </CustomLoadingButton>
              }
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
//-------------------------------------------| Filter Section |---------------------------------
/*const FiltersSection = () => {
  const [index, setIndex] = useState(0);
  const containerRef = React.useRef(null);
  const [selectedItem, setSelectedItem] = useState(null); // فقط یک دکمه انتخاب شود
  const [filtersMark, setFiltersMark] = useState([
    {
      id: 1,
      title: "تاریخ نزولی",
      start_icon: <IconSortDescending size={16} />,
      end_icon: <IconSortDescending size={16} />,
    },
    {
      id: 2,
      title: "تاریخ صعودی",
      start_icon: <IconSortAscending size={16} />,
      end_icon: <IconX size={16} />,
    },
    {
      id: 3,
      title: "امتیاز صعودی",
      start_icon: <IconSortAscending size={16} />,
      end_icon: <IconX size={16} />,
    },
    {
      id: 4,
      title: "امتیاز نزولی",
      start_icon: <IconSortDescending size={16} />,
      end_icon: <IconX size={16} />,
    },
  ]);

  const dispatch = useDispatch();
  const totalItems = filtersMark.length;
  const visibleItems = 3; // تعداد آیتم‌های قابل نمایش
  const itemWidth = 140; // عرض هر آیتم
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
  const removeItem = (id) => {
    setFiltersMark((prev) => prev.filter((item) => item.id !== id));
  };
  const selectItem = (id) => {
    setSelectedItem((prev) => (prev === id ? null : id));
  };
  const filterButtonOnclick = () => {
    dispatch(showBUTTOMSheet(<BottomSheetContent />, "فیلتر", "30%"));
  };

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
        onClick={filterButtonOnclick}
      >
        <Typography fontSize={12}>فیلتر</Typography>
      </Button>
      <Box
        {...handlers}
        ref={containerRef}
        sx={{
          // width: `${visibleItems * itemWidth}px`,
          width: "100%",
          overflow: "hidden",
          // border: "2px solid black",
          display: "flex",
          alignItems: "right",
          justifyContent: "flex-end",
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
                backgroundColor: selectedItem === item.id ? "#1976D2" : "white", // تغییر رنگ فقط برای دکمه‌ی انتخاب‌شده
                color: selectedItem === item.id ? "white" : "black",
                borderColor: selectedItem === item.id ? "#1976D2" : "black",
              }}
              startIcon={item.start_icon}
              onClick={() => selectItem(item.id)}
              variant="outlined"
              color="primary"
            >
              <Typography fontSize={11}>{item.title}</Typography>
              {
                <IconButton size="small" onClick={() => removeItem(item.id)}>
                  <IconX size={16} />
                </IconButton>
              }
            </Button>
          ))}
        </motion.div>
      </Box>
    </Stack>
  );
};*/
//--------------------------------------------------
const FiltersSection = ({ onChange }) => {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const containerRef = React.useRef(null);
  const [selectedItem, setSelectedItem] = useState(null); // فقط یک دکمه انتخاب شود
  const [filtersMark, setFiltersMark] = useState([
    {
      id: 2,
      title: "فوتبال سالنی",
      start_icon: <IconFilter size={16} />,
      end_icon: <IconX size={16} />,
    },
    {
      id: 3,
      title: "فوتبال چمنی",
      start_icon: <IconFilter size={16} />,
      end_icon: <IconX size={16} />,
    },
    {
      id: 4,
      title: "والیبال",
      start_icon: <IconFilter size={16} />,
      end_icon: <IconX size={16} />,
    },
    {
      id: 5,
      title: "تنیس",
      start_icon: <IconFilter size={16} />,
      end_icon: <IconX size={16} />,
    },
    {
      id: 6,
      title: "زودترین",
      start_icon: <IconSortDescending size={16} />,
      end_icon: <IconSortDescending size={16} />,
    },
    {
      id: 7,
      title: "دیرترین",
      start_icon: <IconSortAscending size={16} />,
      end_icon: <IconX size={16} />,
    },
    {
      id: 8,
      title: " بیشترین امتیاز",
      start_icon: <IconSortAscending size={16} />,
      end_icon: <IconX size={16} />,
    },
    {
      id: 9,
      title: "کمترین امتیاز",
      start_icon: <IconSortDescending size={16} />,
      end_icon: <IconX size={16} />,
    },
  ]);

  const totalItems = filtersMark.length + 3;
  const visibleItems = 5; // تعداد آیتم‌های قابل نمایش
  const itemWidth = 125; // عرض هر آیتم
  const maxIndex = totalItems - visibleItems; // حداکثر مقدار ایندکس
  React.useEffect(() => {
    // وقتی لود شد، اسکرول کن روی آخر (محل دکمه ورزش‌ها و فیلتر)
    setIndex(0);
  }, []);
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
    } else {
      setSelectedItem("")
      onChange("")
    };
  };
  const sportButtonOnclick = () => {
    dispatch(showBUTTOMSheet(<SportBottomSheetContent />, "ورزش ها", ""));
  };
  const filterButtonOnclick = () => {
    dispatch(showBUTTOMSheet(<FilterBottomSheetContent />, "فیلتر", "30%"));
  };
  const theme = useTheme();
  return (
    <Stack direction={"row-reverse"} spacing={1} sx={{ p: 0 }}>

      <Box
        {...handlers}
        // ref={containerRef}
        sx={{
          width: `${(visibleItems) * (itemWidth + 10)}px`,
          flexDirection: "row-reverse", // 👈 این باعث میشه ترتیب از راست شروع بشه
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
          transition={{ type: "spring", stiffness: 0 }}
        >
          {/* دکمه‌های ثابت اول */}
          <Button
            sx={{
              p: 1,
              width: `${itemWidth}px`,
              flexShrink: 0,
              display: "flex",
              alignItems: "right",
              justifyContent: "flex-end",
              gap: "6px",
            }}
            endIcon={<IconAdjustments />}
            variant="outlined"
            color="primary"
            onClick={filterButtonOnclick}
          >
            <Typography fontSize={12}>فیلتر</Typography>
          </Button>

          <Button
            sx={{
              p: 1,
              width: 110,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "6px",
              height: 47,
            }}
            endIcon={<IconAdjustments />}
            variant="outlined"
            color="primary"
            onClick={sportButtonOnclick}
          >
            <Typography fontSize={12}>ورزش ها</Typography>
          </Button>

          {/* دکمه‌های داینامیک بعدش */}
          {filtersMark.map((item, i) => (
            <Button
              key={i}
              sx={{
                p: 1,
                width: `${itemWidth}px`,
                flexShrink: 0,
                display: "flex",
                alignItems: "right",
                justifyContent: "flex-end",
                gap: "6px",
                color:
                  selectedItem === item.id
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
                borderColor:
                  selectedItem === item.id
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
              }}
              startIcon={item.start_icon}
              onClick={() => selectItem(item.id, item)}
              variant="outlined"
              color="primary"
            >
              <Typography fontSize={11}>{item.title}</Typography>
              <IconButton
                size="small"
                sx={{
                  color:
                    selectedItem === item.id
                      ? theme.palette.secondary.main
                      : theme.palette.primary.main,
                  borderColor:
                    selectedItem === item.id
                      ? theme.palette.secondary.main
                      : theme.palette.primary.main,
                }}
              >
                <IconX size={16} />
              </IconButton>
            </Button>
          ))}
        </motion.div>

      </Box>
    </Stack>
  );
};
export default FiltersSection;

