import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AccountCollection } from './account-collection.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AccountCollection>;

@Injectable()
export class AccountCollectionService {

    private resourceUrl =  SERVER_API_URL + 'api/account-collections';

    constructor(private http: HttpClient) { }

    create(accountCollection: AccountCollection): Observable<EntityResponseType> {
        const copy = this.convert(accountCollection);
        return this.http.post<AccountCollection>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(accountCollection: AccountCollection): Observable<EntityResponseType> {
        const copy = this.convert(accountCollection);
        return this.http.put<AccountCollection>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AccountCollection>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AccountCollection[]>> {
        const options = createRequestOption(req);
        return this.http.get<AccountCollection[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AccountCollection[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AccountCollection = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AccountCollection[]>): HttpResponse<AccountCollection[]> {
        const jsonResponse: AccountCollection[] = res.body;
        const body: AccountCollection[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AccountCollection.
     */
    private convertItemFromServer(accountCollection: AccountCollection): AccountCollection {
        const copy: AccountCollection = Object.assign({}, accountCollection);
        return copy;
    }

    /**
     * Convert a AccountCollection to a JSON which can be sent to the server.
     */
    private convert(accountCollection: AccountCollection): AccountCollection {
        const copy: AccountCollection = Object.assign({}, accountCollection);
        return copy;
    }
}
