// material-ui
import {Card, CardContent, Grid, useTheme} from '@mui/material';
import ImageplaceHolder from './ImagePlaceholder'

// ==============================|| SKELETON - EARNING CARD ||============================== //

const ImageListCard = ({background}) => {
    const theme = useTheme();
    return (
        <>
            <Card>
                <CardContent>
                    <Grid container spacing={2}>


                        <Grid item xs={6}>
                            <ImageplaceHolder/>
                        </Grid>
                        <Grid item xs={6}>
                            <ImageplaceHolder/>
                        </Grid>
                        <Grid item xs={6}>
                            <ImageplaceHolder/>
                        </Grid>
                        <Grid item xs={6}>
                            <ImageplaceHolder/>
                        </Grid>
                    </Grid>
                    <Grid sx={{mt: 2}} container spacing={2}>


                        <Grid item xs={6}>
                            <ImageplaceHolder/>
                        </Grid>
                        <Grid item xs={6}>
                            <ImageplaceHolder/>
                        </Grid>
                        <Grid item xs={6}>
                            <ImageplaceHolder/>
                        </Grid>
                        <Grid item xs={6}>
                            <ImageplaceHolder/>
                        </Grid>
                    </Grid>


                </CardContent>
            </Card>
            <Card sx={{mt:1}}>
                <CardContent>
                    <Grid container spacing={2}>


                        <Grid item xs={6}>
                            <ImageplaceHolder/>
                        </Grid>
                        <Grid item xs={6}>
                            <ImageplaceHolder/>
                        </Grid>
                        <Grid item xs={6}>
                            <ImageplaceHolder/>
                        </Grid>
                        <Grid item xs={6}>
                            <ImageplaceHolder/>
                        </Grid>
                    </Grid>
                    <Grid sx={{mt: 2}} container spacing={2}>


                        <Grid item xs={6}>
                            <ImageplaceHolder/>
                        </Grid>
                        <Grid item xs={6}>
                            <ImageplaceHolder/>
                        </Grid>
                        <Grid item xs={6}>
                            <ImageplaceHolder/>
                        </Grid>
                        <Grid item xs={6}>
                            <ImageplaceHolder/>
                        </Grid>
                    </Grid>


                </CardContent>
            </Card>
        </>
    )
}

export default ImageListCard;
