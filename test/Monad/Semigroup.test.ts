import { getApplySemigroup, Just, Nothing } from '../../src/Monad/Maybe';
import { getApplySemigroup as eitherSg, inr, inl } from '../../src/Monad/Either';
import {
    fold,
    getFunctionSemigroup,
    getStructSemigroup,
    Semigroup,
    semigroupAll,
    semigroupAny,
    semigroupProd,
    semigroupSum,
} from '../../src/Monad/Semigroup';

type Point = {
    x: number;
    y: number;
};

const sgPoint: Semigroup<Point> = getStructSemigroup({
    x: semigroupSum,
    y: semigroupSum
});

const sgPred: Semigroup<(p: Point) => boolean> = getFunctionSemigroup(semigroupAll)<Point>();

const p1: Point = {
    x: 1,
    y: 5
};

const p2: Point = {
    x: 6,
    y: 2
};

const p3: Point = {
    x: 15,
    y: -3
};

const p4: Point = {
    x: -4,
    y: 5
};

test('add two points', () => {
    expect(sgPoint.concat(p1, p2)).toStrictEqual({
        x: 7,
        y: 7
    });
});

test('function semigroup', () => {
    const isPositiveX = (p: Point) => p.x >= 0;
    const isNegativeY = (p: Point) => p.y <= 0;
    const checkPoint = sgPred.concat(isPositiveX, isNegativeY);

    expect(checkPoint(p1)).toBe(false);
    expect(checkPoint(p2)).toBe(false);
    expect(checkPoint(p3)).toBe(true);
    expect(checkPoint(p4)).toBe(false);
});

test('function or semigroup', () => {
    const sgOrPred: Semigroup<(p: Point) => boolean> = getFunctionSemigroup(semigroupAny)();
    const isPositiveX = (p: Point) => p.x >= 0;
    const isNegativeY = (p: Point) => p.y <= 0;
    const checkPoint = sgOrPred.concat(isPositiveX, isNegativeY);

    expect(checkPoint(p1)).toBe(true);
    expect(checkPoint(p2)).toBe(true);
    expect(checkPoint(p3)).toBe(true);
    expect(checkPoint(p4)).toBe(false);
});

test('fold', () => {
    const sum = fold(semigroupSum);
    const prod = fold(semigroupProd);
    
    expect(sum(0, [1, 2, 3, 4])).toBe(10);
    expect(prod(1, [1, 2, 3, 4])).toBe(24);
});

test('Maybe semigroup', () => {
    const addMaybe = getApplySemigroup(semigroupSum);
    const multMaybe = getApplySemigroup(semigroupProd);

    expect(addMaybe.concat(Just(5), Just(11))).toStrictEqual(Just(16));
    expect(addMaybe.concat(Just(5), Nothing)).toStrictEqual(Nothing);
    expect(multMaybe.concat(Just(5), Just(11))).toStrictEqual(Just(55));
    expect(multMaybe.concat(Just(5), Nothing)).toStrictEqual(Nothing);
});

test('Either semigroup', () => {
    const allEither = eitherSg<string, boolean>(semigroupAll);
    const fnSgEither = getFunctionSemigroup(allEither)<Point>();
    const ptNot0 = (p: Point) => p.x === 0 ? inl('error in x') : inr(true);
    const ptLess0 = (p: Point) => p.y < 0 ? inr(true) : p.y > 0 ? inl('error in y') : inr(false);
    const testFn = fnSgEither.concat(ptNot0, ptLess0);

    expect(testFn(p1)).toStrictEqual(inl('error in y'));
    expect(testFn(p2)).toStrictEqual(inl('error in y'));
    expect(testFn(p3)).toStrictEqual(inr(true));
    expect(testFn(p4)).toStrictEqual(inl('error in y'));
    expect(testFn({ x: 0, y: -4 })).toStrictEqual(inl('error in x'));
    expect(testFn({ x: -1, y: -1 })).toStrictEqual(inr(true));
    expect(testFn({ x: -1, y: 0 })).toStrictEqual(inr(false));
});