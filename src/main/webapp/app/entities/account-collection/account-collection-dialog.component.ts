import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AccountCollection } from './account-collection.model';
import { AccountCollectionPopupService } from './account-collection-popup.service';
import { AccountCollectionService } from './account-collection.service';

@Component({
    selector: 'jhi-account-collection-dialog',
    templateUrl: './account-collection-dialog.component.html'
})
export class AccountCollectionDialogComponent implements OnInit {

    accountCollection: AccountCollection;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private accountCollectionService: AccountCollectionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.accountCollection.id !== undefined) {
            this.subscribeToSaveResponse(
                this.accountCollectionService.update(this.accountCollection));
        } else {
            this.subscribeToSaveResponse(
                this.accountCollectionService.create(this.accountCollection));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AccountCollection>>) {
        result.subscribe((res: HttpResponse<AccountCollection>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AccountCollection) {
        this.eventManager.broadcast({ name: 'accountCollectionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-account-collection-popup',
    template: ''
})
export class AccountCollectionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private accountCollectionPopupService: AccountCollectionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.accountCollectionPopupService
                    .open(AccountCollectionDialogComponent as Component, params['id']);
            } else {
                this.accountCollectionPopupService
                    .open(AccountCollectionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
