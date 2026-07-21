// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */
import LogoImg from '@/components/assets/images/screen/logo.png'
const logoimg = '/images/logo.png';
// ==============================|| LOGO SVG ||============================== //
const Logo=({width,height})=>{
    return(<>
   {<img src={logoimg} width={width??"65"} height={height??"80"}   /> }
    </>)

}
const LogoSVG = ({width,height}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 420"
            width={width??"80"}
            height={height??"80"}
        >
            <g transform="translate(0, 10)">
                <path
                    d="M50,75 L215,145 L135,295"
                    fill="none"
                    stroke="#00ffcc"
                    strokeWidth="32"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M135,295 L256,205"
                    fill="none"
                    stroke="#39ff14"
                    strokeWidth="32"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M462,75 L297,145 L377,295"
                    fill="none"
                    stroke="#39ff14"
                    strokeWidth="32"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M377,295 L256,205"
                    fill="none"
                    stroke="#00ffcc"
                    strokeWidth="32"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M256,250 C256,275 262,281 287,281 C262,281 256,287 256,312 C256,287 250,281 225,281 C250,281 256,275 256,250 Z"
                    fill="#ffffff"
                />
            </g>
        </svg>
    );
};

export default LogoSVG;


