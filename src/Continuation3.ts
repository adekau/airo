import { Func, func, apply } from './Func';

/** some definitions:
 *  C[F] = continuation monad. F in this case is a function.
 *  lift/return: F -> C[F]
 *  flatten/join: C[F] -> F
 *  bind (flatMap): C[F] -> (F -> C[F2]) -> C[F2]
 *  map: C[F] -> (F -> F2) -> C[F2]
 */
export type Cont<A, B> = {
    // F: TDomain -> TRange
    fn: Func<A, B>;

    // C[F] -> F
    flatten: (this: Cont<A, B>) => Func<A, B>;

    // C[F] -> (F -> F2) -> C[F2]
    map: <C>(this: Cont<A, B>, mapFn: (F: Func<A, B>) => Func<B, C>) => Cont<B, C>;

    // (AKA FlatMap... which flattens and then maps.)
    // C[F] -> (F -> C[F2]) -> C[F2]
    bind: <C>(this: Cont<A, B>, mapFn: (F: Func<A, B>) => Cont<B, C>) => Cont<B, C>;

    // eval(F, A)
    run: (this: Cont<A, B>, val: A) => B;
}

// This is lift/return. Wraps a given function in a continuation monad.
// F: A -> B
// C: Continuation Monad
// F -> C[F]
export const cont = <TDomain, TRange>(contFunc: Func<TDomain, TRange>): Cont<TDomain, TRange> => ({
    // F: TDomain -> TRange
    fn: contFunc,

    // C[F] -> F
    flatten: function (this: Cont<TDomain, TRange>): Func<TDomain, TRange> {
        return func(this.fn.f);
    },

    // C[F] -> (F -> F2) -> C[F2]
    map: function <TMapTo>(
        this: Cont<TDomain, TRange>,
        mapFn: (F: Func<TDomain, TRange>) => Func<TRange, TMapTo>
    ): Cont<TRange, TMapTo> {
        return cont(mapFn(this.flatten()));
    },

    // (AKA FlatMap... which flattens and then maps.)
    // C[F] -> (F -> C[F2]) -> C[F2]
    bind: function <TMapTo>(this: Cont<TDomain, TRange>, mapFn: (F: Func<TDomain, TRange>) => Cont<TRange, TMapTo>): Cont<TRange, TMapTo> {
        return mapFn(this.flatten());
    },

    // eval(F, A)
    run: function (this: Cont<TDomain, TRange>, val: TDomain): TRange {
        return apply(this.fn, val);
    }
});
