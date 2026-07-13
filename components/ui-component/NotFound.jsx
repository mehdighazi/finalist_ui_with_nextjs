import { Fade, useTheme, Box, Typography, Stack } from "@mui/material";
import Image from "next/image";

import NotFoundImage from '@/components/assets/images/screen/nodata.svg'
const NotFoundPlaceHolder = () => {
    const theme = useTheme();
    return (<>
        <Box sx={{ p: 5, alignContent: 'center' }}>
            <Stack sx={{ p: 4, alignContent: 'center' }}>
                <Typography textAlign="center" color={theme.palette.grey[100]} variant="h5" >

                    <Image
                        src={NotFoundImage}
                        alt="Not Found"
                        width={150}
                        height={150}
                    />
                </Typography>

            </Stack>

        </Box>
    </>)
}
export default NotFoundPlaceHolder