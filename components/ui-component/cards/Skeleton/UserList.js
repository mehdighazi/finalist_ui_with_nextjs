import * as React from 'react';
//Mui import
import {List,ListItem,Divider,ListItemText,ListItemAvatar,useTheme,Typography} from '@mui/material';
//project import
import {ProfileImagePlaceholder} from '@/components/ui-component/cards/Skeleton/ImagePlaceholder'
import ImagePlaceholder from '@/components/ui-component/cards/Skeleton/ImagePlaceholder'
export default function ListItems({data}) {
    const theme=useTheme();
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
       
            <>
            <ListItem sx={{direction: "rtl"}}>
                <ListItemAvatar>
                    <ProfileImagePlaceholder/>
                   {/**<CustomAvatar alt="profile_image" src={item.avatar?`${hostAddress}/${item.avatar["path"]}`:""}/> */} 
                </ListItemAvatar>
                <ListItemText
                    sx={{textAlign: "right", fontSize: 14}}
                    primary={<ImagePlaceholder/>}
                    secondary={
                        <React.Fragment>
                            <Typography
                               
                                align={"right"}
                                component="span"
                               
                            >
                            <ImagePlaceholder/>
                            </Typography>

                        </React.Fragment>
                    }
                />
            </ListItem>
             <ListItem sx={{direction: "rtl"}}>
                <ListItemAvatar>
                    <ProfileImagePlaceholder/>
                   {/**<CustomAvatar alt="profile_image" src={item.avatar?`${hostAddress}/${item.avatar["path"]}`:""}/> */} 
                </ListItemAvatar>
                <ListItemText
                    sx={{textAlign: "right", fontSize: 14}}
                    primary={<ImagePlaceholder/>}
                    secondary={
                        <React.Fragment>
                            <Typography
                               
                                align={"right"}
                                component="span"
                               
                            >
                            <ImagePlaceholder/>
                            </Typography>

                        </React.Fragment>
                    }
                />
            </ListItem>
             <ListItem sx={{direction: "rtl"}}>
                <ListItemAvatar size='sm'>
                    <ProfileImagePlaceholder/>
                </ListItemAvatar>
                <ListItemText
                    sx={{textAlign: "right", fontSize: 14}}
                    primary={<ImagePlaceholder/>}
                    secondary={
                        <React.Fragment>
                            <Typography
                               
                                align={"right"}
                                component="span"
                               
                            >
                            <ImagePlaceholder/>
                            </Typography>

                        </React.Fragment>
                    }
                />
            </ListItem>
            </>
         
    </List>
  );
}
