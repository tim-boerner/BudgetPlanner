import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IncomeCalculatorTransactionModule } from './transaction/transaction.module';
import { IncomeCalculatorCategoryModule } from './category/category.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        IncomeCalculatorTransactionModule,
        IncomeCalculatorCategoryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IncomeCalculatorEntityModule {}
