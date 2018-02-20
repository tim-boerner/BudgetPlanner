/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { IncomeCalculatorTestModule } from '../../../test.module';
import { TransAccountDialogComponent } from '../../../../../../main/webapp/app/entities/trans-account/trans-account-dialog.component';
import { TransAccountService } from '../../../../../../main/webapp/app/entities/trans-account/trans-account.service';
import { TransAccount } from '../../../../../../main/webapp/app/entities/trans-account/trans-account.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { AccountCollectionService } from '../../../../../../main/webapp/app/entities/account-collection';

describe('Component Tests', () => {

    describe('TransAccount Management Dialog Component', () => {
        let comp: TransAccountDialogComponent;
        let fixture: ComponentFixture<TransAccountDialogComponent>;
        let service: TransAccountService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [IncomeCalculatorTestModule],
                declarations: [TransAccountDialogComponent],
                providers: [
                    UserService,
                    AccountCollectionService,
                    TransAccountService
                ]
            })
            .overrideTemplate(TransAccountDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransAccountDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransAccountService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TransAccount(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.transAccount = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'transAccountListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TransAccount();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.transAccount = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'transAccountListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
