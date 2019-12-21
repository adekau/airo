import { Either, inr, inl } from '../../src/Monad/Either';

const badVal = 'Bad value';
const falsyIsError = <T extends unknown>(val: T): Either<string, T> => 
    !!val === true ? inr<string, T>(val) : inl<string, T>(badVal);

test('left value', () => {
    expect(falsyIsError(false)).toStrictEqual(inl(badVal));
    expect(falsyIsError(0)).toStrictEqual(inl(badVal));
    expect(falsyIsError('')).toStrictEqual(inl(badVal));
    expect(falsyIsError(undefined)).toStrictEqual(inl(badVal));
    expect(falsyIsError(null)).toStrictEqual(inl(badVal));
    expect(falsyIsError(void 0)).toStrictEqual(inl(badVal));
});

test('right value', () => {
    expect(falsyIsError(15)).toStrictEqual(inr(15));
    expect(falsyIsError('hello')).toStrictEqual(inr('hello'));
    expect(falsyIsError(true)).toStrictEqual(inr(true));
    expect(falsyIsError({})).toStrictEqual(inr({}));
});