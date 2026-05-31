import * as React from "react";
import { useState, useEffect, useRef } from "react";
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
  Theme,
  useTheme,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
//Tabler icon
import {
  IconFilter,
  IconX,
  IconAdjustments,
  IconSortDescending,
  IconSortAscending,
  IconChevronLeft,
  IconChevronDown,
  IconCircleFilled,
} from "@tabler/icons-react";
//swipe item
import { useSwipeable } from "react-swipeable";
//motion div
import { motion } from "framer-motion";

//project import
import CustomLoadingButton from "@/components/ui-component/utilities/CustomLoadingButton";
import { showBottomSheet } from "@/components/store/slices/bottomSheetSlice";
import { CustomTextField } from "@/components/ui-component/utilities/inputs";
import PopperCalender from "@/components/ui-component/utilities/PopperCalender";
import styles from "./style.module.css";
import { persiandate } from "@/components/utils/Lib";
import Transition from "@/components/ui-component/utilities/extended/Transitions";
import dataHandler from "@/components/api/dataHandler";
import api from "@/components/api/api";
import ApiServer from "@/components/api/api.server";
import { SportIcons } from "@/components/icons/sportIcons";

// -------------------- Types & Interfaces --------------------
interface SportItem {
  sport_field_id: number;
  field_title: string;
  field_icon?: string;
  [key: string]: any;
}

interface FilterItem {
  id: number;
  title: string;
  start_icon: React.ReactNode;
  end_icon: React.ReactNode;
  sport_field_id?: number;
}

interface DateValue {
  startDate: string;
  endDate: string;
}

interface FiltersSectionProps {
  onChange: (value: string | number) => void;
}

interface PopperCalenderProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  onChange: (e: any) => void;
}

// -------------------- SportBottomSheetContent --------------------
const SportBottomSheetContent: React.FC = () => {
  const theme = useTheme();
  const [loadedItems, setLoadedItems] = useState<SportItem[]>([]);
  const [sportList, setSportList] = useState<SportItem[]>([]);
  const [fieldParentId, setFieldParentId] = useState<number>(0);
  const [fieldSelectTitle, setFieldSelectTitle] = useState<string | null>(null);

  const getData = () => {
    const body = {
      field_parent_id: fieldParentId,
      title: "",
      field_id: "",
    };

    const result = dataHandler(ApiServer.listSports(body), "get", "");

    try {
      result(async function (data: any, status: boolean) {
        if (status) setSportList(data.result);
      });
    } catch (error) {
      //error handle here
    }
  };

  useEffect(() => {
    getData();
    setLoadedItems([]);
  }, [fieldParentId]);

  useEffect(() => {
    if (sportList) {
      sportList.forEach((item, index) => {
        setTimeout(() => {
          setLoadedItems((prev) => [...prev, item]);
        }, index * 200);
      });
    }
  }, [sportList]);

  const listItemOnclickHandler = (field_id: number, title: string) => {
    setFieldSelectTitle(title);
    setFieldParentId(field_id);
  };

  return (
    <Stack sx={{ p: 2 }}>
      {fieldParentId !== 0 && (
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
          variant="contained"
          color="primary"
        >
          <IconChevronDown />
          <Typography fontSize={12} sx={{ order: 1 }}>
            {fieldSelectTitle}
          </Typography>
          <IconButton
            sx={{ color: theme.palette.grey[50], order: 3 }}
            size="small"
            onClick={() => setFieldParentId(0)}
          >
            <IconX size={16} />
          </IconButton>
        </Button>
      )}
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {loadedItems.map((item, index) => {
          const IconComponent = SportIcons[item.field_icon as keyof typeof SportIcons];
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
                    backgroundColor: theme.palette.primary.light,
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {IconComponent ? (
                    <IconComponent />
                  ) : (
                    <IconCircleFilled size={12} />
                  )}
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

// -------------------- FilterBottomSheetContent --------------------
const FilterBottomSheetContent: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [textField, setTextField] = useState<keyof DateValue | null>(null);
  const [value, setValue] = useState<DateValue>({
    startDate: "",
    endDate: "",
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>, textField: keyof DateValue) => {
    setTextField(textField);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleDateChange = (e: any) => {
    if (textField) {
      setValue({ ...value, [textField]: persiandate(e)[1] });
    }
  };

  return (
    <>
      <PopperCalender
        anchorEl={anchorEl}
        handleClose={handleClose}
        onChange={handleDateChange}
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
                onChange={(e) => console.log(e)}
                value={value.startDate}
                readOnly={true}
                placeholder={"از تاریخ "}
              />
            </Box>
          </Grid>
          <Grid item sm={6} xs={6}>
            <Box onClick={(e) => handleClick(e, "endDate")}>
              <CustomTextField
                onChange={(e) => console.log(e)}
                value={value.endDate}
                readOnly={true}
                placeholder={"تا تاریخ "}
              />
            </Box>
          </Grid>
          <Grid item sm={12}>
            <Box sx={{ mt: 2 }}>
              <CustomLoadingButton padding={1} variant={"contained"}>
                فیلتر کن
              </CustomLoadingButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

// -------------------- FiltersSection --------------------
const FiltersSection: React.FC<FiltersSectionProps> = ({ onChange }) => {
  const [index, setIndex] = useState<number>(0);
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [filtersMark, setFiltersMark] = useState<FilterItem[]>([
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

  const totalItems = filtersMark.length + 2;
  const visibleItems = 5;
  const itemWidth = 125;
  const maxIndex = totalItems - visibleItems;
  const theme = useTheme();

  useEffect(() => {
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

  const removeItem = (sport_field_id: number) => {
    // onChange("-1");
    // setFiltersMark((prev) => prev.filter((item) => item.sport_field_id !== sport_field_id));
  };

  const selectItem = (sport_field_id: number) => {
    if (sport_field_id !== selectedItem) {
      setSelectedItem(sport_field_id);
      onChange(sport_field_id);
    } else {
      setSelectedItem(null);
      onChange("");
    }
  };

   const sportButtonOnclick = () => {
    dispatch(showBottomSheet({ 
      title: "ورزش ها",
      renderContent: () => <SportBottomSheetContent />,
      ptSX: ""
    }));
  };
  const filterButtonOnclick = () => {
  dispatch(showBottomSheet({ 
    title: "فیلتر",
    renderContent: () => <FilterBottomSheetContent />,
    ptSX: "30%"
  }));
};

  return (
    <Stack direction={"row-reverse"} spacing={1} sx={{ p: 0 }}>
      <Box
        {...handlers}
        sx={{
          width: `${visibleItems * (itemWidth + 10)}px`,
          flexDirection: "row-reverse",
          overflow: "hidden",
          display: "flex-item",
          alignItems: "center",
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
              endIcon={  <IconX size={16} />}
              onClick={() => selectItem(item.id)}
              variant="outlined"
              color="primary"
            >
              <Typography fontSize={11}>{item.title}</Typography>
            {/** <IconButton
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
              
              </IconButton>*/}  
            </Button>
          ))}
        </motion.div>
      </Box>
    </Stack>
  );
};

export default FiltersSection;