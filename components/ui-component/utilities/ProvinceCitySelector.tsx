"use client"
import * as React from "react";
import { useState, useEffect } from "react";

// ui-material
import {
  Button,
  Box,
  Stack,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";

import {
  IconX,
  IconChevronLeft,
  IconChevronDown,
  IconCircleFilled,
} from "@tabler/icons-react";

// project imports
import Transition from "@/components/ui-component/extended/Transitions";
import api from "@/components/api/api";
import dataHandler from "@/components/api/dataHandler";
import { SportIcons } from "@/components/icons/sportIcons";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------

interface Province {
  province_id: number;
  province_title: string;
  field_icon?: keyof typeof SportIcons;
  cities?: City[];
}

interface City {
  city_id: number;
  city_title: string;
}

interface LocationInfo {
  city_id: number | null;
  city_title: string | null;
  province_id: number | null;
  province_title: string | null;
}

interface ProvinceCitySelectorProps {
  onChange: (payload: {
    city_id: number;
    city_title: string;
    province_id: number | null;
    province_title: string | null;
  }) => void;
}

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

const ProvinceCitySelector: React.FC<ProvinceCitySelectorProps> = ({ onChange }) => {
  const theme = useTheme();

  const [list, setList] = useState<Array<Province | City>>([]);
  const [loadedItems, setLoadedItems] = useState<Array<Province | City>>([]);

  const [fieldParentId, setFieldParentId] = useState<number | null>(null);
  const [fieldSelectTitle, setFieldSelectTitle] = useState<string | null>(null);

  const [locationInfo, setLocationInfo] = useState<LocationInfo>({
    city_id: null,
    city_title: null,
    province_id: null,
    province_title: null,
  });

  // ------------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------------

  const handleInputChange = <K extends keyof LocationInfo>(
    name: K,
    value: LocationInfo[K]
  ) => {
    setLocationInfo((prev) => ({ ...prev, [name]: value }));
  };

  const getData = () => {
    const parentIdString = String(fieldParentId || ""); 

    const result = dataHandler(
      api.provinceWithCityList( parentIdString),
      "get",
      ""
    );

    try {
      result((data: any, status: boolean) => {
        if (!status) return;

        if (fieldParentId === null) {
          setList(data.result as Province[]);
        } else {
          setList(data.result[0].cities as City[]);
        }
      });
    } catch (error) {
      // error handling
    }
  };

  const listItemOnclickHandler = (
    id: number,
    title: string,
    type: "province" | "city"
  ) => {
    setFieldSelectTitle(title);

    if (type === "city") {
      setFieldParentId(null);

      handleInputChange("city_id", id);
      handleInputChange("city_title", title);

      onChange({
        city_id: id,
        city_title: title,
        province_id: locationInfo.province_id,
        province_title: locationInfo.province_title,
      });
    } else {
      setFieldParentId(id);

      handleInputChange("province_id", id);
      handleInputChange("province_title", title);
    }
  };

  // ------------------------------------------------------------------
  // Effects
  // ------------------------------------------------------------------

  useEffect(() => {
    getData();
    setLoadedItems([]);
  }, [fieldParentId]);

  useEffect(() => {
    list.forEach((item, index) => {
      setTimeout(() => {
        setLoadedItems((prev) => [...prev, item]);
      }, index * 10);
    });
  }, [list]);

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------

  return (
    <Stack sx={{ p: 2 }}>
      {fieldParentId !== null && (
        <Button
          variant="contained"
          color="primary"
          sx={{
            p: 1,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 3,
          }}
        >
          <IconChevronDown />
          <Typography fontSize={12}>{fieldSelectTitle}</Typography>
          <IconButton
            size="small"
            sx={{ color: theme.palette.grey[50] }}
            onClick={() => setFieldParentId(null)}
          >
            <IconX size={16} />
          </IconButton>
        </Button>
      )}

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {loadedItems.map((item, index) => {
          const isProvince = "province_id" in item;
          const IconComponent =
            isProvince && item.field_icon
              ? SportIcons[item.field_icon]
              : null;

          return (
            <Transition type="fade" in key={index}>
              <ListItem
                onClick={() =>
                  listItemOnclickHandler(
                    isProvince ? item.province_id : item.city_id,
                    isProvince ? item.province_title : item.city_title,
                    isProvince ? "province" : "city"
                  )
                }
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: 1,
                  borderBottom: "1px solid #e0e0e0",
                  "&:hover": {
                    borderRadius: 5,
                    backgroundColor: theme.palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {IconComponent ? <IconComponent /> : <IconCircleFilled size={12} />}
                  <ListItemText
                    sx={{ px: 1 }}
                    primary={
                      isProvince ? item.province_title : item.city_title
                    }
                  />
                </Box>

                <IconButton edge="end">
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

export default ProvinceCitySelector;
