import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../model/project';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'project-link',
    templateUrl: 'project-link.component.html'
})
export class ProjectLinkComponent implements OnInit {

    @Input() project: Project;
    public bkg: string;

    public constructor(public sanitizer: DomSanitizer) {
    }

    public sanitize(style): any {
        return this.sanitizer.bypassSecurityTrustStyle(style);
    }

    public ngOnInit(): void {
        const bkgAux = 'linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(' +
            environment.imgBase + this.project.image + ') no-repeat';
        this.bkg = this.sanitize(bkgAux);
    }

}
