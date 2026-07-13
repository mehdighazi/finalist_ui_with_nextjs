"use client";
import * as React from "react";
import { useState } from "react";
//ui-material
import {
  Box,
 
  ClickAwayListener,
  Popper,
} from "@mui/material";

//project import

import { Calendar, CalendarProvider } from "zaman";

const PopperCalender = ({anchorEl,onChange,handleClose}) => {
  
   

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  //const [calendarValue, setCalendarValue] = useState(new Date())
  return (
    <>
    
       
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          modifiers={[
            {
              name: "zIndex",
              enabled: true,
              phase: "write",
              fn: ({ state }) => {
                state.styles.popper.zIndex = 9999; // مقدار بالا برای نمایش روی همه المان‌ها
              },
            },
          ]}
          placement="bottom-start"
        >
          <ClickAwayListener onClickAway={handleClose}>
            <CalendarProvider locale="fa" direction="rtl">
              <Calendar
                className="inputClass"
                locale="fa"
                //defaultValue={calendarValue}
                onChange={(e) => onChange(e)}
              />
            </CalendarProvider>
          </ClickAwayListener>
        </Popper>
      
      
  
    </>
  );
};
export default PopperCalender