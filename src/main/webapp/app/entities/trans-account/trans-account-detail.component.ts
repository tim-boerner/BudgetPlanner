import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { TransAccount } from './trans-account.model';
import { TransAccountService } from './trans-account.service';
import { TransactionService } from '../transaction/transaction.service';
import { ITEMS_PER_PAGE } from '../../shared/constants/pagination.constants';
import { Transaction } from '../transaction/transaction.model';

@Component({
    selector: 'jhi-trans-account-detail',
    templateUrl: './trans-account-detail.component.html'
})
export class TransAccountDetailComponent implements OnInit, OnDestroy {

    transAccount: TransAccount;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    links: any;
    routeData: any;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private transAccountService: TransAccountService,
        private transactionService: TransactionService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTransAccounts();
    }

    load(id) {
        this.transAccountService.find(id)
            .subscribe((transAccountResponse: HttpResponse<TransAccount>) => {
                this.transAccount = transAccountResponse.body;
                this.loadTransactionsByAccount(id);
            });
    }

    loadTransactionsByAccount(id) {
        this.transactionService.queryByAccount(id, {
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()}).subscribe(
            (res: HttpResponse<Transaction[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message));
    }

    transition() {
        this.router.navigate(['/trans-account', this.transAccount.id], {queryParams:
            {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.load(this.transAccount.id);
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.transAccount.transactions = data;
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTransAccounts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'transAccountListModification',
            (response) => this.load(this.transAccount.id)
        );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }


        sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
