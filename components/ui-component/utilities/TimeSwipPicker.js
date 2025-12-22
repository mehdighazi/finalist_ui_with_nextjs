import React from "react";
import {
  Box, Typography, Stack, IconButton, useTheme, ClickAwayListener,
  Popper,
  Paper
} from "@mui/material";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { rlPadding } from "store/constant";
import CustomLoadingButton from "./CustomLoadingButton";

const CircularPicker = ({ items, label, value, onChange }) => {
  const index = items.indexOf(value);
  const theme = useTheme();
  const handleIncrement = () => {
    const newIndex = (index + 1) % items.length;
    onChange(items[newIndex]);
  };

  const handleDecrement = () => {
    const newIndex = (index - 1 + items.length) % items.length;
    onChange(items[newIndex]);
  };

  const handlers = useSwipeable({
    onSwipedUp: handleIncrement,
    onSwipedDown: handleDecrement,
    trackMouse: true,
  });

  const getItem = (i) => items[(i + items.length) % items.length];

  return (
    <Stack>
      <Typography variant="caption" sx={{ mr: 2 }}>
        {label}
      </Typography>
      <Box
        sx={{
          position: "relative",
          height: 150,
          overflow: "hidden",
          borderRadius: 2,
          bgcolor: "#f9f9f9",
          cursor: "grab",
          m: 2,
        }}
      >
        {/* آیکون بالا */}
        <IconButton
          onClick={handleIncrement}
          sx={{
            zIndex: 1,
            height: "30%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            background: "linear-gradient(to bottom, rgba(249,249,249,1) 0%, rgba(249,249,249,0) 100%)",
            "&:hover": {
              background: "linear-gradient(to bottom, rgba(249,249,249,0.9) 0%, rgba(249,249,249,0) 100%)",
            },
          }}
        >
          <KeyboardArrowUpIcon sx={{ color: "gray", fontSize: 24 }} />
        </IconButton>

        {/* محتوای اصلی */}
        <Box {...handlers} sx={{ height: "100%" }}>
          <Stack
            component={motion.div}
            animate={{ y: -40 }}
            transition={{ type: "spring", stiffness: 200 }}
            sx={{

              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              fontFamily: "orginalfont!important",
            }}
          >
            <Typography sx={{ color: theme.palette.primary[200], fontSize: 14, fontFamily: "orginalfont" }}>
              <span className="numfarsi-s1">{getItem(index - 1)}</span>
            </Typography>
            <Typography sx={{ color: theme.palette.primary.main, fontWeight: "bold", fontSize: 20 }}>
              <span className="numfarsi-s1">{value}</span>
            </Typography>
            <Typography sx={{ color: theme.palette.primary[200], fontSize: 14 }}>
              <span className="numfarsi-s1">{getItem(index + 1)}</span>
            </Typography>
          </Stack>
        </Box>

        {/* آیکون پایین */}
        <IconButton
          onClick={handleDecrement}
          sx={{
            position: "absolute",
            bottom: -5,
            left: 0,
            right: 0,
            height: "30%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            background: "linear-gradient(to top, rgba(249,249,249,1) 0%, rgba(249,249,249,0) 100%)",
            "&:hover": {
              background: "linear-gradient(to top, rgba(249,249,249,0.9) 0%, rgba(249,249,249,0) 100%)",
            },
          }}
        >
          <KeyboardArrowDownIcon sx={{ color: "gray", fontSize: 24 }} />
        </IconButton>
      </Box>
    </Stack>
  );
};

const TimeSwipePicker = ({ onChange }) => {
  const hours = [...Array(24)].map((_, i) => (i < 10 ? `0${i}` : `${i}`));
  const minutes = [...Array(60)].map((_, i) => (i < 10 ? `0${i}` : `${i}`));

  const [time, setTime] = useState({
    hour: '00',
    minute: '00'
  });

  const handleTimeChange = (type, value) => {
    const newTime = {
      ...time,
      [type]: value
    };
    setTime(newTime);
    onChange && onChange(newTime);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={1}>
      <CircularPicker
        items={hours}
        label="ساعت"
        value={time.hour}
        onChange={(value) => handleTimeChange('hour', value)}
      />
      <Typography
        fontWeight={500}
        sx={{
          alignSelf: 'center',
          lineHeight: 1,
          mb: -4,
          fontFamily: "sans-serif"
        }}
        fontSize={18}
      >
        :
      </Typography>
      <CircularPicker
        items={minutes}
        label="دقیقه"
        value={time.minute}
        onChange={(value) => handleTimeChange('minute', value)}
      />
    </Box>
  );
};
export const PopperTimePicker = ({ anchorEl, onChange, handleClose }) => {
  const handleTimeChange = (time) => {
    onChange(time)
    // time یک آبجکت با فرمت { hour: '12', minute: '30' } است
  };
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {

    if (anchorEl)
      setOpen(true)
  }, [anchorEl])


  const id = open ? "simple-popper" : undefined;
  //const [calendarValue, setCalendarValue] = useState(new Date())
  return (
    <>


      <Popper
        id={id}
        sx={{ minWidth: "100%" }}
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
        <Paper sx={{ minWidth: "100%", borderRadius: 0, p: 2, alignContent: "center" }}>
          <Stack
            alignItems="center" // این خط باعث وسط چین شدن آیتم‌ها می‌شود
            spacing={2} // فاصله بین آیتم‌ها
          >
            <ClickAwayListener onClickAway={() => console.log("ok")}>
              <TimeSwipePicker onChange={handleTimeChange} />
            </ClickAwayListener>

            <Box sx={{ width: 150, display: "flex", justifyContent: "center" }}>
              <CustomLoadingButton
                variant="contained"
                onClick={() => setOpen(false)}
                padding={1}
              >
              <span>بستن</span>  
              </CustomLoadingButton>
            </Box>
          </Stack>
        </Paper>

      </Popper>



    </>
  );
};

export default TimeSwipePicker;
