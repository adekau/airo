import { State, createState, stRun } from '../src/State';
import { func, apply } from '../src/Func';
import { identity } from '../src/Category';
import { Prod, swapProd, fst, snd } from '../src/Prod';

test('simple state', () => {
    const state: State<number, string> = createState<number, string>(
        identity<number>()
            .times(func(x => x + '!'))
            .then(swapProd())
    );
    const result = apply(state.run, 2);
    expect(result).toStrictEqual({
        fst: "2!",
        snd: 2
    });
});

test('state then', () => {
    const state: State<number, string> = createState<number, string>(
        identity<number>()
            .times(func(x => (x + 1).toString()))
            .then(swapProd())
    );
    const newState = state.then<boolean>(curr => createState(
        identity<number>()
            .times(func(x => !((x + parseInt(curr, 10)) % 2)))
            .then(swapProd())
            .then<Prod<boolean, number>>(
                snd<boolean, number>()
                    .then(func(x => x + parseInt(curr, 10)))
                    .times(fst<boolean, number>())
                    .then(swapProd())
            )
    ));
    const result = apply(state.run, 3);
    const result2 = apply(newState.run, 3);
    expect(result).toStrictEqual({
        fst: "4",
        snd: 3
    });
    expect(result2).toStrictEqual({
        fst: false,
        snd: 7
    });
});

test('state ignore', () => {
    const state: State<number, string> = createState<number, string>(
        identity<number>()
            .times(func(x => (x + 1).toString()))
            .then(swapProd())
    );
    const result = apply(state.ignore().run, 2);
    expect(result).toStrictEqual({
        fst: {},
        snd: 2
    });
});

test('state ignoreWith', () => {
    const state: State<number, string> = createState<number, string>(
        identity<number>()
            .times(func(x => (x + 1).toString()))
            .then(swapProd())
    );
    const result = apply(state.ignoreWith('hello').run, 15);
    expect(result).toStrictEqual({
        fst: 'hello',
        snd: 15
    });
});

test('state map', () => {
    const state: State<number, string> = createState<number, string>(
        identity<number>()
            .times(func(x => (x + 1).toString()))
            .then(swapProd())
    );
    const state2 = state.map<number>(func(s => s.length));
    const result = apply(state.run, 5);
    const result2 = apply(state2.run, 16);
    const result3 = apply(state2.run, 99);
    expect(result).toStrictEqual({
        fst: "6",
        snd: 5
    });
    expect(result2).toStrictEqual({
        fst: 2,
        snd: 16
    });
    expect(result3).toStrictEqual({
        fst: 3,
        snd: 99
    });
});
