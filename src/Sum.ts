import { Func, func } from './Func';

export type Sum<T1, T2> =
    | { kind: 'left', value: T1 }
    | { kind: 'right', value: T2 };

export const inl = <T1, T2>(): Func<T1, Sum<T1, T2>> => func<T1, Sum<T1, T2>>(x => ({ kind: 'left', value: x}));
export const inr = <T1, T2>(): Func<T2, Sum<T1, T2>> => func<T2, Sum<T1, T2>>(x => ({ kind: 'right', value: x}));
