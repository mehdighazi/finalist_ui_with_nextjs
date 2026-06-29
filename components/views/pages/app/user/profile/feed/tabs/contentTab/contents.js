import * as React from 'react';
import {useState} from 'react';
import {useDispatch} from "react-redux";
//mui import
import {
    Box,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    Paper,
    Popover,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
//import Skeleton from '@mui/material/Skeleton';
import {makeStyles} from '@mui/styles'
//tabler icon
import {IconDotsVertical, IconHeart, IconMessageCircle, IconSend, IconTrash,IconCopy,IconFlag,IconEye} from '@tabler/icons-react'
//project import

import  api from '@/components/api/api';
import CustomAvatar from 'ui-component/extended/Avatar'
import dataHandler from '@/components/api/dataHandler';
import {showBUTTOMSheet} from "store/bottomSheetReducer";
import AnimatedButton from 'ui-component/extended/AnimateButton'
import Skeleton from 'ui-component/cards/Skeleton/ImageListCard'
import Transition from 'ui-component/extended/Transitions'
import useWindowDimensions from 'utils/getScreenDimension'
import {hostAddress}  from '@/components/api/api';;
//const define
//--------------------------------| Comment Box |-------------------------------------------

const CommentBox = ({content_id, userInfo}) => {
    const theme = useTheme()
    //-------------------------------------------------------------------
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
        },
        commentList: {
            flexGrow: 1,
            overflowY: 'auto',
            marginBottom: 1,
        },
        commentInput: {
            position: 'sticky',
            bottom: 0,
            fontFamily: "orginalfont",
            // backgroundColor: theme.palette.background.paper,
            padding: 1,
        },
    }));


    const classes = useStyles();
    const [comments, setComments] = React.useState([]);
    const [newComment, setNewComment] = React.useState('');

//-------------------------------------------------------------------
    const getData = () => {
        const result = dataHandler(api.listComment(content_id), "get", "");
        try {
            result(async function (data, status) {
                if (status) {

                    setComments(data.result);
                    //  setNewComment('');
                }


            })
        } catch (error) {
            console.log(error)

        }

    }
    const handleCommentSubmit = (event) => {
        try {

            event.preventDefault();
            if (newComment.trim()) {
                const comment = {
                    comment_id: comments.length + 1,
                    comment_text: newComment,
                    user_comment: {
                        first_name: userInfo?.first_name || "ناشناس", // نام کاربر
                        last_name: userInfo?.last_name,
                        avatar: userInfo?.avatar || "",
                    },
                };
                const data = {
                    content_id: content_id,
                    text: newComment,
                }

                const result = dataHandler(api.createComment(), "post", data);
                try {
                    result(async function (data, status) {
                        if (status) {

                            setComments([...comments, comment]);
                            setNewComment('');
                        }


                    })
                } catch (error) {
                    console.log(error)

                }

            }
        } catch (err) {
            console.log(err)
        }

    }
    React.useEffect(() => {

        if (comments.length === 0)
            getData()

    }, [comments])
       return (
        <Box className={classes.root}>
            <Paper className={classes.commentList}>
                <List sx={{direction: "rtl"}}>
                    {comments.map((comment, index) => (

                        <ListItem sx={{textAlign: "right", fontSize: 14}} key={index}>
                            <ListItemAvatar>
                                <CustomAvatar alt={"comment.user.name"}
                                              src={comment.user_comment.avatar ? `${hostAddress}${comment.user_comment.avatar.path}` : comment.user_comment.avatar ?? ""}/>
                            </ListItemAvatar>
                            <ListItemText primary={<Typography fontSize={12}
                                                               sx={{color: theme.palette.secondary.dark}}>{`${comment.user_comment["first_name"]} ${comment.user_comment["last_name"]}`}</Typography>}
                                          secondary={<Typography sx={{color: theme.palette.grey[600], p: 1}}
                                                                 fontSize={12}>{comment["comment_text"]}</Typography>}/>
                        </ListItem>

                    ))}
                </List>
            </Paper>

            <Box component="form" onSubmit={handleCommentSubmit} className={classes.commentInput}>
                <TextField
                    sx={{

                        '& .MuiInputBase-input': {

                            paddingTop: "12px",
                            paddingBottom: "15px",
                            background: theme.palette.grey[200],
                            borderRadius: '2px!important', // تغییر شعاع حاشیه
                            fontFamily: 'orginalfont', // تغییر فونت برای متن داخل TextField
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton
                                    sx={{
                                        p: 1,
                                        color: theme.palette.secondary.dark,
                                        mb: 1.5,
                                        transform: 'rotate(235deg)',
                                        background: theme.palette.grey[100]
                                    }}
                                    type="submit"
                                    color="primary"
                                    disabled={!newComment.trim()} // غیرفعال کردن دکمه اگر TextField خالی باشد
                                >
                                    <IconSend/>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    fullWidth
                    variant="filled"
                    placeholder="...نظر خود را بنویسید"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
            </Box>
        </Box>
    );
};


//------------------------------------------------------------------------------------------

export default function ContentList({contents, userInfo,uid}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
     const {height, width} = useWindowDimensions();
    const [user, setUser] = React.useState(null)
    const [isLike, setIsLike] = React.useState(false)
    const [loadedItems, setLoadedItems] = useState([]);
    const theme = useTheme();
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    //------------------------------------------| functions |------------------------------
    //get viewer from page  information for comment and ...
    const getUserData = () => {
        const result = dataHandler(api.getUserInfo({uid: null, m: "2"}), "get", "");

        try {
            result(async function (data, status) {

                setUser({

                    first_name: data.result["first_name"],
                    last_name: data.result["last_name"],
                    avatar: data.result["avatar"]
                })
            })
        } catch (error) {
            //error handle here

        }
    }
    // هندل باز و بسته شدن Popover
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    //Like  function Handler
    const likeHandler = (body) => {

        const result = dataHandler(api.likeContent(), "post", body);
        try {
            result(async function (data, status) {
                if (status) {
                    console.log(data)
                }
            })
        } catch (error) {

        }
    }
    //open comment BOTTOMSheet
    const openCommentBOTTOMSheetHandler = (content_id) => {
        dispatch(showBUTTOMSheet(<CommentBox userInfo={user} content_id={content_id}/>, "نظرات", ""))
    }

    React.useEffect(() => {
        contents.forEach((item, index) => {
            setTimeout(() => {
                setLoadedItems((prev) => [...prev, item]);
            }, index * 200);
        });
    }, [contents])

    React.useEffect(() => {

        if (!user)
            getUserData()


    }, [user])

    const sizeIcon = 14;
    const iconStyle = {
        color: theme.palette.grey[100],
        transparent:0.5
    }
    const captionStyle = {
       color:theme.palette.primary.light,
        mt: -1
    }
    return (
        <Box sx={{maxHeight: height, overflow: " auto",mb:100}}>

            {loadedItems.length > 0 ? (
                <ImageList sx={{width: "100%"}}>
                    {
                        loadedItems.map((item) => (
                            <Transition type={"slide"} position={"'bottom-right'"} in={true}>
                                <Transition type={"fade"} in={true}>
                                    <ImageListItem sx={{position: "relative", display: "inline-block"}} key={item.img}>

                                        <img

                                            srcSet={`${hostAddress}${item.media_url}`}
                                            src={`${hostAddress}${item.media_url}`}
                                            alt={"item.title"}
                                            loading="lazy"
                                        />
                                        
                                        <IconButton
                                            onClick={(e) => handleClick(e)}
                                            sx={{
                                                p: 1,
                                                position: "absolute",
                                                top: 8,
                                                right: 8,
                                                color: "white",
                                                backgroundColor: "rgba(0,0,0,0.1)",
                                                "&:hover": {backgroundColor: "rgba(0,0,0,0.7)"},
                                            }}
                                        >
                                            <IconDotsVertical size={sizeIcon}/>
                                        </IconButton>

                                        <Popover
                                            open={open}
                                            anchorEl={anchorEl}
                                            onClose={handleClose}
                                            anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                                            transformOrigin={{vertical: "top", horizontal: "right"}}
                                        >

                                            <List sx={{maxWidth: 150, fontSize: "0.6rem", direction: "rtl"}}>
                                                <ListItem sx={{cursor:'pointer'}} onClick={handleClose}>
                                                   {<ListItemIcon>
                                                        <IconFlag size={sizeIcon} fontSize="small"/>
                                                    </ListItemIcon>
                                                    }
                                                    <ListItemText sx={{fontSize: 12}}
                                                                  primaryTypographyProps={{fontSize: "0.7rem"}}
                                                                  primary="گزارش محتوا"/>

                                                </ListItem>
                                                {!uid? <ListItem sx={{cursor:'pointer'}} onClick={handleClose}>
                                                   <ListItemIcon>
                                                        <IconTrash size={sizeIcon} fontSize="small"/>
                                                    </ListItemIcon>
                                                    <ListItemText 
                                                    primaryTypographyProps={{fontSize: "0.7rem"}} sx={{fontSize: 12}} primary="حذف"/>
                                                </ListItem>:""}

                                            </List>
                                        </Popover>
                                        <ImageListItemBar
                                            sx={{
                                                px: 1,
                                                display: "flex",
                                                justifyContent: "flex-end", // تنظیم عنوان به سمت راست
                                                textAlign: "right", // اطمینان از راست‌چین شدن متن
                                                "& .MuiImageListItemBar-titleWrap": {
                                                    justifyContent: "flex-end", // تغییر جهت عنوان
                                                },
                                            }}
                                            title={<Typography fontSize={10}>
                                                {item.description}
                                            </Typography>}
                                            subtitle={<Typography fontSize={10}>
                                                {""}
                                            </Typography>}
                                            actionIcon={
                                                <Box sx={{display: "flex", gap: 0}}>

                                                    <Box key={1}
                                                         sx={{
                                                             display: "flex",
                                                             flexDirection: "column",
                                                             alignItems: "center"
                                                         }}>
                                                        <AnimatedButton>
                                                            <IconButton
                                                                onClick={() => likeHandler({content_id: item.content_id})}
                                                                sx={iconStyle}>
                                                                <IconHeart
                                                                color={theme.palette.primary.light}
                                                                 size={sizeIcon}/>
                                                            </IconButton>
                                                        </AnimatedButton>
                                                        <Typography  className={"numfarsi-s1"} fontSize={8}
                                                                    variant="caption"
                                                                    sx={captionStyle}>
                                                            <span class={"numfarsi-s1"}>{item.likes}</span>
                                                        </Typography>
                                                    </Box>
                                                    <Box key={1}
                                                         sx={{
                                                             display: "flex",
                                                             flexDirection: "column",
                                                             alignItems: "center"
                                                         }}>

                                                        <IconButton
                                                            onClick={() => openCommentBOTTOMSheetHandler(item.content_id)}
                                                            sx={iconStyle}>
                                                            <IconMessageCircle
                                                               color={theme.palette.primary.light}
                                                             size={sizeIcon}/>
                                                        </IconButton>
                                                        <Typography className={"numfarsi-s1"} fontSize={8}
                                                                    variant="caption"
                                                                    sx={captionStyle}>
                                                            <span class={"numfarsi-s1"}>{item.comments}</span>
                                                        </Typography>

                                                    </Box>
                                                    <Box key={1}
                                                         sx={{
                                                             display: "flex",
                                                             flexDirection: "column",
                                                             alignItems: "center"
                                                         }}>

                                                        <IconButton
                                                            onClick={() => openCommentBOTTOMSheetHandler(item.content_id)}
                                                            sx={iconStyle}>
                                                            <IconEye
                                                               color={theme.palette.primary.light}
                                                             size={sizeIcon}/>
                                                        </IconButton>
                                                        <Typography className={"numfarsi-s1"} fontSize={8}
                                                                    variant="caption"
                                                                    sx={captionStyle}>
                                                            <span class={"numfarsi-s1"}>{item.comments}</span>
                                                        </Typography>

                                                    </Box>

                                                </Box>
                                            }
                                        />

                                    </ImageListItem>
                                </Transition>
                            </Transition>

                        ))
                    }
                </ImageList>

            ) : (
                <Box sx={{p: 1, minWidth: "100%"}}>
                    <Skeleton/>
                </Box>
            )}

        </Box>
    );
}

