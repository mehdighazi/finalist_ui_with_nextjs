
// material-ui
import { Card, CardContent, Grid, useTheme, Box, styled, Stack } from '@mui/material';
import { ProfileImagePlaceholder } from './ImagePlaceholder'
import SimplePlaceHolder from './ImagePlaceholder'

export const CardWrapper = styled(Box)(({ theme }) => ({
    // backgroundColor: theme.palette.grey[100],
    //boxShadow:theme.shadows[1],
    border: '1px solid',
    borderColor: theme.palette.primary[100],
    padding: 5,


}));
const MatchCardPlaceHolder = () => {
    return (<>
    <Stack spacing={1}>
        <CardWrapper >
            <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={4}>
                    <Box sx={{ p: 5,pr:{'lg':10} }}>
                        <ProfileImagePlaceholder />
                    </Box>
                </Grid>
                <Grid item xs={4}>


                    <Box

                        align="center"
                        component="div"

                    >
                        <SimplePlaceHolder />
                    </Box>

                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ p: 5,pr:{'lg':10} }}>
                        <ProfileImagePlaceholder />
                    </Box>
                </Grid>
            </Grid>
        </CardWrapper>
         <CardWrapper >
            <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={4}>
                    <Box sx={{ p: 5,pr:{'lg':10} }}>
                        <ProfileImagePlaceholder />
                    </Box>
                </Grid>
                <Grid item xs={4}>


                    <Box

                        align="center"
                        component="div"

                    >
                        <SimplePlaceHolder />
                    </Box>

                </Grid>
                <Grid item xs={4}>
                    <Box  sx={{ p: 5,pr:{'lg':10} }}>
                        <ProfileImagePlaceholder />
                    </Box>
                </Grid>
            </Grid>
        </CardWrapper>
         <CardWrapper >
            <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={4}>
                    <Box  sx={{ p: 5,pr:{'lg':10} }}>
                        <ProfileImagePlaceholder />
                    </Box>
                </Grid>
                <Grid item xs={4}>


                    <Box

                        align="center"
                        component="div"

                    >
                        <SimplePlaceHolder />
                    </Box>

                </Grid>
                <Grid item xs={4}>
                    <Box  sx={{ p: 5,pr:{'lg':10} }}>
                        <ProfileImagePlaceholder />
                    </Box>
                </Grid>
            </Grid>
        </CardWrapper>
        </Stack>
    </>)
}
export default MatchCardPlaceHolder