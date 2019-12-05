export type Cont<A, B> = (fn: (a: A) => B) => B;
export type MonoLambda<A, B> = (param: A) => B;

export type ContOverloads = {
    <A, B>(_: (v: A) => B): (callback: (_: MonoLambda<A, B>) => void) => void;
    <A, B>(_: (v: A) => B): (callback: (_: MonoLambda<A, B>) => B) => B;
    <A, B>(_: (v: A) => B): (callback: (_: MonoLambda<A, B>) => B) => (callback: (_: MonoLambda<{}, B>) => B) => B;
    <B>(v: B): (callback: (_: MonoLambda<{}, B>) => void) => void;
    <B>(v: B): (callback: (_: MonoLambda<{}, B>) => B) => B;
    <B>(v: B): (callback: (_: MonoLambda<{}, B>) => B) => (callback: (_: MonoLambda<{}, B>) => B) => B;
};

export type ResultOverloads = {
    <B>(): (l: MonoLambda<{}, B>) => B;
    <B>(l: MonoLambda<{}, B>): B;
};

function isMonoLambda<A, B>(arg: unknown): arg is MonoLambda<A, B> {
    return typeof arg === 'function';
}

// v -> callback -> callback(v)
export const cont: ContOverloads = <A, B>(v: any) => (callback: any): any => {
    if (isMonoLambda<A, B>(v)) {
        return callback(v)
    } else {
        return callback(() => v as B);
    }
};

/**
 * cont: (A -> B) -> B
 * fn: A -> (C -> B) -> B
 * callback: C -> B
 * returns: B
 *
 * M(A) -> (A -> M(C)) -> M(C)
 * ((A -> B) -> B) -> (A -> (C -> B) -> B) -> (C -> B) -> B
**/
export const bind = <A, B, C>(continuation: Cont<A, B>, fn: (a: A) => Cont<C,B>) => (callback: (c: C) => B): B =>
    continuation(contResult => fn(contResult)(callback));

// const lazy = (v: any) => () => v;

// const continueWith = (lz: any, continuation: any) => lazy(continuation(lz))

export const result: ResultOverloads = <B>(v?: any): any =>
    typeof v === 'function' ? v({}) : (v: MonoLambda<{}, B>) => v({});

// const r = continueWith(lazy(5), (s: any) => result(s) * 5);
// console.log(result(r));

// export type Continuation<A, B> = {
//     bind: <C>(
//         this: Continuation<A, B>,
//         f: Func<A, Cont<A, B>>
//     ) => Continuation<C, B>;
// };

// export const continuation = <A, B>(f: Func<A, B>): Continuation<A, B> => ({
//     bind: function<C>(
//         this: Continuation<A, B>,
//         f: Func<A, Cont<A, B>>
//     ): any {
//         return null;
//     }
// });
