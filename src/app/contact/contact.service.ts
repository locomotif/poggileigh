import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';

//Import RxJs required methods 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { contactConfig } from './contact.config';

@Injectable()
export class ContactService {

    private contactUrl = contactConfig.emailService.requestUrl;

    constructor (private http: Http) {}

    sendMessage(payload: any): Observable<any> {

        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.contactUrl, payload, options) // ...using post request
        // ...and calling .json() on the response to return data
        .map((res:Response) => res.json())
        //...errors if any
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

}
