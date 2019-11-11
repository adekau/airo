import { Func, func } from './Func';

export type Sum<T1, T2> =
    | { kind: 'left', value: T1 }
    | { kind: 'right', value: T2 };

// f: T1 -> T1+T2
export const inl = <T1, T2>(): Func<T1, Sum<T1, T2>> =>
    func<T1, Sum<T1, T2>>(x => ({
        kind: 'left',
        value: x
    }));

// f: T2 -> T1+T2
export const inr = <T1, T2>(): Func<T2, Sum<T1, T2>> =>
    func<T2, Sum<T1, T2>>(x => ({
        kind: 'right',
        value: x
    }));

// [f+g]
export const plus = <TFDomain, TGDomain, TRange>(
    f: (input: TFDomain) => TRange,
    g: (input: TGDomain) => TRange
) => (
    x: Sum<TFDomain, TGDomain>
) => x.kind === 'left'
    ? f(x.value)
    : g(x.value);

// f+g: (f;inl)+(g;inr)
export const plusMap = <TFDomain, TFRange, TGDomain, TGRange>(
    f: Func<TFDomain, TFRange>,
    g: Func<TGDomain, TGRange>
): Func<Sum<TFDomain, TGDomain>, Sum<TFRange, TGRange>> =>
    f
        .then(
            inl<TFRange, TGRange>()
        )
        .plus(g
            .then(
                inr<TFRange, TGRange>()
            )
        );

export const swapSum = <T1, T2>(): Func<Sum<T1, T2>, Sum<T2, T1>> =>
    inr<T2, T1>()
        .plus(
            inl<T2, T1>()
        );
