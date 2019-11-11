import { Func, func } from "./Func";

export type Zero = never;
export type One = {};

// absurd: Zero -> a
export const absurd = <TRange>(): Func<Zero, TRange> =>
    func<Zero, TRange>(_ => {
        throw new Error('Does not exist.');
    });

// unit: a -> One
export const unit = <TDomain>(): Func<TDomain, One> =>
    func(_ => ({}));

// identity: a -> a
export const identity = <T>(): Func<T, T> =>
    func(x => x);
