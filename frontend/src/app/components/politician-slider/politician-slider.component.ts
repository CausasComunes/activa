import { Component, Input, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { Politician } from '../../model/politician';
import { Project } from '../../model/project';
import * as $ from 'jquery';

@Component({
    selector: 'politician-slider',
    templateUrl: './politician-slider.component.html',
    styleUrls: ['./politician-slider.component.scss']
})
export class PoliticianSliderComponent implements OnInit {

    @Input() project: Project;
    @Input() politiciansList: Politician[];

    public constructor() {
    }

    public ngOnInit(): void {
    }

}
