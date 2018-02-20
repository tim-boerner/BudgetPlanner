/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { IncomeCalculatorTestModule } from '../../../test.module';
import { AccountCollectionDialogComponent } from '../../../../../../main/webapp/app/entities/account-collection/account-collection-dialog.component';
import { AccountCollectionService } from '../../../../../../main/webapp/app/entities/account-collection/account-collection.service';
import { AccountCollection } from '../../../../../../main/webapp/app/entities/account-collection/account-collection.model';

describe('Component Tests', () => {

    describe('AccountCollection Management Dialog Component', () => {
        let comp: AccountCollectionDialogComponent;
        let fixture: ComponentFixture<AccountCollectionDialogComponent>;
        let service: AccountCollectionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [IncomeCalculatorTestModule],
                declarations: [AccountCollectionDialogComponent],
                providers: [
                    AccountCollectionService
                ]
            })
            .overrideTemplate(AccountCollectionDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AccountCollectionDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountCollectionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AccountCollection(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.accountCollection = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'accountCollectionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AccountCollection();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.accountCollection = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'accountCollectionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
