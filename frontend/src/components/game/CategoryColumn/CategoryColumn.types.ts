export type CategoryColumnProps = {
  categoryName: string;
  answersAvailable: [boolean, boolean, boolean, boolean, boolean];
  onClickPrompt: (promptIndex: number) => void;
};
