/** some definitions:
 *  C[F] = continuation monad. F in this case is a function.
 *  lift/return: F -> C[F]
 *  flatten/join: C[F] -> F
 *  bind (flatMap): C[F] -> (F -> C[F2]) -> C[F2]
 *  map: C[F] -> (F -> F2) -> C[F2]
 */

 /**
  * Continuation Monad
  * @param fn
  */
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
