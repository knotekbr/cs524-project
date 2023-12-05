import { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";

import { differenceInSeconds, parseISO } from "date-fns";

import { TimeRemainingProps } from "./TimeRemaining.types";

export default function TimeRemaining({ timeUpDateString }: TimeRemainingProps) {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const timeUpDate = parseISO(timeUpDateString);

  useEffect(() => {
    const interval = setInterval(() => {
      const timeDelta = differenceInSeconds(timeUpDate, new Date());
      setTimeRemaining(timeDelta < 0 ? 0 : timeDelta);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeUpDateString]);

  return (
    <Typography color="secondary.main" fontSize={18}>
      {`00:${timeRemaining.toString().padStart(2, "0")}`}
    </Typography>
  );
}
