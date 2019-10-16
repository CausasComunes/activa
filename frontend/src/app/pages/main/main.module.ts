import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { ProjectService } from '../../services/project.service';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { ConfigService } from '../../services/config.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutes } from '../../helpers/routes.helper';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
    declarations: [
        MainComponent,
        ProjectCardComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes, { enableTracing: false }),
        ComponentsModule,
        ReactiveFormsModule
    ],
    providers: [
        ProjectService,
        ConfigService
    ]
})
export class MainModule {
}
