import { Continuation, continuation } from '../src/Continuation';
import { func } from '../src/Func';

const t = continuation<number, number>(func(x => x * 5)).bind();

test('test', () => {
    console.log(t.bind.toString());
});