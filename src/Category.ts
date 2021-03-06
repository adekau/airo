import { Func, curry, func } from "./Func";
import { Prod, fst, snd } from './Prod';

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

export const constant = <T, U>(val: U): Func<T, U> => func(_ => val);

export const powerOfZero = function <A>(): Func<Func<Zero, A>, One> {
    return unit();
};

export const powerOfZeroInv = function <A>(): Func<One, Func<Zero, A>> {
    return curry(
        absurd<A>()
            .after(snd<One, Zero>())
    );
};

export const prodIdentity = function <A>(): Func<Prod<A, One>, A> {
    return fst<A, One>();
};

export const prodIdentityInv = function <A>(): Func<A, Prod<A, One>> {
    return identity<A>()
        .times(
            unit<A>()
        );
};
