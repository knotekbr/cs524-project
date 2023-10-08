export type CategoryItemType = "title" | "answer";

export type CategoryItemProps = {
  itemType: CategoryItemType;
  label: string;
  available?: boolean;
  onClick?: () => void;
};
