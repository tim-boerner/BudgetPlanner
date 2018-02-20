import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AccountCollection } from './account-collection.model';
import { AccountCollectionPopupService } from './account-collection-popup.service';
import { AccountCollectionService } from './account-collection.service';

@Component({
    selector: 'jhi-account-collection-delete-dialog',
    templateUrl: './account-collection-delete-dialog.component.html'
})
export class AccountCollectionDeleteDialogComponent {

    accountCollection: AccountCollection;

    constructor(
        private accountCollectionService: AccountCollectionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.accountCollectionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'accountCollectionListModification',
                content: 'Deleted an accountCollection'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-account-collection-delete-popup',
    template: ''
})
export class AccountCollectionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private accountCollectionPopupService: AccountCollectionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.accountCollectionPopupService
                .open(AccountCollectionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
