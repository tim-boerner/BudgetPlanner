/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IncomeCalculatorTestModule } from '../../../test.module';
import { TransAccountComponent } from '../../../../../../main/webapp/app/entities/trans-account/trans-account.component';
import { TransAccountService } from '../../../../../../main/webapp/app/entities/trans-account/trans-account.service';
import { TransAccount } from '../../../../../../main/webapp/app/entities/trans-account/trans-account.model';

describe('Component Tests', () => {

    describe('TransAccount Management Component', () => {
        let comp: TransAccountComponent;
        let fixture: ComponentFixture<TransAccountComponent>;
        let service: TransAccountService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [IncomeCalculatorTestModule],
                declarations: [TransAccountComponent],
                providers: [
                    TransAccountService
                ]
            })
            .overrideTemplate(TransAccountComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransAccountComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransAccountService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TransAccount(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.transAccounts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
