import { Prod } from "./Prod";
import { Sum, inl, inr } from "./Sum";
import { Func } from "./Func";
import { One, identity } from "./Category";

export type CoRef<TState, TErr, T> = {
    get: Coroutine<TState, TErr, T>;
    set: (_: T) => Coroutine<TState, TErr, One>;
};

export type CoRet<TState, T> = Prod<T, TState>;
export type CoCont<TState, TErr, T> = Prod<Coroutine<TState, TErr, T>, TState>;
export type CoPreRes<TState, TErr, T> = Sum<TErr, CoRes<TState, TErr, T>>;
export type CoRes<TState, TErr, T> = Sum<CoCont<TState, TErr, T>, CoRet<TState, T>>;
export type CoFunc<TState, TErr, T> = Func<TState, CoPreRes<TState, TErr, T>>;

export type Coroutine<TState, TErr, T> = {
    run: CoFunc<TState, TErr, T>;

    then: <U>(k: (_: T) => Coroutine<TState, TErr, U>) => Coroutine<TState, TErr, U>;

    ignore: () => Coroutine<TState, TErr, One>;

    ignoreWith: <U>(val: U) => Coroutine<TState, TErr, U>;

    map: <U>(f: Func<T, U>) => Coroutine<TState, TErr, U>;
};

export function error<TState, TErr, T>(): Func<TErr, CoPreRes<TState, TErr, T>> {
    return inl<TErr, CoRes<TState, TErr, T>>();
};

export function noError<TState, TErr, T>(): Func<CoRes<TState, TErr, T>, CoPreRes<TState, TErr, T>> {
    return inr<TErr, CoRes<TState, TErr, T>>();
};

export function continuation<TState, TErr, T>(): Func<CoCont<TState, TErr, T>, CoRes<TState, TErr, T>> {
    return inl<CoCont<TState, TErr, T>, CoRet<TState, T>>();
};

export function result<TState, TErr, T>(): Func<CoRet<TState, T>, CoRes<TState, TErr, T>> {
    return inr<CoCont<TState, TErr, T>, CoRet<TState, T>>();
};

export function value<TState, T>(): Func<Prod<T, TState>, CoRet<TState, T>> {
    return identity<CoRet<TState, T>>();
}