import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AccountCollection } from './account-collection.model';
import { AccountCollectionService } from './account-collection.service';

@Component({
    selector: 'jhi-account-collection-detail',
    templateUrl: './account-collection-detail.component.html'
})
export class AccountCollectionDetailComponent implements OnInit, OnDestroy {

    accountCollection: AccountCollection;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private accountCollectionService: AccountCollectionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAccountCollections();
    }

    load(id) {
        this.accountCollectionService.find(id)
            .subscribe((accountCollectionResponse: HttpResponse<AccountCollection>) => {
                this.accountCollection = accountCollectionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAccountCollections() {
        this.eventSubscriber = this.eventManager.subscribe(
            'accountCollectionListModification',
            (response) => this.load(this.accountCollection.id)
        );
    }
}
