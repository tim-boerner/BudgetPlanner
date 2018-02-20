import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IncomeCalculatorSharedModule } from '../../shared';
import {
    AccountCollectionService,
    AccountCollectionPopupService,
    AccountCollectionComponent,
    AccountCollectionDetailComponent,
    AccountCollectionDialogComponent,
    AccountCollectionPopupComponent,
    AccountCollectionDeletePopupComponent,
    AccountCollectionDeleteDialogComponent,
    accountCollectionRoute,
    accountCollectionPopupRoute,
    AccountCollectionResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...accountCollectionRoute,
    ...accountCollectionPopupRoute,
];

@NgModule({
    imports: [
        IncomeCalculatorSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AccountCollectionComponent,
        AccountCollectionDetailComponent,
        AccountCollectionDialogComponent,
        AccountCollectionDeleteDialogComponent,
        AccountCollectionPopupComponent,
        AccountCollectionDeletePopupComponent,
    ],
    entryComponents: [
        AccountCollectionComponent,
        AccountCollectionDialogComponent,
        AccountCollectionPopupComponent,
        AccountCollectionDeleteDialogComponent,
        AccountCollectionDeletePopupComponent,
    ],
    providers: [
        AccountCollectionService,
        AccountCollectionPopupService,
        AccountCollectionResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IncomeCalculatorAccountCollectionModule {}
