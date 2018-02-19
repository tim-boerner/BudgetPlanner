/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { IncomeCalculatorTestModule } from '../../../test.module';
import { TransactionDetailComponent } from '../../../../../../main/webapp/app/entities/transaction/transaction-detail.component';
import { TransactionService } from '../../../../../../main/webapp/app/entities/transaction/transaction.service';
import { Transaction } from '../../../../../../main/webapp/app/entities/transaction/transaction.model';

describe('Component Tests', () => {

    describe('Transaction Management Detail Component', () => {
        let comp: TransactionDetailComponent;
        let fixture: ComponentFixture<TransactionDetailComponent>;
        let service: TransactionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [IncomeCalculatorTestModule],
                declarations: [TransactionDetailComponent],
                providers: [
                    TransactionService
                ]
            })
            .overrideTemplate(TransactionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransactionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Transaction(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.transaction).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
