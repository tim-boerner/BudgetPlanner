/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { IncomeCalculatorTestModule } from '../../../test.module';
import { TransAccountDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/trans-account/trans-account-delete-dialog.component';
import { TransAccountService } from '../../../../../../main/webapp/app/entities/trans-account/trans-account.service';

describe('Component Tests', () => {

    describe('TransAccount Management Delete Component', () => {
        let comp: TransAccountDeleteDialogComponent;
        let fixture: ComponentFixture<TransAccountDeleteDialogComponent>;
        let service: TransAccountService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [IncomeCalculatorTestModule],
                declarations: [TransAccountDeleteDialogComponent],
                providers: [
                    TransAccountService
                ]
            })
            .overrideTemplate(TransAccountDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransAccountDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransAccountService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
