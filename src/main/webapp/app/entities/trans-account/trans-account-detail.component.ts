import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TransAccount } from './trans-account.model';
import { TransAccountService } from './trans-account.service';

@Component({
    selector: 'jhi-trans-account-detail',
    templateUrl: './trans-account-detail.component.html'
})
export class TransAccountDetailComponent implements OnInit, OnDestroy {

    transAccount: TransAccount;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private transAccountService: TransAccountService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTransAccounts();
    }

    load(id) {
        this.transAccountService.find(id)
            .subscribe((transAccountResponse: HttpResponse<TransAccount>) => {
                this.transAccount = transAccountResponse.body;
            });
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
}
