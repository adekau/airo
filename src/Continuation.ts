import { Func, func, apply } from './Func';

// export type Cont<A, B> = Func<Func<A, B>, B>;

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

export type Cont<A, B> = (fn: (a: A) => B) => B;
export type Lambda<A> = A extends (...args: infer U) => infer T ? A : never;

// v -> callback -> callback(v)
// export const cont = 
// export const cont = <A, B>(v: ((_: A) => B) | A) => (callback: (_: ((_: A) => B) | A) => B) => callback(v);
// export const cont = <A, B>(f: (a: A) => B) => (callback: (f: (_: A) => B) => B) => callback(f);

const test = cont<number, number>(x => x*x)((y: (_: number) => number) => cont<number, number>(y(4)))

// M(A) -> (A -> M(C)) -> M(C)
// ((A -> B) -> B) -> (A -> (C -> B) -> B) -> (C -> B) -> B
// export const bind = <A, B, C>(cont: Cont<A, B>, fn: Func<A, Cont<C, B>>): Func<Func<C, B>, B> => (callback: Func<C, B>): B => ;
export const bind = <A, B, C>(cont: Cont<A, B>, fn: (a: A) => Cont<C,B>) => (callback: (c: C) => B): B =>
    cont(contResult => fn(contResult)(callback));
/**
 * cont: (A -> B) -> B
 * fn: A -> (C -> B) -> B
 * callback: C -> B
 * just needs to return B.
 */


// // continuation
// // (A -> B) -> B
// const continuation: Continuation = <A, B>(f: (a: A) => B) => (b: B) => {
//     f(b);
// };
// continuation();

// cont
// const cont = (x: any) => (callback: (...args: any[]) => any) => callback(x);

// const bind  = (cont: any, f: any) => ((callback: any) => cont((result: any) => f(result)(callback)));

// const lazy = (v: any) => () => v;

// const continueWith = (lz: any, continuation: any) => lazy(continuation(lz))

// const result = (v: any) => v();

// const r = continueWith(lazy(5), (s: any) => result(s) * 5);
// console.log(result(r));