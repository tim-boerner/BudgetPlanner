import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IncomeCalculatorSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import { TransDataComponent } from './trans-data/trans-data.component';
import { ChartModule } from 'primeng/primeng';

@NgModule({
    imports: [
        IncomeCalculatorSharedModule,
        ChartModule,
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
