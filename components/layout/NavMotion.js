import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

// ==============================|| ANIMATION FOR CONTENT ||============================== //

const NavMotion = ({ children }) => {
    const motionVariants = {
        initial: {
            opacity: 0,
            scale: 0.99
        },
        in: {
            opacity: 1,
            scale: 1
        },
        out: {
            opacity: 0,
            scale: 1.01
        }
    };

    const motionTransition = {
        type: 'tween',
        ease: 'anticipate',
        duration: 0.4
    };
//{ /*animate="in"*/}
    return (
        <motion.div initial="initial"
        animate={{
            x: 0,
            backgroundColor: "#000",
            boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)"}}
         exit="out" variants={motionVariants} transition={motionTransition}>
            {children}
        </motion.div>
    );
};

NavMotion.propTypes = {
    children: PropTypes.node
};

export default NavMotion;
