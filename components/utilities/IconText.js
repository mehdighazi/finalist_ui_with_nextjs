import { Stack, Typography, useTheme,Box } from "@mui/material";

const IconText = ({ text, icon, textNumber, fontSize, color, text_pt, iconR,icon_pt }) => {
    const theme = useTheme();
    return (
        <>
            <Stack direction="row" spacing={0.5} sx={{ m: 1 }}>
             <Typography sx={{pt:icon_pt??0.2}}>{!iconR ? icon : ""}</Typography>
                <Typography sx={{
                    color: color ?? theme.palette.grey[400],
                    pt: text_pt ?? 0.2,
                    pr: "2px",
                }}
                    className={textNumber ? "numfarsi-s1" : ""} fontSize={fontSize ?? 16} align={"right"} >
                    {text}
                </Typography>

                <Typography sx={{pt:icon_pt??0.2}}>{iconR ? icon : ""}</Typography> 
            </Stack>
        </>
    )
}
export default IconText