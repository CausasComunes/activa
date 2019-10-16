import { Routes } from '@angular/router';
import { MainComponent } from '../pages/main/main.component';
import { ProjectViewComponent } from '../pages/project-view/project-view.component';
import { FullListComponent } from '../pages/full-list/full-list.component';

export const AppRoutes = [
    { path: '', pathMatch: 'full', component: MainComponent },
    { path: "proyecto/:id", component: ProjectViewComponent },
    { path: "lista/:id", component: FullListComponent },
    { path: '**', redirectTo: '' }
];