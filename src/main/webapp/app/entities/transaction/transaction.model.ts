import { BaseEntity, User } from './../../shared';

export const enum TransactionType {
    'daily',
    'monthly',
    'yearly'
}

export class Transaction implements BaseEntity {
    constructor(
        public id?: number,
        public value?: number,
        public description?: string,
        public date?: any,
        public type?: TransactionType,
        public user?: User,
        public category?: BaseEntity,
    ) {
    }
}
