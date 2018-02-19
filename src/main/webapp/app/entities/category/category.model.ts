import { BaseEntity } from './../../shared';

export class Category implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public color?: string,
        public transactions?: BaseEntity[],
    ) {
    }
}
