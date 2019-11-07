import { Prod, times } from "./Prod";

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

    times<TCtor>(
        this: Func<TDomain, TRange>,
        g: Func<TDomain, TCtor>
    ): Func<TDomain, Prod<TRange, TCtor>> {
        return func(times(this.f, g.f));
    }
});
