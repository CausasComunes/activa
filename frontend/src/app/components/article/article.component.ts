import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnChanges {

    @Input() article: string;
    @Input() image: string;
    @Input() dir: string;

    public articleSanitarized: SafeHtml;
    public backgroundImage: string;
    public vistaPrevia: string;

    public constructor(private sanitizer: DomSanitizer) {
    }

    public sanitizeStyle(style): any {
        return this.sanitizer.bypassSecurityTrustStyle(style);
    }

    public ngOnInit(): void {
    }

    public ngOnChanges(): void {
        if (this.dir != null) {
            const backgroundAux = 'linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(' +
                environment.imgBase + this.dir.replace(/\\/g, '/') + '/grid-' + this.image + ') no-repeat';
            this.backgroundImage = this.sanitizeStyle(backgroundAux);
        }
        this.articleSanitarized = this.sanitizer.bypassSecurityTrustHtml(this.article);
    }

}
