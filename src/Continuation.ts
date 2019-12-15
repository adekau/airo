import { Func, func, apply } from './Func';

export type Cont<A, B> = (fn: (a: A) => B) => B;
export type MonoLambda<A, B> = (param: A) => B;

export type ContOverloads = {
    <A, B>(_: MonoLambda<A, B>): <C>(callback: Cont<C, B>) => B;
    <A, B>(_: MonoLambda<A, B>): (callback: MonoLambda<MonoLambda<A, B>, B>) => B;
    <A, B>(_: MonoLambda<A, B>): (callback: MonoLambda<MonoLambda<A, B>, B>) => (callback:  MonoLambda<MonoLambda<A, B>, B>) => B;
    <B>(v: B): (callback: MonoLambda<MonoLambda<{}, B>, void>) => void;
    <B>(v: B): (callback: MonoLambda<MonoLambda<{}, B>, B>) => B;
    <B>(v: B): (callback: MonoLambda<MonoLambda<{}, B>, B>) => (callback: MonoLambda<MonoLambda<{}, B>, B>) => B;
};
type AnyFunc = (...args: Array<any>) => any;

const something = <A, B>(v: Func<A, B>) => (callback: Func<Func<A, B>, B>) => apply(callback, v);
const something2 = something(func((x: number) => x * x))(func(z => z.));

type ContConstructor = {
    <A, B>(initial: A): Cont<A, B> =>
}
export type ResultOverloads = {
    <B>(): (l: MonoLambda<{}, B>) => B;
    <B>(l: MonoLambda<{}, B>): B;
};

function isMonoLambda<A, B extends unknown | void = void>(arg: unknown): arg is MonoLambda<A, B> {
    return typeof arg === 'function';
}

// v -> callback -> callback(v)
export const cont: ContOverloads = <A, B>(initial: any) => (callback: any): any => {
    if (isMonoLambda<A, B>(initial)) {
        return callback(initial)
    } else {
        return callback(() => initial as B);
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

export type Continuation<A, B> = {
    cont: Cont<A, B>,

    bind: <C>(
        this: Continuation<A, B>,
        f: (_: A) => Cont<C, B>
    ) => Continuation<C, B>;
};

export const continuation = <A, B>(cont: Cont<A, B>): Continuation<A, B> => ({
    cont,

    bind: function<C>(
        this: Continuation<A, B>,
        f: (_: A) => Cont<C, B>
    ): Continuation<C, B> {
        return continuation(bind(this.cont, f));
    }
});
