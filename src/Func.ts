import { Prod, times, timesMap } from "./Prod";

export type Func<TDomain, TRange> = {
    f: (domain: TDomain) => TRange;

    // Composition f . g
    after: <TPreComposition>(
        g: Func<TPreComposition, TDomain>
    ) => Func<TPreComposition, TRange>;

    // Composition g . f
    then: <TPostComposition>(
        g: Func<TRange, TPostComposition>
    ) => Func<TDomain, TPostComposition>;

    // Product <f*g>
    times: <TCtor>(
        g: Func<TDomain, TCtor>
    ) => Func<TDomain, Prod<TRange, TCtor>>;

    // Parallel application of functions over a product
    // f: a -> c
    // g: b -> d
    // <f*g> : a*b -> c*d
    timesMap: <T1Prod2, T2Prod2>(
        g: Func<T1Prod2, T2Prod2>
    ) => Func<Prod<TDomain, T1Prod2>, Prod<TRange, T2Prod2>>;
};

export const func = <TDomain, TRange>(f: (domain: TDomain) => TRange): Func<TDomain, TRange> => ({
    f,

    after<TPreComposition>(
        this: Func<TDomain, TRange>,
        g: Func<TPreComposition, TDomain>
    ): Func<TPreComposition, TRange> {
        return func<TPreComposition, TRange>((x) => this.f(g.f(x)));
    },

    then<TPostComposition>(
        this: Func<TDomain, TRange>,
        g: Func<TRange, TPostComposition>
    ): Func<TDomain, TPostComposition> {
        return func<TDomain, TPostComposition>((x) => g.f(this.f(x)));
    },

    times<T2Range>(
        this: Func<TDomain, TRange>,
        g: Func<TDomain, T2Range>
    ): Func<TDomain, Prod<TRange, T2Range>> {
        return func(times(this.f, g.f));
    },

    timesMap<T1Prod2, T2Prod2>(
        this: Func<TDomain, TRange>,
        g: Func<T1Prod2, T2Prod2>
    ): Func<Prod<TDomain, T1Prod2>, Prod<TRange, T2Prod2>> {
        return timesMap(this, g);
    }
});
