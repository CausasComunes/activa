import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Party } from '../model/party';

@Injectable()
export class PartyService {

    constructor(public httpService: HttpService) {
    }

    public getAll(): Promise<Party[]> {
       return this.httpService
            .get('api/v1/parties')
            .then(response => {
                const primitiveObject = response as Array<Party>;
                const partiesList = new Array<Party>();
                primitiveObject.forEach(party => {
                    const newParty = new Party();
                    newParty.asignProps(party);
                    partiesList.push(newParty);
                });
                return partiesList;
            });
    }

}
