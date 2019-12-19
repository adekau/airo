import { Func, func, apply } from './Func';

/** some definitions:
 *  C[F] = continuation monad. F in this case is a function.
 *  lift/return: F -> C[F]
 *  flatten/join: C[F] -> F
 *  bind (flatMap): C[F] -> (F -> C[F2]) -> C[F2]
 *  map: C[F] -> (F -> F2) -> C[F2]
 */
// export type Cont<A, B> = {
//     // F: TDomain -> TRange
//     fn: MonoLambda<A, B>;

//     // C[F] -> F
//     flatten: (this: Cont<A, B>) => MonoLambda<A, B>;

//     // C[F] -> (F -> F2) -> C[F2]
//     map: <C>(this: Cont<A, B>, mapFn: (F: MonoLambda<A, B>) => MonoLambda<B, C>) => Cont<B, C>;

//     // (AKA FlatMap... which flattens and then maps.)
//     // C[F] -> (F -> C[F2]) -> C[F2]
//     bind: <C>(this: Cont<A, B>, mapFn: (F: MonoLambda<A, B>) => Cont<B, C>) => Cont<B, C>;

//     // eval(F, A)
//     run: (this: Cont<A, B>, val: A) => B;
// }

export class Continuation<T extends unknown = unknown> {
    // Lift: F -> C[F]
    constructor(public fn: <U extends unknown = unknown>(resolve: (result: T) => U) => U) { }

    // Unit: A -> C[F(A)]
    public static of<T extends unknown = unknown>(val: T): Continuation<T> {
        return new Continuation<T>(resolve => resolve(val));
    }

    public static id<T extends unknown = unknown>(): (result: T) => T {
        return (result: T) => result;
    }

    // Bind: C[F] -> (F -> C[F2]) -> C[F2]
    public bind<R extends unknown = unknown>(f: (result: T) => Continuation<R>): Continuation<R> {
        return new Continuation<R>(resolve =>
            this.fn(result =>
                f(result).fn(result2 =>
                    resolve(result2)
                )
            )
        );
    }

    // Eval: C[F] -> (T -> U) -> U
    public run<U extends unknown = unknown>(f: (result: T) => U): U {
        return this.fn(f);
    }

    // map: C[F] -> (F -> F2) -> C[F2]
    public map<R extends unknown = unknown>(f: (result: T) => R): Continuation<R> {
        return this.bind(result => Continuation.of(f(result)));
    }
}

// This is lift/return. Wraps a given function in a continuation monad.
// F: A -> B
// C: Continuation Monad
// F -> C[F]
// export const cont = <TDomain, TRange>(contFunc: MonoLambda<TDomain, TRange>): Cont<TDomain, TRange> => ({
//     // F: TDomain -> TRange
//     fn: contFunc,

//     // C[F] -> F
//     flatten: function (this: Cont<TDomain, TRange>): MonoLambda<TDomain, TRange> {
//         return this.fn;
//     },

//     // C[F] -> (F -> F2) -> C[F2]
//     map: function <TMapTo>(
//         this: Cont<TDomain, TRange>,
//         mapFn: (F: MonoLambda<TDomain, TRange>) => MonoLambda<TRange, TMapTo>
//     ): Cont<TRange, TMapTo> {
//         return cont(mapFn(this.flatten()));
//     },

//     // (AKA FlatMap... which flattens and then maps.)
//     // C[F] -> (F -> C[F2]) -> C[F2]
//     bind: function <TMapTo>(this: Cont<TDomain, TRange>, mapFn: (F: Func<TDomain, TRange>) => Cont<TRange, TMapTo>): Cont<TRange, TMapTo> {
//         return mapFn(this.flatten());
//     },

//     // eval(F, A)
//     run: function (this: Cont<TDomain, TRange>, val: TDomain): TRange {
//         return apply(this.fn, val);
//     }
// });
