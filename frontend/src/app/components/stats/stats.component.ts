import { Component, Input, OnChanges } from '@angular/core';
import { Project } from '../../model/project';
import { PoliticianService } from '../../services/politician.service';
import { Politician } from '../../model/politician';

@Component({
    selector: 'stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnChanges {

    @Input() project: Project;
    @Input() requestFullList: Boolean;
    @Input() politiciansList: Array<Politician>;
    public aFavor = 0;
    public enContra = 0;
    public seAbstiene = 0;
    public noConfirmado = 0;

    public constructor(public politicianService: PoliticianService) {
    }

    public ngOnChanges(): void {
        if (this.requestFullList) {
            this.politicianService
                .getAllByProject(this.project.slug, false)
                .then(response => {
                    this.politiciansList = response;
                    this.actualizarConteo(this.politiciansList);
                });
        } else {
            if (this.politiciansList != null) {
                this.actualizarConteo(this.politiciansList);
            }
        }
    }

    public actualizarConteo(politiciansList: Array<Politician>) {
        this.aFavor = 0;
        this.enContra = 0;
        this.seAbstiene = 0;
        this.noConfirmado = 0;
        politiciansList.forEach(p => {
            const stance = (p.stances.filter(st => st.project_id === this.project.id)[0]);
            if (stance) {
                switch (stance.name) {
                    case 'AFavor':
                        this.aFavor++;
                        break;
                    case 'EnContra':
                        this.enContra++;
                        break;
                    case 'SeAbstiene':
                        this.seAbstiene++;
                        break;
                    case 'NoConfirmado':
                        this.noConfirmado++;
                        break;
                }
            }
        });
    }

    public getPorc(num: number) {
        const total = this.aFavor + this.enContra + this.noConfirmado + this.seAbstiene;
        return (num * 100) / total;
    }

    public getEnd(): string {
        const end = '';
        return end;
     }

}
