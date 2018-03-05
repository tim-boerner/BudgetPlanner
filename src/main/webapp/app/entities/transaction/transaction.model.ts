import { BaseEntity } from './../../shared';
import { Category } from '../category/category.model';

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
        public category?: Category,
        public transAccount?: BaseEntity,
    ) {
    }
}
