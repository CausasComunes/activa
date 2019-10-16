import { NgModule } from "@angular/core";
import { FullListComponent } from './full-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutes } from '../../helpers/routes.helper';

@NgModule({
    declarations: [
        FullListComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes, { enableTracing: false }),
        ComponentsModule,
        FormsModule
    ],
    exports: [
        FullListComponent
    ]
})
export class FullListModule {
}
