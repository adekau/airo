import { Applicative, Applicative1 } from './Applicative';
import { Bindable, Bindable1 } from './Bindable';
import { HKTS } from './HKT';

export type Monad<F> = Applicative<F> & Bindable<F>;
export type Monad1<F extends HKTS> = Applicative1<F> & Bindable1<F>;
