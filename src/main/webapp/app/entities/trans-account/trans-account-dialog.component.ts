import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TransAccount } from './trans-account.model';
import { TransAccountPopupService } from './trans-account-popup.service';
import { TransAccountService } from './trans-account.service';
import { User, UserService } from '../../shared';
import { AccountCollection, AccountCollectionService } from '../account-collection';

@Component({
    selector: 'jhi-trans-account-dialog',
    templateUrl: './trans-account-dialog.component.html'
})
export class TransAccountDialogComponent implements OnInit {

    transAccount: TransAccount;
    isSaving: boolean;

    users: User[];

    accountcollections: AccountCollection[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private transAccountService: TransAccountService,
        private userService: UserService,
        private accountCollectionService: AccountCollectionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.accountCollectionService.query()
            .subscribe((res: HttpResponse<AccountCollection[]>) => { this.accountcollections = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.transAccount.id !== undefined) {
            this.subscribeToSaveResponse(
                this.transAccountService.update(this.transAccount));
        } else {
            this.subscribeToSaveResponse(
                this.transAccountService.create(this.transAccount));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TransAccount>>) {
        result.subscribe((res: HttpResponse<TransAccount>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TransAccount) {
        this.eventManager.broadcast({ name: 'transAccountListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackAccountCollectionById(index: number, item: AccountCollection) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-trans-account-popup',
    template: ''
})
export class TransAccountPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private transAccountPopupService: TransAccountPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.transAccountPopupService
                    .open(TransAccountDialogComponent as Component, params['id']);
            } else {
                this.transAccountPopupService
                    .open(TransAccountDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
