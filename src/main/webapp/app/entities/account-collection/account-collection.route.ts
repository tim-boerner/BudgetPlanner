import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AccountCollectionComponent } from './account-collection.component';
import { AccountCollectionDetailComponent } from './account-collection-detail.component';
import { AccountCollectionPopupComponent } from './account-collection-dialog.component';
import { AccountCollectionDeletePopupComponent } from './account-collection-delete-dialog.component';

@Injectable()
export class AccountCollectionResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const accountCollectionRoute: Routes = [
    {
        path: 'account-collection',
        component: AccountCollectionComponent,
        resolve: {
            'pagingParams': AccountCollectionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'incomeCalculatorApp.accountCollection.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'account-collection/:id',
        component: AccountCollectionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'incomeCalculatorApp.accountCollection.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const accountCollectionPopupRoute: Routes = [
    {
        path: 'account-collection-new',
        component: AccountCollectionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'incomeCalculatorApp.accountCollection.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'account-collection/:id/edit',
        component: AccountCollectionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'incomeCalculatorApp.accountCollection.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'account-collection/:id/delete',
        component: AccountCollectionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'incomeCalculatorApp.accountCollection.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
