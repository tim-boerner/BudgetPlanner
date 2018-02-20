/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IncomeCalculatorTestModule } from '../../../test.module';
import { AccountCollectionComponent } from '../../../../../../main/webapp/app/entities/account-collection/account-collection.component';
import { AccountCollectionService } from '../../../../../../main/webapp/app/entities/account-collection/account-collection.service';
import { AccountCollection } from '../../../../../../main/webapp/app/entities/account-collection/account-collection.model';

describe('Component Tests', () => {

    describe('AccountCollection Management Component', () => {
        let comp: AccountCollectionComponent;
        let fixture: ComponentFixture<AccountCollectionComponent>;
        let service: AccountCollectionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [IncomeCalculatorTestModule],
                declarations: [AccountCollectionComponent],
                providers: [
                    AccountCollectionService
                ]
            })
            .overrideTemplate(AccountCollectionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AccountCollectionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountCollectionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AccountCollection(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.accountCollections[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
