/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { IncomeCalculatorTestModule } from '../../../test.module';
import { TransAccountDetailComponent } from '../../../../../../main/webapp/app/entities/trans-account/trans-account-detail.component';
import { TransAccountService } from '../../../../../../main/webapp/app/entities/trans-account/trans-account.service';
import { TransAccount } from '../../../../../../main/webapp/app/entities/trans-account/trans-account.model';

describe('Component Tests', () => {

    describe('TransAccount Management Detail Component', () => {
        let comp: TransAccountDetailComponent;
        let fixture: ComponentFixture<TransAccountDetailComponent>;
        let service: TransAccountService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [IncomeCalculatorTestModule],
                declarations: [TransAccountDetailComponent],
                providers: [
                    TransAccountService
                ]
            })
            .overrideTemplate(TransAccountDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransAccountDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransAccountService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TransAccount(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.transAccount).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
