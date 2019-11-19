import { Prod, times, timesMap, swapProd, fst, snd } from "./Prod";
import { Sum, plus, plusMap, inl, inr } from './Sum';
import { identity } from "./Category";

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
    // f: TDomain -> TRange
    // g: TGDomain -> TGRange
    // <f*g> : TDomain*TGDomain -> TRange*TGRange
    timesMap: <TGDomain, TGRange>(
        g: Func<TGDomain, TGRange>
    ) => Func<Prod<TDomain, TGDomain>, Prod<TRange, TGRange>>;

    // Sum [f+g]
    plus: <TGDomain>(
        g: Func<TGDomain, TRange>
    ) => Func<Sum<TDomain, TGDomain>, TRange>;

    // f: TDomain -> TRange
    // g: TGDomain -> TGRange
    // [f+g] : TDomain+TGDomain -> TRange+TGRange
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

    times<TGRange>(
        this: Func<TDomain, TRange>,
        g: Func<TDomain, TGRange>
    ): Func<TDomain, Prod<TRange, TGRange>> {
        return func(times(this.f, g.f));
    },

    timesMap<TGDomain, TGRange>(
        this: Func<TDomain, TRange>,
        g: Func<TGDomain, TGRange>
    ): Func<Prod<TDomain, TGDomain>, Prod<TRange, TGRange>> {
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

export const distSumProd = function <A, B, C>(): Func<Prod<A, Sum<B, C>>, Sum<Prod<A, B>, Prod<A, C>>> {
    const f1: Func<Prod<B, A>, Sum<Prod<A, B>, Prod<A, C>>> = swapProd<B, A>().then(inl()),
        f = curry(f1),
        g1: Func<Prod<C, A>, Sum<Prod<A, B>, Prod<A, C>>> = swapProd<C, A>().then(inr()),
        g = curry(g1);
    return identity<A>()
        .timesMap(
            f.plus(g)
        )
        .then(swapProd())
        .then(applyPair());
};

export const factorSumProd = function <A, B, C>(): Func<Sum<Prod<A, B>, Prod<A, C>>, Prod<A, Sum<B, C>>> {
    const f: Func<Sum<Prod<A, B>, Prod<A, C>>, A> = fst<A, B>()
        .plus(
            fst<A, C>()
        );
    const g: Func<Sum<Prod<A, B>, Prod<A, C>>, Sum<B, C>> = snd<A, B>()
        .then(
            inl<B, C>()
        )
        .plus(
            snd<A, C>()
                .then(
                    inr<B, C>()
                )
        );
    return f.times(g);
};
