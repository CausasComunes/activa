import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Project } from '../model/project';

@Injectable()
export class ProjectService {

    constructor(public httpService: HttpService) {
    }

    public getAll(): Promise<Project[]> {
       return this.httpService
            .get('api/v1/projects')
            .then(response => {
                const primitiveObject = response as Array<Project>;
                const projectList = new Array<Project>();
                primitiveObject.forEach(p => {
                    const newProject = new Project();
                    newProject.asignProps(p);
                    projectList.push(newProject);
                });
                return projectList;
            });
    }

    public getById(id: string): Promise<Project> {
        return this.httpService
            .get('api/v1/projects/' + id)
            .then(p => {
                const currentProject = new Project();
                currentProject.asignProps(p);
                currentProject.videos.forEach(function(vid) {
                    vid.url = 'https://www.youtube.com/embed/' + vid.url;
                    vid.thumb = 'https://img.youtube.com/vi/' + vid.url + '/hqdefault.jpg';
                });
                return currentProject as Project;
            });
    }

    public getTally(id: string): Promise<any> {
        return this.httpService
            .get('api/v1/projects/' + id + '/tally')
            .then(tally => tally);
    }

    public tallyUp(project: Project): Promise<any> {
        const data = { 'id': project.id };
        return this.httpService
            .post('api/v1/projects/' + project.slug + '/tally', data)
            .then(tally => tally);
    }

}
