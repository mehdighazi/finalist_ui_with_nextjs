// material-ui
import { Card, Grid, List, ListItem, ListItemAvatar, ListItemText, Skeleton } from '@mui/material';


// ==============================|| SKELETON - TOTAL INCOME DARK/LIGHT CARD ||============================== //

const TotalIncomeCard = () => (
    <>
        <Grid container sx={{ width: "100%", m: 1 }}>
            <Grid xs={6}>
                <Card sx={{ p: 2 }}>
                    <List sx={{ py: 0 }}>
                        <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                            <ListItemAvatar>
                                <Skeleton variant="rectangular" width={44} height={44} />
                            </ListItemAvatar>
                            <ListItemText
                                sx={{ py: 0 }}
                                primary={<Skeleton variant="rectangular" height={20} />}
                                secondary={<Skeleton variant="text" />}
                            />
                        </ListItem>
                    </List>
                </Card>
            </Grid>
            <Grid xs={6}>
                <Card sx={{ p: 2 }}>
                    <List sx={{ py: 0 }}>
                        <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                            <ListItemAvatar>
                                <Skeleton variant="rectangular" width={44} height={44} />
                            </ListItemAvatar>
                            <ListItemText
                                sx={{ py: 0 }}
                                primary={<Skeleton variant="rectangular" height={20} />}
                                secondary={<Skeleton variant="text" />}
                            />
                        </ListItem>
                    </List>
                </Card>
            </Grid>
        </Grid>
        <Grid container sx={{ width: "100%", m: 1 }}>
            <Grid xs={6}>
                <Card sx={{ p: 2 }}>
                    <List sx={{ py: 0 }}>
                        <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                            <ListItemAvatar>
                                <Skeleton variant="rectangular" width={44} height={44} />
                            </ListItemAvatar>
                            <ListItemText
                                sx={{ py: 0 }}
                                primary={<Skeleton variant="rectangular" height={20} />}
                                secondary={<Skeleton variant="text" />}
                            />
                        </ListItem>
                    </List>
                </Card>
            </Grid>
            <Grid xs={6}>
                <Card sx={{ p: 2 }}>
                    <List sx={{ py: 0 }}>
                        <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                            <ListItemAvatar>
                                <Skeleton variant="rectangular" width={44} height={44} />
                            </ListItemAvatar>
                            <ListItemText
                                sx={{ py: 0 }}
                                primary={<Skeleton variant="rectangular" height={20} />}
                                secondary={<Skeleton variant="text" />}
                            />
                        </ListItem>
                    </List>
                </Card>
            </Grid>
        </Grid>
    </>
);

export default TotalIncomeCard;
