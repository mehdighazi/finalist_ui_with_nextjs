import * as React from "react";
//ui-material
import {
    Box, Stack, Typography, useTheme, Divider, Button, CircularProgress, FormControl
    , FormHelperText, FormControlLabel, Checkbox
} from "@mui/material";
import { styled } from '@mui/material/styles';
//tabler icon
import ImagePlaceholder from './ImagePlaceholder'
import { ProfileImagePlaceholder } from './ImagePlaceholder'
//--------------------------------------| Teb List |--------------------------------------
const EditSkeleton = () => {
    

    
                return (
                   
                        <Stack spacing={2} sx={{ p: 1, px: 2, width: "100%", height: "100%", overflow: "auto", mb: 10 }}>

                            {/* Avatar */}
                          
                                <Box
                                    sx={{
                                        height: '100%',
                                        minHeight: 200, 
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',

                                        p: 2,
                                    }}
                                >
                                   <ProfileImagePlaceholder/>
                                    <ImagePlaceholder/>
                                </Box>
                    


                            <Divider />
                            <Typography textAlign={"right"}>
                                <ImagePlaceholder/>
                            </Typography>

                            {/* Fields */}
                            <Stack spacing={1}>
                               
                                <Box sx={{m:1}} >
                                   <ImagePlaceholder/>
                                </Box>

                                <ImagePlaceholder/>
                            </Stack>

                            <Divider />
                            {/**-------------------------------------- چک باکس بانوان---------------------------- */}
                            <Box textAlign={"right"} sx={{ width: "100%" }}>
                               <ImagePlaceholder/>
                            </Box>
                            <Divider />
                            {/**--------------------------------------شناسه تیم---------------------------- */}
                            <Typography textAlign={"right"}>
                                <ImagePlaceholder/>
                            </Typography>

                            

                         
                               <ImagePlaceholder/>
                       

                        </Stack>
              
                )
           

    
}
export default EditSkeleton