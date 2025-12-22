import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI imports
import {
  AppBar,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import Slide from "@mui/material/Slide";

// Redux actions
import { hideBUTTOMSheet } from "@/components/store/slices/bottomSheetSlice";
//project import
import { rlPadding } from "@/components/store/constant";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
 
export default function FullScreenDialog() {
  const dispatch = useDispatch();
  const { content, title, ptSX, visible } = useSelector(
    (state) => state.buttomSheet
  );

  const theme = useTheme();

  const handleClose = () => {
    dispatch(hideBUTTOMSheet());
  };

  return (
    <Dialog
      maxWidth="lg"
      fullWidth
      fullScreen
      open={visible}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{
        px: 0,
        pt: ptSX ?? "25%",
        [theme.breakpoints.up("md")]: {
          pr: `calc((${rlPadding}) + 0px);`,
          pl: `calc((${rlPadding}) - 5px);`,
        },
        [theme.breakpoints.up("lg")]: {
          pr: `calc((${rlPadding}) + 0px);`,
          pl: `calc((${rlPadding}) + 0px);`,
        },
        
      }}
    >
      <AppBar sx={{ position: "relative", p: 0 }}>
        <Toolbar sx={{ p: 0 }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              px: { xs: 0, sm: 0, md: 0 }, // اینجا پدینگ برای موبایل
            }}
          >
            <IconButton sx={{ml:{xs:1,md:0}}} edge="start" color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <Typography sx={{ mt: 0,mr:{xs:1,md:0} }} fontSize={12} color="secondary">
              {title ?? ""}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      {content}
    </Dialog>
  );
}
