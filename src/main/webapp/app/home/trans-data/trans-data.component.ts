import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../entities/transaction/transaction.model';
import { TransactionService } from '../../entities/transaction/transaction.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';

@Component( {
    selector: 'jhi-trans-data',
    templateUrl: './trans-data.component.html',
    styles: []
} )
export class TransDataComponent implements OnInit {
    transactions: Transaction[];
    transactionsIncome: Transaction[];
    transactionsExpense: Transaction[];
    balance: number;
    income: number;
    expense: number;
    dataIncomeExpense: any;
    dataExpense: any;
    categoryLabels: string[];

    constructor( private transactionService: TransactionService,
                 private jhiAlertService: JhiAlertService ) {
        this.dataIncomeExpense = {};
        this.dataExpense = {};
    }

    ngOnInit() {
        this.loadData();
    }

    loadTransactions() {
        const d = new Date();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        this.transactionService.queryByAccountAndDate( 1, year, month ).subscribe(
            ( res: HttpResponse<Transaction[]> ) => this.onLoadTransactionsSuccess( res.body ),
            ( res: HttpErrorResponse ) => this.onError( res.message )
        );
    }

    loadData() {
        this.loadTransactions();
    }

    private getSum( transactions: Transaction[] ): number {
        let balance = 0.0;
        transactions.forEach( function( transaction ) {
            balance = balance + transaction.value;
        } );
        return balance;
    }

    private getSumsByCategories(transactions: Transaction[], categories: string[]): number[] {
        const sums: number[] = [];
        categories.forEach( function( category ) {
            let sum = 0.0;
            transactions.forEach( function( transaction ) {
                if (transaction.category.title === category) {
                    sum = sum + transaction.value;
                }
            } );
            sums.push(sum * -1);
        } );
        return sums;
    }

    private getIncomeTransactions( transactions: Transaction[] ): Transaction[] {
        const income: Transaction[] = [];
        transactions.forEach( function( transaction ) {
            if (transaction.value > 0) {
                income.push(transaction);
            }
        } );
        return income;
    }

    private getExpenseTransactions( transactions: Transaction[] ): Transaction[] {
        const expense: Transaction[] = [];
        transactions.forEach( function( transaction ) {
            if (transaction.value < 0) {
                expense.push(transaction);
            }
        } );
        return expense;
    }

    private getCategories( transactions: Transaction[] ): string[] {
        const categoryLabels: string[] = [];
        transactions.forEach( function( transaction ) {
            if (!categoryLabels.some( (x) => x === transaction.category.title )) {
                categoryLabels.push( transaction.category.title );
            }
        } );
        return categoryLabels;
    }

    private onLoadTransactionsSuccess( data ) {
        this.transactions = data;
        this.categoryLabels = this.getCategories( this.transactions );
        this.transactionsIncome = this.getIncomeTransactions(this.transactions);
        this.transactionsExpense = this.getExpenseTransactions(this.transactions);
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
                    data: this.getSumsByCategories(this.transactionsExpense, this.categoryLabels),
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
    }

    private onError( error ) {
        this.jhiAlertService.error( error.message, null, null );
    }

}
