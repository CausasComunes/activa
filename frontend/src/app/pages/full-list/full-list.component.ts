import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../model/project';
import { ProjectService } from '../../services/project.service';
import { Politician } from '../../model/politician';
import { PoliticianService } from '../../services/politician.service';
import { Party } from '../../model/party';
import { PartyService } from '../../services/party.service';
import { District } from '../../model/district';
import { DistrictService } from '../../services/district.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'full-list-page',
    templateUrl: './full-list.component.html',
    styleUrls: ['./full-list.component.scss']
})
export class FullListComponent {

    public project: Project = new Project();
    public politicians = new Array<Politician>();
    public politiciansList = new Array<Politician>();
    public selectedPosition = 'Todas';
    public selectedParty = 'Todos';
    public selectedDistrict = 'Todos';
    public partiesOptions = new Array<Party>();
    public districtsOptions = new Array<District>();

    constructor(private route: ActivatedRoute,
        private projectService: ProjectService,
        private politicianService: PoliticianService,
        private partyService: PartyService,
        private districtService: DistrictService) {
        this.route.paramMap.subscribe(params => {
            this.projectService
                .getById(params['params']['id'])
                .then(p => {
                    this.project = p;
                    /*const text = 'header {background-image: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(' +
                    environment.imgBase + p.c_dir.replace(/\\/g, '/') + '/cover-' + p.cover_image +
                    '); background-size: cover;background-color: #' + p.secondary_color +
                    '!important;}.contact-button {border-color: #' + p.primary_color + '!important;color: #' +
                    p.primary_color + '!important;}.contact-button:hover {color: #fff!important; background-color: #' +
                    p.primary_color + '!important;}.indicator-icon {background-color: #' + p.primary_color +
                    '!important;}.btn-primary.btn-aec {background-color: #' + p.primary_color +
                    '!important;}.separador {border-top: solid 9px #' + p.secondary_color + '!important;border-bottom: solid 7px #' +
                    p.primary_color + '!important;}.underline:after {background: #' + p.secondary_color +
                    '!important;}.bg-verde {background-color: #' +  + '!important;}.bg-violeta {background-color: #' +
                    p.secondary_color + '!important;}.follow-btn:hover,.follor-btn:focus {color: #' + p.primary_color +
                    '!important;}.follow-strip {background-color: #' + p.primary_color + '!important;}.news-input {background-color: #' +
                    p.primary_color + '!important;}.btn-white {color: #' + p.primary_color + '!important;}';
                    if ($('#project-styles').data('project') !== p.name) {
                        $('#project-styles').html(text).data('project', p.name);
                    }
                    if ($('#project-styles').length < 1) {
                        $('style').after('<style id=\'project-styles\'></style>');
                        $('#project-styles').html(text).data('project', p.name);
                    }*/
                    $('#newsletter_project').val(p.name).trigger('input').trigger('change');
                    this.getPolitics();
                    this.setOptions();
                    const element = document.querySelector('#activa');
                    element.scrollIntoView();
                });
        });
    }

    private getPolitics(): void {
        this.politicianService
            .getAllByProject(this.project.slug)
            .then(response => {
                this.politicians = response;
                this.politiciansList = this.politicians;
            });
    }

    private setOptions(): void {
        this.districtService
            .getAll()
            .then(response => this.districtsOptions = response );
        this.partyService
            .getAll()
            .then(response => this.partiesOptions = response );
    }

    public onFilterChange(filter: string, event: any) {
        if (filter === 'position') {
            this.politiciansList = this.filterPosition(this.politicians);
            this.politiciansList = this.filterParty(this.politiciansList);
            this.politiciansList = this.filterDistrict(this.politiciansList);
        } else if (filter === 'party') {
            this.politiciansList = this.filterParty(this.politicians);
            this.politiciansList = this.filterPosition(this.politiciansList);
            this.politiciansList = this.filterDistrict(this.politiciansList);
        } else if (filter === 'district') {
            this.politiciansList = this.filterDistrict(this.politicians);
            this.politiciansList = this.filterPosition(this.politiciansList);
            this.politiciansList = this.filterParty(this.politiciansList);
        }
    }

    private filterPosition(list: Politician[]) {
        return list.filter(p => {
            let posicion;
            p.stances.forEach(stance => {
                if (stance.project_id === this.project.id) {
                    posicion = stance.name;
                }
            });
            return posicion === this.selectedPosition || this.selectedPosition === 'Todas';
        });
    }

    private filterParty(list: Politician[]) {
        return list.filter(p => p.party.name === this.selectedParty || this.selectedParty === 'Todos');
    }

    private filterDistrict(list: Politician[]) {
        return list.filter(p => p.district.hasc === this.selectedDistrict || this.selectedDistrict === 'Todos');
    }

    public resetFilter(): void {
        this.selectedPosition = 'Todas';
        this.selectedParty = 'Todos';
        this.selectedDistrict = 'Todos';
        this.politiciansList = this.politicians;
    }

}
