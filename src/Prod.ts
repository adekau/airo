import { Func, func } from "./Func";

export type Prod<T1, T2> = {
    fst: T1;
    snd: T2;
};

// <f*g> : TDomain -> T1*T2
export const times = <TDomain, T1, T2>(
    f: (input: TDomain) => T1,
    g: (input: TDomain) => T2
) =>
    (constructorInput: TDomain): Prod<T1, T2> => ({
        fst: f(constructorInput),
        snd: g(constructorInput)
    });

// fst: T1*T2 -> T1
export const fst = <T1, T2>(): Func<Prod<T1, T2>, T1> => func(p => p.fst);

// snd: T1*T2 -> T2
export const snd = <T1, T2>(): Func<Prod<T1, T2>, T2> => func(p => p.snd);

// <f*g> = <(fst;f)*(snd;g)>
export const timesMap = <T1Prod1, T2Prod1, T1Prod2, T2Prod2>(
    f: Func<T1Prod1, T1Prod2>,
    g: Func<T2Prod1, T2Prod2>
): Func<Prod<T1Prod1, T2Prod1>, Prod<T1Prod2, T2Prod2>> =>
    (
        fst<T1Prod1, T2Prod1>()
            .then(f)
    ).times(
        snd<T1Prod1, T2Prod1>()
            .then(g)
    );

export const swapProd = <T1, T2>(): Func<Prod<T1, T2>, Prod<T2, T1>> =>
    snd<T1, T2>().times(fst<T1, T2>());
