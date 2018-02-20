import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Transaction } from './transaction.model';
import { TransactionPopupService } from './transaction-popup.service';
import { TransactionService } from './transaction.service';
import { Category, CategoryService } from '../category';
import { TransAccount, TransAccountService } from '../trans-account';

@Component({
    selector: 'jhi-transaction-dialog',
    templateUrl: './transaction-dialog.component.html'
})
export class TransactionDialogComponent implements OnInit {

    transaction: Transaction;
    isSaving: boolean;

    categories: Category[];

    transaccounts: TransAccount[];
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private transactionService: TransactionService,
        private categoryService: CategoryService,
        private transAccountService: TransAccountService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.categoryService.query()
            .subscribe((res: HttpResponse<Category[]>) => { this.categories = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.transAccountService.query()
            .subscribe((res: HttpResponse<TransAccount[]>) => { this.transaccounts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.transaction.id !== undefined) {
            this.subscribeToSaveResponse(
                this.transactionService.update(this.transaction));
        } else {
            this.subscribeToSaveResponse(
                this.transactionService.create(this.transaction));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Transaction>>) {
        result.subscribe((res: HttpResponse<Transaction>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Transaction) {
        this.eventManager.broadcast({ name: 'transactionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCategoryById(index: number, item: Category) {
        return item.id;
    }

    trackTransAccountById(index: number, item: TransAccount) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-transaction-popup',
    template: ''
})
export class TransactionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private transactionPopupService: TransactionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.transactionPopupService
                    .open(TransactionDialogComponent as Component, params['id']);
            } else {
                this.transactionPopupService
                    .open(TransactionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
