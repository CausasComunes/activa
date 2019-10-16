import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class ConfigService {

    constructor(public httpService: HttpService) {
    }

    public getTally(): Promise<any> {
        return this.httpService
            .get('api/v1/projects/tally');
    }

}