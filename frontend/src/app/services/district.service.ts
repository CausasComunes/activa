import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { District } from '../model/district';

@Injectable()
export class DistrictService {

    constructor(public httpService: HttpService) {
    }

    public getAll(): Promise<District[]> {
       return this.httpService
            .get('api/v1/districts')
            .then(response => {
                const primitiveObject = response as Array<District>;
                const districtsList = new Array<District>();
                primitiveObject.forEach(district => {
                    const newDistrict = new District();
                    newDistrict.asignProps(district);
                    districtsList.push(newDistrict);
                });
                return districtsList;
            });
    }

}
