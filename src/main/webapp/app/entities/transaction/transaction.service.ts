import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Transaction } from './transaction.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Transaction>;

@Injectable()
export class TransactionService {

    private resourceUrl =  SERVER_API_URL + 'api/transactions';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(transaction: Transaction): Observable<EntityResponseType> {
        const copy = this.convert(transaction);
        return this.http.post<Transaction>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(transaction: Transaction): Observable<EntityResponseType> {
        const copy = this.convert(transaction);
        return this.http.put<Transaction>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Transaction>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Transaction[]>> {
        const options = createRequestOption(req);
        return this.http.get<Transaction[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Transaction[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Transaction = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Transaction[]>): HttpResponse<Transaction[]> {
        const jsonResponse: Transaction[] = res.body;
        const body: Transaction[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Transaction.
     */
    private convertItemFromServer(transaction: Transaction): Transaction {
        const copy: Transaction = Object.assign({}, transaction);
        copy.date = this.dateUtils
            .convertLocalDateFromServer(transaction.date);
        return copy;
    }

    /**
     * Convert a Transaction to a JSON which can be sent to the server.
     */
    private convert(transaction: Transaction): Transaction {
        const copy: Transaction = Object.assign({}, transaction);
        copy.date = this.dateUtils
            .convertLocalDateToServer(transaction.date);
        return copy;
    }
}
