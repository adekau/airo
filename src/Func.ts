import { Prod, times, timesMap } from "./Prod";
import { Sum, plus, plusMap } from './Sum';

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
    times: <T2Range>(
        g: Func<TDomain, T2Range>
    ) => Func<TDomain, Prod<TRange, T2Range>>;

    // Parallel application of functions over a product
    // f: a -> c
    // g: b -> d
    // <f*g> : a*b -> c*d
    timesMap: <T1Prod2, T2Prod2>(
        g: Func<T1Prod2, T2Prod2>
    ) => Func<Prod<TDomain, T1Prod2>, Prod<TRange, T2Prod2>>;

    // Sum [f+g]
    plus: <TGDomain>(
        g: Func<TGDomain, TRange>
    ) => Func<Sum<TDomain, TGDomain>, TRange>;

    // f: a -> b
    // g: c -> d
    // [f+g] : a+c -> b+d
    plusMap: <TGDomain, TGRange>(
        g: Func<TGDomain, TGRange>
    ) => Func<Sum<TDomain, TGDomain>, Sum<TRange, TGRange>>;
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
    },

    plus<TGDomain>(
        this: Func<TDomain, TRange>,
        g: Func<TGDomain, TRange>
    ): Func<Sum<TDomain, TGDomain>, TRange> {
        return func(plus(this.f, g.f));
    },

    plusMap<TGDomain, TGRange>(
        this: Func<TDomain, TRange>,
        g: Func<TGDomain, TGRange>
    ): Func<Sum<TDomain, TGDomain>, Sum<TRange, TGRange>> {
        return plusMap(this, g);
    }
});

// f: T1*T2 -> TRange
// curry(f): T1 -> (T2 -> TRange)
export const curry = <T1, T2, TRange>(
    f: Func<Prod<T1, T2>, TRange>
): Func<T1, Func<T2, TRange>> =>
    func(a => func(b => f.f({
        fst: a,
        snd: b
    })));

// apply: (TDomain -> TRange) * TDomain -> TRange
export const apply = <TDomain, TRange>(
    f: Func<TDomain, TRange>,
    x: TDomain
): TRange => f.f(x);

// applyPair: (TDomain -> TRange) * TDomain -> TRange
export const applyPair = <TDomain, TRange>(): Func<Prod<Func<TDomain, TRange>, TDomain>, TRange> =>
    func(p => p.fst.f(p.snd));
