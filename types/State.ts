export type FormState = {
  formDate: string;
  startTime: string;
  endTime: string;
  error: boolean;
  dateError: boolean;
  timeError: boolean;
};

export type Item = {
  id: number;
  text: string;
};

export type ItemState = {
  id: number;
  items: Array<Item>;
};

export type State = {
  form: FormState;
  item: ItemState;
};
