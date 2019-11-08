// <f*g> : c -> a*b
export type Prod<T1, T2> = {
    fst: T1;
    snd: T2;
};

export const times = <TDomain, T1, T2>(
    f: (input: TDomain) => T1,
    g: (input: TDomain) => T2
) =>
    (constructorInput: TDomain): Prod<T1, T2> => ({
        fst: f(constructorInput),
        snd: g(constructorInput)
    });
