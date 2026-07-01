import * as React from "react";

//ui-material
import {Divider, List, ListItem, ListItemText, Typography, useTheme} from "@mui/material";
//project import
import CustomCard from "@/components/ui-component/cards/CustomCard";
import useWindowDimensions from "@/components/utils/getScreenDimension";
import TeamCardContent from "../../../../../../app/utilities/TeamCardContent";
//Tabler icon

//
//-------------------------------------Detail Team------------------------------------
//------------------------------------------------
//------------------------------------TeamInfo Table
const DetailTable = ({data}) => {
    return (<>

        <List sx={{
            "& .MuiListItem-root": {
                textAlign: 'right!important'
            }
        }}
        >
            <ListItem>
                <ListItemText
                    sx={{float: 'right', direction: 'rtl!important'}}
                    primary={
                        <Typography
                            sx={{display: 'inline', direction: 'rtl'}}
                            align="right"
                            component="div"
                            color="text.primary"
                        >
                            {'استان/شهر:تهران'}
                        </Typography>

                    }
                    color="text.primary"
                />
            </ListItem>
            <Divider/>
            <ListItem>
                <ListItemText
                    sx={{float: 'right', direction: 'rtl!important'}}
                    primary={
                        <Typography
                            sx={{display: 'inline', direction: 'rtl'}}
                            align="right"
                            component="div"

                            color="text.primary"
                        >
                            {'برد:2'}
                        </Typography>

                    }
                    color="text.primary"

                />

            </ListItem>
            <Divider/>
            <ListItem>
                <ListItemText
                    sx={{float: 'right', direction: 'rtl!important'}}
                    primary={
                        <Typography
                            sx={{display: 'inline', direction: 'rtl'}}
                            align="right"
                            component="div"

                            color="text.primary"
                        >
                            {'باخت:2'}
                        </Typography>

                    }
                    color="text.primary"

                />


            </ListItem>
            <Divider/>
            <ListItem>


                <ListItemText
                    sx={{float: 'right', direction: 'rtl!important'}}
                    primary={
                        <Typography
                            sx={{display: 'inline', direction: 'rtl'}}
                            align="right"
                            component="div"

                            color="text.primary"
                        >
                            {'تساوی:2'}
                        </Typography>

                    }
                    color="text.primary"

                />


            </ListItem>
            <Divider/>
            <ListItem>


                <ListItemText
                    sx={{float: 'right', direction: 'rtl!important'}}
                    primary={
                        <Typography
                            sx={{display: 'inline', direction: 'rtl'}}
                            align="right"
                            component="div"

                            color="text.primary"
                        >
                            {'تعداد بازی:2'}
                        </Typography>

                    }
                    color="text.primary"

                />


            </ListItem>
            <Divider/>
            <ListItem>


                <ListItemText
                    sx={{float: 'right', direction: 'rtl!important'}}
                    primary={
                        <Typography
                            sx={{display: 'inline', direction: 'rtl'}}
                            align="right"
                            component="div"

                            color="text.primary"
                        >
                            {'امتیاز:35'}
                        </Typography>

                    }
                    color="text.primary"

                />


            </ListItem>
            <Divider/>

            <ListItem>


                <ListItemText
                    sx={{float: 'right', direction: 'rtl!important'}}
                    primary={
                        <Typography
                            sx={{display: 'inline', direction: 'rtl'}}
                            align="right"
                            component="div"

                            color="text.primary"
                        >
                            {'رتبه:15'}
                        </Typography>

                    }
                    color="text.primary"

                />


            </ListItem>
        </List>


    </>)
}
//---------------------------------------------------
const DetailMatchs = () => {
    const {height, width} = useWindowDimensions();
    const [bottomSheetOpen, setBottomSheetOpen] = React.useState(false);
    const screenHeight = height;
    const theme = useTheme();
    const data = {
        winNumber: 2,
        loseNumber: 5,
        drawNumber: 2,
        score: 5,
        ranking: 10,
        matchsNumber: 50
    }
    return (
        <>

            <CustomCard content={
                <>
                    <TeamCardContent rate={1} nameTeam={'ایران جوان'}/>
                    <DetailTable data={data}/>

                </>

            }/>
            {/**
             * <CustomBox screenHeight={screenHeight}>
             <BottomSheet onChange={(event)=>setBottomSheetOpen(event)} open={bottomSheetOpen}/>
             <Stack>
             <CustomCard
             content={
              <>
                <MatchCardContent
                  hostTeam={"پرسپولیس"}
                  logoHost={Logo1}
                  rateHost={2}
                  rateGuest={3}
                  logoGuest={Logo2}
                  guestTeam={"ستارگان"}
                  dateMatch={""}
                  timeMatch={""}
                  location={""}
                />

                <Typography compnent="div" align="center">
                  <Chip
                    icon={<IconCalendar />}
                    size="small"
                    label={`4 ${"-"} مهر ${"-"}1401-ساعت 14:30`}
                  />
                </Typography>
                <Typography compnent="div" align="center">
                  <Chip
                    icon={<IconMapPin size={20} />}
                    size="large"
                    label={"تهران-خیابان پیروزی-چهارراه کوکالا ورزشگاه آزادی"}
                  />
                </Typography>
                <Box sx={{mt:2}}>
                <DetailTable/>
                </Box>
                <Box sx={{ p: 2, mt: 1 }}>
                 
                  
                    <CustomLoadingButton
                      color="orange"
                      inColor={theme.palette.grey[50]}
                      padding={1}
                      variant="contained"
                      onChange={(event)=>setBottomSheetOpen(event)}
                    >
                      <span>درخواست بازی</span>
                    </CustomLoadingButton>
                 
                </Box>
              </>
            }
             />
             </Stack>
             </CustomBox>
             */}

        </>
    );
};

export default DetailMatchs;
