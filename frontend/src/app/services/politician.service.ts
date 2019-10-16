import { HttpService } from './http.service';
import { Injectable, ɵConsole } from '@angular/core';
import { Politician } from '../model/politician';

@Injectable()
export class PoliticianService {

    constructor(public httpService: HttpService) {
    }

    public getAll(): Promise<Politician[]> {
       return this.httpService
            .get('api/v1/politicians')
            .then(response => {
                const primitiveObject = response as Array<Politician>;
                const politiciansList = new Array<Politician>();
                primitiveObject.forEach(po => {
                    const newDip = new Politician();
                    newDip.asignProps(po);
                    politiciansList.push(newDip);
                });
                return politiciansList;
            });
    }

    public getAllByProject(id: string, cover: Boolean = false): Promise<Politician[]> {
        let endpoint = 'api/v1/politicians/' + id;
        if (cover) {
            endpoint += '/cover';
        }
        return this.httpService
            .get(endpoint)
            .then(response => {
                const primitiveObject = response as Array<Politician>;
                const politiciansList = new Array<Politician>();
                primitiveObject.forEach(po => {
                    const newDip = new Politician();
                    newDip.asignProps(po);
                    politiciansList.push(newDip);
                });
                return politiciansList;
            });
    }

}
