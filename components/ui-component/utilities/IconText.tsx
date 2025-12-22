import { Stack, Typography, useTheme, Box } from "@mui/material";
import { ReactNode } from "react";

interface IconTextProps {
  text: string | number;
  icon?: ReactNode;
  textNumber?: boolean;
  fontSize?: number;
  color?: string;
  textPaddingTop?: number;
  iconRight?: boolean;
  iconPaddingTop?: number;
  spacing?: number;
}

const IconText: React.FC<IconTextProps> = ({
  text,
  icon,
  textNumber = false,
  fontSize = 14,
  color,
  textPaddingTop = 0.2,
  iconPaddingTop = 0.2,
  iconRight = false,
  spacing = 0.5,
}) => {
  const theme = useTheme();

  return (
    <Stack direction="row" spacing={spacing} alignItems="center">
      {!iconRight && icon && (
        <Box sx={{ pt: iconPaddingTop }}>{icon}</Box>
      )}

      <Typography
        fontSize={fontSize}
        className={textNumber ? "numfarsi-s1" : ""}
        sx={{
          color: color ?? theme.palette.grey[400],
          pt: textPaddingTop,
        }}
        align="right"
      >
        {text}
      </Typography>

      {iconRight && icon && (
        <Box sx={{ pt: iconPaddingTop }}>{icon}</Box>
      )}
    </Stack>
  );
};

export default IconText;
