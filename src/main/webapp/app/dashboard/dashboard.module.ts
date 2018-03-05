import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IncomeCalculatorBarchartModule } from './barchart/barchart.module';
import { IncomeCalculatorDoughnutchartModule } from './doughnutchart/doughnutchart.module';
import { IncomeCalculatorLinechartModule } from './linechart/linechart.module';
import { IncomeCalculatorPiechartModule } from './piechart/piechart.module';
import { IncomeCalculatorPolarareachartModule } from './polarareachart/polarareachart.module';
import { IncomeCalculatorRadarchartModule } from './radarchart/radarchart.module';

@NgModule({
    imports: [
        IncomeCalculatorBarchartModule,
        IncomeCalculatorDoughnutchartModule,
        IncomeCalculatorLinechartModule,
        IncomeCalculatorPiechartModule,
        IncomeCalculatorPolarareachartModule,
        IncomeCalculatorRadarchartModule,
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IncomeCalculatorDashboardModule {}
