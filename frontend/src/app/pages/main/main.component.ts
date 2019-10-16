import { Component, HostListener } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProjectService } from '../../services/project.service';
import { PoliticianService } from './../../services/politician.service';
import { Project } from '../../model/project';
import { ConfigService } from '../../services/config.service';
import { Politician } from '../../model/politician';
import * as Flickity from "flickity"

@Component({
    selector: 'main-page',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {

    public projectList: Array<Project>;
    public tally: Number = 0;
    public highlightedProjectExists = false;
    public highlightedProject: Project;
    public politiciansList: Array<Politician>;
    public projectDescription: SafeHtml;
    public isMobileView: Boolean;
    public isIOS: Boolean;
    public slider: Flickity;

    public sanitizeHtml(html: string): any {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    constructor(public projectService: ProjectService,
            public politicianService: PoliticianService,
            public configService: ConfigService,
            public sanitizer: DomSanitizer) {
        if ($('#project-styles').length > 0) {
            $('#project-styles').remove();
        }
        $('#newsletter_project').val('Home').trigger('input').trigger('change');
        this.projectService
            .getAll()
            .then(response => {
                let $highlighted = false;
                let $highlightedProject = null;
                response.forEach(function(item) {
                    if (item.hasOwnProperty('highlighted') && item.highlighted === 1) {
                        $highlighted = true;
                        $highlightedProject = item;
                    }
                });
                if($highlighted) {
                    this.highlightedProjectExists = $highlighted;
                    this.highlightedProject = $highlightedProject;
                    //this.projectDescription = this.sanitizeHtml($highlightedProject.slider_text);
                    this.projectDescription = $highlightedProject.slider_text.replace(/(http.*)[ .]/, '<a href="$1" target="_blank" rel="noopener noreferrer">LINK</a> ');
                    this.politicianService
                        .getAllByProject($highlightedProject.slug, true)
                        .then(r => this.politiciansList = r.slice(0, 20).sort(function() {return .5 - Math.random(); }) );
                }
          
                let rProjectList = []
                let amnestyPrefijo = 'amnesty-';
                response.forEach(function(project) {
                    if (project.slug == 'debate-presidencial' /*|| project.slug.substring(0, amnestyPrefijo.length) === amnestyPrefijo*/)
                      rProjectList.push(project)
                });
                response.forEach(function(project) {
                    if (!project.es_debate && project.slug.substring(0, amnestyPrefijo.length) !== amnestyPrefijo)
                      rProjectList.push(project)
                });
                this.projectList = rProjectList;
          
                if (this.isMobileView) {
                    this.initializeCarousel()
                }
            });
        this.configService
                .getTally()
                .then(response => {
                    this.tally = response;
                });
    }

    ngOnInit() {
        if( window.innerWidth <= 768) {
            this.isMobileView = true;
        } else {
            this.isMobileView = false;
        }
      
        this.isIOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
    }

    initializeCarousel() {
        setTimeout( () => {
            this.slider = new Flickity( '.project-carousel', {
                // options
                cellAlign: 'center',
                autoPlay: true,
                wrapAround: true,
                pauseAutoPlayOnHover: false
            });
        }, 200);
    }	

    @HostListener('window:resize', ['$event'])
    onResize(_event) {
        const wasMobileView = Boolean(this.isMobileView);
        if ( window.innerWidth <= 768) {
            this.isMobileView = true;
            if(!wasMobileView) {
                this.initializeCarousel();
            }
        } else {
            this.isMobileView = false;
        }
    }
}
