import { One, unit, identity, constant } from './Category';
import { Func, func, applyPair, apply, curry } from './Func';
import { Prod, fst, snd } from './Prod';

export type StFunc<TState, T> = Func<TState, Prod<T, TState>>;

// State Monad (a monad is a monoid in the category of endofunctors, what's the problem?)
export type State<TState, T> = {
    run: StFunc<TState, T>;

    then: <U>(
        state: (curr: T) => State<TState, U>
    ) => State<TState, U>;

    ignore: () => State<TState, One>;

    ignoreWith: <U>(
        val: U
    ) => State<TState, U>;

    map: <U>(
        mapFunc: Func<T, U>
    ) => State<TState, U>;
};

export function createState<TState, T>(runFunc: StFunc<TState, T>): State<TState, T> {
    return ({
        run: runFunc,

        then: function<T, U>(
            this: State<TState, T>,
            state: (curr: T) => State<TState, U>
        ): State<TState, U> {
            return stJoin(this.map(func(state)));
        },

        ignore(
            this: State<TState, T>
        ): State<TState, One> {
            return this.ignoreWith<One>(
                apply(unit(), void 0)
            );
        },

        ignoreWith: function<U>(
            this: State<TState, T>,
            val: U
        ): State<TState, U> {
            return this.map(constant(val));
        },

        map: function<U>(
            this: State<TState, T>,
            f: Func<T, U>
        ): State<TState, U> {
            return createState<TState, U>(
                f
                    .timesMap(identity<TState>())
                    .after(this.run)
            );
        }
    });
};

export function stRun<TState, T>(): Func<State<TState, T>, StFunc<TState, T>> {
    return func(p => p.run);
};

export function stJoin<TState, T>(
    f: State<TState, State<TState, T>>
): State<TState, T> {
    const g = fst<State<TState, T>, TState>()
        .then(stRun<TState, T>())
        .times(snd<State<TState, T>, TState>())
        .then(applyPair());
    const h = stRun<TState, State<TState, T>>()
        .timesMap(identity<TState>())
        .then(applyPair())
        .then(g);
    return createState<TState, T>(apply(curry(h), f));
};
