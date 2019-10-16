import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../model/project';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'project-card',
    templateUrl: 'project-card.component.html',
    styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

    @Input() project: Project;
    public backgroundImage: string;
    public projectDescription: SafeHtml;
    //agregados por nosotres
    public bgColor: string;
    public causa: string;
    public centerImg: Boolean;

    public constructor(public sanitizer: DomSanitizer) {
    }

    public sanitizeStyle(style): any {
        return this.sanitizer.bypassSecurityTrustStyle(style);
    }

    public sanitizeHtml(html): any {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    public ngOnInit(): void {
        const backgroundAux = 'url(' +
            environment.imgBase + this.project.dir.replace(/\\/g, '/') + '/' + this.project.image + ')';
        this.backgroundImage = this.sanitizeStyle(backgroundAux);
        //this.projectDescription = this.sanitizeHtml(this.project.short_text);
        this.projectDescription = this.project.short_text;
      
        let amnestyPrefijo = 'amnesty-'
        this.centerImg = this.project.es_debate || this.project.slug.substring(0, amnestyPrefijo.length) === amnestyPrefijo;
      
        let bgCol='';
        let causa='';
        //this.project.slug es la url interna
        switch(this.project.slug.toLowerCase()){
          case 'genero':
          bgCol = 'rgb(119, 73, 151)';
          causa = 'Género';
          break;
          case 'ambiente':
          bgCol = '#2fac66';
          causa = 'Ambiente';
          break;
          case 'trabajo':
          bgCol = '#e71869';
          causa = 'Trabajo';
          break;
          case 'transparencia':
          bgCol = '#e61937';
          causa = 'Transparencia';
          break;
          case 'vivienda':
          bgCol = '#194a9a';
          causa = 'Vivienda';
          break;
          case 'drogas':
          bgCol = '#f9b112';
          causa = 'Drogas';
          break;
        }
        this.bgColor = bgCol;
        this.causa = causa;
    }

}
