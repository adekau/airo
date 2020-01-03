import { apFirst, apSecond, Just, Maybe, Nothing } from '../../src/Monad/Maybe';

describe('Maybe Monad', () => {
    it('just', () => {
        expect(Maybe.of(55)).toEqual(Just(55));
    });

    it('none', () => {
        expect(Maybe.bind(Maybe.of(55), _ => Nothing)).toEqual(Nothing);
    });

    it('bind', () => {
        expect(Maybe.bind(Maybe.of(55), result => Just(result + 5))).toEqual(Just(60));
    });

    it('map', () => {
        expect(Maybe.map(Maybe.of(55), result => result + 5)).toEqual(Just(60));
    });

    it('apply', () => {
        expect(Maybe.ap(Just((a: boolean) => !a), Just(false))).toEqual(Just(true));
    });

    it('pipeable fn', () => {
        expect(
            apFirst(Just(5))(Just('hi'))
        ).toEqual(Just('hi'));
        expect(
            apSecond(Just(5))(Just('hi'))
        ).toEqual(Just(5));
    });
});
