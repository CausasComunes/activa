import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpService {

    private baseUrl = environment.api;

    constructor(private http: HttpClient) {
    }

    public get(url: string): Promise<any> {
        return this.http
            .get(this.baseUrl + url)
            .toPromise()
            .then(response => response)
            .catch(err => err);
    }

    public post(url: string, data: any): Promise<any> {
        return this.http
            .post(this.baseUrl + url, data)
            .toPromise()
            .then(resp => resp)
            .catch(err => err);
    }

    public postExternal(url: string, data: any): Promise<any> {
        return this.http
            .post(url, data)
            .toPromise()
            .then(resp => resp)
            .catch(err => err);
    }

}
