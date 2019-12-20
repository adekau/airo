export type HKT<TId, V> = {
    readonly _HKT: TId;
    readonly _val: V;
};

export interface HKTToKind<A> {}
export type HKTS = keyof HKTToKind<any>;
export type Kind<TId extends HKTS, A> = TId extends HKTS ? HKTToKind<A>[TId] : any;
