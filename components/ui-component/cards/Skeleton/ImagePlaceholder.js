// material-ui
import Skeleton from '@mui/material/Skeleton';

// ==============================|| SKELETON IMAGE CARD ||============================== //

const ImagePlaceholder = ({ ...others }) => <Skeleton variant="rectangular" {...others} animation="wave" />;

export default ImagePlaceholder; 

export const ProfileImagePlaceholder= ({ ...others }) => <Skeleton variant="circular" width={50} height={50} animation="wave"    />;