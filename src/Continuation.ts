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
export class Cont<T extends unknown> {
    // Lift: F -> C[F]
    constructor(public fn: (resolve: (result: T) => void) => unknown) { }

    // Unit: A -> C[F(A)]
    public static of<T extends unknown = unknown>(val: T): Cont<T> {
        return new Cont<T>(resolve => resolve(val));
    }

    // Identity: T -> T
    public static id<T extends unknown = unknown>(): (result: T) => T {
        return (result: T) => result;
    }

    // Bind: C[F] -> (F -> C[F2]) -> C[F2]
    public bind<R extends unknown = unknown>(f: (result: T) => Cont<R>): Cont<R> {
        return new Cont<R>(resolve =>
            this.fn(result =>
                f(result).fn(result2 =>
                    resolve(result2)
                )
            )
        );
    }

    // Eval: C[F] -> (T -> U) -> U
    public run<U extends unknown = unknown>(f: (result: T) => U): U {
        return <U>this.fn(f);
    }

    // map: C[F] -> (F -> F2) -> C[F2]
    public map<R extends unknown = unknown>(f: (result: T) => R): Cont<R> {
        return this.bind(result => Cont.of(f(result)));
    }
}
