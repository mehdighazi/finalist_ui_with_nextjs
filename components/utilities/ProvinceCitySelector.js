import * as React from "react";
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
import Transition from "ui-component/extended/Transitions";
import api from "api/api";
import dataHandler from "api/dataHandler";
import { SportIcons } from "icons/sportIcons";

const ProvinceCitySelecetor = ({ onChange }) => {
  const theme = useTheme();
  const [loadedItems, setLoadedItems] = useState([]);
  const [list, setList] = useState([]);
  const [fieldParentId, setFeildParentId] = useState("");
  const [fieldSelectTitle, setFieldSelectTitle] = useState(null);
  const [locationInfo, setLocationInfo] = useState({
    city_id: null,
    city_title: null,
    province_id: null,
    province_title: null
  })

  const handleInputChange = ({ name, value }) => {
    setLocationInfo(prev => ({ ...prev, [name]: value }));
  };
  const getData = () => {
    const result = dataHandler(api.provinceWithCityList(fieldParentId), "get", "");
    try {
      result(async function (data, status) {
        if (status && !fieldParentId) {
          setList(data.result);
        } else if (status && fieldParentId) {
          setList(data.result[0].cities); // get cities from json
        }
      });
    } catch (error) {
      // error handle here
    }
  };
  
  const listItemOnclickHandler = (field_id, title, type) => {
    setFieldSelectTitle(title);
    if (type === 'city') {
      setFeildParentId(null);
      handleInputChange({ name: 'city_id', value: field_id });
      handleInputChange({ name: 'city_title', value: title });
      onChange({
        city_id: field_id,
        city_title: title,
        province_id: locationInfo.province_id,
        province_title: locationInfo.province_title,
      });
    } else {
      setFeildParentId(field_id);
      handleInputChange({ name: 'province_id', value: field_id });
      handleInputChange({ name: 'province_title', value: title });
    }
  };
 
  React.useEffect(() => {
    getData();
    setLoadedItems([]);
  }, [fieldParentId]);
  React.useEffect(() => {
    if (list) {
      list.forEach((item, index) => {
        setTimeout(() => {
          setLoadedItems((prev) => [...prev, item]);
        }, index * 1);
      });
    }
  }, [list]);

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
            onClick={() => setFeildParentId()}
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
                  listItemOnclickHandler(
                    !fieldParentId ? item.province_id : item.city_id,
                    !fieldParentId ? item.province_title : item.city_title,
                    fieldParentId ? 'city' : 'province'
                  )
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
                  <ListItemText sx={{ px: 1 }} primary={!fieldParentId?item.province_title:item.city_title} />
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
export default ProvinceCitySelecetor