import {Box} from "@mui/system";

const SiteLogo = ({title, imgPath}) => {
    return(<>
        <Box sx={{ml:1}}>
            <img width={50} height={35} src={imgPath}/>
        </Box>
        </>)
}
export default SiteLogo