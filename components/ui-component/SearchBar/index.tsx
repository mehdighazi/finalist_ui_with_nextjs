"use client";

import PropTypes from "prop-types";
import { forwardRef, useState } from "react";

// ==================== MUI ====================
import {
    Box,
    Stack,
    Typography,
    ButtonBase,
    InputAdornment,
    OutlinedInput,
    Collapse,
    Fade,
    Grow,
    Slide,
    Zoom
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { shouldForwardProp } from "@mui/system";

// ==================== ICONS ====================
import { IconSearch } from "@tabler/icons-react";

// =================================================
// Transitions
// =================================================
const Transitions = forwardRef(({ children, position, type, direction, ...others }, ref) => {
    let positionSX = { transformOrigin: "0 0 0" };

    switch (position) {
        case "top-right":
            positionSX = { transformOrigin: "top right" };
            break;
        case "top":
            positionSX = { transformOrigin: "top" };
            break;
        case "bottom-left":
            positionSX = { transformOrigin: "bottom left" };
            break;
        case "bottom-right":
            positionSX = { transformOrigin: "bottom right" };
            break;
        case "bottom":
            positionSX = { transformOrigin: "bottom" };
            break;
        default:
            positionSX = { transformOrigin: "0 0 0" };
    }

    return (
        <Box ref={ref}>
            {type === "grow" && (
                <Grow {...others}>
                    <Box sx={positionSX}>{children}</Box>
                </Grow>
            )}

            {type === "collapse" && (
                <Collapse {...others} sx={positionSX}>
                    {children}
                </Collapse>
            )}

            {type === "fade" && (
                <Fade
                    {...others}
                    timeout={{ appear: 500, enter: 600, exit: 400 }}
                >
                    <Box sx={positionSX}>{children}</Box>
                </Fade>
            )}

            {type === "slide" && (
                <Slide
                    {...others}
                    direction={direction}
                    timeout={{ appear: 0, enter: 400, exit: 200 }}
                >
                    <Box sx={positionSX}>{children}</Box>
                </Slide>
            )}

            {type === "zoom" && (
                <Zoom {...others}>
                    <Box sx={positionSX}>{children}</Box>
                </Zoom>
            )}
        </Box>
    );
});

Transitions.propTypes = {
    children: PropTypes.node,
    type: PropTypes.oneOf(["grow", "fade", "collapse", "slide", "zoom"]),
    position: PropTypes.oneOf([
        "top-left",
        "top-right",
        "top",
        "bottom-left",
        "bottom-right",
        "bottom"
    ]),
    direction: PropTypes.oneOf(["up", "down", "left", "right"])
};

Transitions.defaultProps = {
    type: "grow",
    position: "top-left",
    direction: "up"
};

// =================================================
// IconText
// =================================================
const IconText = ({
    text,
    icon,
    textNumber,
    fontSize,
    color,
    text_pt,
    iconR,
    icon_pt
}) => {
    const theme = useTheme();

    return (
        <Stack direction="row" spacing={0.5} sx={{ m: 1 }}>
            {!iconR && <Typography sx={{ pt: icon_pt ?? 0.2 }}>{icon}</Typography>}

            <Typography
                sx={{
                    color: color ?? theme.palette.grey[400],
                    pt: text_pt ?? 0.2,
                    pr: "2px"
                }}
                className={textNumber ? "numfarsi-s1" : ""}
                fontSize={fontSize ?? 16}
            >
                {text}
            </Typography>

            {iconR && <Typography sx={{ pt: icon_pt ?? 0.2 }}>{icon}</Typography>}
        </Stack>
    );
};

// =================================================
// Styled Input
// =================================================
const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(
  ({ theme }) => ({
    width: "100%",
    borderRadius: 10,
    border: `1px solid ${theme.palette.grey[300]}`, // اضافه کردن بردر
    background: theme.palette.grey[50],
    fontFamily: "orginalfont, sans-serif", // فونت placeholder و متن
    "& input": {
      background: "transparent !important",
      border: 0,
      color: theme.palette.text.primary,
      fontFamily: "orginalfont, sans-serif",
      "&::placeholder": {
        fontFamily: "orginalfont, sans-serif", // تغییر فونت placeholder
        color: theme.palette.grey[400], // رنگ placeholder
        opacity: 1 // برای consistent rendering
      }
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: 0
    }
  })
);

// =================================================
// MobileSearch
// =================================================
const MobileSearch = ({ value, setValue }) => {
  const theme = useTheme();

  return (
    <OutlineInputStyle
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="جستجوی تیم"
      startAdornment={
        <InputAdornment position="start">
          <ButtonBase>
            <IconSearch size="1rem" color={theme.palette.grey[400]} />
          </ButtonBase>
        </InputAdornment>
      }
    />
  );
};

// =================================================
// SearchSection
// =================================================
const SearchSection = ({ onChange }) => {
  const theme = useTheme();
  const [value, setValue] = useState("");

  return (
    <Box sx={{ width: "100%" }}>
      <OutlineInputStyle
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="...جستجوی تیم، مسابقه، محل برگزاری"
        startAdornment={
          <InputAdornment position="start">
            <ButtonBase onClick={() => onChange(value)}>
              <IconSearch size="1rem" color={theme.palette.grey[500]} />
            </ButtonBase>
          </InputAdornment>
        }
      />
    </Box>
  );
};
// =================================================
// EXPORTS
// =================================================
export {
    Transitions,
    IconText,
    
    MobileSearch,
    OutlineInputStyle
};
export default SearchSection;

