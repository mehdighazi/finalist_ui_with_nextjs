'use client';

import { useTheme } from '@mui/material/styles';
import MuiAvatar, { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';

export type AvatarSize = 'badge' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps extends MuiAvatarProps {
  color?: string;
  outline?: boolean;
  size?: AvatarSize;
  borderColor?: string;
  borderWidth?: number;
  gradient?: string;
}

const Avatar = ({
  color,
  outline,
  size,
  borderColor,
  borderWidth = 2,
  gradient,
  sx,
  ...others
}: AvatarProps) => {
  const theme = useTheme();

  const colorSX =
    color && !outline
      ? {
          color: theme.palette.background.paper,
          bgcolor: `${color}.main`
        }
      : {};

  const gradientSX = gradient
    ? {
        position: 'relative',
        zIndex: 1,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          padding: `${borderWidth}px`,
          borderRadius: '50%',
          background: gradient,
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          zIndex: -1
        }
      }
    : {};

  const outlineSX = outline
    ? {
        color: color ? `${color}.main` : 'primary.main',
        bgcolor: theme.palette.background.paper,
        border: '2px solid',
        borderColor: color ? color : 'secondary.main',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'
      }
    : {};

  const customBorderSX = borderColor
    ? { border: `${borderWidth}px solid ${borderColor}` }
    : {};

  const sizeSX = (() => {
    switch (size) {
      case 'badge':
        return { width: theme.spacing(3.5), height: theme.spacing(3.5) };
      case 'xs':
        return { width: theme.spacing(4.25), height: theme.spacing(4.25) };
      case 'sm':
        return { width: theme.spacing(5), height: theme.spacing(5) };
      case 'md':
        return { width: theme.spacing(7.5), height: theme.spacing(7.5) };
      case 'lg':
        return { width: theme.spacing(9), height: theme.spacing(9) };
      case 'xl':
        return { width: theme.spacing(10.25), height: theme.spacing(10.25) };
      default:
        return {};
    }
  })();

  return (
    <MuiAvatar
      sx={{
        ...gradientSX,
        ...colorSX,
        ...outlineSX,
        ...customBorderSX,
        ...sizeSX,
        ...sx
      }}
      {...others}
    />
  );
};

export default Avatar;
