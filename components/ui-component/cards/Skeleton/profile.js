// material-ui
import { Card, CardContent, Grid, useTheme,Box } from '@mui/material';
import ImageplaceHolder from './ImagePlaceholder'
import { ProfileImagePlaceholder } from './ImagePlaceholder'
// ==============================|| SKELETON - EARNING CARD ||============================== //

const ProfileSection = ({ background }) => {
    const theme = useTheme();
    return (
        <>
            <Card>
                <CardContent>
                    <Grid container sx={{ direction: "rtl", maxWidth: "100%" }}>
                        <Grid xs={8} lg={9} item>
                            <ProfileImagePlaceholder />

                        </Grid>
                        <Grid xs={4} lg={3} item>
                            {<ImageplaceHolder height={40} width={50} />}
                        </Grid>
                    </Grid>
                    <Grid container sx={{ direction: "rtl" }}>
                        <Grid item xs={8}>
                            <Box sx={{ p: 1 }} >
                                {<ImageplaceHolder />}
                                
                            </Box>
                        </Grid>
                        <Grid xs={4}>
                             <Box sx={{ p: 1 }} >
                            {<ImageplaceHolder />}
                              
                           
                             </Box>
                        </Grid>


                    </Grid>

                </CardContent>
            </Card>

        </>
    )
}

export default ProfileSection;
