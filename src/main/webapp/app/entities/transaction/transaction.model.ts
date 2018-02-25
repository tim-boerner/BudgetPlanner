import { BaseEntity } from './../../shared';

export const enum TransactionType {
    'DAILY',
    'MONTHLY',
    'YEARLY',
    'ONCE'
}

export class Transaction implements BaseEntity {
    constructor(
        public id?: number,
        public value?: number,
        public description?: string,
        public date?: any,
        public type?: TransactionType,
        public category?: BaseEntity,
        public transAccount?: BaseEntity,
    ) {
    }
}
