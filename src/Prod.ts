// <f*g> : c -> a*b
export type Prod<T1, T2> = {
    fst: T1;
    snd: T2;
};

export const times = <TCtor, T1, T2>(
    f: (constructorFn: TCtor) => T1,
    g: (constructorFn: TCtor) => T2
) => (
    constructorInput: TCtor
): Prod<T1, T2> => ({
    fst: f(constructorInput),
    snd: g(constructorInput)
});
