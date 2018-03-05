import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IncomeCalculatorSharedModule } from '../../shared';
import { ChartModule } from 'primeng/primeng';

import {
    DoughnutchartComponent,
    doughnutchartRoute
} from './';

const DASHBOARD_STATES = [
    doughnutchartRoute
];

@NgModule({
    imports: [
        IncomeCalculatorSharedModule,
        ChartModule,
        RouterModule.forRoot(DASHBOARD_STATES, { useHash: true })
    ],
    declarations: [
        DoughnutchartComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IncomeCalculatorDoughnutchartModule {}
