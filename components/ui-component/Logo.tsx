
import React from "react";

interface LogoSVGProps {
    width?: number | string;
    height?: number | string;
}
const logoimg = '/images/logo_org.png';
const LogoSVG: React.FC<LogoSVGProps> = ({
    width = 190,
    height = 80,
}) => {
    return (
        <img
            src={logoimg}
            width={width}
            height={height}
            alt="Finalist"
          
        />
    );
};

export default LogoSVG;

