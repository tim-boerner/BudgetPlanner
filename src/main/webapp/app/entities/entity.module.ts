import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IncomeCalculatorTransactionModule } from './transaction/transaction.module';
import { IncomeCalculatorCategoryModule } from './category/category.module';
import { IncomeCalculatorTransAccountModule } from './trans-account/trans-account.module';
import { IncomeCalculatorAccountCollectionModule } from './account-collection/account-collection.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        IncomeCalculatorTransactionModule,
        IncomeCalculatorCategoryModule,
        IncomeCalculatorTransAccountModule,
        IncomeCalculatorAccountCollectionModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IncomeCalculatorEntityModule {}
