/** https://stackoverflow.com/a/39495173/20785115 */
type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

/** https://stackoverflow.com/a/39495173/20785115 */
type IntRange<F extends number, T extends number> =
  | Exclude<Enumerate<T>, Enumerate<F>>
  | T;

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type User = {
  email: string;
};
