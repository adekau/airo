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
