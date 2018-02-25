import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TransAccountComponent } from './trans-account.component';
import { TransAccountDetailComponent } from './trans-account-detail.component';
import { TransAccountPopupComponent } from './trans-account-dialog.component';
import { TransAccountDeletePopupComponent } from './trans-account-delete-dialog.component';

@Injectable()
export class TransAccountResolvePagingParams implements Resolve<any> {

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

export const transAccountRoute: Routes = [
    {
        path: 'trans-account',
        component: TransAccountComponent,
        resolve: {
            'pagingParams': TransAccountResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'incomeCalculatorApp.transAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'trans-account/:id',
        component: TransAccountDetailComponent,
        resolve: {
            'pagingParams': TransAccountResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'incomeCalculatorApp.transAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transAccountPopupRoute: Routes = [
    {
        path: 'trans-account-new',
        component: TransAccountPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'incomeCalculatorApp.transAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'trans-account/:id/edit',
        component: TransAccountPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'incomeCalculatorApp.transAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'trans-account/:id/delete',
        component: TransAccountDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'incomeCalculatorApp.transAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
