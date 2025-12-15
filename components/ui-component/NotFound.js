import { Fade, useTheme, Box, Typography, Stack } from "@mui/material";
import NotFoundImage from 'assets/images/screen/no-data-6.png'
const NotFoundPlaceHolder = () => {
    const theme = useTheme();
    return (<>
        <Box sx={{ p: 5, alignContent: 'center' }}>
            <Stack  sx={{ p: 4, alignContent: 'center' }}>
                 <Typography textAlign="center" color={theme.palette.grey[100]} variant="h5" > 
                    <img width={150} height={150} src={NotFoundImage} />
                 </Typography>
                
            </Stack>

        </Box>
    </>)
}
export default NotFoundPlaceHolder