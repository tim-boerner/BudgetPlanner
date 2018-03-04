import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IncomeCalculatorSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import { TransDataComponent } from './trans-data/trans-data.component';

@NgModule({
    imports: [
        IncomeCalculatorSharedModule,
        RouterModule.forChild([ HOME_ROUTE ])
    ],
    declarations: [
        HomeComponent,
        TransDataComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IncomeCalculatorHomeModule {}
