import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../model/project';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'video-slider',
    templateUrl: './video-slider.component.html',
    styleUrls: ['./video-slider.component.scss']
})
export class VideoSliderComponent {

    @Input() project: Project;

    constructor(private sanitizer: DomSanitizer) {
    }

    public sanitarize(url: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

}
