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
    balance: number;
    income: number;
    expense: number;

    constructor( private transactionService: TransactionService,
                 private jhiAlertService: JhiAlertService ) {
    }

    ngOnInit() {
        this.loadData();
    }

    loadTransactions() {
        const d = new Date();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        this.transactionService.queryByAccountAndDate( 1, year, month ).subscribe(
            ( res: HttpResponse<Transaction[]> ) => this.onSuccess( res.body ),
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

    private getIncome( transactions: Transaction[] ): number {
        let income = 0.0;
        transactions.forEach( function( transaction ) {
            if (transaction.value > 0) {
                income = income + transaction.value;
            }
        } );
        return income;
    }

    private getExpense( transactions: Transaction[] ): number {
        let expense = 0.0;
        transactions.forEach( function( transaction ) {
            if (transaction.value < 0) {
                expense = expense + transaction.value;
            }
        } );
        return expense * -1.0;
    }

    private onSuccess( data ) {
        this.transactions = data;
        this.balance = this.getSum( this.transactions );
        this.income = this.getIncome( this.transactions );
        this.expense = this.getExpense( this.transactions );
    }

    private onError( error ) {
        this.jhiAlertService.error( error.message, null, null );
    }

    getColorByValue() {

    }

}
