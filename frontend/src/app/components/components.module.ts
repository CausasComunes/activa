import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PoliticianCardComponent } from './politician-card/politician-card.component';
import { TallyComponent } from './tally/tally.component';
import { StatsComponent } from './stats/stats.component';
import { PoliticianSliderComponent } from './politician-slider/politician-slider.component';
import { SliderComponent } from './slider/slider.component';
import { AppRoutes } from '../helpers/routes.helper';

@NgModule({
    declarations: [
        TallyComponent,
        PoliticianCardComponent,
        StatsComponent,
        PoliticianSliderComponent,
        SliderComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forRoot(AppRoutes, { enableTracing: false })
    ],
    exports: [
        TallyComponent,
        PoliticianCardComponent,
        StatsComponent,
        PoliticianSliderComponent,
        SliderComponent
    ]
})
export class ComponentsModule {
}
