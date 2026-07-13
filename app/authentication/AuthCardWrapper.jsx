import PropTypes from 'prop-types';

// material-ui
import { Box } from '@mui/material';

// project import
import MainCard from '@/components/ui-component/cards/MainCard_pre';

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const AuthCardWrapper = ({ children, ...other }) => (
    <MainCard
        sx={{
            maxWidth: { xs: "100%", lg: "100%" },
            p: { sm: 2, lg: 3 },
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            margin: { xs: 0, md: 0 },
            '& > *': {
                flexGrow: 1,
                flexBasis: '50%'
            }
        }}
        content={false}
        {...other}
    >
        <Box sx={{ p: { xs: 0, sm: 5, xl: 1 }, pl: 0 }}>{children}</Box>
    </MainCard>
);

AuthCardWrapper.propTypes = {
    children: PropTypes.node
};

export default AuthCardWrapper;
