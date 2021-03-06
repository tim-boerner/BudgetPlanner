import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TransAccount } from './trans-account.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TransAccount>;

@Injectable()
export class TransAccountService {

    private resourceUrl =  SERVER_API_URL + 'api/trans-accounts';

    constructor(private http: HttpClient) { }

    create(transAccount: TransAccount): Observable<EntityResponseType> {
        const copy = this.convert(transAccount);
        return this.http.post<TransAccount>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(transAccount: TransAccount): Observable<EntityResponseType> {
        const copy = this.convert(transAccount);
        return this.http.put<TransAccount>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TransAccount>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByUserId(id: number): Observable<EntityResponseType> {
        return this.http.get<TransAccount>(`${this.resourceUrl}/user/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TransAccount[]>> {
        const options = createRequestOption(req);
        return this.http.get<TransAccount[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TransAccount[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TransAccount = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TransAccount[]>): HttpResponse<TransAccount[]> {
        const jsonResponse: TransAccount[] = res.body;
        const body: TransAccount[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TransAccount.
     */
    private convertItemFromServer(transAccount: TransAccount): TransAccount {
        const copy: TransAccount = Object.assign({}, transAccount);
        return copy;
    }

    /**
     * Convert a TransAccount to a JSON which can be sent to the server.
     */
    private convert(transAccount: TransAccount): TransAccount {
        const copy: TransAccount = Object.assign({}, transAccount);
        return copy;
    }
}
