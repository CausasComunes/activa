import { Component, Input } from '@angular/core';

@Component({
    selector: 'tally',
    templateUrl: './tally.component.html',
    styleUrls: ['./tally.component.scss']
})
export class TallyComponent {

    @Input() ammount: Number;

}
