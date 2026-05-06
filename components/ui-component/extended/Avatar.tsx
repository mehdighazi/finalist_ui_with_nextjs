'use client';

import { useTheme } from '@mui/material/styles';
import MuiAvatar, { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';
import { SxProps, Theme } from '@mui/material';

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

  // آماده‌سازی تمام استایل‌ها
  const styles: SxProps<Theme> = {};

  // Gradient
  if (gradient) {
    Object.assign(styles, {
      position: 'relative',
      zIndex: 1,
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        padding: `${borderWidth}px`,
        borderRadius: '50%',
        background: gradient,
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        zIndex: -1
      }
    });
  }

  // Color
  if (color && !outline) {
    Object.assign(styles, {
      color: theme.palette.background.paper,
      bgcolor: `${color}.main`
    });
  }

  // Outline
  if (outline) {
    Object.assign(styles, {
      color: color ? `${color}.main` : 'primary.main',
      bgcolor: theme.palette.background.paper,
      border: '2px solid',
      borderColor: color ? color : 'secondary.main',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'
    });
  }

  // Custom Border
  if (borderColor) {
    Object.assign(styles, {
      border: `${borderWidth}px solid ${borderColor}`
    });
  }

  // Size
  switch (size) {
    case 'badge':
      Object.assign(styles, { width: theme.spacing(3.5), height: theme.spacing(3.5) });
      break;
    case 'xs':
      Object.assign(styles, { width: theme.spacing(4.25), height: theme.spacing(4.25) });
      break;
    case 'sm':
      Object.assign(styles, { width: theme.spacing(5), height: theme.spacing(5) });
      break;
    case 'md':
      Object.assign(styles, { width: theme.spacing(7.5), height: theme.spacing(7.5) });
      break;
    case 'lg':
      Object.assign(styles, { width: theme.spacing(9), height: theme.spacing(9) });
      break;
    case 'xl':
      Object.assign(styles, { width: theme.spacing(10.25), height: theme.spacing(10.25) });
      break;
  }

  // اضافه کردن sx نهایی
  const finalSx = sx ? { ...styles, ...sx } : styles;

  return (
    <MuiAvatar
      sx={finalSx}
      {...others}
    />
  );
};

export default Avatar;