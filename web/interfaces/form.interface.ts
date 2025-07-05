export interface ChangeEventAdditionalData {
  name?: string;
  value: string | number;
  [x: string]: unknown;
};

export interface CustomChangeEventHandler {
  (event: React.ChangeEvent<HTMLInputElement>, additionalData: ChangeEventAdditionalData): void,
};
