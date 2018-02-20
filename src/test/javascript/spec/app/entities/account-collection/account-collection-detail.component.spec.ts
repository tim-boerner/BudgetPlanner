/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { IncomeCalculatorTestModule } from '../../../test.module';
import { AccountCollectionDetailComponent } from '../../../../../../main/webapp/app/entities/account-collection/account-collection-detail.component';
import { AccountCollectionService } from '../../../../../../main/webapp/app/entities/account-collection/account-collection.service';
import { AccountCollection } from '../../../../../../main/webapp/app/entities/account-collection/account-collection.model';

describe('Component Tests', () => {

    describe('AccountCollection Management Detail Component', () => {
        let comp: AccountCollectionDetailComponent;
        let fixture: ComponentFixture<AccountCollectionDetailComponent>;
        let service: AccountCollectionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [IncomeCalculatorTestModule],
                declarations: [AccountCollectionDetailComponent],
                providers: [
                    AccountCollectionService
                ]
            })
            .overrideTemplate(AccountCollectionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AccountCollectionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountCollectionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AccountCollection(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.accountCollection).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
