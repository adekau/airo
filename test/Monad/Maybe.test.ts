import { Maybe, Just, Nothing, apFirst, apSecond } from '../../src/Monad/Maybe';

test('just', () => {
    expect(Maybe.of(55)).toStrictEqual(Just(55));
});

test('none', () => {
    expect(Maybe.bind(Maybe.of(55), _ => Nothing)).toStrictEqual(Nothing);
});

test('bind', () => {
    expect(Maybe.bind(Maybe.of(55), result => Just(result + 5))).toStrictEqual(Just(60));
});

test('map', () => {
    expect(Maybe.map(Maybe.of(55), result => result + 5)).toStrictEqual(Just(60));
});

test('apply', () => {
    expect(Maybe.ap(Just((a: boolean) => !a), Just(false))).toStrictEqual(Just(true));
});

test('pipeable fn', () => {
    expect(
        apFirst(Just(5))(Just('hi'))
    ).toStrictEqual(Just('hi'));
    expect(
        apSecond(Just(5))(Just('hi'))
    ).toStrictEqual(Just(5));
});
