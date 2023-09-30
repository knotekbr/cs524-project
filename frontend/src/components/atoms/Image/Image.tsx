import Box from "@mui/material/Box";

import type { ImageProps } from "./Image.types";

export default function Image(props: ImageProps) {
  return <Box component="img" {...props} />;
}
