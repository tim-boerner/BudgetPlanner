/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IncomeCalculatorTestModule } from '../../../test.module';
import { TransactionComponent } from '../../../../../../main/webapp/app/entities/transaction/transaction.component';
import { TransactionService } from '../../../../../../main/webapp/app/entities/transaction/transaction.service';
import { Transaction } from '../../../../../../main/webapp/app/entities/transaction/transaction.model';

describe('Component Tests', () => {

    describe('Transaction Management Component', () => {
        let comp: TransactionComponent;
        let fixture: ComponentFixture<TransactionComponent>;
        let service: TransactionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [IncomeCalculatorTestModule],
                declarations: [TransactionComponent],
                providers: [
                    TransactionService
                ]
            })
            .overrideTemplate(TransactionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransactionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Transaction(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.transactions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
