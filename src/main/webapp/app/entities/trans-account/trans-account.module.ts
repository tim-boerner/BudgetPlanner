import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IncomeCalculatorSharedModule } from '../../shared';
import { IncomeCalculatorAdminModule } from '../../admin/admin.module';
import {
    TransAccountService,
    TransAccountPopupService,
    TransAccountComponent,
    TransAccountDetailComponent,
    TransAccountDialogComponent,
    TransAccountPopupComponent,
    TransAccountDeletePopupComponent,
    TransAccountDeleteDialogComponent,
    transAccountRoute,
    transAccountPopupRoute,
    TransAccountResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...transAccountRoute,
    ...transAccountPopupRoute,
];

@NgModule({
    imports: [
        IncomeCalculatorSharedModule,
        IncomeCalculatorAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TransAccountComponent,
        TransAccountDetailComponent,
        TransAccountDialogComponent,
        TransAccountDeleteDialogComponent,
        TransAccountPopupComponent,
        TransAccountDeletePopupComponent,
    ],
    entryComponents: [
        TransAccountComponent,
        TransAccountDialogComponent,
        TransAccountPopupComponent,
        TransAccountDeleteDialogComponent,
        TransAccountDeletePopupComponent,
    ],
    providers: [
        TransAccountService,
        TransAccountPopupService,
        TransAccountResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IncomeCalculatorTransAccountModule {}
