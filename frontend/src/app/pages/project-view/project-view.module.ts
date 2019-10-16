import { NgModule } from '@angular/core';
import { ProjectViewComponent } from './project-view.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { VideoSliderComponent } from '../../components/video-slider/video-slider.component';
import { ArticleComponent } from '../../components/article/article.component';
import { AppRoutes } from '../../helpers/routes.helper';
import { ComponentsModule } from '../../components/components.module';
import { PropuestaSliderComponent } from '../../components/propuesta-slider/propuesta-slider.component';

@NgModule({
    declarations: [
        ProjectViewComponent,
        VideoSliderComponent,
        PropuestaSliderComponent,
        ArticleComponent
    ],
    imports: [
        ComponentsModule,
        BrowserModule,
        RouterModule.forRoot(AppRoutes, { enableTracing: false })
    ]
})
export class ProjectViewModule {

}
