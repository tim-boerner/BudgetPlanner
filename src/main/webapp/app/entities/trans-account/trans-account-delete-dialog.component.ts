import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TransAccount } from './trans-account.model';
import { TransAccountPopupService } from './trans-account-popup.service';
import { TransAccountService } from './trans-account.service';

@Component({
    selector: 'jhi-trans-account-delete-dialog',
    templateUrl: './trans-account-delete-dialog.component.html'
})
export class TransAccountDeleteDialogComponent {

    transAccount: TransAccount;

    constructor(
        private transAccountService: TransAccountService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transAccountService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'transAccountListModification',
                content: 'Deleted an transAccount'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-trans-account-delete-popup',
    template: ''
})
export class TransAccountDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private transAccountPopupService: TransAccountPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.transAccountPopupService
                .open(TransAccountDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
