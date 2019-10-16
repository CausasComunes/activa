import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../model/project';

@Component({
    selector: 'propuesta-slider',
    templateUrl: './propuesta-slider.component.html',
    styleUrls: ['./propuesta-slider.component.scss']
})
export class PropuestaSliderComponent implements OnInit {
  
    @Input() propuestasResumen: String;
    @Input() propuestas: Array<Array<String>>;
    @Input() changeLink: String;
    @Input() changeText: String;
    @Input() propuestaLink: String;

    constructor() {
      
      // LAS PROPUESTAS/LINKS/RESUMEN SE DEFINEN EN:
      // pages/project-view/project-view.component.ts
      
    }
  
    public ngOnInit(): void {
    }

}
