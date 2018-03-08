import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../entities/transaction/transaction.model';
import { TransactionService } from '../../entities/transaction/transaction.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { Principal } from '../../shared/auth/principal.service';
import { Account } from '../../shared';
import { TransAccountService } from '../../entities/trans-account/trans-account.service';
import { TransAccount } from '../../entities/trans-account/trans-account.model';

@Component( {
    selector: 'jhi-trans-data',
    templateUrl: './trans-data.component.html',
    styles: []
} )
export class TransDataComponent implements OnInit {
    userAccount: Account;
    transAccount: TransAccount;

    transactions: Transaction[];
    transactionsIncome: Transaction[];
    transactionsExpense: Transaction[];
    balance: number;
    income: number;
    expense: number;
    dataIncomeExpense: any;
    dataExpense: any;
    categoryLabels: string[];
    color: string;

    constructor( private transactionService: TransactionService,
                 private transAccountService: TransAccountService,
                 private jhiAlertService: JhiAlertService,
                 private principal: Principal ) {
        this.dataIncomeExpense = {};
        this.dataExpense = {};
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.userAccount = this.principal.getUserIdentity();
        this.transAccountService.findByUserId( this.userAccount.id ).subscribe(
            ( res: HttpResponse<TransAccount> ) => this.onLoadTransAccountSuccess( res.body ),
            ( res: HttpErrorResponse ) => this.onError( res.message )
        );
    }

    onLoadTransAccountSuccess( data ) {
        this.transAccount = data;
        this.loadTransactionsByTransAccountId( this.transAccount.id );
    }

    loadTransactionsByTransAccountId( id: number ) {
        const d = new Date();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        this.transactionService.queryByAccountAndDate( id, year, month ).subscribe(
            ( res: HttpResponse<Transaction[]> ) => this.onLoadTransactionsSuccess( res.body ),
            ( res: HttpErrorResponse ) => this.onError( res.message )
        );
    }

    private onLoadTransactionsSuccess( data ) {
        this.transactions = data;
        this.transactionsIncome = this.getIncomeTransactions( this.transactions );
        this.transactionsExpense = this.getExpenseTransactions( this.transactions );
        this.categoryLabels = this.getCategoriesByTransactions( this.transactionsExpense );
        this.balance = this.getSum( this.transactions );
        this.income = this.getSum( this.transactionsIncome );
        this.expense = this.getSum( this.transactionsExpense ) * -1;

        this.dataIncomeExpense = {
            labels: [ 'income', 'expence' ],
            datasets: [
                {
                    data: [ this.income, this.expense ],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB'
                    ],
                    hoverBackgroundColor: [
                        '#ff6384',
                        '#36A2EB'
                    ]
                }
            ]
        };

        this.dataExpense = {
            labels: this.categoryLabels,
            datasets: [
                {
                    data: this.getSumsByCategories( this.transactionsExpense, this.categoryLabels ),
                    backgroundColor: this.getColorsOfCategoriesByTransactions( this.transactionsExpense ),
                    hoverBackgroundColor: this.getColorsOfCategoriesByTransactions( this.transactionsExpense )
                }
            ]
        };
    }

    private getSum( transactions: Transaction[] ): number {
        let balance = 0.0;
        transactions.forEach( function( transaction ) {
            balance = balance + transaction.value;
        } );
        return balance;
    }

    private getSumsByCategories( transactions: Transaction[], categories: string[] ): number[] {
        const sums: number[] = [];
        categories.forEach( function( category ) {
            let sum = 0.0;
            transactions.forEach( function( transaction ) {
                if (transaction.category.title === category) {
                    sum = sum + transaction.value;
                }
            } );
            sums.push( sum * -1 );
        } );
        return sums;
    }

    private getIncomeTransactions( transactions: Transaction[] ): Transaction[] {
        const income: Transaction[] = [];
        transactions.forEach( function( transaction ) {
            if (transaction.value > 0) {
                income.push( transaction );
            }
        } );
        return income;
    }

    private getExpenseTransactions( transactions: Transaction[] ): Transaction[] {
        const expense: Transaction[] = [];
        transactions.forEach( function( transaction ) {
            if (transaction.value < 0) {
                expense.push( transaction );
            }
        } );
        return expense;
    }

    private getCategoriesByTransactions( transactions: Transaction[] ): string[] {
        const categoryLabels: string[] = [];
        transactions.forEach( function( transaction ) {
            if (!categoryLabels.some( ( x ) => x === transaction.category.title )) {
                categoryLabels.push( transaction.category.title );
            }
        } );
        return categoryLabels;
    }

    private getColorsOfCategoriesByTransactions( transactions: Transaction[] ): string[] {
        const categoryColors: string[] = [];
        transactions.forEach( function( transaction ) {
            if (!categoryColors.some( ( x ) => x === transaction.category.color )) {
                categoryColors.push( transaction.category.color );
            }
        } );
        return categoryColors;
    }

    private onError( error ) {
        this.jhiAlertService.error( error.message, null, null );
    }

}
