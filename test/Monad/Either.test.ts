import { Either, inl, inr } from '../../src/Monad/Either';

const badVal = 'Bad value';
const falsyIsError = <T extends unknown>(val: T): Either<string, T> =>
    !!val === true ? inr<string, T>(val) : inl<string, T>(badVal);

it('left value', () => {
    expect(falsyIsError(false)).toEqual(inl(badVal));
    expect(falsyIsError(0)).toEqual(inl(badVal));
    expect(falsyIsError('')).toEqual(inl(badVal));
    expect(falsyIsError(undefined)).toEqual(inl(badVal));
    expect(falsyIsError(null)).toEqual(inl(badVal));
    expect(falsyIsError(void 0)).toEqual(inl(badVal));
});

it('right value', () => {
    expect(falsyIsError(15)).toEqual(inr(15));
    expect(falsyIsError('hello')).toEqual(inr('hello'));
    expect(falsyIsError(true)).toEqual(inr(true));
    expect(falsyIsError({})).toEqual(inr({}));
});
