import { useMemo } from "react";

import Stack from "@mui/material/Stack";
import Typography, { type TypographyProps } from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";

import { CategoryItemProps } from "./CategoryItem.types";

const ItemContainer = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  alignItems: "center",
  justifyContent: "center",
  aspectRatio: 1.75,
  userSelect: "none",
  textAlign: "center",
}));

export default function CategoryItem({ itemType, label, available, onClick }: CategoryItemProps) {
  const { spacing } = useTheme();
  const [typographyVariant, displayLabel, extraStyles] = useMemo(() => {
    let typographyVariant: TypographyProps["variant"] = "categoryName";
    let displayLabel: string | null = label;
    let extraStyles: React.CSSProperties | undefined;

    if (itemType === "answer") {
      typographyVariant = "categoryAnswer";
      if (available) {
        extraStyles = {
          cursor: "pointer",
        };
      } else {
        displayLabel = null;
      }
    } else {
      extraStyles = {
        marginBottom: spacing(0.5),
      };
    }

    return [typographyVariant, displayLabel, extraStyles];
  }, [available, itemType, label]);

  return (
    <ItemContainer onClick={onClick} style={extraStyles}>
      <Typography variant={typographyVariant}>{displayLabel}</Typography>
    </ItemContainer>
  );
}
