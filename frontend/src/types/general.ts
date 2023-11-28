import type { Control, FieldValues, Path } from "react-hook-form";

export type ControlledFieldProps<TFields extends FieldValues, TBaseProps> = TBaseProps & {
  control: Control<TFields>;
  name: Path<TFields>;
};
