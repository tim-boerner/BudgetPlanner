import { BaseEntity } from './../../shared';

export class AccountCollection implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public transAccounts?: BaseEntity[],
    ) {
    }
}
