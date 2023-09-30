import { Box } from "@mui/material";

import type { ImageProps } from "./Image.types";

export default function Image(props: ImageProps) {
  return <Box component="img" {...props} />;
}
