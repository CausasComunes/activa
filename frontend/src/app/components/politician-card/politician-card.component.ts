import { Component, Input, OnInit, AfterViewChecked } from '@angular/core';
import { Politician } from '../../model/politician';
import { Project } from '../../model/project';
import { ConfigService } from '../../services/config.service';
import { ProjectService } from '../../services/project.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'politician-card',
    templateUrl: './politician-card.component.html',
    styleUrls: ['./politician-card.component.scss']
})
export class PoliticianCardComponent implements OnInit {

    @Input() politician: Politician;
    @Input() set project(value: Project) {
        this._project = value;
        if (this._project.name) {
            //si la stance nunca se definió en el backend el forEach de abajo nunca llega y queda vacía
            this.stance = 'NoConfirmado';
            this.stance_postura = 'No confirmado';
            this.politician.stances.forEach(stance => {
                if (stance.project_id === this._project.id) {
                    this.stance = stance.name;
                    this.stance_id = stance.id;
                  
                    let postura = '';
                    switch (stance.name) {
                      case 'AFavor':
                        postura = 'A favor';
                        break;
                      case 'EnContra':
                        postura = 'En contra';
                        break;
                      case 'SeAbstiene':
                      case 'NoConfirmado':
                      case 'SinDefinir':
                      default:
                        postura = 'No confirmado';
                        break;
                    }
                    this.stance_postura = postura;
                }
            });
        }
    }

    public _project: Project;
    public imgUrl: string;
    public stance: string;
    public stance_id: Number;
    public randomMessage: string;
    public last: boolean;
    public stance_postura: string;

    public constructor(public configService: ConfigService,
        public projectService: ProjectService) {
    }

    public ngOnInit(): void {
        this.imgUrl = environment.imgBase + this.politician.dir + '/box-' + this.politician.image;
    }

    public openTwitterWindow(): void {
        this.tallyUp();
        const randomTweet = this.getRandomMessage().replace('@', '@' + this.politician.twitter);
        window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(randomTweet), '_blank');
    }

    public generateRandomMessage(): void {
        this.randomMessage = this.getRandomMessage().replace('@', this.politician.first_name + ' ' + this.politician.last_name);
    }

    public openFacebookWindow(): void {
        this.tallyUp();
        window.open(`https://facebook.com/${this.politician.facebook}`, '_blank');
    }

    public openInstagramWindow(): void {
        this.tallyUp();
        window.open(`https://instagram.com/${this.politician.instagram}`, '_blank');
    }

    public getRandomMessage(): string {
        let stanceTweets: Array<any>;
        stanceTweets = this._project.stances.filter(stance => stance.id === this.stance_id);
        if (!stanceTweets.length)
          stanceTweets = this._project.stances.filter(stance => stance.name === 'NoConfirmado');
        let length = stanceTweets.length;
        if (length > 0) {
            stanceTweets = stanceTweets[0].tweets;
            length = stanceTweets.length;
            const index = Math.floor(Math.random() * length);
            return stanceTweets[index].text;
        }
        return '';
    }

    public tallyUp(): void {
        this.projectService
            .tallyUp(this._project)
            .then(ammount => {
                this._project.tally = ammount;
            });
    }

}
