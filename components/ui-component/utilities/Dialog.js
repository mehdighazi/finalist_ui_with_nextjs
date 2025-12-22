import * as React from 'react';

//Import Mui
import {AppBar, Dialog, Grow, IconButton, Toolbar, Typography, useMediaQuery, useTheme} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//project import
import {rlPadding} from 'store/constant'
import {Box} from "@mui/system";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow ref={ref} {...props} />;
});

export default function DialogBox({open, onChange, title, content,size}) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        onChange(false)
    };

    return (
        <React.Fragment>

            <Dialog
                 fullWidth
                maxWidth={size??"xs"}
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                {<AppBar sx={{position: 'relative', p:0}}>
                    <Toolbar sx={{position: 'relative',p:0, px:{sm:0,lg:2,xs:1}}}>
                        <Box
                            sx={{

                                width: "100%",
                                display: 'flex',

                            }}
                        >
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                                sx={{ml:{sm:0,lg:-2,xs:1}}}
                            >
                                <CloseIcon/>
                            </IconButton>
                            <Box sx={{flexGrow: 1}}></Box>
                            <Typography   sx={{mr:{sm:1,lg:1,xs:2},mt: 1.5}} variant={"h6"} color={"secondary.main"} >
                                {title}
                            </Typography>
                        </Box>
                    </Toolbar>
                </AppBar>}

                {content}
            </Dialog>
        </React.Fragment>
    );
}