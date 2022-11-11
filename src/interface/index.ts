export type TReplaceType<T, R> = {
  [K in keyof T]: R;
};
