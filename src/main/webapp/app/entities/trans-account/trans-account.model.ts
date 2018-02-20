import { BaseEntity, User } from './../../shared';

export class TransAccount implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public user?: User,
        public transactions?: BaseEntity[],
        public accountCollection?: BaseEntity,
    ) {
    }
}
